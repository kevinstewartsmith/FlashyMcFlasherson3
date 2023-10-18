const puppeteer = require('puppeteer');

async function generatePDF(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);
  const pdfBuffer = await page.pdf();

  await browser.close();
  return pdfBuffer;
}

module.exports = generatePDF;
