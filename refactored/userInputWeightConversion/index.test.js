const rs                                  = require('../../mockUser'),
      userInputWeightConversionCalculator = require('./index'),
      reset                               = require('../reset/reset.js');
      ;


describe('user input weight unit conversion reject', () => {
  it('should reject strings', () => {
    expect(userInputWeightConversionCalculator('heya friend')).toBe('invalidinput');
  });

  it('should reject values less than 0', () => {
    expect(userInputWeightConversionCalculator('0')).toBe('invalidinput');
    expect(userInputWeightConversionCalculator('-50')).toBe('invalidinput');
  });
});

describe('default state', () => {
  beforeAll(() => {
    rs.setUservar(rs.currentUser(), 'units', undefined);
  });

  it('should be kg -> lbs if not set', () => {
    expect(userInputWeightConversionCalculator('45')).toBe('45kg to 99lb');
  })
});

describe('user input weight conversion kg -> lbs', () => {
  beforeAll(() => {
    // Set user variables to metric
    rs.getUservars(rs.currentUser());
    rs.setUservar(rs.currentUser(), 'units', 'metric');
  });

  it('should convert whole number kilograms to pounds', () => {
    expect(userInputWeightConversionCalculator('45')).toBe('45kg to 99lb');
    expect(userInputWeightConversionCalculator('100')).toBe('100kg to 220lb');
    expect(userInputWeightConversionCalculator('75')).toBe('75kg to 165lb');
  });

  afterAll(() => {
    // everything is undefined
    reset();
  });
});


describe('user input weight conversion lbs -> kgs', () => {
  beforeAll(() => {
    // Set user variables to imperial
    rs.getUservars(rs.currentUser());
    rs.setUservar(rs.currentUser(), 'units', 'imperial');
  });


  it('should convert whole number pounds to kilos', () => {
    expect(userInputWeightConversionCalculator('100')).toBe('100lb to 45kg');
    expect(userInputWeightConversionCalculator('200')).toBe('200lb to 91kg');
    expect(userInputWeightConversionCalculator('245')).toBe('245lb to 111kg');
  });
});