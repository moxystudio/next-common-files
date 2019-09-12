# next-common-files

[travis-url]:https://travis-ci.org/moxystudio/next-common-files
[travis-image]:http://img.shields.io/travis/moxystudio/next-common-files/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/next-common-files
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/next-common-files/master.svg

Next.js plugins that insert loaders for common files.

Projects developed with Next.js have to manually insert rules in the configuration file for handling file types that are potentially very common across multiple projects.

These plugins quicken the initial setup of a project by removing that effort from the process, demanding less time from the developer.

## Installation
``` npm install --save-dev @moxy/next-common-files ```

## Usage
```js
// next.config.js
const { withRasterImages, withPlayback, withSVG } = require('@moxy/next-common-plugins);

module.exports = withRasterImages({
	/* options */
});
```
You can use `next-compose-plugins` to easily call multiple plugins.
```js
// next.config.js
const withPlugins = require('next-compose-plugins');

module.exports = (phase, nextConfig) => {
	withPlugins([
		[withRasterImages()],
		[withPlayback()],
	]),
};
```

## Loaders

All plugins default to using `url-loader` with the `limit` option set to 0, which forces a fallback to `file-loader`. This means that, in practice, developers must opt in for `url-loader`'s base64 translation. Developers can choose to set a higher limit in conjunction with other rule options to accommodate the structure of their own project.

With the SVG plugin, the list of loaders changes depending on whether it should produce an inline output. If yes, the cadence of the loaders, in order of execution, is: `svg-css-modules-loader`, `svgo-loader` and `raw-loader`.

## Options
All plugins can be passed an options object that will spread to the `webpack` rule. With one exception, explored further below, you can also expect the object to spread to the `url-loader` configuration. The following examples implement some common situations.

Setting the `url-loader` limit:
```js
// Set higher limit
[withRasterImages({
	options: {
		limit: 300000,
	},
})];
```

Excluding a directory:
```js
// Exclude /images/
[withRasterImages({
	excluce:/images\/.*$/,
})];
```

Using limit and exclude/include to delineate between data URL items and standard items:
```js
// Exclude data-url directory
[withRasterImages({
	 excluce:/data-url\/.*$/,
})];

// Set a higher limit for appropriate directory
[withRasterImages({
	include:/data-url\/.*$/,
	options: {
		limit: 300000,
	},
})];
```

The SVG plugin can receive a `inline` option, which toggles between a list of of loaders and produces a different output. Use this if you want to be returned a string with the content of the SVG file.

With the `inline` option set to *true*, the rest of the object will safely spread **only to the rule**, and passing `use` options will **override the default loaders entirely**.

The following example shows how you can use that option in your project:
```js
// Inline SVGs are stored in /inline/
[withSVG({
	include: /inline\/.*.svg$/,
	inline: true,
})];

// Exclude /inline/
[withSVG({
	exclude: /inline\/.*.svg$/,
})];
```

## File types

Each plugin handles their own list of file types:
| Plugin | File types |
|:---:|---|
| `raster-images` | .png, .jpg/jpeg, .gif, .webp, .ico
| `playback` | .mp3, .flac, .wav, .aac, .ogg, .oga, .mp4, .m4a, .webm, .ogv
| `svg` | .svg
