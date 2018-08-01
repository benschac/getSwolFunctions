const rs = require("./mockUser");

/**
 * Converts a Metric Unit to an Imperial Unit
 * 
 * @return {number} the converted weight
 */
function convertCurrentLift() {
  const toKilos = 0.453592;
  const toPounds = 2.20462;
  let convert;

  const userVars = rs.getUservars(rs.currentUser());
  const currentLift = userVars.currentLift;

  if (userVars.units === "metric") {
    convert = Math.ceil(toPounds * Number(userVars[currentLift]));
  } else {
    convert = Math.ceil(toKilos * Number(userVars[currentLift]));
  }

  return convert;
}

console.log(convertCurrentLift());

