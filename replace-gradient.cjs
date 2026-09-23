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
      let changed = false;

      const replacements = [
        ['#ff8c00', '#FFC133'], // Lighter yellow
        ['#ff4500', '#FAAD03'], // The target color
        ['rgba(255, 140, 0', 'rgba(250, 173, 3'], // RGB for FAAD03 is 250, 173, 3
        ['rgba(255, 69, 0', 'rgba(250, 173, 3'],
        ['rgba(255,140,0', 'rgba(250,173,3'],
        ['rgba(255,69,0', 'rgba(250,173,3']
      ];

      for (const [oldStr, newStr] of replacements) {
        if (content.toLowerCase().includes(oldStr.toLowerCase())) {
          // Replace all case-insensitive
          const regex = new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
          content = content.replace(regex, newStr);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated gradients in ${fullPath}`);
      }
    }
  }
}

replaceInDir(path.resolve(__dirname, 'src'));
console.log('Done replacing gradients.');
