const fs = require('fs');
const path = require('path');
const { mouCompanies } = require('./src/app/placement-mou/data.ts'); // Wait, require won't work on TS easily, let's just parse it.

let content = fs.readFileSync('src/app/placement-mou/data.ts', 'utf8');
const match = content.match(/export const mouCompanies = (\[[\s\S]*?\]);/);
const companies = eval(match[1]);

const colors = [
  { bg: '#fee2e2', text: '#991b1b' }, // Red
  { bg: '#fef3c7', text: '#92400e' }, // Yellow
  { bg: '#dcfce7', text: '#166534' }, // Green
  { bg: '#dbeafe', text: '#1e40af' }, // Blue
  { bg: '#f3e8ff', text: '#6b21a8' }, // Purple
  { bg: '#fce7f3', text: '#9d174d' }, // Pink
  { bg: '#ffedd5', text: '#9a3412' }  // Orange
];

fs.mkdirSync('public/mou', { recursive: true });

companies.forEach((company, index) => {
  // Extract just the filename without path
  const imagePath = company.image.replace('/mou/', '');
  const fullPath = path.join('public', 'mou', imagePath);
  
  // Skip if file already exists
  if (fs.existsSync(fullPath)) {
    return;
  }

  // Get initials (first two letters)
  const words = company.name.split(' ');
  let initials = '';
  if (words.length >= 2) {
    initials = (words[0][0] + words[1][0]).toUpperCase();
  } else if (words[0].length >= 2) {
    initials = words[0].substring(0, 2).toUpperCase();
  } else {
    initials = words[0].toUpperCase();
  }
  
  initials = initials.replace(/[^A-Z]/g, '');
  if (!initials) initials = 'CO'; // Fallback

  const colorScheme = colors[index % colors.length];

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="${colorScheme.bg}" rx="100"/>
    <text x="100" y="100" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="${colorScheme.text}" text-anchor="middle" dominant-baseline="central">
      ${initials}
    </text>
  </svg>`;

  fs.writeFileSync(fullPath, svgContent);
  console.log('Created fallback for', company.name);
});
