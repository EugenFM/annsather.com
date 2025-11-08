// src/components/recipes-data/index.ts
import { breakfastRecipes } from "./BreakfastRecipes";
import { startersRecipes } from "./StartersRecipes";
import { sidesRecipes } from "./SidesRecipes";
import { entreesRecipes } from "./EntreesRecipes";
import { dessertsRecipes } from "./DessertsRecipes";

export interface Recipe {
    name: string;
    ingredients: string[];
    instructions: string[];
    yield?: string;
}

export interface RecipeCategory {
    title: string;
    recipes: Recipe[];
}

export const recipeData: RecipeCategory[] = [
    breakfastRecipes,
    startersRecipes,
    sidesRecipes,
    entreesRecipes,
    dessertsRecipes,
];
