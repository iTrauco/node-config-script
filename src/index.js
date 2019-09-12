const fs = require('fs');
const  inquirer = require('inquirer');

const existingConfig = fs.existsSync('now.json');

function buildConfig() {
    inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'overwrite',
            message: '\'now.json\' already exists! Do you want to overwrite the existing file?',
            default: false
        }
    ])
    .then(answers => {
        if(answers.overwrite) {
            buildConfig();
        } else {
            console.log('Goodbye...');
        }
    });
}

if (existingConfig) {
    inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'overwrite',
            message: '\'now.json\' already exists! Do you want to overwrite the existing file?',
            default: false
        }
    ])
    .then(answers => {
        if(answers.overwrite) {
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