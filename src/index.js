const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const nodeExpress = require('./configs/nodeExpress');
const staticConfig = require('./configs/staticConfig');
const fef = require('./configs/fef');

const existingConfig = fs.existsSync('now.json');

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
          'lambda',
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
    console.log(config);
}

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: '\'now.json\' already exists! Do you want to overwrite the existing file?',
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
