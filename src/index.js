const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const nodeExpress = require('./configs/nodeExpress');

const existingConfig = fs.existsSync('now.json');

function buildConfig() {
    let config = {
        version: 2, 
    };

  inquirer
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
          'lambda',
          'static-build',
          'react',
          'three',
        ],
      },
    ])
    .then((answers) => {
      config.name = answers.name;
      switch(answers.type) {
          case 'node-express':
            config = nodeExpress(config);
            break;
      }
      console.log(config);
    });
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
