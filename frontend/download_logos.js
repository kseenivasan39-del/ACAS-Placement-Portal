const fs = require('fs');
const https = require('https');

const topRecruiters = [
  { name: "Infosys", domain: "infosys.com" },
  { name: "TATA Consultancy services", domain: "tcs.com" },
  { name: "IBM", domain: "ibm.com" },
  { name: "ZOHO Corporation Pvt Ltd.-Chennai", domain: "zoho.com" },
  { name: "HCL Bserv-Chennai", domain: "hcltech.com" },
  { name: "Cognizant Technology Solutions", domain: "cognizant.com" },
  { name: "L&T Infotech-Chennai", domain: "lntinfotech.com" },
  { name: "CSS Corp-Chennai", domain: "csscorp.com" },
  { name: "Dalmia cement Bharat Ltd.- Chennai", domain: "dalmiacement.com" },
  { name: "ICICI - Bank", domain: "icicibank.com" },
  { name: "Tech Mahindra", domain: "techmahindra.com" },
  { name: "Infoview Technologies Pvt Ltd -Chennai", domain: "ivtlinfoview.com" },
  { name: "Pest Control India Pvt Ltd", domain: "pestcontrolindia.com" },
  { name: "Rane Sterring systems Ltd , Chennai", domain: "ranegroup.com" },
  { name: "TMB Bank", domain: "tmb.in" },
  { name: "Sutherland Global services Private Limited, Chennai", domain: "sutherlandglobal.com" },
  { name: "Boston IT Services-Chennai", domain: "bostonit.com" },
  { name: "Chainsys-Chennai", domain: "chainsys.com" },
  { name: "Coastal Energen Pvt.Ltd.- Tuticorin", domain: "coastalenergen.com" },
  { name: "Cogzidel Technologies-Madurai", domain: "cogzidel.com" },
  { name: "Cruiseline ship Management", domain: "cruiseline.com" },
  { name: "Deccan Construction Company", domain: "deccan.com" },
  { name: "Dharangadhara Chemical works Ltd,Sahupuram", domain: "dcwltd.com" },
  { name: "E4E Chennai", domain: "e4e.com" },
  { name: "Electronics corporation of India Ltd-Chennai", domain: "ecil.co.in" },
  { name: "EP software solutions-Coimbatore", domain: "epsoft.com" },
  { name: "Godb Tech Pvt Ltd-Chennai", domain: "godbtech.com" },
  { name: "Interpress Private Ltd,Chennai", domain: "interpress.com" },
  { name: "Inventsoft Solutions - Chennai", domain: "inventsoft.com" },
  { name: "Jiji technologies -Tirunelveli", domain: "jijitechnologies.com" },
  { name: "Jilaba Software Solutions - Chennai", domain: "jilaba.com" },
  { name: "Kani Velachery today", domain: "kanivelachery.com" },
  { name: "L-Cube Innovative -Chennai", domain: "lcube.com" },
  { name: "Mabani Steel- UAE", domain: "mabanisteel.com" },
  { name: "Meltronics Systemteck Ltd.-Bangalore.", domain: "meltronics.com" },
  { name: "Micro Genesis (IBM), Chennai", domain: "microgenesis.com" },
  { name: "Mistral Solutions, Bangalore.", domain: "mistralsolutions.com" },
  { name: "Mobius knowledge Services", domain: "mobiusservices.com" },
  { name: "New Technology-Coimbatore", domain: "newtech.com" },
  { name: "NI drive-Tokyo", domain: "nidrive.com" },
  { name: "Q spiders-Bangalore", domain: "qspiders.com" },
  { name: "Sanmina corporation – Chennai", domain: "sanmina.com" },
  { name: "Shriram Transport Finance Company Ltd, Chennai", domain: "stfc.in" },
  { name: "Smackcoders", domain: "smackcoders.com" },
  { name: "Softsquare Solutions – Chennai", domain: "softsquare.com" },
  { name: "Southern Scientific Instruments, Chennai", domain: "southernscientific.com" },
  { name: "Sri Bakgiyam Engineering Corporation – Coimbatore", domain: "sribakgiyam.com" },
  { name: "Sure Soft systems Pvt Ltd-Pondicherry", domain: "suresoftsystems.com" },
  { name: "Tarento Techniologies – Bangalore", domain: "tarento.com" },
  { name: "Tessolve semiconductor – Bangalore", domain: "tessolve.com" },
  { name: "Tezzle Telematics – Chennai", domain: "tezzle.com" },
  { name: "Uniq Technologies- Chennai", domain: "uniqtechnologies.co.in" },
  { name: "Vi Microsystems Private Limited- Chennai", domain: "vimicrosystems.com" },
  { name: "Windcare india (P) Ltd – Coimbatore", domain: "windcareindia.com" },
  { name: "Zetek castings Private Limited- Chennai", domain: "zetek.com" },
  { name: "Zoi fintech – Tirunelveli", domain: "zoifintech.com" }
];

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
        file.close(resolve);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function run() {
  for (const rec of topRecruiters) {
    const filename = rec.name.replace(/[^a-zA-Z0-9]/g, '_') + '.png';
    const dest = 'public/recruiters/' + filename;
    
    try {
      console.log('Downloading ' + rec.name + ' from clearbit...');
      await download('https://logo.clearbit.com/' + rec.domain, dest);
    } catch (e) {
      console.log('Clearbit failed for ' + rec.name + '... trying google favicon');
      try {
        await download('https://www.google.com/s2/favicons?domain=' + rec.domain + '&sz=128', dest);
      } catch (e2) {
        console.log('Both failed for ' + rec.name);
      }
    }
  }
}

run();
