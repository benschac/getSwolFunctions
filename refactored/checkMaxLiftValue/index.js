const rs = require('../../mockUser'),
      _  = require('lodash')
    ;

/**
 * Checks User Input for their max lifts
 */
function checkMaxLiftInput() {
  /**
   * Start RiveScript | Boiler Plate
   */
  const userInput = isDev ? arguments[0] : args[0],
        cu        = rs.currentUser(),
        userVars  = rs.getUservars(cu)
      ;
  
  if(!Number(userInput)) {
    return rs.reply(rs.currentUser(), 'tryagainmaxinputvalue');
  }

  if (userInput <= 0) {
    return rs.reply(rs.currentUser(), 'invalidinput');
  }
  /**
   * End RiveScript | Boiler Plate
   */  

  rs.setUservar(cu, userVars[userVars.currentLift], userInput);

  return rs.reply(cu, 'confirm');
}


module.exports = checkMaxLiftInput;