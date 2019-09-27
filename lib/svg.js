'use strict';

module.exports = (pluginOptions = {}) => (nextConfig = {}) => (
    {
        ...nextConfig,
        ...{
            webpack(config, options) {
                const { dev, isServer } = options;
                const { assetPrefix } = nextConfig;
                const { inline = false, ...userOptions } = pluginOptions;

                const inlineLoaders = {
                    use: [
                        {
                            loader: 'raw-loader',
                        },
                        {
                            loader: 'svgo-loader',
                            options: {
                                plugins: [
                                    { removeTitle: true },
                                    { removeDimensions: false },
                                    { removeViewBox: false },
                                    { cleanupIDs: false },
                                ],
                            },
                        },
                        {
                            loader: 'svg-css-modules-loader',
                            options: {
                                transformId: true,
                            },
                        },
                    ],
                };

                const fileLoaders = {
                    loader: 'url-loader',
                    ...userOptions,
                    options: {
                        limit: 0,
                        name: dev ? 'images/[name].[ext]' : 'images/[name].[hash:15].[ext]',
                        publicPath: `${assetPrefix}_next/static/chunks/media`,
                        outputPath: 'static/chunks/media',
                        emitFile: !isServer,
                        ...userOptions.options,
                    },
                };

                config.module.rules.push({
                    test: /\.svg$/,
                    ...inline ? inlineLoaders : fileLoaders,
                    ...userOptions,
                });

                if (typeof nextConfig.webpack === 'function') {
                    return nextConfig.webpack(config, options);
                }

                return config;
            },
        },
    }
);
