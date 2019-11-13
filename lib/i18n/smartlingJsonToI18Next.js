/**
 * This has been borrowed from Apollo for Smartling functionality
 */
function smartlingJsonTo18Next(source) {
  let value = typeof source === 'string' ? JSON.parse(source) : source;

  // Filter out smartling metadata.
  const metadata = value.smartling;
  if (metadata !== undefined) {
    const path = metadata.translate_paths.path.split('/')[1];
    delete value.smartling;
    Object.keys(value).forEach((key) => {
      value[key] = value[key][path];
    });
  }

  value = JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return value;
}

module.exports = {
  smartlingJsonTo18Next
};
