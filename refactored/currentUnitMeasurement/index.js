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
  const type      = isDev ? arguments[0] : args[0],
        cu        = rs.currentUser(),
        botVars   = rs.getBotvars(),
        userVars  = rs.getUservars(cu)
        ;
  
  if(!Number(userInput)) {
    return rs.reply(rs.currentUser(), 'invalidinput');
  }

  if (userInput <= 0) {
    return rs.reply(rs.currentUser(), 'invalidinput');
  }
  /**
   * End RiveScript | Boiler Plate
   */  

   const botVarsObject = JSON.parse(botVars);

   if(type === 'short') {
     return botVarsObject['unitShrt'][userVars.units];
   } else {
     return botVarsObject['unitLng'][userVars.units];
   }
}


module.exports = currentUnitMeasurement;