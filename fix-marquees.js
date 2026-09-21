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
  content = content.replace(/<marquee/g, '<Marquee').replace(/<\/marquee/g, '</Marquee');
  if (!content.includes('import Marquee')) {
    content = content.replace('import Image from "next/image";', 'import Image from "next/image";\nimport Marquee from "@/components/Marquee";');
  }
  fs.writeFileSync(f, content);
});
