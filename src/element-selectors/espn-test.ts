// 1. Find base espn url to use
// 2. Create an array of IDs to scan through
// 3. Make request using base url and ids
// 4. Retrieve html response from axios.
// 5. Load into cheerio.
// 6. Need to figure out what fields can be pulled from the html.
// 7. Grab the require data from the fields.
// 8. Need to transform values according to sport.
// 9. Pass into write field to save into database.
import puppeteer from 'puppeteer';
import fs from 'fs-extra';

import { eFirstName, eLastName, eHeightWeight } from './element-selectors';

(async () => {
    try {
        const baseURL = 'https://www.espn.com/nba/player/_/id';
        const playerEspnId = '4277905';

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${baseURL}/${playerEspnId}`);

        const basketBallPlayer = {
            firstName: '',
            lastName: '',
            heightWeight: ''
        };

        console.log(eFirstName);

        const selectedFirstName = await page.$(eFirstName);

        const selectedLastName = await page.$(eLastName);

        const selectedHeightWeight = await page.$(eHeightWeight);

        const pFirstName = await page.evaluate(
            (element) => element.textContent,
            selectedFirstName
        );

        const pLastName = await page.evaluate(
            (element) => element.textContent,
            selectedLastName
        );

        const pHeightWeight = await page.evaluate(
            (element) => element.textContent,
            selectedHeightWeight
        );

        basketBallPlayer.firstName = pFirstName;
        basketBallPlayer.lastName = pLastName;
        basketBallPlayer.heightWeight = pHeightWeight;

        await page.screenshot({ path: 'example.png' });

        await fs.writeFile(
            './stats.json',
            JSON.stringify(basketBallPlayer, null, 4)
        );
    } catch (err) {
        console.log(err);
    }
})();
