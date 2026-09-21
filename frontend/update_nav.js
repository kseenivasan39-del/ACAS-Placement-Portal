const fs = require('fs');
const path = require('path');

const dirs = [
  'src/app/page.tsx',
  'src/app/placement-about/page.tsx',
  'src/app/placement-record/page.tsx',
  'src/app/placement-recruiters/page.tsx',
  'src/app/placement-vision-mission/page.tsx',
  'src/app/placement-mou/page.tsx',
  'src/app/about/page.tsx'
];

dirs.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('Collabration')) {
      content = content.replace(/'Collabration'/g, "'Collaborations'");
      content = content.replace(/subItem === 'Collaborations' \? \([\s\S]*?\)/, "subItem === 'Collaborations' ? (\n                            <Link href=\"/placement-collaborations\">{subItem}</Link>\n                          )");
      // Let's use a simpler string replace since regex with newlines can be tricky
      const targetStr = `subItem === 'Collabration' ? (
                            <Link href=\"/placement-collabration\">{subItem}</Link>
                          ) : `;
      
      // Since it actually just falls through to `subItem` right now (it's the else case), we just need to add the condition
      // Wait, in page.tsx:
      //   ) : subItem === 'Mou Signed' ? (
      //      <Link href="/placement-mou">{subItem}</Link>
      //   ) : (
      //      subItem
      //   )
      
      const searchStr = `) : subItem === 'Mou Signed' ? (
                            <Link href="/placement-mou">{subItem}</Link>
                          ) : (
                            subItem
                          )`;
                          
      const replaceStr = `) : subItem === 'Mou Signed' ? (
                            <Link href="/placement-mou">{subItem}</Link>
                          ) : subItem === 'Collaborations' ? (
                            <Link href="/placement-collaborations">{subItem}</Link>
                          ) : (
                            subItem
                          )`;
      
      if (content.includes(searchStr)) {
         content = content.replace(searchStr, replaceStr);
      }
      
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated nav in', file);
    }
  }
});
