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

  console.log(toConvert);
  if (!Number(toConvert)) {
    console.log('fuck');
    return rs.reply(rs.currentUser(), 'invalidinput');
  }

  if (userVars.units === "metric") {
    convert = Math.ceil(toPounds * Number(toConvert));
  } else {
    convert = Math.ceil(toKilos * Number(toConvert));
  }

  return convert;
}

console.log(convertUserValue('heya'));

module.exports = convertUserValue;