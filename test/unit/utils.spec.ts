import { prettify, downcaseFirstLetter, upcaseFirstLetter, pick } from "../../src/support/utils";

describe("capitalizeFirstLetter", () => {
  test("capitalizes the first letter of a string", () => {
    expect(upcaseFirstLetter("testFooBar")).toEqual("TestFooBar");
    expect(upcaseFirstLetter("TestFooBar")).toEqual("TestFooBar");
  });
});

describe("downcaseFirstLetter", () => {
  test("down cases the first letter of a string", () => {
    expect(downcaseFirstLetter("testFooBar")).toEqual("testFooBar");
    expect(downcaseFirstLetter("TestFooBar")).toEqual("testFooBar");
  });
});

describe("prettify", () => {
  test("formats a graphql query", () => {
    const query =
      "query Posts($deleted:Boolean!){posts(deleted: $deleted){id, name author{id, email, firstname}}}";

    const formattedQuery =
      `
query Posts($deleted: Boolean!) {
  posts(deleted: $deleted) {
    id
    name
    author {
      id
      email
      firstname
    }
  }
}
  `.trim() + "\n";

    expect(prettify(query)).toEqual(formattedQuery);
  });
});

describe("pick", () => {
  test("picks stuff", () => {
    const input = {
      foo: 1,
      bar: 2,
      test: 3,
      hello: 4,
      world: 5
    };

    const expectedOutput = {
      bar: 2,
      hello: 4
    };

    expect(pick(input, ["bar", "hello"])).toEqual(expectedOutput);
    expect(pick(0, ["bar", "hello"])).toEqual({});
  });
});
