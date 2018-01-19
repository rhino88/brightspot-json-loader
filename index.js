const path = require("path");
const fs = require("fs");

const process = require("./processor/object");

module.exports = function(source) {
  if (this.cacheable) this.cacheable();

  const loader = this;
  let value = typeof source === "string" ? JSON.parse(source) : source;
  const filePath = loader.resourcePath;
  process(filePath, value);

  value = JSON.stringify(value)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return value;
};
