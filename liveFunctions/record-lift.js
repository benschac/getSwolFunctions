/**
 * Convert units to short hand
 * 
 * @return {string} kgs|lbs
 */
function getUserUnit() {
  const userVars = rs.getUservars(rs.currentUser());
  const units = userVars.units

  return units === "metric" ? "kgs" : "lbs";
}

/**
 * Check if user value is a Number
 * 
 * @return {reply} trigger rejecting or confirming user input
 */
function checkMaxLiftValue() {
  const userVars = rs.getUservars(rs.currentUser());
  const currentLift = userVars.currentLift;

  if (Number(userVars[currentLift])) {
    return rs.reply(rs.currentUser(),'confirm');
  } else {
    return rs.reply(rs.currentUser(),'tryagainmaxliftvalue');
  }
}


/**
 * Gives user the converted unit weight and unit type
 * of the differing unit
 * 
 * @return {string}
 */
function convertedCurrentLiftValue() {
  const toKilos = 0.453592;
  const toPounds = 2.20462;
  let convert;
  let convertedUnits;

  const userVars = rs.getUservars(rs.currentUser());
  const units = userVars.units;
  const currentLift = userVars.currentLift;

  if (units === "metric") {
    convert = Math.ceil(toPounds * Number(userVars[currentLift]));
    convertedUnits = "lbs"
  } else {
    convert = Math.ceil(toKilos * Number(userVars[currentLift]));
    convertedUnits = "kgs"
  }

  return convert + " " + convertedUnits;
}



