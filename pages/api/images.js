import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Define the paths to the gallery and projects folders
  const galleryDirectory = path.join(process.cwd(), "public/images/gallery");
  const projectsDirectory = path.join(process.cwd(), "public/images/projects");

  // Helper function to read and sort images from a folder
  const getSortedImages = (directory) => {
    try {
      // Read all files in the folder
      const fileNames = fs.readdirSync(directory);

      // Filter, sort, and map image files to paths
      return fileNames
        .filter((file) => /\.(jpe?g|png|gif|webp|svg)$/i.test(file))
        .map((file) => {
          // Extract number from filename
          const match = file.match(/(\d+)\.(jpe?g|png|gif|webp|svg)$/i);
          return match ? { file, number: parseInt(match[1], 10) } : null;
        })
        .filter(Boolean) // Remove null values
        .sort((a, b) => a.number - b.number) // Sort by extracted number
        .map(({ file }) => `/images/${path.basename(directory)}/${file}`); // Map to image paths
    } catch (error) {
      console.error(`Error reading ${directory} directory:`, error);
      return [];
    }
  };

  // Get sorted images for both folders
  const images = {
    gallery: getSortedImages(galleryDirectory),
    projects: getSortedImages(projectsDirectory),
  };

  // Return the structured object with both galleries
  res.status(200).json(images);
}
