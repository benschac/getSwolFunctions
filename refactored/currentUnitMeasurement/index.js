const rs = require('../../mockUser'),
      _  = require('lodash')
    ;

/**
 * Return pounds | lbs <-> kilos | kgs
 * 
 * @param {string} type (long|short)
 * 
 * @return {string} currentUnit of Measure
 */
function currentUnitMeasurement() {
  /**
   * Start RiveScript | Boiler Plate
   */
  const type      = arguments[0],
        cu        = rs.currentUser(),
        userVars  = rs.getUservars(cu)
        ;
  
  /**
   * End RiveScript | Boiler Plate
   */  
  
    
   if(type === 'short') {
     return userVars.units === 'metric' ? 'kgs' : 'lbs';
   } else {
     return userVars.units === 'metric' ? 'kilos' : 'pounds';
   }
}


module.exports = currentUnitMeasurement;