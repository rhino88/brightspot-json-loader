const fs = require("fs");
const jsonValidator = require("jsonlint-mod");

/**
 * Validates JSON Objects for the following:
 *
 * 1. Requires _type key
 * 2. Must be valid JSON
 * 2. Must not have any duplicate keys
 */
const typeKey = "_type";
function validate(filePath, data) {
  if (!data[typeKey]) {
    throw new Error(`${filePath}: ${typeKey} is required!`);
  }
  try {
    return jsonValidator.parse(fs.readFileSync(filePath, "utf8"), false);
  } catch (error) {
    throw new Error(
      `[${filePath}] isn't a valid JSON file!\n-\n${error.message}`
    );
  }
}

module.exports = validate;
