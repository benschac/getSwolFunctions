const _ = require('lodash');
const rs = require('./mockUser');


/**
 * 
 * =========================================================
 * 
 *    Utility Functions
 * 
 * =========================================================
 * 
 */

/**
 * The reset function to hard reset user botUser variables
 * that are set manually.
 */
function resetBotUser() {
  const userVars = rs.getUservars(rs.currentUser());
  Object.keys(userVars).forEach(userVar => {
    rs.setUservar(rs.currentUser(), userVar, undefined);
  });
}



/**
 * 
 * =========================================================
 * 
 *    Generic Conversion Functions
 * 
 * =========================================================
 * 
 */
function getUserLiftConversion() {
  const toKilos = 0.453592;
  const toPounds = 2.20462;
  let toConvert = args[0];
  let convert;

  const userVars = rs.getUservars(rs.currentUser());

  if (!Number(toConvert)) {
    rs.reply(rs.currentUser(), 'tryconversionagain');
  }

  if (userVars.units === "metric") {
    convert = Math.ceil(toPounds * Number(toConvert));
  } else {
    convert = Math.ceil(toKilos * Number(toConvert));
  }

  return convert;
  
}