const { withSVG } = require('../../index.js');

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

it('should match snapshot for all results', () => {
    const arrayOfSVGRulesWithInline = [];
    const arrayOfSVGRulesWithDefault = [];

    arrayOfSVGRulesWithInline.push(withSVG({ inline: true })().webpack(config, options).module.rules);
    arrayOfSVGRulesWithDefault.push(withSVG()().webpack(config, options).module.rules);

    expect(arrayOfSVGRulesWithInline).toMatchSnapshot();
    expect(arrayOfSVGRulesWithDefault).toMatchSnapshot();
});

it('should return a single rule', () => {
    const arrayOfSVGRules = [];

    arrayOfSVGRules.push(withSVG()().webpack(config, options).module.rules);

    expect(arrayOfSVGRules).toHaveLength(1);
});

it('should return a function if next config is a function', () => {
    const nextConfig = {
        webpack: mockFunction,
    };

    withSVG()(nextConfig).webpack(config, options);

    expect(nextConfig.webpack.mock.calls).toHaveLength(1);
});

it('should change loaders in SVG in accordance with inline option', () => {
    const arrayOfSVGRulesWithInline = [];
    const arrayOfSVGRulesWithDefault = [];

    arrayOfSVGRulesWithInline.push(withSVG({ inline: true })().webpack(config, options).module.rules);
    arrayOfSVGRulesWithDefault.push(withSVG()().webpack(config, options).module.rules);

    expect(arrayOfSVGRulesWithInline).not.toBe(arrayOfSVGRulesWithDefault);
});

it('should have inline: false as default', () => {
    const arrayOfSVGRulesWithFalse = [];
    const arrayOfSVGRulesWithDefault = [];

    arrayOfSVGRulesWithFalse.push(withSVG({ inline: false })().webpack(config, options).module.rules);
    arrayOfSVGRulesWithDefault.push(withSVG()().webpack(config, options).module.rules);

    expect(arrayOfSVGRulesWithFalse).toEqual(arrayOfSVGRulesWithDefault);
});
