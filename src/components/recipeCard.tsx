import { Recipe } from '@/types';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Timer, Utensils } from 'lucide-react'; // Icons


export function convertMinutesToHoursAndMinutes(totalMinutes: number){
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}min`;
  else return `${hours}h ${minutes}m`;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();
  const handleViewClick = () => {
    router.push(`/collection/recipe/${recipe.id}`);
  };
  
  return (
    <Card className="w-full max-w-xl shadow-lg shadow-gray-500/50">
      <CardHeader>
        <section className="flex flex-row justify-between items-center">
          <div className="flex flex-col pr-2">
            <CardTitle className="mb-4">{recipe.name}</CardTitle>
            <CardDescription>{recipe.description}</CardDescription>
          </div>
          <section className="flex flex-row gap-4">
            <div className="flex flex-col items-center">
              <Utensils size={24} /> 
              <span>{recipe.servings}</span>
            </div>
            <div className="flex flex-col items-center">
              <Timer size={24} /> 
              <span>{convertMinutesToHoursAndMinutes(recipe.prepTime)}</span>
            </div>
          </section>
        </section>
      </CardHeader>
      <CardContent>
        { (recipe.imgUrl.startsWith('http') || recipe.imgUrl.startsWith('/assets')) ? (
          <img 
            src={recipe.imgUrl} 
            alt={`image of ${recipe.name}`} 
            className="w-full h-64 max-w-xs object-cover rounded-lg mx-auto mb-5"
          />
        ) : (
          <img 
            src="/assets/placeholder.png" 
            alt={recipe.name} 
            className="w-32 h-32 object-cover rounded-lg mb-2"
          />
        )}
        <div className="flex flex-wrap">
          <p className="font-bold mr-2">Ingredients:</p>
          {recipe.ingredients.map((ingredient, index) => (
            <p key={index} className="mr-2">
            {ingredient.name}
            {index < recipe.ingredients.length - 1 && ','} 
          </p>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="btn-primary border justify-end" onClick={handleViewClick}>View</Button>
      </CardFooter>
    </Card>
  )
};