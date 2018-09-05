/**
 * All user inputted maxlifts
 * 
 * @return {string} all of the lifts
 */
function getAllMaxLifts() {
  const lifts = ["deadlift", "benchpress", "backsquat", "frontsquat", "overheadsquat", "snatch", "clean and jerk", "overhead press", "hangclean"];
  const userVars = rs.getUservars(rs.currentUser());
  const units = userVars.units;
  
  return lifts.map(lift => lift + " "+ _.get(userVars, [lift], "no maxlift entered") + "\n").join("").concat("All lifts are in " + units);
}


/**
 * Set all lifts to new values based on user inputted unit
 */
function convertAllMaxLiftsMeasurement() {
  const lifts = ["deadlift", "benchpress", "backsquat", "frontsquat", "overheadsquat", "snatch", "clean and jerk", "overhead press", "hangclean"];


   const toKilos = 2.20462;
   const toPounds = 0.453592;

   const userVars = rs.getUservars(rs.currentUser());
   const units = userVars.units;
   const convert = units === 'metric' ? toPounds : toKilos;

   lifts.forEach(lift => {
     if(_.get(userVars, [lift], false)) {
      rs.setUservar(rs.currentUser(), lift, Math.round(convert * userVars[lift]));
     }
   })

   return rs.reply(rs.currentUser(), 'all max lifts');
}