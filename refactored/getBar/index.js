const rs = require('../../mockUser'),
      _  = require('lodash')
    ;

/**
 * Get Weight of bar based on user gender and unit
 * 
 * @return {string} the weight of the bar
 */
function getBar() {
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

  
   let bar;
    console.log(userVars.gender);
   switch(userVars.gender) {
    case 'female':
      return bar = userVars.units === 'metric' 
        ? botVars.kgFemaleBar 
        : botVars.lbFemaleBar;
    case 'male':
      return bar = userVars.units === 'metric' 
        ? botVars.kgMaleBar 
        : botVars.lbMaleBar;
    default:
      bar = 'no gender set';
      break;
   } 

   return bar;
}

module.exports = getBar;