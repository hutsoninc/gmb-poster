require('dotenv').config();
const puppeteer = require('puppeteer');
const locations = require('./data/config');

const options = {
    url: 'https://accounts.google.com/signin/v2/identifier',
    postsUrlPrepend: 'https://business.google.com/u/1/posts/l/'
};

async function createPost(postData) {

    let { postType, postPhoto, postSummary, postButton, postButtonLink } = postData;

    const buttonOptions = [
        'BOOK',
        'ORDER',
        'SHOP',
        'LEARN_MORE',
        'SIGN_UP',
        'GET_OFFER',
        'CALL',
    ];

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();

    try {

        await page.goto(options.url);

        await page.waitForSelector('#identifierId');
        await page.type('#identifierId', process.env.GOOGLE_EMAIL);
        await page.click('#identifierNext');

        await page.waitForSelector('input[name="password"]');
        await page.waitFor(2000);
        await page.type('input[name="password"]', process.env.GOOGLE_PASSWORD);
        await page.click('#passwordNext');

        await page.waitFor(2000);

        for(let i = 0; i < locations.length; i++) {

            await page.goto(`${options.postsUrlPrepend}${locations[i].id}`);
            await page.waitFor(500);
    
            await page.waitForSelector('div[aria-label="Create Post"]');
            await page.waitFor(2000);
            await page.click('div[aria-label="Create Post"]');
            await page.waitFor(500);
    
            await page.waitForSelector('textarea[aria-label="Post summary"]');
            await page.type('textarea[aria-label="Post summary"]', postSummary);
    
            await page.waitFor(2000);
    
            // Upload photo
            if(postPhoto) {
                const elementHandle = await page.$('input[type="file"]');
                elementHandle.uploadFile(postPhoto);
                await page.waitFor(10000);
                await page.waitFor(5000);
            }
    
            // Add a button
            if (postButton) {
                await page.click('div[aria-label="Add a button (optional)"]');
                await page.waitFor(3000);
                for(let i = 0; i < buttonOptions.findIndex(text => text === postButton) + 1; i++) {
                    await page.keyboard.press('ArrowDown');
                    await page.waitFor(250);
                }
                await page.waitFor(2000);
                await page.keyboard.press('Enter');
                await page.waitFor(2000);
    
                if (postButtonLink) {
                    await page.type('input[aria-label="Text input area where you can input a URL for the action."]', postButtonLink);
                }
            }
            
            // Preview post
            await page.waitFor(2000);
            await page.click('#tJiF1e');
            await page.waitFor(2000);
    
            // Publish
            await page.click('#RgZmSc');
            await page.waitFor(2000);

            console.log(`Processed ${locations[i].name} ${locations[i].id}`);
        }

    } catch (error) {
        console.log(error);
        browser.close();
    }

}

module.exports = createPost;