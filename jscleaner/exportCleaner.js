const fs = require('fs');
const path = require('path');

const compiledDir = path.join(__dirname, '../CloudCompass/scripts'); // Path to compiled JavaScript files

// Read all files in the directory
const files = fs.readdirSync(compiledDir);

files.forEach((file) => {
  const filePath = path.join(compiledDir, file); // Get the full path of the file
  // Check if the file ends with .js
  if (file.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8'); // Read the file content
    // Process the content...
    console.log(`Processing: ${file}`);
  }
// Check if the file contains 'export {}' and comment it out
const updatedContent = content.replace(/^export\s\{\};$/gm, '// export {};');
// If changes were made, overwrite the file
if (updatedContent !== content) {
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Updated: ${file}`);
} else {
  console.log(`No changes needed for: ${file}`);
}
});
