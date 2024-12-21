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
});
