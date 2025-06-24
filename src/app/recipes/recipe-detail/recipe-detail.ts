import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngIf, *ngFor
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router'; // Para acessar parâmetros da rota e navegação
import { RecipeService } from '../recipes.service'; // Importa o serviço de receitas
import { Recipe } from '../recipes.model'; // Importa o modelo de receita
import { Subscription } from 'rxjs'; // Para gerenciar a inscrição de rota

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule], // CommonModule é necessário para *ngIf, *ngFor
  templateUrl: './recipe-detail.html', // Verifique o nome correto do arquivo HTML
  styleUrls: ['./recipe-detail.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe | undefined; // A receita que será exibida
  id: string | undefined; // O ID da receita obtido da URL
  private routeSub: Subscription | undefined; // Inscrição para observar mudanças na rota

  // Injeta ActivatedRoute (para obter parâmetros da URL), Router (para navegação)
  // e RecipeService (para obter os dados da receita)
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Assina as mudanças nos parâmetros da rota
    // Isso é importante porque o componente pode ser reutilizado se o ID da rota mudar
    this.routeSub = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id']; // Obtém o ID da URL
          this.recipe = this.recipeService.getRecipe(this.id as string); // Busca a receita pelo ID

          // Opcional: Redirecionar se a receita não for encontrada
          if (!this.recipe) {
            // console.warn('Receita não encontrada para o ID:', this.id);
            // Poderíamos navegar para uma página 404 ou de lista
            // this.router.navigate(['/recipes']);
          }
        }
      );
  }

  // Navega para a tela de edição da receita atual
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // Alternativa: this.router.navigate(['/recipes', this.id, 'edit']);
  }

  // Exclui a receita atual e navega de volta para a lista
  onDeleteRecipe() {
    if (this.id) {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']); // Navega para a lista após exclusão
    }
  }

  // Garante que a inscrição seja cancelada quando o componente for destruído
  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
