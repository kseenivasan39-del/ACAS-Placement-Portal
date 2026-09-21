const fs = require('fs');
const https = require('https');

let content = fs.readFileSync('src/app/placement-recruiters/data.ts', 'utf8');
const match = content.match(/export const topRecruiters = (\[[\s\S]*?\]);/);
const topRecruiters = eval(match[1]);

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
         return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error('Status: ' + response.statusCode));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(response.headers['content-length'] || 1000);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function run() {
  for (const rec of topRecruiters) {
    if (!rec.image.endsWith('.svg')) continue; // Skip if we already have a png
    
    const baseName = rec.name.replace(/[^a-zA-Z0-9]/g, '_');
    const pngPath = 'public/recruiters/' + baseName + '.png';
    
    try {
      // Try duckduckgo
      console.log('Fetching duckduckgo for ' + rec.name);
      await download('https://icons.duckduckgo.com/ip3/' + rec.domain + '.ico', pngPath);
      
      const stats = fs.statSync(pngPath);
      if (stats.size > 500) {
         rec.image = '/recruiters/' + baseName + '.png';
         console.log('Success duckduckgo');
         continue;
      } else {
         fs.unlinkSync(pngPath);
      }
    } catch(e) {}
    
    try {
      // Try google
      console.log('Fetching google for ' + rec.name);
      await download('https://s2.googleusercontent.com/s2/favicons?domain=' + rec.domain + '&sz=128', pngPath);
      const stats = fs.statSync(pngPath);
      if (stats.size > 500) {
         rec.image = '/recruiters/' + baseName + '.png';
         console.log('Success google');
         continue;
      } else {
         fs.unlinkSync(pngPath);
      }
    } catch(e) {}
  }
  const newContent = 'export const topRecruiters = ' + JSON.stringify(topRecruiters, null, 2) + ';';
  fs.writeFileSync('src/app/placement-recruiters/data.ts', newContent);
}

run();
