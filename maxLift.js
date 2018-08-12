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

console.log(getAllMaxLifts() + "\n" + currentMaxLift());