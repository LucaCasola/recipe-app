import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req, res) {
  const data = await req.json(); // Parse the JSON body
  
  // Get the recipes from the JSON file
  const filePath = path.join(process.cwd(), 'src/app/recipes.json');  // Define the file path to the recipes.json file
  const fileContents = fs.readFileSync(filePath, 'utf8');  // Read the contents of the recipes.json file
  const recipes = JSON.parse(fileContents);  // Parse the JSON data into a JavaScript object

  // Save the image to the assets folder if available
  let imgUrl = '';
  if (data.imgUrl) {
    const base64Data = data.imgUrl.split(',')[1]; // Extract the Base64 data
    const mimeType = data.imgUrl.match(/data:(.*?);base64/)[1]; // Extract the MIME type
    const extension = mimeType.split('/')[1]; // Get the file extension
    const imageName = `${uuidv4()}.${extension}`; // Generate a unique name for the image
    const imagePath = path.join(process.cwd(), 'public/assets', imageName);
    const imageBuffer = Buffer.from(base64Data, 'base64'); // Convert Base64 to binary buffer
    fs.writeFileSync(imagePath, imageBuffer); // Save the binary buffer to a file
    imgUrl = `/assets/${imageName}`;
  }

  // Assign an ID based on the number of existing recipes
  const newId = recipes.length + 1;

  const newRecipe = { id: newId.toString(), ...data, imgUrl };
  recipes.push(newRecipe);
  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));

  return NextResponse.json({ message: 'Recipe saved successfully' });
}