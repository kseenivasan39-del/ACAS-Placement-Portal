const fs = require('fs');
const path = require('path');
const https = require('https');

let content = fs.readFileSync('src/app/placement-mou/data.ts', 'utf8');
const match = content.match(/export const mouCompanies = (\[[\s\S]*?\]);/);
const companies = eval(match[1]);
const mouDir = path.join('public', 'mou');

async function getDomain(companyName) {
  return new Promise((resolve) => {
    const query = encodeURIComponent(companyName + ' official website');
    const url = `https://html.duckduckgo.com/html/?q=${query}`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const urlMatch = data.match(/class="result__url"[^>]*>([^<]+)<\/a>/);
        if (urlMatch && urlMatch[1]) {
          let domain = urlMatch[1].trim();
          domain = domain.split('/')[0];
          domain = domain.replace(/<\/?b>/g, '').trim();
          resolve(domain);
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadLogo(domain, destPath) {
  return new Promise((resolve) => {
    const url = `https://logo.clearbit.com/${domain}?size=200`;
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(true));
        });
      } else {
        res.resume();
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function run() {
  let downloadedCount = 0;
  for (let company of companies) {
    const targetImageName = company.image.replace('/mou/', '');
    const targetImagePath = path.join(mouDir, targetImageName);
    
    if (fs.existsSync(targetImagePath)) {
      const header = fs.readFileSync(targetImagePath, { encoding: 'utf8', flag: 'r' }).substring(0, 4);
      if (header !== '<svg') {
        continue;
      }
    }
    
    console.log(`Searching for: ${company.name}`);
    const domain = await getDomain(company.name);
    if (domain) {
      console.log(`Found domain: ${domain}, downloading logo...`);
      const success = await downloadLogo(domain, targetImagePath);
      if (success) {
        console.log(`Successfully downloaded logo for ${company.name}`);
        downloadedCount++;
      } else {
        console.log(`Clearbit failed for ${company.name}`);
      }
    } else {
      console.log(`No domain found for ${company.name}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log(`Finished downloading ${downloadedCount} logos.`);
}

run();
