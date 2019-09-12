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
  
function nodeExpress (config) {
    return {
        ...config,
        ...baseConfig,
    };
}

module.exports = nodeExpress;