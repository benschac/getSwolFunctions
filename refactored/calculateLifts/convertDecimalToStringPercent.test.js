const convertDecimalToStringPercent = require('./index.js').convertDecimalToStringPercent;


describe('convertDecimal to string', () => {
  it('should work with 10s and append %', () => {
    expect(convertDecimalToStringPercent(.50)).toBe('50%');
  });

  it('should work with 5 numbers', () => {
    expect(convertDecimalToStringPercent(.55)).toBe('55%');
  });

  it('should work with 9 numbers', () => {
    expect(convertDecimalToStringPercent(.59)).toBe('59%');
  });

  it('should work with 0 numbers', () => {
    expect(convertDecimalToStringPercent(0)).toBe('0%');
  });

  it('should work with 100 numbers', () => {
    expect(convertDecimalToStringPercent(1)).toBe('100%');
  });

  it('should round up', () => {
    expect(convertDecimalToStringPercent(.235)).toBe('24%');
  });
});