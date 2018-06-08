import { downcaseFirstLetter, upcaseFirstLetter } from 'app/support/utils';

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of a string', () => {
    expect(upcaseFirstLetter('testFooBar')).toEqual('TestFooBar');
    expect(upcaseFirstLetter('TestFooBar')).toEqual('TestFooBar');
  });

  it('down cases the first letter of a string', () => {
    expect(downcaseFirstLetter('testFooBar')).toEqual('testFooBar');
    expect(downcaseFirstLetter('TestFooBar')).toEqual('testFooBar');
  });
});
