// recipe.model.ts
// Define a estrutura de dados para uma receita.

export interface Recipe {
    id: string; // Adicionando um ID para identificar unicamente a receita
    name: string;
    description: string;
    imagePath: string; // URL para uma imagem da receita
    ingredients: Ingredient[]; // Lista de ingredientes
    steps: string[]; // Lista de passos de preparo
}

export interface Ingredient {
    name: string;
    amount: number;
    unit: string; // ex: "gramas", "ml", "unidades", "colheres de sopa"
}
