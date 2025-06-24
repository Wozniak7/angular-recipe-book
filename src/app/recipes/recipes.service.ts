import { Injectable } from '@angular/core';
import { Recipe, Ingredient } from './recipes.model'; // Importa as interfaces de modelo
import { Subject } from 'rxjs'; // Importa Subject para reatividade (opcional por enquanto, mas bom ter)

@Injectable({
    // providedIn: 'root' significa que este serviço será um singleton
    // disponível em toda a aplicação (o que é o mais comum para serviços de dados).
    providedIn: 'root'
})
export class RecipeService {
    // Um Subject para notificar quando a lista de receitas muda
    // Isso é útil para reatividade em componentes que exibem a lista
    recipesChanged = new Subject<Recipe[]>();

    // Array de receitas de exemplo (mock data)
    private recipes: Recipe[] = [
        {
            id: '1',
            name: 'Bolo de Chocolate Clássico',
            description: 'Um bolo de chocolate úmido e delicioso, perfeito para qualquer ocasião.',
            imagePath: 'data:image/jpeg;base64,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',
            ingredients: [
                { name: 'Farinha de trigo', amount: 2, unit: 'xícaras' },
                { name: 'Açúcar', amount: 1.5, unit: 'xícaras' },
                { name: 'Chocolate em pó', amount: 0.75, unit: 'xícaras' },
                { name: 'Fermento em pó', amount: 1, unit: 'colher de chá' },
                { name: 'Ovos', amount: 3, unit: 'unidades' },
                { name: 'Leite', amount: 1, unit: 'xícara' },
                { name: 'Óleo vegetal', amount: 0.5, unit: 'xícara' }
            ],
            steps: [
                'Pré-aqueça o forno a 180°C.',
                'Em uma tigela grande, peneire a farinha, açúcar, chocolate em pó e fermento.',
                'Em outra tigela, bata os ovos, leite e óleo.',
                'Adicione os ingredientes líquidos aos secos e misture até ficar homogêneo.',
                'Despeje a massa em uma forma untada e enfarinhada.',
                'Asse por 30-35 minutos, ou até que um palito saia limpo.'
            ]
        },
        {
            id: '2',
            name: 'Salada Caesar com Frango Grelhado',
            description: 'Uma salada Caesar fresca e crocante com suculento frango grelhado.',
            imagePath: 'https://www.minhareceita.com.br/app/uploads/2022/08/frango-grelhado-com-salada-caesar.jpg',
            ingredients: [
                { name: 'Alface romana', amount: 1, unit: 'cabeça' },
                { name: 'Peito de frango', amount: 200, unit: 'gramas' },
                { name: 'Croutons', amount: 1, unit: 'xícara' },
                { name: 'Queijo parmesão ralado', amount: 0.5, unit: 'xícara' },
                { name: 'Molho Caesar', amount: 0.75, unit: 'xícara' }
            ],
            steps: [
                'Grelhe o peito de frango até ficar cozido por completo.',
                'Corte o frango em fatias finas.',
                'Lave e pique a alface romana.',
                'Em uma tigela grande, combine a alface, frango, croutons e queijo parmesão.',
                'Regue com o molho Caesar e misture bem antes de servir.'
            ]
        }
    ];

    constructor() { }

    // Retorna uma CÓPIA do array de receitas para evitar modificações diretas
    getRecipes(): Recipe[] {
        return [...this.recipes];
    }

    getRecipe(id: string): Recipe | undefined {
        return this.recipes.find(recipe => recipe.id === id);
    }

    addRecipe(recipe: Recipe) {
        // Em um app real, o ID viria do backend
        recipe.id = (this.recipes.length + 1).toString(); // ID simples para mock
        this.recipes.push(recipe);
        this.recipesChanged.next([...this.recipes]); // Notifica os assinantes sobre a mudança
    }

    updateRecipe(id: string, newRecipe: Recipe) {
        const index = this.recipes.findIndex(r => r.id === id);
        if (index > -1) {
            newRecipe.id = id; // Garante que o ID não mude
            this.recipes[index] = newRecipe;
            this.recipesChanged.next([...this.recipes]);
        }
    }

    deleteRecipe(id: string) {
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        this.recipesChanged.next([...this.recipes]);
    }
}

