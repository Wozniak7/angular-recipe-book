import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngFor
import { RouterModule } from '@angular/router'; // Para usar routerLink no template
import { RecipeService } from '../recipes.service'; // Importa o serviço
import { Recipe } from '../recipes.model'; // Importa o modelo
import { Subscription } from 'rxjs'; // Para gerenciar a inscrição do Subject

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // CommonModule é necessário para *ngFor
  templateUrl: './recipe-list.html', // Verifique o nome correto do arquivo HTML
  styleUrls: ['./recipe-list.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = []; // Array para armazenar as receitas
  private recipesChangedSub: Subscription | undefined; // Para a inscrição do Subject

  // Injeta o RecipeService no construtor
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // Obtém as receitas do serviço
    this.recipes = this.recipeService.getRecipes();

    // Assina o Subject para ser notificado quando a lista de receitas mudar
    this.recipesChangedSub = this.recipeService.recipesChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  // Boa prática: desinscrever-se para evitar vazamentos de memória
  ngOnDestroy(): void {
    this.recipesChangedSub?.unsubscribe();
  }

  onNewRecipe() {
    // Navegar para a rota de nova receita (definida no roteamento)
    // O routerLink no HTML já fará isso, mas ter uma função é bom para outros botões
    // ou para lógica programática.
    // Para navegação programática, você injetaria o Router aqui:
    // constructor(private recipeService: RecipeService, private router: Router) {}
    // this.router.navigate(['new'], {relativeTo: this.route}); // Se injetar ActivatedRoute
  }
}
