require('@babel/register')({
  presets: [['env', { targets: { node: 'current' } }]],
  ignore: ['node_modules']
});
