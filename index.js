'use strict';

const withRasterImages = require('./lib/raster-images');
const withPlayback = require('./lib/playback');
const withFonts = require('./lib/fonts');
const withSVG = require('./lib/svg');
const with3D = require('./lib/3d');
const withJSON5 = require('./lib/json5');

module.exports = { withRasterImages, withPlayback, withFonts, withSVG, with3D, withJSON5 };
