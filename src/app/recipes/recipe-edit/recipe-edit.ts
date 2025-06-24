import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngIf, *ngFor
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router'; // Para acessar parâmetros da rota e navegação
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Módulos para Reactive Forms

import { RecipeService } from '../recipes.service'; // Importa o serviço de receitas
import { Recipe } from '../recipes.model'; // Importa o modelo de receita

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule // IMPORTANTE: Módulo para Reactive Forms
  ],
  templateUrl: './recipe-edit.html', // Verifique o nome correto do arquivo HTML
  styleUrls: ['./recipe-edit.css']
})
export class RecipeEditComponent implements OnInit {
  id: string | undefined;
  editMode = false; // true se estivermos editando uma receita existente, false se estivermos adicionando uma nova
  recipeForm!: FormGroup; // Nosso formulário reativo

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Observa as mudanças nos parâmetros da rota para determinar o modo (novo ou edição)
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // Se houver um ID, estamos em modo de edição
      this.editMode = params['id'] != null; // editMode é true se houver um ID
      this.initForm(); // Inicializa o formulário sempre que os parâmetros mudarem
    });
  }

  // --- Métodos de Manipulação do Formulário ---

  // Lida com o envio do formulário
  onSubmit() {
    // O valor do formulário já corresponde ao nosso modelo Recipe,
    // pois os nomes dos controles do formulário são os mesmos das propriedades da Recipe.
    const newRecipe: Recipe = this.recipeForm.value;

    if (this.editMode && this.id) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel(); // Navega de volta após salvar
  }

  // Adiciona um novo grupo de controle para um ingrediente no FormArray
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/) // Apenas números positivos inteiros
        ]),
        'unit': new FormControl(null, Validators.required)
      })
    );
  }

  // Remove um grupo de controle de ingrediente do FormArray pelo índice
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // Adiciona um novo controle para um passo no FormArray
  onAddStep() {
    (<FormArray>this.recipeForm.get('steps')).push(
      new FormControl(null, Validators.required)
    );
  }

  // Remove um controle de passo do FormArray pelo índice
  onDeleteStep(index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
  }

  // Navega de volta para a rota anterior ou para a lista de receitas
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // --- Getters para acesso fácil aos FormArrays no template ---
  get ingredientsControls(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get stepsControls(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }


  // --- Inicialização do Formulário ---
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<FormGroup>([]); // FormArray para ingredientes
    let recipeSteps = new FormArray<FormControl>([]); // FormArray para passos

    if (this.editMode && this.id) {
      const recipe = this.recipeService.getRecipe(this.id);
      if (recipe) { // Verifica se a receita foi encontrada
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        // Preenche o FormArray de ingredientes se a receita tiver
        if (recipe.ingredients && recipe.ingredients.length > 0) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]),
                'unit': new FormControl(ingredient.unit, Validators.required)
              })
            );
          }
        }
        // Preenche o FormArray de passos se a receita tiver
        if (recipe.steps && recipe.steps.length > 0) {
          for (let step of recipe.steps) {
            recipeSteps.push(
              new FormControl(step, Validators.required)
            );
          }
        }
      }
    }

    // Inicializa o FormGroup principal com os FormControls e FormArrays
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients, // Adiciona o FormArray de ingredientes
      'steps': recipeSteps // Adiciona o FormArray de passos
    });
  }
}
