'use strict';

const { with3D } = require('../index.js');

const options = (overrides) => ({
    dev: true,
    isServer: true,
    ...overrides,
});

const createConfig = () => ({
    module: {
        rules: [],
    },
});

it('should configure a unique rule correctly', () => {
    const webpackConfig = with3D()().webpack(createConfig(), options());

    expect(webpackConfig.module.rules).toHaveLength(1);
    expect(webpackConfig.module.rules[0]).toMatchSnapshot();
});

it('should configure a unique rule correctly (prod)', () => {
    const webpackConfig = with3D()().webpack(createConfig(), options({ dev: false }));

    expect(webpackConfig.module.rules).toHaveLength(1);
    expect(webpackConfig.module.rules[0]).toMatchSnapshot();
});

it('should call nextConfig webpack if defined', () => {
    const nextConfig = {
        webpack: jest.fn(() => 'foo'),
    };

    const webpackConfig = with3D()(nextConfig).webpack(createConfig(), options());

    expect(nextConfig.webpack).toHaveBeenCalledTimes(1);
    expect(webpackConfig).toBe('foo');
});
