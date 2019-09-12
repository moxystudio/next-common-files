const presets = [
    [
        '@babel/preset-env',
        {
            targets: {
                node: '10',
            },
            useBuiltIns: 'usage',
            corejs: 3,
        },

    ],
];

const plugins = [
    '@babel/plugin-proposal-class-properties',
];

module.exports = { presets, plugins };
