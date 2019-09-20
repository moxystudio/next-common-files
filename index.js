/* eslint-disable prefer-import/prefer-import-over-require */

const withRasterImages = require('./plugins/raster-images');
const withPlayback = require('./plugins/playback');
const withSVG = require('./plugins/svg');

module.exports = { withRasterImages, withPlayback, withSVG };
