/**
 * This has been borrowed from Apollo for Smartling functionality
 */
const { smartlingJsonTo18Next } = require('./smartlingJsonToI18Next');
module.exports = function loader(source) {
    if (this.cacheable) this.cacheable();
    return `module.exports = ${smartlingJsonTo18Next(source)}`;
};
