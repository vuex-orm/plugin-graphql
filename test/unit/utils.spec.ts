import { prettify, downcaseFirstLetter, upcaseFirstLetter } from "../../src/support/utils";

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
