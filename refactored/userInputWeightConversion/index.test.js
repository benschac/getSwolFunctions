const rs                                  = require('../../mockUser'),
      weightConversionCalculator = require('./index'),
      reset                               = require('../reset/reset.js'),
      userInputWeightConversion           = require('../userInputWeightConversion/index.js')
      ;


describe('user input weight unit conversion reject', () => {
  it('should reject strings', () => {
    expect(weightConversionCalculator('heya friend')).toBe('invalidinput');
  });

  it('should reject values less than 0', () => {
    expect(weightConversionCalculator('0')).toBe('invalidinput');
    expect(weightConversionCalculator('-50')).toBe('invalidinput');
  });
});

describe('should round floats kg -> lb and let the user know', () => {
  beforeAll(() => {
    rs.setUservar(rs.currentUser(), 'units', 'metric');
  });

  expect(weightConversionCalculator('56.4')).toBe('124lb');
});

// describe('should round floats lb -> kg and let the user know', () => {
//   beforeAll(() => {
//     rs.setUservar(rs.currentUser(), 'units', 'imperial');
//   });

//   expect(weightConversionCalculator('124')).toBe('56');
// });

describe('default state', () => {
  beforeAll(() => {
    rs.setUservar(rs.currentUser(), 'units', 'metric');
  });

  it('should be kg -> lbs if not set', () => {
    expect(weightConversionCalculator('45')).toBe('99lb');
  })
});

describe('user input weight conversion kg -> lbs', () => {
  beforeAll(() => {
    // Set user variables to metric
    rs.getUservars(rs.currentUser());
    rs.setUservar(rs.currentUser(), 'quickConvertUnits', 'metric');  });

  it('should convert whole number kilograms to pounds', () => {
    expect(weightConversionCalculator('45')).toBe('99lb');
    expect(weightConversionCalculator('100')).toBe('220lb');
    expect(weightConversionCalculator('75')).toBe('165lb');
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
    rs.setUservar(rs.currentUser(), 'quickConvertUnits', 'imperial');
  });


  it('should convert whole number pounds to kilos', () => {
    expect(weightConversionCalculator('100')).toBe('45kg');
    expect(weightConversionCalculator('200')).toBe('91kg');
    expect(weightConversionCalculator('221')).toBe('100kg');
    expect(weightConversionCalculator('245')).toBe('111kg');
  });

  afterAll(() => {
    rs.setUservar(rs.currentUser(), 'units', 'metric');
  });
});

describe('can use botUser variable currentLift to convert units', () => {
  const userVars          = rs.getUservars(rs.currentUser()),
        currentLiftWeight = userVars['currentLift'],
        newWeight         = userInputWeightConversion(Number(currentLiftWeight))
      ;

  expect(weightConversionCalculator()).toBe(newWeight);
})