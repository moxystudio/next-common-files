'use strict';

const { withSVG } = require('../index.js');

const options = {
    dev: true,
    isServer: true,
};

const cleanConfig = () => ({
    module: {
        rules: [],
    },
});

it('should configure a unique rule correctly with inline true', () => {
    const webpackConfig = withSVG({ inline: true })().webpack(cleanConfig(), options);

    expect(webpackConfig.module.rules).toHaveLength(1);
    expect(webpackConfig.module.rules[0]).toMatchSnapshot();
});

it('should configure a unique rule correctly with inline default (false)', () => {
    const webpackConfig = withSVG()().webpack(cleanConfig(), options);

    expect(webpackConfig.module.rules).toHaveLength(1);
    expect(webpackConfig.module.rules[0]).toMatchSnapshot();
});

it('should return a function if next config is a function', () => {
    const nextConfig = {
        webpack: jest.fn(() => 'foo'),
    };

    const webpackConfig = withSVG()(nextConfig).webpack(cleanConfig(), options);

    expect(nextConfig.webpack).toHaveBeenCalledTimes(1);
    expect(webpackConfig).toBe('foo');
});

it('should change loaders in SVG in accordance with inline option', () => {
    const webpackConfigWithInline = withSVG({ inline: true })().webpack(cleanConfig(), options);
    const webpackConfigWithoutInline = withSVG()().webpack(cleanConfig(), options);

    expect(webpackConfigWithInline.module.rules).not.toStrictEqual(webpackConfigWithoutInline.module.rules);
});

it('should have inline: false as default', () => {
    const webpackConfigWithFalse = withSVG({ inline: false })().webpack(cleanConfig(), options);
    const webpackConfigWithDefault = withSVG()().webpack(cleanConfig(), options);

    expect(webpackConfigWithFalse.module.rules).toStrictEqual(webpackConfigWithDefault.module.rules);
});
