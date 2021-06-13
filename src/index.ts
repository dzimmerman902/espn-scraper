// 1. Find base espn url to use
// 2. Create an array of IDs to scan through
// 3. Make request using base url and ids
// 4. Retrieve html response from axios.
// 5. Load into cheerio.
// 6. Need to figure out what fields can be pulled from the html.
// 7. Grab the require data from the fields.
// 8. Need to transform values according to sport.
// 9. Pass into write field to save into database.

(async () => {
    const baseURL = 'https://www.espn.com/nba/player/_/id';
    const playerEspnId = '4277905';
})();
