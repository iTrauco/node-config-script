#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const nodeExpress = require('./configs/nodeExpress');
const staticConfig = require('./configs/staticConfig');
const fef = require('./configs/fef');


const nowPath = path.join(process.cwd(), 'now.json');
const existingConfig = fs.existsSync(nowPath);

async function buildConfig() {
    let config = {
        version: 2, 
    };

  const answers = await inquirer
    .prompt([
      {
        type: 'text',
        name: 'name',
        message: 'What is the name of the project?',
        default: path.basename(process.cwd()),
      },
      {
        type: 'list',
        name: 'type',
        message: 'What type of project is this?',
        choices: [
          'node-express',
          'static',
          'react',
          'vue',
          'static-build',
        ],
      },
    ])
    config.name = answers.name;
    switch(answers.type) {
        case 'node-express':
          config = await nodeExpress(config);
          break;
        case 'static':
          config = await staticConfig(config);
          break;
        case 'react':
          config = await fef(config, 'build');
          break;
        case 'vue':
          config = await fef(config);
          break;
        case 'static-build':
          config = await fef(config);
          break;
        default: 
          break;
    }
    const moreAnswers = await inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'specifyAlias',
          message: 'Would you like to specify an alias?',
          default: true,
        },
        {
          type: 'text',
          name: 'alias',
          message: 'What is the alias? \n(Specify multiple separated by comas)',
          default: a => a.specifyAlias,
            // default: answers.name,
            // when: a => {
            //   console.log(a);
            //   return a.specifyAlias;
            // },
        },
        // {
        //   type: 'confirm',
        //   name: 'deploy',
        //   message: 'Would you like to deploy right now?',
        //   default: false,
        // }
      ]);
      config.alias = moreAnswers.alias ? moreAnswers.alias.split(',').map(a => a.trim()) : undefined;
      fs.writeFileSync(nowPath, JSON.stringify(config, null, 2), 'utf8');
      // if (moreAnswers.deploy) {
      //   console.log('All done! Type now to deploy...');      
      console.log('All done! Type \'now\' to deploy...')
      process.exit(0);
    }

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: '"now.json" already exists! Do you want to overwrite the existing file?',
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        console.log('Goodbye...');
      }
    });
} else {
  buildConfig();
}
