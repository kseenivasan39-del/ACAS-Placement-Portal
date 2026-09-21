const fs = require('fs');

let content = fs.readFileSync('src/app/placement-record/data.ts', 'utf8');
let lines = content.split('\n');
let lastSno = '';
let lastName = '';
let lastDept = '';

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('sno: \"\",')) {
    lines[i] = lines[i].replace('sno: \"\"', 'sno: \"' + lastSno + '\"');
  } else {
    let snoMatch = lines[i].match(/sno: \"?(.*?)\"?,/);
    if (snoMatch) lastSno = snoMatch[1];
  }
  
  if (lines[i].includes('name: \"\",')) {
    lines[i] = lines[i].replace('name: \"\"', 'name: \"' + lastName + '\"');
  } else {
    let nameMatch = lines[i].match(/name: \"(.*?)\",/);
    if (nameMatch) lastName = nameMatch[1];
  }
  
  if (lines[i].includes('dept: \"\",')) {
    lines[i] = lines[i].replace('dept: \"\"', 'dept: \"' + lastDept + '\"');
  } else {
    let deptMatch = lines[i].match(/dept: \"(.*?)\",/);
    if (deptMatch) lastDept = deptMatch[1];
  }
}

fs.writeFileSync('src/app/placement-record/data.ts', lines.join('\n'));
