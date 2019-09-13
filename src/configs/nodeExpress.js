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
  let main = 'src/index.js';
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
        default: main,
      },
    ]);
    console.log(answers);

    return {
        ...config,
        ...baseConfig,
    };
}

module.exports = nodeExpress;