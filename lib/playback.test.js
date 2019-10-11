'use strict';

const { withPlayback } = require('../index.js');

const options = {
    dev: true,
    isServer: true,
};

const createConfig = () => ({
    module: {
        rules: [],
    },
});

it('should configure a unique rule correctly', () => {
    const webpackConfig = withPlayback()().webpack(createConfig(), options);

    expect(webpackConfig.module.rules).toHaveLength(1);
    expect(webpackConfig.module.rules[0]).toMatchSnapshot();
});

it('should call nextConfig webpack if defined', () => {
    const nextConfig = {
        webpack: jest.fn(() => 'foo'),
    };

    const webpackConfig = withPlayback()(nextConfig).webpack(createConfig(), options);

    expect(nextConfig.webpack).toHaveBeenCalledTimes(1);
    expect(webpackConfig).toBe('foo');
});
