const fs = require('fs');
const _ = require('lodash');
const eol = require('eol');
const VirtualFile = require('vinyl');
const stringify = require('json-stable-stringify');

/**
 * Methods below have been borrowed from Apollo for Smartling functionality
 */

function convertKeyFactory(translationKey, instructionKey, key, valueStr, options = {}) {
  let value;
  try {
    value = JSON.parse(valueStr);
  } catch (e) {
    value = valueStr;
  }
  const translation = value[translationKey] || value;
  const instruction = options.context || value[instructionKey];

  const obj = {
    [translationKey]: translation
  };

  if (options.context) {
    if (instruction !== value[instructionKey]) {
      // Not really an error but I wanted the message to stand out.
      this.error(
        `Updating ${instructionKey} for translation key ${key}. If this happens every build, you may have `
        + `conflicting ${instructionKey}s sharing a single key.`
      );
    }
    obj[instructionKey] = instruction;
  }
  return JSON.stringify(obj);
}

// Set translation key with an optional defaultValue to i18n resource store
// @param {string} key The translation key
// @param {object} [options] The options object
// @param {boolean|function} [options.fallbackKey] When the key is missing, pass `true` to
//        return `options.defaultValue` as key, or pass a function to return user-defined key.
// @param {string} [options.defaultValue] defaultValue to return if translation not found
// @param {string} [options.context] used for translator instructions (eg. male)
// @param {string} [options.ns] namespace for the translation
// @param {string|boolean} [options.nsSeparator] The value used to override this.options.nsSeparator
// @param {string|boolean} [options.keySeparator] The value used to override this.options.keySeparator
function setValue(theKey, opts = {}) {
  let key = theKey;
  // Backward compatibility
  const options = _.isString(opts) ? { defaultValue: opts } : opts;
  const { smartling } = this.options;
  const translationKey = smartling.translate_paths.path.split('/')[1];
  const instructionKey = smartling.translate_paths.instruction.split('/')[1];
  const convertKey = convertKeyFactory.bind(this, translationKey, instructionKey);

  const nsSeparator = (options.nsSeparator !== undefined)
    ? options.nsSeparator
    : this.options.nsSeparator;
  const keySeparator = (options.keySeparator !== undefined)
    ? options.keySeparator
    : this.options.keySeparator;

  let ns = options.ns || this.options.defaultNs;
  // eslint-disable-next-line no-console
  console.assert(_.isString(ns) && !!ns.length, 'ns is not a valid string', ns);

  if (_.isString(nsSeparator) && (key.indexOf(nsSeparator) > -1)) {
    [ns, key] = key.split(nsSeparator);
  }

  let keys = [];

  if (key) {
    keys = _.isString(keySeparator) ? key.split(keySeparator) : [key];
  } else {
    // fallback key
    if (options.fallbackKey === true) {
      key = options.defaultValue;
    }
    if (typeof options.fallbackKey === 'function') {
      key = options.fallbackKey(ns, options.defaultValue);
    }

    if (!key) {
      // Ignore empty key
      return;
    }

    keys = [key];
  }

  const {
    lngs,
    defaultLng,
    defaultValue
  } = this.options;

  lngs.forEach((lng) => {
    let resLoad = this.resStore[lng] && this.resStore[lng][ns];
    let resScan = this.resScan[lng] && this.resScan[lng][ns];

    if (!_.isPlainObject(resLoad)) { // Skip undefined namespace
      this.error(
        `${JSON.stringify(ns)} does not exist in the namespaces (${JSON.stringify(this.options.ns)}):`
        + `key=${JSON.stringify(key)}, options=${JSON.stringify(options)}`
      );
      return;
    }

    Object.keys(keys).forEach((index) => {
      const aKey = keys[index];

      if (index < (keys.length - 1)) {
        resLoad[aKey] = resLoad[aKey] || {};
        resLoad = resLoad[aKey];
        resScan[aKey] = resScan[aKey] || {};
        resScan = resScan[aKey];
        return; // continue
      }

      if (resLoad[aKey] === undefined) {
        if (options.defaultValue !== undefined) {
          // Use `options.defaultValue` if specified
          resLoad[aKey] = convertKey(aKey, options.defaultValue, options);
        } else {
          // Fallback to `defaultValue`
          resLoad[aKey] = convertKey(
            aKey,
            (_.isFunction(defaultValue) ? defaultValue(lng, ns, aKey, options) : defaultValue),
            options
          );
        }
        this.log(`Added a new translation key "${aKey}" to ${JSON.stringify(this.formatResourceLoadPath(lng, ns))}`);
      } else if (options.defaultValue) {
        if (!resLoad[aKey]) {
          // Use `options.defaultValue` if specified
          resLoad[aKey] = convertKey(aKey, options.defaultValue, options);
        } else if ((resLoad[aKey] !== options.defaultValue) && (lng === defaultLng)) {
          // A default value has provided but it's different with the expected default
          this.log(
            `The translation key ${JSON.stringify(aKey)} has a different default value, you may need to`
            + `check the translation key of default language (${defaultLng})`
          );
        }
      } else {
        resLoad[aKey] = convertKey(aKey, resLoad[aKey], options);
      }

      resScan[aKey] = resLoad[aKey];
    });
  });
}


