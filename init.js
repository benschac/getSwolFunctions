const _ = require('lodash');


/**
 * =========================================================
 * 
 *              MOCK USER DATA & DEXTER METHODS
 * 
 * =========================================================
 */
const users = [
     {
      "someuuidofsomesort": {
        name: "Benjamin Schachter",
        userVars: {
          currentLift: "deadlift",
          deadlift: "200",
          benchpress: "333",
          units: "metric",
        }
      }
     },
     {
       // Some other user
     }
   ];

const botVariables = {
  liftTypes: ["deadlift", "benchpress"]
}
    


  /**
   * Returns the bot user data inputted from the user
   * 
   * @return {string} the user
   */
  Rs.prototype.currentUser = function () {
    return Object.keys(this.user).toString();
  }

  /**
   * Return single user's data
   * 
   * @param {string} currentUser | uuid
   * 
   * @return {object} sing users data
   */
  Rs.prototype.getUservars = function (currentUser) {
    return this.user[currentUser].userVars;
  }

  /**
   * 
   * @param {string} currentUser 
   * @param {string} name 
   * @param {string} value
   * 
   * return {void}
   */
  Rs.prototype.setUservar = function(currentUser, name, value) {
    const userVars = this.getUservars(currentUser);
    userVars[name] = value;

    _.merge(this.getUservars(currentUser), userVars);
  }

  /**
   * 
   * @param {string} variable key to bot variable
   * 
   * @return {*} saved bot variable value 
   */
  Rs.prototype.getBotvar = function(variable) {
    return this.botVariables[variable];
  }

  function Rs(user, botVariables) {
    this.user = user;
    this.botVariables = botVariables;
  }

  let rs = new Rs(users[0], botVariables);
/**
 * =========================================================
 * 
 *                    MAX LIFT FUNCTIONS
 * 
 * =========================================================
 */

/**
 * Set currentLift to user input argument value
 * 
 * @param {string} maxLift value to save to individual user instance.
 * 
 * @return {string} Value of new liftType and maxLift
 */
function setMaxLift() {
  let userVars = rs.getUservars(rs.currentUser());
  let currentLift = userVars.currentLift;
  rs.setUservar(rs.currentUser(), currentLift, String(arguments[0]));
  
  // Call normalizeUnits after this call
  return "Your new " + currentLift + " is " + userVars[currentLift];
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

/**
 * =========================================================
 * 
 *                 LIFT CALCULATOR FUNCTIONS
 * 
 * =========================================================
 */


/**
 * Return calculations of common percents of max lift and plates needed.
 * 
 * @return {string} of calculations and plate combinations
 */
function calculateLifts () {
      var userVars = rs.getUservars(rs.currentUser());
      var liftType = userVars.currentLift;
      var maxLift = userVars[liftType];
      // Hardcoded to male users barbell weight in KG for the moment.
      // Todo -- create a conversion function for M|F & KG | LBS
      var barBellWeight = 20;
      // Todo -- this can be an optional range.  Remove hardcode
      let commonLiftPercentage    = [.30, .35, .40, .45, .50, .55, .60, .65, .70, .75, .80, .85, .90, .95];
      let calculatedLiftPercents  = commonLiftPercentage.map(liftPercentage);
      let platesToLoad            = calculatedLiftPercents.map(getPlates);
  
      // ugly -- not I have some weird bug in my mapping function i need to fix l8r
      var readableLifts = [];
  
      /**
       * Calculates a lift total based on percent of maxLift
       * 
       * Curious if I can turn this into a helper function
       * 
       * @param {number} percent of max lift
       * 
       * @return {number} percent of lift based of maxLift
       */
      function liftPercentage(percent) {
        return Math.round((maxLift * percent) * 10 ) / 10;
      }
  
      /**
       * Calculates the plates needed for calculated lift
       * 
       * @param {number} liftWeight
       * 
       * @return {string} of colors for each side of barbell plates.
       */
      function getPlates(liftWeight) {
        var plateWeightSingleSide = (liftWeight - barBellWeight) / 2;

        // Hard Coded KG Plates.
        var plates = [{red: 25}, {blue: 20}, {yellow: 15}, {green: 10}, {white: 5}, {small_red: 2.5}, {small_blue: 2}, {small_yellow: 1.5}, {small_green: 1}, {small_white: .5}];
        var plateIndex = 0;
        var platesToLoad = [];
  
        while(plateWeightSingleSide >= .25) {
          // There's a better way to key for this value.
          var plateType   = Object.keys(plates[plateIndex])[0];
          var plateWeight = plates[plateIndex][plateType];
          
          if((plateWeightSingleSide - plateWeight) >= 0) {
            platesToLoad.push(plateType);
            plateWeightSingleSide -= plateWeight;
          } else if (plateWeightSingleSide <= .25) {
            break;
          } else {
            Math.min(plateIndex++, plates.length);
          }
        }
        
  
        return platesToLoad.join(' ');
      }
  
      /**
       * 
       * @param {float} decimal to convert
       * 
       * @return {string} formatted percent string
       */
      function convertDecimalToStringPercent(decimal) {
        var string = ((decimal * 100) + "%");
        return string.substr(0, 4);
      }
  
      for (let i = 0; i < commonLiftPercentage.length; i++) {
        readableLifts.push(
          convertDecimalToStringPercent(commonLiftPercentage[i])
          + " " + 
          calculatedLiftPercents[i] + "kg " 
          + platesToLoad[i] + " \n"
        );
      }
  
      return readableLifts.join(' ');
}


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

console.log(getAllMaxLifts());