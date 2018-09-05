
/**
 * Convert from unit type to weightType
 * 
 * @return {string} 
 */
function normalizeUnits() {
  const measurementTypes = {metric: "kilos", imperial: "pounds"};
  const userVars = rs.getUservars(rs.currentUser());
  
  return measurementTypes[userVars.units]
}
