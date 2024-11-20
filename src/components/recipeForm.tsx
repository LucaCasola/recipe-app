"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from 'next/navigation';

// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"

// Icons
import {
  Upload,
  Timer,
  Trash, 
  Utensils,
  ChefHat,
} from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  prepTime: z.number().min(1, {
    message: "Preparation time must be at least 1 minute.",
  }),
  imgUrl: z.string().optional(),
  servings: z.number().min(1, {
    message: "Servings must be at least 1",
  }),
  category: z.enum(["Breakfast", "Lunch", "Dinner", "Dessert"], {
    message: "Category must be one of the predefined options.",
  }),
  ingredients: z.array(z.object({
    name: z.string().min(1, {
      message: "Ingredient name must be at least 1 character.",
    }),
    quantity: z.string().min(1, {
      message: "Quantity must be at least 1 character.",
    }),
  })),
  steps: z.array(z.object({
    name: z.string().min(1, {
      message: "Step name must be at least 1 character.",
    }),
    description: z.string().min(1, {
      message: "Step description must be at least 1 character.",
    }),
  })),
})

export function RecipeForm() {
  const [image, setImage] = useState<File | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imgUrl: "",
      ingredients: [{ name: "", quantity: "" }],
      steps: [{ name: "", description: "" }]
    },
  })

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control: form.control,
    name: "ingredients",
  })

  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
    control: form.control,
    name: "steps",
  })

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Convert servings and prepTime to numbers
    data.servings = Number(data.servings);
    data.prepTime = Number(data.prepTime);
  
    // Add image URL to the data if available
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        data.imgUrl = reader.result as string;
  
        // Call the API route to save the data
        const response = await fetch('/api/submitRecipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          console.log('Recipe saved successfully');
          router.push('/collection');
        } else {
          console.error('Failed to save recipe');
        }
      };
    } else {
      // Call the API route to save the data without image
      const response = await fetch('/api/submitRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log('Recipe saved successfully');
        router.push('/collection');
      } else {
        console.error('Failed to save recipe');
      }
    }
  };

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-grow bg-card justify-center space-y-9 p-20 border-2 rounded-2xl border-black">

        <div className="flex flex-row gap-32">
          <div className="flex flex-col flex-grow gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl">Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="relative flex flex-col flex-shrink-0 h-64 w-64 items-center justify-center gap-4 bg-foreground border-2 border-black rounded-2xl overflow-hidden">
            {image ? (
              <>
                <img src={URL.createObjectURL(image)} alt="Uploaded" className="h-full w-full object-cover" />
                <label className="bg-foreground rounded-lg absolute bottom-2 right-2 flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="h-12 w-12" />
                  <input type="file" onChange={handleImageChange} className="hidden" />
                </label>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <Upload className="h-20 w-20" />
                <span>Upload Image</span>
                <input type="file" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-8">
          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem>
                <section className="flex flex-row items-center gap-2">
                  <Utensils className="w-6 h-6"/>
                  <FormLabel>Servings</FormLabel>
                </section>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <section className="flex flex-row items-center gap-2">
                  <ChefHat className="w-6 h-6"/>
                  <FormLabel>Category</FormLabel>
                </section>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-[185px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Dessert">Dessert</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prepTime"
            render={({ field }) => (
              <FormItem>
                <section className="flex flex-row items-center gap-1">
                  <Timer className="w-6 h-6"/>
                  <FormLabel>Preparation Time</FormLabel>
                </section>
                <section className="flex flex-row items-center">
                  <FormControl>
                    <Input 
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <span>&nbsp;mins</span>
                </section>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <div className="flex flex-row gap-14">
          <div>
            <FormLabel>Steps</FormLabel>
            {stepFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <FormField
                  control={form.control}
                  name={`steps.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`steps.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {index > 0 && (
                  <Button type="button" onClick={() => removeStep(index)} className="p-2">
                    <Trash className="h-5 w-5 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={() => appendStep({ name: "", description: "" })}>
              Add Step
            </Button>
          </div>

          <div>
            <FormLabel>Ingredients</FormLabel>
            {ingredientFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <FormField
                  control={form.control}
                  name={`ingredients.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`ingredients.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Quantity" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {index > 0 && (
                  <Button type="button" onClick={() => removeIngredient(index)} className="p-2">
                    <Trash className="h-5 w-5 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={() => appendIngredient({ name: "", quantity: "" })}>
              Add Ingredient
            </Button>
          </div>
        </div>

        <Button type="submit">Save Recipe</Button>
      </form>
    </Form>
  )
}