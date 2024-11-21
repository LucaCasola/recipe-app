"use client"

import { RecipeForm  } from "@/components/recipeForm";
import { useParams } from 'next/navigation';

export default function CreateRecipePage() {
  const { id } = useParams();
  const recipeId = id[0];

  return (
    <main className="flex flex-grow w-auto items-center justify-center text-black p-24">
      <RecipeForm recipeId={recipeId}/>
    </main>
  )
}