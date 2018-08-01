const rs = require("./mockUser");

/**
 * =========================================================
 * 
 *                    UTILITY FUNCTIONS
 * 
 * =========================================================
 */

/**
 * Return a readable unit of measurement to user
 * 
 * @return {string} kilo | pound
 */
function normalizeUnits() {
  // Todo -- Should be a global variable
  const measurementTypes = {metric: "kilos", imperial: "pounds"}
  const userVars = rs.getUservars(rs.currentUser());

  // Dumby Data -- kilos
  return measurementTypes[userVars.units]
}

console.log(calculateLifts());