const rs = require("./mockUser");


let weightConverter = {
  /**
   * Converts a Metric Unit to an Imperial Unit
   * 
   * @return {number} the converted weight
   */
  convertCurrentLift: function () {
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
  },
  /**
   * 
   * @param {string} unit [metric|imperial]
   * 
   * @return {void} sets rs userVales to converted values
   */
  setLiftsToConvertedValue: function (unit) {
    const lifts = ["deadlift", "benchpress", "backsquat", "hangclean"];

    /**
     * This is an ugly copy - paste. Curious if I can use object notation
     * and call the function as a function
     */
    function convertCurrentLift(currentLift) {
      const toKilos = 0.453592;
      const toPounds = 2.20462;
      let convert;
    
      const userVars = rs.getUservars(rs.currentUser());
    
      if (userVars.units === "metric") {
        convert = Math.ceil(toPounds * Number(userVars[currentLift]));
      } else {
        convert = Math.ceil(toKilos * Number(userVars[currentLift]));
      }
    
      return convert;
    }

    lifts.map(lift => rs.setUservar(rs.currentUser(), lift, convertCurrentLift(lift)));

    rs.setUservar(rs.currentUser(), 'units', unit);
  } 
}

module.exports = weightConverter;