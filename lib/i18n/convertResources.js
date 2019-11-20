import { smartlingJsonTo18Next } from './smartlingJsonToI18Next';
import path from 'path';
import _ from 'lodash';

/**
 * This has been borrowed from Apollo for Smartling functionality within testing environment
 */

// Smartling JSON files are normally converted to i18next format by webpack
// because tests are built by webpack need to over-ride resources, to stop test from throwing errors
// for incorrectly formatted objects.
// Based on: https://react.i18next.com/misc/testing#example-configuration-for-testing
export default function convertResources(originalResources) {
  const resources = {};
  _.forOwn(originalResources, (value, lang) => {
    resources[lang] = {};
    _.forOwn(value, (v, ns) => {
      const file = path.join(__dirname, '../../i18n', lang, `${ns}.json`);
      try {
        resources[lang][ns] = JSON.parse(smartlingJsonTo18Next(require(file)));
      } catch (e) {
        throw new Error(`Failed to require or convert Smartling JSON to i18next in test environment:\n${e}`);
      }
    });
  });
  return resources;
}
