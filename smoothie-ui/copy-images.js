import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the public/images directory if it doesn't exist
const publicImagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
  console.log('Created directory:', publicImagesDir);
}

// Copy images from data/MenuImages to public/images
const sourceDir = path.join(__dirname, '..', 'data', 'MenuImages');
if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(publicImagesDir, file);
    
    // Only copy files (not directories)
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${file}`);
    }
  });
  
  console.log(`Successfully copied ${files.length} images to public/images`);
} else {
  console.error('Source directory not found:', sourceDir);
}