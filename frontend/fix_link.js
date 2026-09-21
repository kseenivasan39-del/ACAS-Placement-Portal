const fs = require('fs');

const dirs = [
  'src/app/page.tsx',
  'src/app/placement-about/page.tsx',
  'src/app/placement-record/page.tsx',
  'src/app/placement-recruiters/page.tsx',
  'src/app/placement-vision-mission/page.tsx',
  'src/app/placement-mou/page.tsx',
  'src/app/about/page.tsx',
  'src/app/placement-collaborations/page.tsx'
];

dirs.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const searchStr = `) : subItem === 'Collaborations' ? (
                            <Link href="/placement-collaborations">{subItem}</Link>
                          ) : (
                            subItem
                          )`;
                          
    const replaceStr = `) : subItem === 'Collaborations' ? (
                            <Link href="/placement-collaborations">{subItem}</Link>
                          ) : subItem === 'Placement / Training' ? (
                            <Link href="/">{subItem}</Link>
                          ) : (
                            subItem
                          )`;
    
    if (content.includes(searchStr)) {
       content = content.replace(searchStr, replaceStr);
       fs.writeFileSync(file, content, 'utf8');
       console.log('Updated nav in', file);
    }
  }
});
