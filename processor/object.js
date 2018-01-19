const fs = require("fs");
const path = require("path");
const traverse = require("traverse");

const extend = require("../util/extend");
const stringProcessor = require("./string");
const validate = require("../util/validate");

const includeKey = "_include";
function resolveInclude(filePath, data) {
  const includeValue = data[includeKey];
  delete data[includeKey];
  if (!includeValue) {
    return {};
  }

  const includePath = path.join(path.dirname(filePath), includeValue);

  if (!fs.existsSync(includePath)) {
    throw new Error(`${filePath}: ${includePath} doesn't exist!`);
  }
  const includeData = JSON.parse(fs.readFileSync(includePath), "utf8");
  validate(includePath, includeData);
  delete includeData[includeKey];

  return process(includePath, includeData);
}

const processors = {
  object: (filePath, value) => extend(value, resolveInclude(filePath, value)),
  string: stringProcessor,
  number: (filePath, value) => value,
  boolean: (filePath, value) => value
};

/**
 * Walks each node of the object and processes according to type.
 *
 * @param {String} filePath path to data file.
 * @param {Object} data Object to be processsed.
 */
function process(filePath, data) {
  const processedObject = traverse(data).forEach(function(value) {
    const node = this;

    // undefined should only happen from `delete` calls
    if (typeof value === "undefined" || Array.isArray(value)) {
      return;
    }

    const processor = processors[typeof value];
    if (!processor) {
      throw new Error(`No processor available for ${typeof value}`);
    }

    node.update(processor(filePath, value));
  });

  validate(filePath, processedObject);

  return processedObject;
}

module.exports = process;
