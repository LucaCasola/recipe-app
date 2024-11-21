"use client"

import { Recipe } from "@/types";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Timer, Utensils, ChefHat, ArrowLeft } from 'lucide-react'; // Icons
import { convertMinutesToHoursAndMinutes } from '@/components/recipeCard';
import recipes from "@/app/recipes.json";  //import recipe data


export default function RecipePage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      const foundRecipe = recipes.find((r) => r.id === id);
      setRecipe(foundRecipe || null);
      console.log(foundRecipe);
    }
  }, [id]);

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <main className="flex w-full min-h-screen flex-col pr-24 pl-24 pt-10 gap-8">
      <div className="flex flex-row w-full items-start">
        <ArrowLeft size={24} className="cursor-pointer" onClick={() => window.history.back()} />
      </div>

      <div className="flex flex-row w-full items-center justify-center">
        <Card className="w-full max-w-xl shadow-lg shadow-gray-500/50">
          <CardHeader>
            <CardTitle>{recipe.name}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-row ">
              <img 
                src={recipe.imgUrl} 
                alt={`image of ${recipe.name}`} 
                className="w-full h-64 max-w-xs object-cover rounded-lg mx-auto mb-5 mr-4"
              />
              <section className="flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                  <Utensils size={24} /> 
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex flex-row gap-2">
                  <Timer size={24} /> 
                  <span>{convertMinutesToHoursAndMinutes(recipe.prepTime)} prep time</span>
                </div>
                <div className="flex flex-row gap-2">
                  <ChefHat size={24} /> 
                  <span>{recipe.category}</span>
                </div>
                <CardDescription>{recipe.description}</CardDescription>
              </section>
            </div>

            <section className="flex flex-col flex-wrap mb-6">
              <p className="font-bold mr-2">Ingredients</p>
              {recipe.ingredients.map((ingredient, index) => (
                <span key={index} className="mr-2">
                {ingredient.quantity} {ingredient.name}
                </span>
              ))}
            </section>

            <section className="flex flex-col items-center">
              <p className="font-bold mr-2">Instructions</p>
            </section>
            <section className="flex flex-col flex-wrap">
              {recipe.steps.map((step, index) => (
                <span key={index} className="mb-2">
                {index + 1}. {step.description}
                </span>
              ))}
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}