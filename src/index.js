const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const existingConfig = fs.existsSync('now.json');

function buildConfig() {
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
      console.log(answers);
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

// inquirer
//   .prompt([
//     {
//         type: 'confirm',
//         name: 'isRobot',
//         message: 'Are you a robot?',
//         default: false
//       },
//   ])
//   .then(answers => {
//     console.log(answers);
//   });
