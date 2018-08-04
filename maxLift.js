const rs = require("./mockUser");

/**
 * =========================================================
 * 
 *                    MAX LIFT FUNCTIONS
 * 
 * =========================================================
 */

/**
 * 
 *      LEGACY TO BE REMOVED
 * 
 * 
 * Set currentLift to user input argument value
 * 
 * @param {string} maxLift value to save to individual user instance.
 * 
 * @return {string} Value of new liftType and maxLift
 * 
 * 
 *      LEGACY TO BE REMOVED
 */
function setMaxLift() {
  let userVars = rs.getUservars(rs.currentUser());
  let currentLift = userVars.currentLift;
  rs.setUservar(rs.currentUser(), currentLift, String(arguments[0]));
  
  // Call normalizeUnits after this call
  // Todo -- remove this shit. cruft
  return "Your new " + currentLift + " is " + userVars[currentLift];
}

/**
 * TODO -- TEST THIS FUNCTION! ISN'T IN THE BOT YET
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

  if (typeof Number(userMaxLiftInput) !== "number") {
    rs.reply(rs.currentUser(), "back")
    return "Sorry, I need a number! Just enter something like, 100. Try again!"
  }

  rs.setUservar(rs.currentUser(), currentLift, userMaxLiftInput);
  rs.reply(rs.currentUser(), "continue");
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