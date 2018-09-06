const rs = require('../../mockUser'),
      _  = require('lodash')
    ;


/**
 * Converts all inputs to new unit measurement
 * 
 * @return {string} reply to new inputs
 */
function convertAllMaxLifts() {
  /**
   * Start RiveScript | Boiler Plate
   */
  const cu        = rs.currentUser(),
        botVars   = rs.getBotvars(),
        userVars  = rs.getUservars(cu)
      ;
  /**
   * End RiveScript | Boiler Plate
   */

   const convert = userVars.units === 'metric' 
   ? botVars.toPounds 
   : botVars.toKilos
   ;

  botVars.lifts.split(', ')
    .map(lift => {
      if (_.get(userVars, [lift], false)) {
        rs.setUservar(
          cu,
          lift,
          Math.round(userVars[lift] * convert)
        );
      }
    });
  
  rs.setUservar(cu, 'units', userVars.units === 'metric' ? 'imperial' : 'metric');
  return rs.reply(cu, 'maxlifts');
}

console.log(convertAllMaxLifts());

module.exports = convertAllMaxLifts;