function transform(file, enc, done) {
  const { parser } = this;
  const content = fs.readFileSync(file.path, enc);
  let count = 0;
  parser.parseFuncFromString(content, (key, options) => {
    setValue.call(parser, key, options);
    ++count;
  });
  if (count > 0) {
    // eslint-disable-next-line no-console
    console.log(`i18next-scanner: count=${count}, file=${JSON.stringify(file.relative)}`);
  }
  done();
}


// Sort keys alphabetically but we always want the smartling key on top.
function smartlingKeyCompare(a, b) {
  if (a.key === 'smartling') {
    return -1;
  }
  return a.key > b.key ? 1 : -1;
}

function flush(done) {
  // Flush to resource store
  const { parser } = this;
  const { resStore, options } = parser;
  const { jsonIndent } = options.resource;
  const lineEnding = String(options.resource.lineEnding).toLowerCase();
  const { smartling, sort } = options;

  Object.keys(resStore).forEach((lng) => {
    const namespaces = resStore[lng];

    Object.keys(namespaces).forEach((ns) => {
      const obj = {
        smartling,
        ...Object.entries(namespaces[ns])
          .reduce((acc, [k, v]) => {
            if (typeof v === 'string') {
              acc[k] = JSON.parse(v);
            }
            return acc;
          }, {})
      };

      const resPath = parser.formatResourceSavePath(lng, ns);
      // eslint-disable-next-line prefer-template
      let text = (
        sort
          ? stringify(obj, {
            space: jsonIndent,
            cmp: smartlingKeyCompare
          })
          : JSON.stringify(obj, null, jsonIndent)
      ).replace(/": ("|{)/g, '" : $1') + '\n';

      if (lineEnding === 'auto') {
        text = eol.auto(text);
      } else if (lineEnding === '\r\n' || lineEnding === 'crlf') {
        text = eol.crlf(text);
      } else if (lineEnding === '\n' || lineEnding === 'lf') {
        text = eol.lf(text);
      } else if (lineEnding === '\r' || lineEnding === 'cr') {
        text = eol.cr(text);
      } else { // Defaults to LF
        text = eol.lf(text);
      }

      let contents = null;

      try {
        // "Buffer.from(string[, encoding])" is added in Node.js v5.10.0
        contents = Buffer.from(text);
      } catch (e) {
        // Fallback to "new Buffer(string[, encoding])" which is deprecated since Node.js v6.0.0
        contents = new Buffer(text);
      }

      this.push(new VirtualFile({
        path: resPath,
        contents
      }));
    });
  });

  done();
}


module.exports = {
  transform,
  flush
};
