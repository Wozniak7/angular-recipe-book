import { Routes } from '@angular/router';

// Importa os componentes criados (eles precisam ser marcados como standalone: true)
import { RecipesComponent } from './recipes/recipes';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit';
// Não precisamos importar RecipeListComponent aqui diretamente, pois ele será um subcomponente de RecipesComponent

export const routes: Routes = [
    // Redireciona a rota padrão para a página de receitas
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },

    // Rota principal para o componente de receitas
    // O componente RecipesComponent atuará como um wrapper para as rotas filhas de receita
    {
        path: 'recipes', component: RecipesComponent, children: [
            // Rota para adicionar uma nova receita
            // Esta rota deve vir ANTES da rota de detalhe com ID, para evitar conflitos
            { path: 'new', component: RecipeEditComponent },

            // Rota para exibir os detalhes de uma receita específica
            // :id é um parâmetro dinâmico na URL
            { path: ':id', component: RecipeDetailComponent },

            // Rota para editar uma receita existente
            // :id/edit significa que você edita uma receita específica
            { path: ':id/edit', component: RecipeEditComponent }
        ]
    },

    // Rota wildcard para qualquer URL não encontrada (ex: 404 Page)
    // Certifique-se de que esta seja a ÚLTIMA rota da sua lista
    { path: '**', redirectTo: '/recipes' } // Redireciona para receitas se a rota não existir
];

