import puppeteer from 'puppeteer';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { ChartNoAxesColumnDecreasing } from 'lucide-svelte';

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
    const captchaBuffer = await captchaElement.screenshot({ encoding: 'base64' });

    console.log('Got Screenshot!');
    console.log(`data:image/png;base64,${captchaBuffer.toString('base64')}`);

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: 'You are a vision assistant that helps in extracting captchas and nothing else.'
            },
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: 'From this image, just give me the captcha. Nothing else. No fluff. Just return the captcha.'
                    },
                    {
                        type: 'image_url',
                        image_url: {
                            url: `data:image/png;base64,${captchaBuffer.toString('base64')}`
                        }
                    }
                ]
            }
        ]
    });
    console.log('Got Response!');
    const captchaText = response.choices[0].message.content.trim();
    console.log('Captcha:', captchaText);
    return captchaText || '';
}

export async function POST({ request }) {
    const { consumerNumber, ebRegNumber, captcha } = await request.json();
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        args: [
            '--ignore-certificate-errors',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--allow-running-insecure-content'
        ]
    });
    const page = await browser.newPage();
    await page.setBypassCSP(true);

    await page.setDefaultNavigationTimeout(60000); // Increase timeout to 60 seconds

    await page.setExtraHTTPHeaders({
        'Upgrade-Insecure-Requests': '1'
    });

    const context = browser.defaultBrowserContext();
    // await context.overridePermissions('https://www.tnebltd.gov.in', ['notifications']);

    try {
        const details = splitNumber(consumerNumber);
        const url = `http://tneb.tnebnet.org/newlt/detconws.php?rsno=${details.rsno}&reg=${details.reg}&sec=${details.sec}&dist=${details.dist}&serno=${details.serno}`;

        // await page.goto('https://www.tnebltd.gov.in/BillStatus/billstatus.xhtml', {
        await page.goto(url, {
            waitUntil: 'domcontentloaded' // Ensures the page fully loads
        });

        console.log('Loaded website!');

        // const newCaptcha = await getCaptcha(page);

        // await page.type('#serviceno', consumerNumber);
        // await page.type('#mob', ebRegNumber);
        // await page.type('#cap', newCaptcha || '111111');

        // await page.click('#submit3');

        // console.log('Clicked!');
        // await page.waitForNavigation({ waitUntil: 'networkidle2' });
        // console.log('New Page URL:', page.url());

        await sleep(5000);
        console.log('Loaded website 2!');

        try {

            const xp = '::-p-xpath(/html/body/div/table[1])';

            await page.waitForSelector(xp, {
                timeout: 30000,
                visible: true
            });

            console.log('Table found!');

            const tables = await page.$$('table.ccbills');
            const targetTable = tables[1];




            // const rows = await page.evaluate(table => {
            //     return Array.from(
            //         table.querySelectorAll('tr[bgcolor="#FFFFFF"], tr[bgcolor="#fff6cc"]')
            //     ).map(row => row.innerText.trim());  // Extract text content
            // }, targetTable);

            // console.log('Rows:', rows[0]);



            const data = await page.evaluate(table => {
                return Array.from(
                    table.querySelectorAll('tr[bgcolor="#FFFFFF"], tr[bgcolor="#fff6cc"]')
                ).map(row => {
                    const cells = row.querySelectorAll('td'); // Select all <td> elements in the row
                    return {
                        assessmentDate: cells[0]?.innerText.trim() || '',
                        consumptionUnits: cells[7]?.innerText.trim() || '',
                        totalCharges: cells[14]?.innerText.trim() || ''
                    };
                });
            }, targetTable);
            

            console.log('Data:', data[0]);

        } catch (error) {
            console.error('Error:', error);
        }
        

        const response = new Response(JSON.stringify(data), { status: 200 });

        return response;
        console.log('Closing browser...');
        await browser.close();  // Close browser after preparing response
    

    } 
    
    catch (error) {
        await browser.close();
        return new Response(JSON.stringify({ error: 'Failed to fetch bill details' }), { status: 500 });
    }
}
