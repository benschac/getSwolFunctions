const rs = require('../../mockUser'),
      _  = require('lodash')
    ;

/**
 * Return all user inputted max lifts
 * 
 * @return {string} of max lifts
 */
function getAllMaxLifts() {
/**
 * Return all user inputted max lifts
 * 
 * @return {string} of max lifts
 */

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
  
  return botVars.lifts.split(', ')
          .map(lift => 
          `${lift} -> ${_.get(userVars, [lift], "no maxlift yet")} \n`)
          .join("")
          .concat(`All lifts are in ${
            userVars.units === 'metric' ? 'kilos' : 'pounds'
          }`);
}


console.log(getAllMaxLifts());

module.exports = getAllMaxLifts;

