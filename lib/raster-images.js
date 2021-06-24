'use strict';

const { getIndexAfterNextImageRule } = require('./util/next-image-rule');

module.exports = (userOptions = {}) => (nextConfig = {}) => ({
    ...nextConfig,
    webpack(config, options) {
        const { dev, isServer } = options;
        const { assetPrefix = '' } = nextConfig;

        const insertRuleAtIndex = getIndexAfterNextImageRule(config);

        config.module.rules.splice(insertRuleAtIndex, 0, {
            test: /\.(png|jpg|jpeg|gif|webp|ico|bmp)$/,
            loader: require.resolve('url-loader'),
            ...userOptions,
            options: {
                limit: 0,
                name: dev ? '[path][name].[ext]' : 'images/[name].[contenthash:20].[ext]',
                publicPath: `${assetPrefix}/_next/static/chunks/media`,
                outputPath: 'static/chunks/media',
                emitFile: !isServer,
                ...userOptions.options,
            },
        });

        if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options);
        }

        return config;
    },
});
