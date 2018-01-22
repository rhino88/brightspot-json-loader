import compiler from "./compiler.js";

function compare(actual, expected) {
  expect(actual).toBe(`module.exports = ${expected}`);
}

describe("Valid", () => {
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

  test("Object Array", async () => {
    const stats = await compiler("./example/objectArray.json");
    const output = stats.toJson().modules[0].source;
    compare(output, `{"_type":"array","items":[{"_type":"foo","foo":"bar"}]}`);
  });
});

describe("Invalid", () => {
  test("Missing _type", async () => {
    const stats = await compiler("./example/missingType.json");
    const output = stats.toJson().modules[0].source;
    expect(output).toEqual(expect.stringContaining("throw new Error"));
  });
});
