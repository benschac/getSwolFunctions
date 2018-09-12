const pluralize = require('./index').pluralize;


describe('should pluralize word based on input number', () => {
  it('should append an \'s\' to the end of a word', () => {
    expect(pluralize(2)).toBe("s");
  });

  it('should be empty with negative numbers', () => {
    expect(pluralize(-5)).toBe("");
  });

  it('should handle large numbers', () => {
    expect(pluralize(3495)).toBe("s");
  });

  it('should not append \'s\' if count is 1', () => {
    expect(pluralize(1)).toBe("");
  });
}); 