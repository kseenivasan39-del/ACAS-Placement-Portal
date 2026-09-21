const fs = require('fs');
const files = [
  'frontend/src/app/placement-about/page.tsx', 
  'frontend/src/app/placement-vision-mission/page.tsx', 
  'frontend/src/app/placement-record/page.tsx', 
  'frontend/src/app/placement-mou/page.tsx', 
  'frontend/src/app/placement-recruiters/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('import Marquee')) {
    // Add import right after use client or at the very beginning
    if (content.includes('"use client";')) {
      content = content.replace('"use client";', '"use client";\nimport Marquee from "@/components/Marquee";');
    } else {
      content = 'import Marquee from "@/components/Marquee";\n' + content;
    }
    fs.writeFileSync(f, content);
  }
});
