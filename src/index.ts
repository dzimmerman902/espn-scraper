import { readdirSync } from 'fs-extra';
import inquirer from 'inquirer';
import globImport from 'glob';
import util from 'util';

(async () => {
    const glob = util.promisify(globImport);

    const integrations = await readdirSync('./integrations', {
        withFileTypes: true
    })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    const integrationChoice = await inquirer.prompt([
        {
            name: 'integration',
            type: 'list',
            choices: integrations,
            message: 'Select Integration'
        }
    ]);

    const integration: {
        options: object[{
            name: string;
            type: 'list';
            message: 'Select Sport';
            choices: ['Basketball'];
        }];
    } = {};

    ['options'].forEach((fileName) => {
        integration[
            fileName
        ] = require(`./integrations/${integrationChoice}/${fileName}`);
    });
})();
