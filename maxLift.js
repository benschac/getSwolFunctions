const _  = require('lodash');
const rs = require("./mockUser");

/**
 * =========================================================
 * 
 *                    MAX LIFT FUNCTIONS
 * 
 * =========================================================
 */


 /**
  * Get the user specified unit to present to the user
  * 
  * @return {string} kilos|pounds
  */
 function getUserUnit() {
  const userVars = rs.getUservars(rs.currentUser());
  const units = userVars.units

  return units === "metric" ? "Kilos" : "Pounds";
 }


//  /**
//   * Convert previous maxLifts to new values based off previous entries
//   */
 function convertMaxLifts() {
   const lifts = ["deadlift", "benchpress", "hangclean", "backsquat", "frontsquat", "overheadsquat", "snatch", "clean and jerk", "overhead press", "hangclean"];


   const toKilos = 0.453592;
   const toPounds = 2.20462;

   const userVars = rs.getUservars(rs.currentUser());
   const units = userVars.units;
   const convert = units === 'metric' ? toPounds : toKilos;

   lifts.forEach(lift => {
     if(_.get(userVars, [lift], false)) {
      rs.setUservar(rs.currentUser(), lift, Math.round(convert * userVars[lift]));
     }
   })

   console.log(rs.getUservars(rs.currentUser()));
   rs.reply(rs.currentUser(), 'allmaxlifts');
 }



 /**
  * If user doesn't know there maxes give a generic base amount for the avg lifter
  * 
  * @return {void} call get all max lifts
  */
 function baseLineLifts() {
  const lifts = ["deadlift", "benchpress", "hangclean", "backsquat", "frontsquat", "overheadsquat", "snatch", "clean and jerk", "overhead press", "hangclean"];
  const baseLineLiftsMale = {};
  const baseLineLiftsFelmale = {};
  const userVars = rs.getUservars(rs.currentUser());


 }


 /**
  * Checks if the inputted value is a number type. Directs user to change value
  * If not.
  * 
  * @return {reply|void} 
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
 * TODO -- TEST THIS FUNCTION! ISN'T IN THE BOT YET
 *
 * Record maxlifts with error handling
 * 
 * @param {string} userMaxLiftInput the user inputted value
 * 
 * @return {void|string} error if the input is not a number
 */
function recordMaxLift() {
  let userVars = rs.getUservars(rs.currentUser());
  let currentLift = userVars.currentLift;
  // NOTE CHANGE TO ARGS WHEN PLACING IN BOT
  let userMaxLiftInput = arguments[0];
  if (Number(userMaxLiftInput) > 1) {
    return "Sorry, I need a positive number! Just enter something like, 100. Try again!"
  } else {
    rs.setUservar(rs.currentUser(), currentLift, userMaxLiftInput);
    return "hit accepted user input"
  }
}
   
/**
 * Current Max Lift
 * 
 * Get maximum lift from current user, currentLift
 * 
 * @return {number} maxLift for the selected currentLift of user
 */
function currentMaxLift() {
  var userVars = rs.getUservars(rs.currentUser());
  var liftType = userVars.currentLift;
  var maxLift = userVars[liftType];
  
  // Dumby data should return 200
  return maxLift;
};

/**
 * Return all user recorded maxlifts
 * 
 * @ return {string} of all user inputted maxLifts
 */
function getAllMaxLifts() {
  const lifts = rs.getBotvar("liftTypes");
  const userVars = rs.getUservars(rs.currentUser());

  return lifts.map(lift => lift + " " + userVars[lift] + " \n").join("");
}

console.log(convertMaxLifts());