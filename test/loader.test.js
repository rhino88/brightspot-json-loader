import compiler from "./compiler.js";

function compare(actual, expected) {
  expect(actual).toBe(`module.exports = ${expected}`);
}

describe("Success", () => {
  test("Noop", async () => {
    const stats = await compiler("./example/noop.json");
    const output = stats.toJson().modules[0].source;
    compare(output, `{"_type":"foo","foo":"bar"}`);
  });

  test("Include", async () => {
    const stats = await compiler("./example/include.json");
    const output = stats.toJson().modules[0].source;
    compare(output, `{"_type":"parent","foo":"bar"}`);
  });

  test("Nested Include", async () => {
    const stats = await compiler("./example/nestedInclude.json");
    const output = stats.toJson().modules[0].source;
    compare(output, `{"_type":"foo","item":{"_type":"foo","foo":"bar"}}`);
  });

  test("Array", async () => {
    const stats = await compiler("./example/array.json");
    const output = stats.toJson().modules[0].source;
    compare(output, `{"_type":"array","items":["foo","bar","baz"]}`);
  });
});
