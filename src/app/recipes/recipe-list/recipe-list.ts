import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipes.model';
import { Subscription } from 'rxjs';

// Importa o novo componente de item de receita
import { RecipeItemComponent } from './recipe-item/recipe-item';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RecipeItemComponent // Importe o RecipeItemComponent aqui
  ],
  templateUrl: './recipe-list.html', // Verifique o nome correto do arquivo HTML
  styleUrls: ['./recipe-list.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private recipesChangedSub: Subscription | undefined;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.recipesChangedSub = this.recipeService.recipesChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    this.recipesChangedSub?.unsubscribe();
  }

  onNewRecipe() {
    // A navegação será feita pelo routerLink no botão do HTML
  }
}
