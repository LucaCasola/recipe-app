"use client"

import RecipeCard from "@/components/recipeCard";
import { useParams } from 'next/navigation';
import { Recipe } from "@/types";
import { ArrowLeft } from 'lucide-react'; // Icon
import recipes from "@/app/recipes.json"; //import data

export default function CategoryPage() {
  const { category } = useParams();

  const filteredRecipes = recipes.filter(
    (recipe: Recipe) => recipe.category === category
  );

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 pt-10 pl-24 pr-24">
      <div className="flex flex-row w-full items-start">
        <ArrowLeft size={24} className="cursor-pointer" onClick={() => window.history.back()} />
      </div>
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