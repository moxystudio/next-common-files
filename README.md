# next-common-files

[travis-url]:https://travis-ci.org/moxystudio/next-common-files
[travis-image]:http://img.shields.io/travis/moxystudio/next-common-files/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/next-common-files
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/next-common-files/master.svg

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
const { withRasterImages, withPlayback, withSVG } = require('@moxy/next-common-plugins');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
        [withRasterImages()],
        [withPlayback()],
        [withSVG()],
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
// Exclude /images/
[withRasterImages({
    exclude: /images\/.*$/,
})],
```

Setting the `url-loader` limit:

```js
// Set higher limit
[withRasterImages({
    options: {
        limit: 300000,
    },
})],
```

Using limit and exclude/include to delineate between data URL items and standard items:

```js
// Exclude data-url directory
[withRasterImages({
     exclude: /data-url\/.*$/,
})],

// Set a higher limit for appropriate directory
[withRasterImages({
    include: /data-url\/.*$/,
    options: {
        limit: 300000,
    },
})],
```

Using all three plugins with options accommodated to an example project structure:

```js
[withRasterImages({
    exclude: /favicons\/.*$/,
})],
[withPlayback()],
[withSVG({
    exclude: [/images\/.*.svg$/, /favicons\/.*.svg/],
    inline: true,
})],
[withSVG({
    include: /images\/.*.svg$/,
})],
```


## API


### raster-images

This plugin is meant to handle **raster images**, and tests the file types `.png`, `.jpg`, `jpeg`, `.gif`, `.webp` and`.ico`.


### playback

This plugin is meant to handle **video** and **audio** files, and tests the file types `.mp3`, `.flac`, `.wav`, `.aac`, `.ogg`, `.oga`, `.mp4`,  `.m4a`, `.webm` and `.ogv`.


### svg

This plugin is meant to handle **SVG** files,  and tests the file type `.svg`.

This plugin adds the [`svgo-loader`](https://github.com/rpominov/svgo-loader) to optimize the SVG files it loads. 

Though it defaults to working like the previous plugins, this plugin can also output inline content. You can toggle the output by sending an `inline` option, which is set to *false* by default. Use this if you want to be returned a `string` with the content of the SVG file. When *false* the plugin will behave like the others, using `url-loader` together with `svgo-loader`. When *true*, the plugin will use a different set of loaders, including [`svg-css-modules-loader`](https://github.com/kevin940726/svg-css-modules-loader), which uniquifies the CSS classes in the file.

The available options also change in accordance with the `inline` value. With the `inline` option set to *false*, it will behave like the other plugins. With the `inline` option set to *true*, the options object will safely spread **only to the rule**, and passing the `use` option will **override the default loaders entirely**.

```js
// If false or not sent, options can be sent like other plugins
[withSVG({
    options: {
        limit: 20000,    // will be safely passed to url-loader
    },
})],

// If sent true, 'use' value will override default loaders entirely
[withSVG({
    exclude: /inline\/.*.svg$/,    // Will be safely passed to rule
    inline: true,
    use: [{
        loader: 'url-loader',     // Only 'url-loader' will be used
    }],
})],
```

The following example shows how you can use the inline option in your project:

```js
// Inline SVGs are stored in /inline/
[withSVG({
    include: /inline\/.*.svg$/,
    inline: true,
})],

// Exclude /inline/
[withSVG({
    exclude: /inline\/.*.svg$/,
})],
```

**Keep in mind**, when you opt in for the inline output, the CSS classes in your SVG **will be uniquified**, and you must be careful when selecting them. For example, using an attribute selector, as explored in the following snippet:

```css
/* Selecting an svg file with the original filename 'header-svg-inline.svg' */

[class^=header-svg-inline] {
    /* ... */
}
```

### Tests

Any parameter passed to the `test` command is passed down to Jest.

```sh
$ npm t
$ npm t -- --watch              # To run watch mode
```

### License

Released under the [MIT License](https://opensource.org/licenses/mit-license.php).
