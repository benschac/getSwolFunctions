/**
 * Convert user input to different value
 * 
 * @return {string} the converted value
 */
function convertUserValue() {
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