'use strict';

const { withRasterImages } = require('../index.js');

const options = {
    dev: true,
    isServer: true,
};

const cleanConfig = () => ({
    module: {
        rules: [],
    },
});

it('should configure a unique rule correctly', () => {
    const webpackConfig = withRasterImages()().webpack(cleanConfig(), options);

    expect(webpackConfig.module.rules).toHaveLength(1);
    expect(webpackConfig.module.rules[0]).toMatchSnapshot();
});

it('should return a function if next config is a function', () => {
    const nextConfig = {
        webpack: jest.fn(() => 'foo'),
    };

    const webpackConfig = withRasterImages()(nextConfig).webpack(cleanConfig(), options);

    expect(nextConfig.webpack).toHaveBeenCalledTimes(1);
    expect(webpackConfig).toBe('foo');
});