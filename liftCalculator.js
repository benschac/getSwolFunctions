const _ = require("lodash");
const rs = require("./mockUser");
const setLiftsToConvertedValue = require("./weightConverter").setLiftsToConvertedValue;

/**
 * =========================================================
 * 
 *                 LIFT CALCULATOR FUNCTIONS
 * 
 * =========================================================
 */


 /**
 *  Check if valid maxlift is entered before rendering lift calculations
 * 
 *  @return {void} redirect user to enter maxlift trigger or render lift percents
 */
function isMaxLift() {
  const userVars = rs.getUservars(rs.currentUser());

}


/**
 * Return calculations of common percents of max lift and plates needed.
 * 
 * @return {string} of calculations and plate combinations
 */
function calculateLifts () {
  var userVars = rs.getUservars(rs.currentUser());
  var liftType = userVars.currentLift;
  var maxLift = userVars[liftType];
  const barBellConfiguration = {"male": {"metric": 20, "imperial": 44}, "female": {"metric": 15, "imperial": 33}};
  const minimumRemainingWeightConfiguration = {"metric": .5, "imperial": 1.5};
  const minimumRemainingWeight = minimumRemainingWeightConfiguration[userVars.units];

  barBellWeight = barBellConfiguration[userVars.gender][userVars.units]
  // Todo -- this can be an optional range.  Remove hardcode
  let commonLiftPercentage    = [.30, .35, .40, .45, .50, .55, .60, .65, .70, .75, .80, .85, .90, .95];
  let calculatedLiftPercents  = commonLiftPercentage.map(liftPercentage);
  let platesToLoad            = calculatedLiftPercents.map(getPlates);

// ugly -- not I have some weird bug in my mapping function i need to fix l8r
  var readableLifts = [];

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
    let plates;

    if (userVars.units === "metric") {
      plates = [{"Large Red": 25}, {"Large Blue": 20}, {"Large Yellow": 15}, {"Large Green": 10}, {"Large White": 5}, {"Small Red": 2.5}, {"Small Blue": 2}, {"Small Yellow": 1.5}, {"Small Green": 1}, {"Small White": .5}];
    } else {
      plates = [{"45": 45}, {"35": 35}, {"25": 25}, {"10": 10}, {"5": 5}, {"2.5": 2.5}, {"1.25": 1.25}];
    }

    var plateIndex = 0;
    var platesToLoad = [];
    var formattedPlateCount = [];
      
    while(plateWeightSingleSide >= .25) {
      var plateType   = Object.keys(plates[plateIndex]);
      var plateWeight = plates[plateIndex][plateType];
      
      if((plateWeightSingleSide - plateWeight) >= 0) {
        platesToLoad.push(plateType);
        plateWeightSingleSide -= plateWeight;
      } else if (plateWeightSingleSide <= minimumRemainingWeight) {
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
      formattedPlateCount.push((plateCount[plate] + " " +  plate) + (plateCount[plate] > 1 ? "s" : ""));
    }

    if(!formattedPlateCount.length) {
      formattedPlateCount.push("<= Bar Weight")
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
      convertDecimalToStringPercent(commonLiftPercentage[i]) + " " + calculatedLiftPercents[i] +  (userVars.units === "metric" ? "kgs " : "lbs ") + " " + platesToLoad[i] + " \n"
    );
  }

  return readableLifts.join(' ');
}

// setLiftsToConvertedValue("imperial")
console.log(rs.user);
console.log(calculateLifts());