import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngIf
import { RouterModule } from '@angular/router'; // Para usar routerLink

import { Recipe } from '../../recipes.model'; // Importa o modelo de receita

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-item.html', // Verifique o nome correto do arquivo HTML
  styleUrls: ['./recipe-item.css']
})
export class RecipeItemComponent implements OnInit {
  // @Input() permite que o componente pai (RecipeListComponent) passe dados para este componente
  @Input() recipe!: Recipe; // Recebe um objeto Recipe
  @Input() index!: number; // Recebe o índice da receita na lista

  constructor() { }

  ngOnInit(): void {
  }
}
