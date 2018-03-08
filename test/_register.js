require('@babel/register')({
  presets: [['env', { targets: { node: 'current' } }]],
  ignore: ['test/*', 'node_modules'],
  plugins: [['transform-react-jsx', { pragma: 'h' }]]
});
