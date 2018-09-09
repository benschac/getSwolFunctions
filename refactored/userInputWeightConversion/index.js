const rs = require('../../mockUser'),
      _  = require('lodash')
    ;

/**
 * Will take opposite unit measurement and convert user inputted value;
 * 
 * @param (optional) {string} the value to convert
 * 
 * @return {string} converted value
 */
function weightConversion() {
  /**
   * Start RiveScript | Boiler Plate
   */
  const cu        = rs.currentUser(),
        botVars   = rs.getBotvars(),
        userVars  = rs.getUservars(cu),
        userInput = _.get(arguments,'0', false),
        toConvert = userInput || userVars[userVars.currentLift]
        ;
  
  if(!Number(toConvert)) {
    return rs.reply(rs.currentUser(), 'invalidinput');
  }

  if (toConvert <= 0) {
    return rs.reply(rs.currentUser(), 'invalidinput');
  }
  /**
   * End RiveScript | Boiler Plate
   */

   /**
    * 
    * @param {string} unit (imperial | metric)
    * 
    * @return {string} converted amount
    */
   function convertWeight(unit) {
    return unit === 'imperial'
    ? `${String(Math.round(botVars.toKilos * toConvert))}kg`
    : `${String(Math.round(botVars.toPounds * toConvert))}lb`
   }
  
   return userInput 
    ? convertWeight(userVars.quickConvertUnits)
    : convertWeight(userVars.units)
    ;
};

module.exports = weightConversion;