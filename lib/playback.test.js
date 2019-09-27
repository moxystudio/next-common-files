'use strict';

const { withPlayback } = require('../index.js');

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
    const arrayOfPlaybackRules = [];

    arrayOfPlaybackRules.push(withPlayback()().webpack(config, options).module.rules);

    expect(arrayOfPlaybackRules).toMatchSnapshot();
});

it('should return a single rule', () => {
    const arrayOfPlaybackRules = [];

    arrayOfPlaybackRules.push(withPlayback()().webpack(config, options).module.rules);

    expect(arrayOfPlaybackRules).toHaveLength(1);
});

it('should return a function if next config is a function', () => {
    const nextConfig = {
        webpack: mockFunction,
    };

    withPlayback()(nextConfig).webpack(config, options);

    expect(nextConfig.webpack.mock.calls).toHaveLength(1);
});
