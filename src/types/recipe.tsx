type Recipe = {
  id: string;
  name: string;
  description?: string;
  imgUrl: string;
  servings: number;
  category: string;
  prepTime: number;  //in minutes
  ingredients: {
    name: string;
    quantity?: string;
  }[];
  steps: {
    name: string;
    description: string;
  }[];
};
    
export type { Recipe };