const { withSVG, withRasterImages, withPlayback } = require('./index.js');

const options = {
    dev: true,
    isServer: true,
};

let config = {
    module: {
        rules: [],
    },
};

const mockFunction = jest.fn();

afterEach(() => {
    config = {
        module: {
            rules: [],
        },
    };

    jest.clearAllMocks();
});

it('should return a single rule', () => {
    const arrayOfSVGRules = [];
    const arrayOfImagesRules = [];
    const arrayOfPlaybackRules = [];

    arrayOfSVGRules.push(withSVG()().webpack(config, options).module.rules);
    arrayOfImagesRules.push(withRasterImages()().webpack(config, options).module.rules);
    arrayOfPlaybackRules.push(withPlayback()().webpack(config, options).module.rules);

    expect(arrayOfSVGRules).toHaveLength(1);
    expect(arrayOfImagesRules).toHaveLength(1);
    expect(arrayOfPlaybackRules).toHaveLength(1);
});

it('should return a function if next config is a function', () => {
    const nextConfig = {
        webpack: mockFunction,
    };

    withRasterImages()(nextConfig).webpack(config, options);
    withPlayback()(nextConfig).webpack(config, options);
    withSVG()(nextConfig).webpack(config, options);

    expect(nextConfig.webpack.mock.calls).toHaveLength(3);
});

it('should change loaders in SVG in accordance with inline option', () => {
    const inlineArrayOfRules = [];
    const arrayOfRulesWithDefault = [];

    inlineArrayOfRules.push(withSVG({ inline: true })().webpack(config, options).module.rules);
    arrayOfRulesWithDefault.push(withSVG()().webpack(config, options).module.rules);

    expect(inlineArrayOfRules).not.toBe(arrayOfRulesWithDefault);
});

it('should have inline: false as default', () => {
    const arrayOfSVGRulesWithFalse = [];
    const arrayOfSVGRulesWithDefault = [];

    arrayOfSVGRulesWithFalse.push(withSVG({ inline: false })().webpack(config, options).module.rules);
    arrayOfSVGRulesWithDefault.push(withSVG()().webpack(config, options).module.rules);

    expect(arrayOfSVGRulesWithFalse).toEqual(arrayOfSVGRulesWithDefault);
});
