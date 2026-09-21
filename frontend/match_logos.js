const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('src/app/placement-mou/data.ts', 'utf8');
const match = content.match(/export const mouCompanies = (\[[\s\S]*?\]);/);
const companies = eval(match[1]);

const recruitersDir = path.join('public', 'recruiters');
const mouDir = path.join('public', 'mou');
const recruiterFiles = fs.readdirSync(recruitersDir).filter(f => !f.endsWith('.svg'));

function strictMatch(mouName, recFileName) {
  const mouWords = mouName.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(' ').filter(w => w.length > 2);
  const recWords = recFileName.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(' ').filter(w => w.length > 2);
  
  if (mouWords.length === 0 || recWords.length === 0) return false;
  
  const generic = ['chennai', 'limited', 'private', 'technologies', 'solutions', 'pvt', 'ltd', 'india', 'corporation', 'company', 'services'];
  
  // The first TWO significant words must match
  const significant = mouWords.filter(w => !generic.includes(w));
  if (significant.length === 0) return false;
  
  const w1 = significant[0];
  const w2 = significant.length > 1 ? significant[1] : null;

  if (w2) {
    return recWords.includes(w1) && recWords.includes(w2);
  } else {
    return recWords.includes(w1);
  }
}

let copiedCount = 0;
companies.forEach(company => {
  const targetImageName = company.image.replace('/mou/', '');
  const targetImagePath = path.join(mouDir, targetImageName);
  
  for (let file of recruiterFiles) {
    if (strictMatch(company.name, file)) {
      const sourcePath = path.join(recruitersDir, file);
      fs.copyFileSync(sourcePath, targetImagePath);
      console.log(`Matched '${company.name}' with '${file}' and copied to ${targetImageName}`);
      copiedCount++;
      break;
    }
  }
});
console.log(`Copied ${copiedCount} logos from recruiters.`);
