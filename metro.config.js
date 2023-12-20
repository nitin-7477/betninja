
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);







// const { getDefaultConfig } = require('metro-config');

// module.exports = (async () => {
//   const { resolver: { sourceExts } } = await getDefaultConfig();
//   return {
//     resolver: {
//       sourceExts: [...sourceExts, 'jsx', 'web.js', 'js', 'json'],
//     },
//   };
// })();