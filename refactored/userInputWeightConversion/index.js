const rs = require('../../mockUser');
const isDev = true;

/**
 * Will take opposite unit measurement and convert user inputted value;
 * 
 * @param {string} the value to convert
 */
function userInputWeightConversion() {
  /**
   * Start RiveScript | Boiler Plate
   */
  const userInput = isDev ? arguments[0] : args[0],
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

   return userVars.units === 'imperial'
   ? userInput + 'lb to ' + String(Math.round(botVars.toKilos * userInput)) + 'kg'
   : userInput + 'kg to ' + String(Math.round(botVars.toPounds * userInput)) + 'lb'
};

module.exports = userInputWeightConversion;