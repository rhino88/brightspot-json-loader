const Chance = require("chance");

const chance = new Chance();

const stringGenerator = {
  uuid: string => chance.guid({ version: 4 }),
  words: string => chance.sentence().slice(0, -1),
  name: string => chance.name(),
  date: string => chance.date({ string: true })
};

/**
 * Generates random strings for supported helpers.
 * Helpers are indicated by surrounding handlebars syntax.
 *
 * Example: {{name}}
 *
 * @param {String} filePath the path to the file being processed.
 * @param {String} value string which may or may not utilize helpers syntax.
 */
function processString(filePath, value) {
  if (value.startsWith("{{") && value.endsWith("}}")) {
    const stringHelper = value.split(/\{\{(.*?)}}/);
    return stringGenerator[stringHelper[1]](value);
  } else {
    return value;
  }
}

module.exports = processString;
