import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Define the path to the images folder
  const imagesDirectory = path.join(process.cwd(), "public/images");

  try {
    // Read all the files in the folder
    const fileNames = fs.readdirSync(imagesDirectory);

    // Filter and sort image files
    const images = fileNames
      .filter((file) => /\.(jpe?g|png|gif)$/i.test(file))
      .map((file) => {
        // Extract number from filename
        const match = file.match(/(\d+)\.(jpe?g|png|gif)$/i);
        return match ? { file, number: parseInt(match[1], 10) } : null;
      })
      .filter(Boolean) // Remove null values
      .sort((a, b) => a.number - b.number) // Sort by extracted number
      .map(({ file }) => `/images/${file}`); // Map to image paths

    // Return the sorted array of image paths
    res.status(200).json(images);
  } catch (error) {
    console.error("Error reading images directory:", error);
    res.status(500).json({ error: "Failed to load images" });
  }
}
