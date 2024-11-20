import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  const data = await req.json(); // Parse the JSON body

  console.log("DATA", data);

  // Get the recipes from the JSON file
  const filePath = path.join(process.cwd(), "src/app/recipes.json"); // Define the file path to the recipes.json file
  const fileContents = fs.readFileSync(filePath, "utf8"); // Read the contents of the recipes.json file
  const recipes = JSON.parse(fileContents); // Parse the JSON data into a JavaScript object
  let imgPath = "NA";
  // Save the image to the assets folder if available
  if (data?.imgUrl != "NA") {
      const base64Data = data.imgUrl.split(",")[1]; // Extract the Base64 data
      const mimeType = data.imgUrl.match(/data:(.*?);base64/)[1]; // Extract the MIME type
      const extension = mimeType.split("/")[1]; // Get the file extension
      const imageName = `${uuidv4()}.${extension}`; // Generate a unique name for the image
      const imagePath = path.join(process.cwd(), "public/assets", imageName);
      const imageBuffer = Buffer.from(base64Data, "base64"); // Convert Base64 to binary buffer
      fs.writeFileSync(imagePath, imageBuffer); // Save the binary buffer to a file
      imgPath = `/assets/${imageName}`;
  }

  // Assign an ID based on the number of existing recipes
  const newId = recipes.length + 1;

  const newRecipe = { id: newId.toString(), ...data, imgPath };
  recipes.push(newRecipe);
  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));

  return NextResponse.json({ message: "Recipe saved successfully" });
}