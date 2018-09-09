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
          `${lift} -> ${_.get(userVars, [lift], "no max lift")} \n`)
          .join("")
          .concat(`All lifts are in ${
            userVars.units === 'metric' ? 'kilos' : 'pounds'
          }\n \nhit that hammy(burger) button in the corner if you want to get back to the main menu`)
          ;
}


console.log(getAllMaxLifts());

module.exports = getAllMaxLifts;

