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
   * Start RiveScript | Boiler Plate
   */
  const cu        = rs.currentUser(),
        botVars   = Object(rs.getBotvars()),
        userVars  = rs.getUservars(cu)
        ;
  
  /**
   * End RiveScript | Boiler Plate
   */
  
  return botVars.lifts.split(',')
          .map(lift => {
            const theLiftAmount = _.get(userVars, [lift], "no maxlift yet");
            return `${lift} --> ${theLiftAmount} \n`;
          })
          .join("")
          .concat(`All lifts are in ${botVars.unitLng[userVars.units]}`);
}


module.exports = getAllMaxLifts;

