module.exports = {
  presets: [
    ['module:@react-native/babel-preset', { requireConfigFile: false }],
    ['@babel/preset-env', { requireConfigFile: false }]
  ],
  plugins: [
    'react-native-reanimated/plugin', 
  ],
  babelrcRoots: ['.'],
};
