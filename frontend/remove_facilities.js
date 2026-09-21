const fs = require('fs');

const pagesToUpdate = [
  'src/app/page.tsx',
  'src/app/placement-about/page.tsx',
  'src/app/placement-record/page.tsx',
  'src/app/placement-recruiters/page.tsx',
  'src/app/placement-vision-mission/page.tsx',
  'src/app/placement-mou/page.tsx'
];

pagesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const searchStr = "{['Home', 'About', 'Admission', 'Facilities', 'Placement', 'Alumni'].map";
    const replaceStr = "{['Home', 'About', 'Admission', 'Placement', 'Alumni'].map";
    if (content.includes(searchStr)) {
        content = content.replace(searchStr, replaceStr);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Removed Facilities from navigation in', file);
    }
  }
});
