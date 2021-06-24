'use strict';

module.exports = (userOptions = {}) => (nextConfig = {}) => ({
    ...nextConfig,
    // Disable Next.js loader that handles images, otherwise this won't work correctly.
    images: {
        ...nextConfig.images,
        disableStaticImages: true,
    },
    webpack(config, options) {
        const { dev, isServer } = options;
        const { assetPrefix = '' } = nextConfig;

        config.module.rules.push({
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
