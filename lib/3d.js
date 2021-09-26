'use strict';

module.exports = (userOptions = {}) => (nextConfig = {}) => ({
    ...nextConfig,
    webpack(config, options) {
        const { assetPrefix = '' } = nextConfig;
        const { dev, isServer } = options;

        config.module.rules.push({
            test: /\.(obj|mtl|fnt|gltf|glb)$/,
            loader: require.resolve('./loaders/file-size-loader'),
            ...userOptions,
            options: {
                name: dev ? '[path][name].[ext]' : '3d/[name].[contenthash:20].[ext]',
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
