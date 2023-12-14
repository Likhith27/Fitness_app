// ```javascript
// Import the code you want to test.
const add = require('./add');

// Create a test suite.
describe('add', () => {

  // Create a few test cases.
  it('should add two numbers', () => {
    // Arrange
    const expected = 3;
    const actual = add(1, 2);

    // Act

    // Assert
    expect(actual).toEqual(expected);
  });

  it('should add three numbers', () => {
    // Arrange
    const expected = 6;
    const actual = add(1, 2, 3);

    // Act

    // Assert
    expect(actual).toEqual(expected);
  });

});
// ```