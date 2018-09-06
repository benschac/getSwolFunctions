const rs                        = require('../../mockUser'),
      convertAllMaxLifts        = require('./index.js')
    ;


describe('convertAllMaxLifts', () => {
  
  
  // beforeAll(() => {
    it('should trigger maxlifts', () => {
      expect(convertAllMaxLifts()).toBe('maxlifts');
    // });
  })


  // need to work on this
  // it('should flip unit', () => {
  //   expect(rs.getUservars(rs.currentUser()).units).not.toBe(unitsBefore);
  // });



});

describe('convertAllMaxLifts from kgs -> lbs', () => {
  
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