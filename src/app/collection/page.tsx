"use client"

import { useRouter } from 'next/navigation';
import { Recipe } from "@/types";
import { Button } from '@/components/ui/button';
import recipes from "@/app/recipes.json"; //import data

export default function CollectionPage() {
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const router = useRouter();

  const handleViewAllClick = (category: string) => {
    router.push(`/collection/${category}`);
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen pt-10 pl-24 pr-24">
      {categories.map((category) => {
        const filteredRecipes = recipes.filter(
          (recipe: Recipe) => recipe.category === category
        ).slice(0, 5);

        return (
          <section key={category} className="w-full mb-16  p-6 border-2 rounded-lg bg-card shadow-sm shadow-gray-500/50">
            <h2 className="text-2xl font-bold mb-4 text-black">{category}</h2>
            <div className="flex flex-row gap-8">
              {filteredRecipes.map((recipe: Recipe) => (
                <div key={recipe.id} className="flex flex-col w-40 items-center">
                  { (recipe.imgUrl.startsWith('http') || recipe.imgUrl.startsWith('/assets')) ? (
                    <img 
                      src={recipe.imgUrl} 
                      alt={recipe.name} 
                      className="w-32 h-32 object-cover rounded-lg mb-2"
                    />
                  ) : (
                    <img 
                      src="/assets/placeholder.png" 
                      alt={recipe.name} 
                      className="w-32 h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  <p className="text-center">{recipe.name}</p>
                </div>
              ))}
                <Button
                  onClick={() => handleViewAllClick(category)}
                  className="ml-4 mt-10"
                >
                  View All 
                </Button>
            </div>
          </section>
        );
      })}
    </main>
  );
}