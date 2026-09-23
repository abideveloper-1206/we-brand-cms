const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.scss')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.toLowerCase().includes('#ff6b00')) {
        content = content.replace(/#ff6b00/gi, '#FAAD03');
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceInDir(path.resolve(__dirname, 'src'));
console.log('Done replacing colors.');
