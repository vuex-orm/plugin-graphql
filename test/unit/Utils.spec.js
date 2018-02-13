import { capitalizeFirstLetter } from 'app/utils';

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalizeFirstLetter('testFooBar')).toEqual('TestFooBar');
    expect(capitalizeFirstLetter('TestFooBar')).toEqual('TestFooBar');
  })
});
