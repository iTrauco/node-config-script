const inquirer = require('inquirer');
// const packageJSON = require('');


const baseConfig = {
    builds: [
      {
        src: 'src/index.js',
        use: '@now/node-server',
      },
    ],
    routes: [
      { src: '/.*', dest: 'src/index.js' },
    ],
  };
  
async function nodeExpress (config) {
  let mainFile = 'src/index.js';
  try {
    // eslint-disable-next-line
    const packageJSON = require(process.cwd() + './package.json');
    main = packageJSON.main;
  } catch (error) {}
  const answers = await inquirer
    .prompt([
      {
        type: 'text',
        name: 'main',
        message: 'What is the PATH to the express entry point?',
        default: mainFile,
      },
    ]);
    // console.log(answers);
    baseConfig.builds[0].src = answers.main;
    baseConfig.routes[0].dest = answers.main;
    return {
        ...config,
        ...baseConfig,
    };
}

module.exports = nodeExpress;