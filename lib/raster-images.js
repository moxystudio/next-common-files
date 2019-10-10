'use strict';

module.exports = (userOptions = {}) => (nextConfig = {}) => ({
    ...nextConfig,
    webpack(config, options) {
        const { dev, isServer } = options;
        const { assetPrefix = '' } = nextConfig;

        config.module.rules.push({
            test: /\.(png|jpg|jpeg|gif|webp|ico)$/,
            loader: require.resolve('url-loader'),
            ...userOptions,
            options: {
                limit: 0,
                name: dev ? 'images/[name].[ext]' : 'images/[name].[hash:15].[ext]',
                publicPath: `${assetPrefix}_next/static/chunks/media`,
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

