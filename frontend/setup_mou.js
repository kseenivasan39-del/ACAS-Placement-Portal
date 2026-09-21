const fs = require('fs');

// 1. Create the placement-mou/page.tsx
let pageStr = fs.readFileSync('src/app/placement-recruiters/page.tsx', 'utf8');

pageStr = pageStr.replace('import { topRecruiters } from "./data";', 'import { mouCompanies } from "./data";');
pageStr = pageStr.replace('export default function PlacementRecruitersPage()', 'export default function PlacementMOUPage()');
pageStr = pageStr.replace('Top Recruiters', 'MOU Signed Companies');
pageStr = pageStr.replace('We are proud to collaborate with leading companies who consistently recruit our talented students.', 'We had Signed Memorandum Of Understanding (MoU) with the following Prestigious Companies');
pageStr = pageStr.replace(/topRecruiters\.map\(\(recruiter, index\)/g, 'mouCompanies.map((company, index)');
pageStr = pageStr.replace(/recruiter\.image/g, 'company.image');
pageStr = pageStr.replace(/recruiter\.name/g, 'company.name');

fs.writeFileSync('src/app/placement-mou/page.tsx', pageStr, 'utf8');
console.log('Created placement-mou/page.tsx');

// 2. Update navigation in all pages
const pagesToUpdate = [
  'src/app/page.tsx',
  'src/app/placement-about/page.tsx',
  'src/app/placement-record/page.tsx',
  'src/app/placement-recruiters/page.tsx',
  'src/app/placement-vision-mission/page.tsx',
  'src/app/placement-mou/page.tsx' // Update the newly created one as well
];

pagesToUpdate.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Update "Mou Signed" link logic in the dropdown map
  // Find where it renders subItem === 'Recruiters' and insert the link for 'Mou Signed'
  if (!content.includes('subItem === \'Mou Signed\' ? (')) {
    const searchStr = `subItem === 'Recruiters' ? (
                            <Link href="/placement-recruiters">{subItem}</Link>
                          ) : (`;
    const replaceStr = `subItem === 'Recruiters' ? (
                            <Link href="/placement-recruiters">{subItem}</Link>
                          ) : subItem === 'Mou Signed' ? (
                            <Link href="/placement-mou">{subItem}</Link>
                          ) : (`;
    content = content.replace(searchStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated navigation in', file);
  }
});
