'use strict';

module.exports = (userOptions = {}) => (nextConfig = {}) => ({
    ...nextConfig,
    webpack(config, options) {
        const { assetPrefix = '' } = nextConfig;
        const { dev, isServer } = options;

        config.module.rules.push({
            test: /\.(eot|ttf|woff|woff2|otf)$/,
            loader: require.resolve('url-loader'),
            ...userOptions,
            options: {
                limit: 0,
                name: dev ? 'fonts/[name].[ext]' : 'fonts/[name].[hash:15].[ext]',
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
