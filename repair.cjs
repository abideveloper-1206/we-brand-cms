const fs = require('fs');
const path = require('path');
const file = path.join('node_modules', 'payload', 'dist', 'bin', 'generateImportMap', 'index.js');
let data = fs.readFileSync(file, 'utf8');

// Use a very specific replacement that targets the corruption
const lines = data.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('FAILING COMPONENT')) {
    lines[i] = '            console.error(payloadComponent);';
  }
}
fs.writeFileSync(file, lines.join('\n'));
console.log('Fixed ' + file);
