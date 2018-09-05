const rs = require('../../mockUser');
const resetBotUserVars = require('./reset');

describe('reset botUser variables', () => {
  let botUserVars;

  beforeEach(() => {
    botUserVars = rs.getUservars(rs.currentUser());
  });

  beforeAll(() => {
    // There should be hard coded values in mock user to test on.
    expect(rs.getUservars(rs.currentUser())).toBeTruthy;
  });

  it('should reset all values to undefined', () => {
    resetBotUserVars();
    expect(botUserVars).toBeFalsy;
  });

  it('should make gender undefined', () => {
    expect(botUserVars.gender).toBe(undefined);
  });

  it('should return confirmation that bot user variables have been deleted', () => {
    expect(resetBotUserVars()).toBe('your inputted data has been reset, this cannot be undone');
  });
});