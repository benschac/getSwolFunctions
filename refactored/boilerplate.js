const rs = require('../../mockUser'),
      _  = require('lodash')
    ;

/**
 * 
 */
function boilerplate() {
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
}


module.exports = boilerplate;