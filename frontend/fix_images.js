const fs = require('fs');

let content = fs.readFileSync('src/app/placement-recruiters/data.ts', 'utf8');

// evaluate the topRecruiters array
const match = content.match(/export const topRecruiters = (\[[\s\S]*?\]);/);
if (!match) {
  console.log('Could not parse data.ts');
  process.exit(1);
}

const topRecruiters = eval(match[1]);

for (const rec of topRecruiters) {
  const baseName = rec.name.replace(/[^a-zA-Z0-9]/g, '_');
  const pngPath = 'public/recruiters/' + baseName + '.png';
  const svgPath = 'public/recruiters/' + baseName + '.svg';
  
  if (fs.existsSync(pngPath)) {
    const stats = fs.statSync(pngPath);
    if (stats.size > 500) {
      rec.image = '/recruiters/' + baseName + '.png';
      continue;
    } else {
      fs.unlinkSync(pngPath); // remove broken image
    }
  }
  
  // Generate SVG fallback
  const initials = rec.name.split(/[\s-]/).map(w => w[0]).filter(c => c && /[a-zA-Z]/.test(c)).slice(0, 2).join('').toUpperCase() || rec.name.substring(0,2).toUpperCase();
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f0f2f5" rx="16" />
    <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#293d6b" font-family="sans-serif" font-size="48" font-weight="bold">${initials}</text>
  </svg>`;
  
  fs.writeFileSync(svgPath, svg);
  rec.image = '/recruiters/' + baseName + '.svg';
}

const newContent = 'export const topRecruiters = ' + JSON.stringify(topRecruiters, null, 2) + ';';
fs.writeFileSync('src/app/placement-recruiters/data.ts', newContent);
console.log('Fixed data.ts and generated SVGs');
