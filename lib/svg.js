'use strict';

const { getIndexAfterNextImageRule } = require('./util/next-image-rule');

const svgoLoader = {
    loader: require.resolve('svgo-loader'),
    options: {
        plugins: [
            { removeTitle: true },
            { removeDimensions: false },
            { removeViewBox: false },
            { cleanupIDs: false },
        ],
    },
};

module.exports = (pluginOptions = {}) => (nextConfig = {}) => ({
    ...nextConfig,
    webpack(config, options) {
        const { dev, isServer } = options;
        const { assetPrefix = '' } = nextConfig;
        const { inline = false, options: loaderOptions, ...userOptions } = pluginOptions;

        const insertRuleAtIndex = getIndexAfterNextImageRule(config);

        if (inline) {
            config.module.rules.splice(insertRuleAtIndex, 0, {
                test: /\.svg$/,
                use: [
                    {
                        loader: require.resolve('raw-loader'),
                    },
                    svgoLoader,
                    {
                        loader: require.resolve('svg-css-modules-loader'),
                        options: {
                            transformId: true,
                        },
                    },
                ],
                ...userOptions,
            });
        } else {
            config.module.rules.splice(insertRuleAtIndex, 0, {
                test: /\.svg$/,
                use: [
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 0,
                            name: dev ? '[path][name].[ext]' : 'images/[name].[contenthash:20].[ext]',
                            publicPath: `${assetPrefix}/_next/static/chunks/media`,
                            outputPath: 'static/chunks/media',
                            emitFile: !isServer,
                            ...loaderOptions,
                        },
                    },
                    svgoLoader,
                ],
                ...userOptions,
            });
        }

        if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options);
        }

        return config;
    },
});
