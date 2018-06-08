import { prettify, downcaseFirstLetter, upcaseFirstLetter } from 'app/support/utils';

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of a string', () => {
    expect(upcaseFirstLetter('testFooBar')).toEqual('TestFooBar');
    expect(upcaseFirstLetter('TestFooBar')).toEqual('TestFooBar');
  });
});


describe('downcaseFirstLetter', () => {
  it('down cases the first letter of a string', () => {
    expect(downcaseFirstLetter('testFooBar')).toEqual('testFooBar');
    expect(downcaseFirstLetter('TestFooBar')).toEqual('testFooBar');
  });
});


describe('prettify', () => {
  it('formats a graphql query', () => {
    const query = 'query Posts($deleted:Boolean!){posts(deleted: $deleted){id, name user{id, email, firstname}}}';

    const formattedQuery = `
query Posts($deleted: Boolean!) {
  posts(deleted: $deleted) {
    id
    name
    user {
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
