/* eslint-disable prefer-import/prefer-import-over-require */

const withRasterImages = require('./plugins/raster-images/raster-images');
const withPlayback = require('./plugins/playback/playback');
const withSVG = require('./plugins/svg/svg');

module.exports = { withRasterImages, withPlayback, withSVG };
