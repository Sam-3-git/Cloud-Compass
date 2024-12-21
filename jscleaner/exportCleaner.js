const fs = require('fs');
const path = require('path');
const compiledDir = path.join(__dirname, '../CloudCompass/scripts');
const files = fs.readdirSync(dir);
if (file.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
}
const exportRegex = /^export\s*\{\};/gm;
content = content.replace(exportRegex, '// export {};');
fs.writeFileSync(filePath, content, 'utf8');
console.log(`Cleaning export{} in ${file}`);

