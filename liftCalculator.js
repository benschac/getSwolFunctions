const rs = require("./mockUser");

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
      var plates = [{red: 25}, {"blue": 20}, {yellow: 15}, {green: 10}, {white: 5}, {small_red: 2.5}, {small_blue: 2}, {small_yellow: 1.5}, {small_green: 1}, {small_white: .5}];

      var plateIndex = 0;
      var platesToLoad = [];
      var formattedPlateCount = [];
        
      while(plateWeightSingleSide >= .25) {
        var convertPlate = {red: "Large Red", blue: "Large Blue", yellow: "Large Yellow", green: "Large Green", white: "Large White", small_red: "Small Red", small_blue: "Small Blue", small_yellow: "Small Yellow", small_green: "Small Green", small_white: "Small White"};

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
      
      let plateCount = platesToLoad.reduce((prev, curr) => {
        prev[curr] ? prev[curr] += 1 : prev[curr] = 1;
        return prev;
      }, {});

      for(let plate in plateCount) {
        formattedPlateCount.push((plateCount[plate] + " " +  convertPlate[plate]) + (plateCount[plate] > 1 ? "s" : ""));
      }

      return formattedPlateCount.join(', ');
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
        convertDecimalToStringPercent(commonLiftPercentage[i]) + " " + calculatedLiftPercents[i] + "kg " + " " + platesToLoad[i] + " \n"
      );
    }
  
    return readableLifts.join(' ');
}

console.log(calculateLifts());