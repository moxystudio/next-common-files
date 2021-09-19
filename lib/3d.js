'use strict';

module.exports = (userOptions = {}) => (nextConfig = {}) => ({
    ...nextConfig,
    webpack(config, options) {
        const { assetPrefix = '' } = nextConfig;
        const { dev, isServer } = options;
        const loaderOptions = {
            ...userOptions,
            options: {
                limit: 0,
                name: dev ? '[path][name].[ext]' : '3d/[name].[contenthash:20].[ext]',
                publicPath: `${assetPrefix}/_next/static/chunks/media`,
                outputPath: 'static/chunks/media',
                emitFile: !isServer,
                ...userOptions.options,
            },
        };

        config.module.rules.push({
            test: /\.(obj|mtl|fnt)$/,
            loader: require.resolve('url-loader'),
            ...loaderOptions,
        });

        config.module.rules.push({
            test: /\.(gltf|glb)$/,
            loader: require.resolve('file-size-loader'),
            ...loaderOptions,
        });

        if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options);
        }

        return config;
    },
});
