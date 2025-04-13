// https://www.tnebltd.gov.in/usrp/applyncfa.xhtml

// import puppeteer from 'puppeteer-core';
import puppeteer from 'puppeteer';
import OpenAI from 'openai';
import chromium from "@sparticuz/chromium";

// import { OPENAI_API_KEY } from '$env/dynamic/private';
import { env } from '$env/dynamic/private'; 

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
    const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

    const captchaElement = await page.$('#nscapp\\:imgCaptchaId');
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
    const captchaText = await response.choices[0].message.content.trim();
    console.log('Captcha:', captchaText);
    return captchaText || '';
}

async function repeatDetails(page, consumerNumber, newCaptcha) {

    await page.waitForSelector('#nscapp\\:acno', { visible: true });
    await page.type('#nscapp\\:acno', consumerNumber);
    console.log('Typed Consumer Number!');  

    // Wait for the email input to be available
    await page.waitForSelector('#nscapp\\:j_idt15', { visible: true });
    await page.type('#nscapp\\:j_idt15', "jhaclashroyale@gmail.com");
    console.log('Typed Email!');

    // Wait for the captcha input to be available
    await page.waitForSelector('#nscapp\\:imgCaptchaId', { visible: true });
    await page.type('#nscapp\\:imgCaptchaId', newCaptcha || '111111');
    console.log('Typed Captcha!');

    await page.keyboard.press('Enter');
    console.log('Pressed Enter!');

}

export async function POST({ request }) {
    const { consumerNumber, ebRegNumber, captcha } = await request.json();
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    // const browser = await puppeteer.launch({
    //     args: [
    //         ...chromium.args,
    //         "--ignore-certificate-errors",
    //         "--no-sandbox",
    //         "--disable-setuid-sandbox",
    //         "--disable-web-security",
    //         "--allow-running-insecure-content"
    //     ],
    //     executablePath: await chromium.executablePath(),
    //     headless: chromium.headless,
    //     ignoreHTTPSErrors: true
    // });

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
    await page.setDefaultNavigationTimeout(10000); // Increase timeout to 60 seconds
    await page.setExtraHTTPHeaders({
        'Upgrade-Insecure-Requests': '1'
    });

    const context = browser.defaultBrowserContext();

    let tempData = [];

    try {
        await page.goto('https://www.tnebltd.gov.in/usrp/applyncfa.xhtml', {
            // waitUntil: 'networkidle2' // Ensures the page fully loads
            waitUntil: 'domcontentloaded' // Ensures the page fully loads
        });
        await sleep(500);

        console.log('Loaded website!');
        
        const element1 = await page.$('#nscapp\\:imgCaptchaId');  
        if (element1) {
            let newCaptcha1 = await getCaptcha(page);
            console.log('Got Captcha!');
            await repeatDetails(page, consumerNumber, newCaptcha1);
            console.log('Repeated Details Once!');
        }

        const element2 = await page.$('#nscapp\\:imgCaptchaId');  
        if (element2) {
            let newCaptcha2 = await getCaptcha(page);
            console.log('Got Captcha!');
            await repeatDetails(page, consumerNumber, newCaptcha2);
            console.log('Repeated Details Twice!');
        }

        await sleep(5000);

        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('New Page URL:', page.url());

        if (page.url().includes('chrome-error')) {
            await page.click('#proceed-button');
            console.log('Clicked Proceed!');
        }

        await sleep(2000);
        console.log('Loaded website 2!');

        try {
            console.log('Loaded website 3!');

            
            const xp = '::-p-xpath(/html/body/section[2]/div/div/form/div[2]/div[2]/div[2]/div/input[2])';

            await page.waitForSelector(xp, {
                timeout: 30000,
                visible: true
            });
            
            const inputValue = await page.evaluate(() => {
                return document.querySelector('#nscapp\\:j_idt15').value;
            });

            console.log("FINAL");
            console.log(inputValue);

            await sleep(5000);


        } catch (error) {
            console.error('Error:', error);
        }
        

        const response = new Response(JSON.stringify({ data: data }), { status: 200 });
        await browser.close();
        return response;
    
    } 
    
    catch (error) {
        console.error('Error:', error);
        // await browser.close();
        return new Response(JSON.stringify({ data: tempData }), { status: 500 });
    }
}
