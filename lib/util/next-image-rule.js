'use strict';

const getIndexAfterNextImageRule = (config) => {
    let insertRuleAtIndex = config.module.rules.findIndex(({ loader }) =>
        typeof loader === 'string' && loader.includes('next-image-loader'));

    if (insertRuleAtIndex === -1) {
        insertRuleAtIndex = config.module.rules.length;
    }

    return insertRuleAtIndex;
};

module.exports = {
    getIndexAfterNextImageRule,
};
