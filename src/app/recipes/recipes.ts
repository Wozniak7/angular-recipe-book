import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Para usar <router-outlet> ou routerLink

// Importe o RecipeListComponent aqui, pois ele é usado no template deste componente
import { RecipeListComponent } from './recipe-list/recipe-list';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RecipeListComponent // AGORA O RecipesComponent SABE SOBRE O RecipeListComponent
  ],
  templateUrl: './recipes.html',
  styleUrls: ['./recipes.css']
})
export class RecipesComponent {

}
