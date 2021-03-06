/**
 * Performs a "deep extend" operation
 *
 * From: youmightnotneedjquery.com/#deep_extend
 */

function extend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object") out[key] = extend(out[key], obj[key]);
        else out[key] = obj[key];
      }
    }
  }

  return out;
}

module.exports = extend;
