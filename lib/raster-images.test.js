'use strict';

const { withRasterImages } = require('../index.js');

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

it('should disable static images', () => {
    const config = withRasterImages()();

    expect(config.images.disableStaticImages).toBe(true);

    const config2 = withRasterImages()({
        ...createConfig(),
        images: {
            disableStaticImages: false,
        },
    });

    expect(config2.images.disableStaticImages).toBe(true);
});

it('should configure a unique rule correctly', () => {
    const webpackConfig = withRasterImages()().webpack(createConfig(), options());

    expect(webpackConfig.module.rules).toHaveLength(1);
    expect(webpackConfig.module.rules[0]).toMatchSnapshot();
});

it('should configure a unique rule correctly (dev)', () => {
    const webpackConfig = withRasterImages()().webpack(createConfig(), options({ dev: false }));

    expect(webpackConfig.module.rules).toHaveLength(1);
    expect(webpackConfig.module.rules[0]).toMatchSnapshot();
});

it('should call nextConfig webpack if defined', () => {
    const nextConfig = {
        webpack: jest.fn(() => 'foo'),
    };

    const webpackConfig = withRasterImages()(nextConfig).webpack(createConfig(), options());

    expect(nextConfig.webpack).toHaveBeenCalledTimes(1);
    expect(webpackConfig).toBe('foo');
});
