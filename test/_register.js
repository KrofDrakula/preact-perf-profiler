require('@babel/register')({
  presets: [['env', { targets: { node: 'current' } }]],
  ignore: ['test/*', 'node_modules']
});
