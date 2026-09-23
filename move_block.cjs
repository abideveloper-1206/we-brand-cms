const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/Admin/CustomNav.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetBlockStart = '        {/* Legal Pages — collapsible parent menu */ }';
const footerPanelComment = '      {/* Footer / User Profile Panel */}';
const targetBlockEnd = '          </div>\r\n\r\n      {/* Footer / User Profile Panel */}';
const targetBlockEndUnix = '          </div>\n\n      {/* Footer / User Profile Panel */}';

let startIdx = content.indexOf(targetBlockStart);
if (startIdx === -1) {
    console.error('Could not find targetBlockStart');
    process.exit(1);
}

let endStr = content.includes(targetBlockEnd) ? targetBlockEnd : targetBlockEndUnix;
let endIdx = content.indexOf(endStr, startIdx);
if (endIdx === -1) {
    console.error('Could not find targetBlockEnd');
    process.exit(1);
}

// The block ends right before endStr. Wait, endStr includes the '          </div>' which IS part of Legal Pages!
// Actually, let's just find '      {/* Footer / User Profile Panel */}' and work backwards.
const footerIdx = content.indexOf(footerPanelComment);
const extractedBlock = content.substring(startIdx, footerIdx);

// Remove the extracted block from the content
content = content.substring(0, startIdx) + content.substring(footerIdx);

// Now find where to insert it:
const insertPoint = '        {/* ==================== 4. NEW HEADER DROPDOWN INJECTED HERE ==================== */}';
const insertIdx = content.indexOf(insertPoint);

if (insertIdx === -1) {
    console.error('Could not find insertPoint');
    process.exit(1);
}

// Insert the block
content = content.substring(0, insertIdx) + extractedBlock + '\n' + content.substring(insertIdx);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully moved Legal Pages block.');
