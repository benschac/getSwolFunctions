const rs                        = require('../../mockUser'),
      convertAllMaxLifts        = require('./index.js'),
      userInputWeightConversion = require('../userInputWeightConversion')
    ;


describe('converAllMaxLifts trigger', () => {
  it('should be maxlifts', () => {
    expect(convertAllMaxLifts()).toBe('maxlifts');
  });
});



// describe('convertAllMaxLifts from', () => {
  


//   it('should convert kgs -> lbs', () => {
//     let userVars;
//     beforeAll(() => {
//       rs.setUservar(rs.currentUser(), 'units', 'metric');
//       convertAllMaxLifts();
//       userVars = rs.getUservars(rs.currentUser());
//       console.log(userVars);
//     });

//     // expect('all inputted weight', () => {
//     // });
//   });
// });