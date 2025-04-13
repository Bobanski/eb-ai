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

// Try multiple possible locations for the source images
const possibleSourceDirs = [
  path.join(__dirname, '..', 'data', 'MenuImages'),  // Original path (repo root)
  path.join(__dirname, 'data', 'MenuImages'),        // In case Vercel clones into smoothie-ui directly
  path.join(__dirname, 'src', 'assets')              // Fallback to use assets directory
];

let sourceDir = null;
let filesCopied = 0;

// Try each possible source directory
for (const dir of possibleSourceDirs) {
  if (fs.existsSync(dir)) {
    sourceDir = dir;
    console.log(`Found source directory: ${dir}`);
    
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const sourcePath = path.join(dir, file);
      const destPath = path.join(publicImagesDir, file);
      
      // Only copy files (not directories)
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, destPath);
        filesCopied++;
        console.log(`Copied: ${file}`);
      }
    });
    
    console.log(`Successfully copied ${filesCopied} images to public/images from ${dir}`);
    break; // Stop after finding the first valid directory
  }
}

// If no source directory was found
if (!sourceDir) {
  console.warn('Warning: No source directory found for images. Checking if images already exist in public/images...');
  
  if (fs.existsSync(publicImagesDir)) {
    const existingFiles = fs.readdirSync(publicImagesDir);
    console.log(`Found ${existingFiles.length} existing images in public/images`);
  } else {
    console.error('No images found. The application may not display images correctly.');
  }
}