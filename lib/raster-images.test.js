'use strict';

const { withRasterImages } = require('../index.js');

const options = {
    dev: true,
    isServer: true,
};

const mockFunction = jest.fn();

let config;

beforeEach(() => {
    config = {
        module: {
            rules: [],
        },
    };

    jest.clearAllMocks();
});

it('should match snapshot', () => {
    const arrayOfImagesRules = [];

    arrayOfImagesRules.push(withRasterImages()().webpack(config, options).module.rules);

    expect(arrayOfImagesRules).toMatchSnapshot();
});

it('should return a single rule', () => {
    const arrayOfImagesRules = [];

    arrayOfImagesRules.push(withRasterImages()().webpack(config, options).module.rules);

    expect(arrayOfImagesRules).toHaveLength(1);
});

it('should return a function if next config is a function', () => {
    const nextConfig = {
        webpack: mockFunction,
    };

    withRasterImages()(nextConfig).webpack(config, options);

    expect(nextConfig.webpack.mock.calls).toHaveLength(1);
});
