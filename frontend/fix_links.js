const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/**/page.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('subItem === \'Recruiters\' ? (')) return;
  
  content = content.replace(
    '                          ) : subItem === \'Placement Record\' ? (\n                            <Link href="/placement-record">{subItem}</Link>\n                          ) : (\n                            subItem\n                          )',
    '                          ) : subItem === \'Placement Record\' ? (\n                            <Link href="/placement-record">{subItem}</Link>\n                          ) : subItem === \'Recruiters\' ? (\n                            <Link href="/placement-recruiters">{subItem}</Link>\n                          ) : (\n                            subItem\n                          )'
  );
  
  fs.writeFileSync(file, content);
});
