const rs                 = require('../../mockUser'),
      convertAllMaxLifts = require('./index.js')
    ;


describe('convertAllMaxLifts', () => {
  it('should trigger maxlifts', () => {
    expect(convertAllMaxLifts()).toBe('maxlifts');
  });
});