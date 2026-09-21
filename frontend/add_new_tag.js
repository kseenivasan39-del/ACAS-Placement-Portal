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
    
    // We want to add the NEW tag before the Placement Training Schedule link
    const searchStr = `<a href="/Placement_Training_Schedule_2021-2022.pdf" target="_blank" rel="noopener noreferrer" className="mr-8 text-blue-500 underline cursor-pointer">`;
    const replaceStr = `<span className="text-red-600 px-2 font-bold border border-red-600 rounded mr-2 text-xs">NEW</span>
            <a href="/Placement_Training_Schedule_2021-2022.pdf" target="_blank" rel="noopener noreferrer" className="mr-8 text-blue-500 underline cursor-pointer">`;
    
    if (content.includes(searchStr) && !content.includes(replaceStr)) {
       content = content.replace(searchStr, replaceStr);
       fs.writeFileSync(file, content, 'utf8');
       console.log('Updated marquee in', file);
    }
  }
});
