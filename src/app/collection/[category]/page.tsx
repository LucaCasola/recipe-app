"use client"

import RecipeCard from "@/components/recipeCard";
import { useParams } from 'next/navigation';
import { Recipe } from "@/types";
import recipes from "@/app/recipes.json"; //import data

export default function CategoryPage() {
  const { category } = useParams();

  const filteredRecipes = recipes.filter(
    (recipe: Recipe) => recipe.category === category
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 pl-24 pr-24">
      <section className="w-full mb-16">
        <h2 className="text-2xl font-bold mb-4 text-black">{category}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-8">
          {filteredRecipes.map((filteredRecipe: Recipe) => (
            <RecipeCard key={filteredRecipe.id} recipe={filteredRecipe} />
          ))}
        </div>
      </section>
    </main>
  );
}