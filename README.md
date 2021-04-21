# next-common-files

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/next-common-files
[downloads-image]:https://img.shields.io/npm/dm/@moxy/next-common-files.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/next-common-files.svg
[travis-url]:https://travis-ci.org/moxystudio/next-common-files
[travis-image]:https://img.shields.io/travis/moxystudio/next-common-files/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/next-common-files
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/next-common-files/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/next-common-files
[david-dm-image]:https://img.shields.io/david/moxystudio/next-common-files.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/next-common-files?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/next-common-files.svg

Next.js plugins that configure webpack with loaders for common files.

Projects developed with Next.js have to manually insert rules in the configuration file for handling file types that are potentially very common across multiple projects.

These plugins quicken the initial setup of a project by removing that effort from the process, demanding less time from the developer.

## Installation

```sh
$ npm install --save @moxy/next-common-files
```

## Usage

For single usage:

```js
// next.config.js
const { withRasterImages } = require('@moxy/next-common-plugins');

module.exports = withRasterImages({
    /* options */
});
```

For using multiple plugins, you can use [`next-compose-plugins`](https://github.com/cyrilwanner/next-compose-plugins). The examples in this README will follow the `next-compose-plugins` structure.

```js
// next.config.js
const { withRasterImages, withPlayback, withFonts, withSVG, with3D } = require('@moxy/next-common-plugins');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
        withRasterImages(),
        withPlayback(),
        withFonts(),
        withSVG(),
        with3D(),
    ]);
```

## Loaders

All plugins default to using [`url-loader`](https://github.com/webpack-contrib/url-loader) with the `limit` option set to `0`, which forces a fallback to [`file-loader`](https://github.com/webpack-contrib/file-loader). This means that, in practice, developers must opt in for `url-loader`'s base64 translation. Developers can choose to set a higher limit in conjunction with other rule options to accommodate the structure of their own project.

With the SVG plugin, [`svgo-loader`](https://github.com/rpominov/svgo-loader) is added to optimize the SVG files. The SVG plugin can also give an inline output, toggled using an `inline` option. When *true*, this plugin also uses [`svg-css-modules-loader`](https://github.com/kevin940726/svg-css-modules-loader), which uniquifies CSS classes in the SVG file.

## Options

All plugins can be passed an options object that will spread to the `webpack` rule. With one exception, explored further below in the SVG section, you can also expect the object to spread to the `url-loader` configuration. You can refer to the [`webpack rule documentation`](https://webpack.js.org/configuration/module/#rule) and the [`url-loader documentation`](https://github.com/webpack-contrib/url-loader#readme) for more details on available options.

Below you can find some common, general examples on how to use the plugins. Please refer to the section specific to each plugin further below for detailed information about each and specifics on how to use them.

Excluding a directory:

```js
// Exclude /images/ directory
withRasterImages({
    exclude: /images\/.*$/,
}),
```

Excluding a file by suffix:

```js
// Exclude files with '.data-url' suffix
withRasterImages({
    exclude: /\.data-url\./,
}),
```

Setting the `url-loader` limit:

```js
// Set higher limit
withRasterImages({
    options: {
        limit: 300000,
    },
}),
```

Using limit and exclude/include to delineate between data URL items and standard items:

```js
// Exclude files with '.data-url' suffix
withRasterImages({
     exclude: /\.data-url\./,
}),

// Set a higher limit for files with '.data-url' suffix
withRasterImages({
    include: /\.data-url\./,
    options: {
        limit: 300000,
    },
}),
```

Using all plugins with options accommodated to an example project structure:

```js
withRasterImages({
    exclude: /favicons\/.*$/,
}),
withPlayback(),
withFonts({
    options: {
        limit: 50000,
    },
}),
withSVG({
    exclude: /\.inline\./,
}),
withSVG({
    include: /\.inline\./,
    inline: true,
}),
```

If you want to set a top limit that would cover all file sizes, you can set the limit as `Infinity`. **Keep in mind**, using data-url or inline content will **increase the size of your bundle**, and defaulting to `Infinity` can lead to an unchecked increase in bundle size.


```js
withRasterImages({
    options: {
        limit: Infinity, // All files will pass
    },
}),
```

## API

### raster-images

This plugin is meant to handle **raster images**, and tests the file types `.png`, `.jpg`, `jpeg`, `.gif`, `.webp` and`.ico`.

### playback

This plugin is meant to handle **video** and **audio** files, and tests the file types `.mp3`, `.flac`, `.wav`, `.aac`, `.ogg`, `.oga`, `.mp4`,  `.m4a`, `.webm` and `.ogv`.

### fonts

This plugin is meant to handle **font** files, and tests the file types `.eot`, `.ttf`, `.woff`, `.woff2` and `.oft`.

### svg

This plugin is meant to handle **SVG** files,  and tests the file type `.svg`.

This plugin adds the [`svgo-loader`](https://github.com/rpominov/svgo-loader) to optimize the SVG files it loads. 

Though it defaults to working like the previous plugins, this plugin can also output inline content. You can toggle the output by sending an `inline` option, which is set to *false* by default. Use this if you want to be returned a `string` with the content of the SVG file. When *false* the plugin will behave like the others, using `url-loader` together with `svgo-loader`. When *true*, the plugin will use a different set of loaders, including [`svg-css-modules-loader`](https://github.com/kevin940726/svg-css-modules-loader), which uniquifies the CSS classes in the file.

The available options also change in accordance with the `inline` value. With the `inline` option set to *false*, it will behave like the other plugins. With the `inline` option set to *true*, the options object will safely spread **only to the rule**, and passing the `use` option will **override the default loaders entirely**.

```js
// If false or not sent, options can be sent like other plugins
withSVG({
    options: {
        limit: 20000,    // will be safely passed to url-loader
    },
}),

// If sent true, 'use' value will override default loaders entirely
withSVG({
    include: /\.inline\./,        // Will be safely passed to rule
    inline: true,
    use: [{
        loader: 'url-loader',     // Only 'url-loader' will be used
    }],
}),
```

The following example shows how you can use the inline option in your project:

```js
// Include SVGs with '.inline' suffix
withSVG({
    include: /\.inline\./,
    inline: true,
}),

// Exclude SVGs with '.inline' suffix
withSVG({
    exclude: /\.inline\./,
}),
```

**Keep in mind**, when you opt in for the inline output, the CSS classes in your SVG **will be uniquified**, and you must be careful when selecting them. For example, using an attribute selector, as shown in the following snippet:

```css
/* Selecting an svg file with the original filename 'header-svg-inline.svg' */
[class^=header-svg-inline] {
    /* ... */
}
```

### 3d

This plugin is meant to handle **3d** files, and tests the file types `.obj`, `.mtl`, `.fnt`, `.gltf` and `.glb`.

## Tests

Any parameter passed to the `test` command is passed down to Jest.

```sh
$ npm t
$ npm t -- --watch  # To run watch mode
```

## License

Released under the [MIT License](https://opensource.org/licenses/mit-license.php).
