const path = require("path");
const fs = require("fs");

const processor = require("./processor/object");

module.exports = function(source) {
  const loader = this;
  if (loader.cacheable) loader.cacheable();

  // Temporary hack to get this to work with storybook without changing extension
  if (source.startsWith("module.exports = ")) {
    source = source.replace("module.exports = ", "");
  }
  let value = typeof source === "string" ? JSON.parse(source) : source;
  const filePath = loader.resourcePath;
  value = processor(filePath, value);

  value = JSON.stringify(value)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return `module.exports = ${value}`;
};
