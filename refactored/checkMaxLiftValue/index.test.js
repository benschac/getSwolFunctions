const rs                = require('../../mockUser'),
      checkMaxLiftInput = require('./index.js')
    ;

describe('checkMaxLiftInput rejection', () => {
  it('should reject values that arent numbers', () => {
    expect(checkMaxLiftInput('benajmin')).toBe('tryagainmaxinputvalue');
  });

  it('should reject negative numbers', () => {
    expect(checkMaxLiftInput('-34')).toBe('invalidinput');
  });
});

describe('checkMaxLiftInput success', () => {
  beforeAll(() => {
    rs.setUservar(rs.currentUser(), 'currentLift', 'snatch');
  });

  it('should save to the correct userVariable', () => {
    expect(checkMaxLiftInput('100')).toBe('confirm');
  });
});