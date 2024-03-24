import puppeteer from 'puppeteer';
export async function scrape(links) {
    const extractedLinks = [];

    for (const link of links) {
        try {
            const browser = await puppeteer.launch();
            //await new Promise(resolve => setTimeout(resolve, 1000));
            const page = await browser.newPage();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await page.goto(link.link);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const text = await page.evaluate(() => {
                return document.body.innerText;
            });
            extractedLinks.push({ text: text });
            await browser.close();
        } catch (error) {
            console.error(`Error fetching link: ${error.message}`);
        }
    }

    return extractedLinks;
}