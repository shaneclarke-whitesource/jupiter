/**
 * HTML tags that look like this: <0>stuff</0> are generated from the <Trans /> component.
 * smartling encodes them like so: `&lt;0&gtstuff&lt;/0&gt;`
 * This method decodes them so they look like this again: `<0>stuff</0>`
 * @param { string } str
 */
const decodeNumericHTMLTags = (str) => str.replace(/&lt;(\/?\d)&gt;/g, '<$1>');

function smartlingJsonTo18Next(source) {
  let value = typeof source === 'string' ? JSON.parse(source) : source;

  // Filter out smartling metadata.
  const metadata = value.smartling;
  if (metadata !== undefined) {
    const path = metadata.translate_paths.path.split('/')[1];
    delete value.smartling;
    Object.keys(value).forEach((key) => {
      value[key] = decodeNumericHTMLTags(value[key][path]);
    });
  }

  value = JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return value;
}

module.exports = {
  smartlingJsonTo18Next,
  decodeNumericHTMLTags
};
