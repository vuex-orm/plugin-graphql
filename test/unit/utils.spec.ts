import {
  prettify,
  downcaseFirstLetter,
  upcaseFirstLetter,
  pick,
  isGuid,
  toPrimaryKey
} from "../../src/support/utils";

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

describe("toPrimaryKey", () => {
  test("should return 0 for null", () => {
    const input = null;
    const expectedOutput = 0;

    expect(toPrimaryKey(input)).toEqual(expectedOutput);
  });

  test("return GUID for string GUIDs", () => {
    const input = "149ae8b4-cc84-49f5-bf97-b6ce6c09c8e2";
    const expectedOutput = "149ae8b4-cc84-49f5-bf97-b6ce6c09c8e2";

    expect(toPrimaryKey(input)).toEqual(expectedOutput);
  });

  test("return $uid for string $uids", () => {
    const input = "$uid:1";
    const expectedOutput = "$uid:1";

    expect(toPrimaryKey(input)).toEqual(expectedOutput);
  });

  test("return int for string numbers", () => {
    const input = "100";
    const expectedOutput = 100;

    expect(toPrimaryKey(input)).toEqual(expectedOutput);
  });

  test("return int for int numbers", () => {
    const input = 100;
    const expectedOutput = 100;

    expect(toPrimaryKey(input)).toEqual(expectedOutput);
  });
});

describe("isGuid", () => {
  test("returns true if it's a GUID", () => {
    const input = "149ae8b4-cc84-49f5-bf97-b6ce6c09c8e2";
    const expectedOutput = true;

    expect(isGuid(input)).toEqual(expectedOutput);
  });

  test("returns false if it's not a GUID", () => {
    const input = "this-is-not-a-guid";

    const expectedOutput = false;

    expect(isGuid(input)).toEqual(expectedOutput);
  });
});
