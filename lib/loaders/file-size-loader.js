/* eslint-disable no-invalid-this */

'use strict';

const fs = require('fs');
const fileLoader = require('file-loader');

module.exports = function (content) {
    this.cacheable && this.cacheable();

    const resourcePath = this.resourcePath;
    const size = fs.statSync(resourcePath).size;

    let prefixCode = fileLoader.call(this, content);

    if (prefixCode.startsWith('export default')) {
        prefixCode = `module.exports = ${prefixCode.substring(
            'export default'.length,
        )}`;
    }

    return `
        ${prefixCode};
        var src = '' + module.exports;
        module.exports = {
            src: src,
            size: ${size},
            toString: function() {
                return src;
            }
        };
    `;
};
