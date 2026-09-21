const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const doc = new PDFDocument({ margin: 50 });

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('./public/Placement_Training_Schedule_2021-2022.pdf'));

// Add text
doc.font('Helvetica-Bold')
   .fontSize(16)
   .text('Dr. Sivanthi Aditanar College of Engineering', { align: 'center' })
   .moveDown(0.5);

doc.fontSize(14)
   .text('Tiruchendur', { align: 'center' })
   .moveDown(1);

doc.fontSize(14)
   .text('Details of Placement Training - 2021 - 2022', { align: 'center' })
   .moveDown(2);

doc.font('Helvetica')
   .fontSize(11);

const tableData = [
  ['1', '08.11.2021 to 12.11.2021', 'Placement Training to all 2nd year, 3rd year and Final year Students by FACE Prep'],
  ['2', '16.06.2021', 'Placement Training for TCS'],
  ['3', '25.06.2021', 'Placement Training for ZOHO'],
  ['4', '02.07.2021', 'Placement Training for Mistral'],
  ['5', '25.07.2021', 'Placement Training for SAN Media'],
  ['6', '03.08.2021', 'Placement Training for L&T'],
  ['7', '10.08.2021', 'Placement Training for AVA Soft'],
  ['8', '29.09.2021', 'Placement Training for SOFT SQUARE'],
  ['9', '05.10.2021', 'Placement Training for ATOS'],
  ['10', '15.10.2021', 'Placement Training for Chainsys'],
  ['11', '21.10.2021', 'Placement Training for Zoifintech'],
  ['12', '26.10.2021', 'Placement Training for WIPRO'],
  ['13', '29.10.2021', 'Placement Training for J MAN Group'],
  ['14', '04.11.2021', 'Placement Training for CTS'],
  ['15', '08.11.2021', 'Placement Training for Right / River Chain'],
  ['16', '11.11.2021', 'Placement Training for Mind Tree'],
  ['17', '04.01.2022', 'Placement Training for Infosys'],
  ['18', '07.01.2022', 'Placement Training for Perfect Surveyor'],
  ['19', '02.02.2022', 'Placement Training for Techgenzie'],
  ['20', '10.02.2022', 'Placement Training for ZUCI System'],
];

// Draw Table Header
const startX = 50;
let currentY = doc.y;

doc.font('Helvetica-Bold');
doc.rect(startX, currentY, 50, 30).stroke();
doc.text('S. No', startX + 10, currentY + 10, { width: 30, align: 'center' });

doc.rect(startX + 50, currentY, 100, 30).stroke();
doc.text('Date', startX + 50, currentY + 10, { width: 100, align: 'center' });

doc.rect(startX + 150, currentY, 350, 30).stroke();
doc.text('Training Activity', startX + 150, currentY + 10, { width: 350, align: 'center' });

currentY += 30;
doc.font('Helvetica');

// Draw rows
for (const row of tableData) {
    let rowHeight = 30;
    if (row[2].length > 60) rowHeight = 45; // slightly taller for long text
    
    // Check page overflow
    if (currentY + rowHeight > doc.page.height - 50) {
        doc.addPage();
        currentY = 50;
    }

    doc.rect(startX, currentY, 50, rowHeight).stroke();
    doc.text(row[0], startX, currentY + 10, { width: 50, align: 'center' });
    
    doc.rect(startX + 50, currentY, 100, rowHeight).stroke();
    doc.text(row[1], startX + 50, currentY + 10, { width: 100, align: 'center' });
    
    doc.rect(startX + 150, currentY, 350, rowHeight).stroke();
    doc.text(row[2], startX + 160, currentY + 10, { width: 330, align: 'left' });
    
    currentY += rowHeight;
}

// Finalize PDF file
doc.end();
