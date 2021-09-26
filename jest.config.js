'use strict';

const { compose, baseConfig } = require('@moxy/jest-config-base');

module.exports = compose(
    baseConfig(),
    (config) => {
        config.coveragePathIgnorePatterns = [
            ...config.coveragePathIgnorePatterns,
            require.resolve('./lib/loaders/file-size-loader'),
        ];

        return config;
    },
);
