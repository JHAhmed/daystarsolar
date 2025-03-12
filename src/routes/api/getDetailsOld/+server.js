import puppeteer from 'puppeteer';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

function splitNumber(num) {
    let str = num.toString().padStart(10, '0'); // Ensure it's 10 digits
    return {
        rsno: 1, // Hardcoded
        reg: str[1],
        sec: str.slice(2, 5),
        dist: str.slice(5, 8),
        serno: str.slice(8)
    };
}

async function getCaptcha(page) {
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    const captchaElement = await page.$('#imgCaptchaId'); 
    const captchaBuffer = await captchaElement.screenshot({encoding: 'base64'});

    console.log("Got Screenshot!")

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a vision assistant that helps in extracting captchas and nothing else." },
        {
          role: "user",
          content: [
            { type: "text", text: "From this image, just give me the captcha. Nothing else. No fluff. Just return the captcha." },
            {
              type: "image_url",
              image_url: {
                "url": `data:image/png;base64,${captchaBuffer.toString('base64')}`,
              },
            },
          ],
        },
      ],
    });
    console.log("Got Response!")
    const captchaText = response.choices[0].message.content.trim();
    console.log('Captcha:', captchaText);
    return captchaText || ''; 
}

export async function POST({ request }) {
    const { consumerNumber, ebRegNumber, captcha } = await request.json();

    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch({ headless: true, args: [ '--ignore-certificate-errors', '--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    await page.setBypassCSP(true);
    // await page.setRequestInterception(true);

    try {        
        // const details = splitNumber(consumerNumber);
        // const url = `http://tneb.tnebnet.org/newlt/detconws.php?rsno=${details.rsno}&reg=${details.reg}&sec=${details.sec}&dist=${details.dist}&serno=${details.serno}`;

        await page.goto('https://www.tnebltd.gov.in/BillStatus/billstatus.xhtml', {
        // await page.goto(url, {
            waitUntil: 'networkidle2' // Ensures the page fully loads
        });


        console.log("Loaded website!")

        const newCaptcha = await getCaptcha(page);

        console.log('Captcha', newCaptcha);
        console.log('Consumer Number:', consumerNumber);
        console.log('Phone Number:', ebRegNumber);

        await page.type('#serviceno', consumerNumber);
        await page.type('#mob', ebRegNumber);
        await page.type('#cap', newCaptcha || '111111'); 

        // await page.click('#submit3');

        try {
            await page.click('#submit3');
            await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 });
        } catch (error) {
            console.warn('Insecure navigation detected, retrying...');
            await page.reload({ waitUntil: 'networkidle2' }); 
        }

        console.log('Clicked!');
        // await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('New Page URL:', page.url());

        if (page.url() == "chrome-error://chromewebdata/") {
            await page.click('#proceed-button');
            await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
            console.log('New Page URL:', page.url());

        }

        // await page.waitForNavigation({ waitUntil: 'networkidle2' });
        // console.log('New Page URL:', page.url());

        // const billDetails = []

        // const billTable = await page.$x('/html/body/div/table[1]');
        const element = await page.waitForSelector('::-p-xpath(/html/body/div/table[1]/tbody)');
        // const data = await page.evaluate(() => element.querySelector('*').innerHTML);

        console.log('Bill Table:', data);


        // const billTable = await page.$x('');

        // Extract bill details
        const billDetails = await page.evaluate(() => {
            const rows = Array.from(billTable.querySelectorAll('tr[bgcolor="#FFFFFF"], tr[bgcolor="#fff6cc"]'));

            return rows.map(row => ({
                assessmentDate: row.children[0].innerText.trim(),  // Assessment Date
                consumptionUnits: row.children[7].innerText.trim(), // Consumption in Units
                totalCharges: row.children[14].innerText.trim()    // Total Charges
            }));
        });

        console.log('Bill Details:', billDetails);

        // await browser.close();
        return new Response(JSON.stringify(billDetails), { status: 200 });
    } catch (error) {
        // await browser.close();
        return new Response(JSON.stringify({ error: 'Failed to fetch bill details' }), { status: 500 });
    }
}
