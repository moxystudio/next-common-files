'use strict';

const { withSVG } = require('../index.js');

const options = {
    dev: true,
    isServer: true,
};

const createConfig = () => ({
    module: {
        rules: [],
    },
});

it('should configure a unique rule correctly with inline true', () => {
    const webpackConfig = withSVG({ inline: true })().webpack(createConfig(), options);

    expect(webpackConfig.module.rules).toHaveLength(1);
    expect(webpackConfig.module.rules[0]).toMatchSnapshot();
});

it('should configure a unique rule correctly with inline false', () => {
    const webpackConfig = withSVG({ inline: false })().webpack(createConfig(), options);

    expect(webpackConfig.module.rules).toHaveLength(1);
    expect(webpackConfig.module.rules[0]).toMatchSnapshot();
});

it('should have inline false by default', () => {
    const webpackConfigWithInline = withSVG({ inline: true })().webpack(createConfig(), options);
    const webpackConfigWithFalse = withSVG({ inline: false })().webpack(createConfig(), options);
    const webpackConfigWithDefault = withSVG()().webpack(createConfig(), options);

    expect(webpackConfigWithInline.module.rules).not.toStrictEqual(webpackConfigWithFalse.module.rules);
    expect(webpackConfigWithFalse.module.rules).toStrictEqual(webpackConfigWithDefault.module.rules);
});

it('should return a function if next config is a function', () => {
    const nextConfig = {
        webpack: jest.fn(() => 'foo'),
    };

    const webpackConfig = withSVG()(nextConfig).webpack(createConfig(), options);

    expect(nextConfig.webpack).toHaveBeenCalledTimes(1);
    expect(webpackConfig).toBe('foo');
});
