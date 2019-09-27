'use strict';

module.exports = (userOptions = {}) => (nextConfig = {}) => ({
    ...nextConfig,
    ...{
        webpack(config, options) {
            const { assetPrefix = '' } = nextConfig;
            const { dev, isServer } = options;

            config.module.rules.push({
                test: /\.(mp3|flac|wav|aac|ogg|oga|mp4|m4a|webm|ogv)$/,
                loader: 'url-loader',
                ...userOptions,
                options: {
                    limit: 0,
                    name: dev ? 'playback/[name].[ext]' : 'playback/[name].[hash:15].ext',
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
    },
});
