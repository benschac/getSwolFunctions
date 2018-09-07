const rs = require('../../mockUser'),
      _  = require('lodash')
    ;

/**
 * 
 * ==================================================================================
 * 
 * 
 *                                  TO FUTURE BENJAMIN,
 *                                        MAYBE,
 *                                  PUT THIS IN AN API
 * 
 * 
 * ==================================================================================
 */

/**
 * Get Common Lift Percentages from MaxLift that was set by the user
 */
function calculateLifts() {
  /**
   * Start RiveScript | Boiler Plate
   */
  const cu                     = rs.currentUser(),
        botVars                = rs.getBotvars(),
        userVars               = rs.getUservars(cu),
      
  /**
   * End RiveScript | Boiler Plate
   */
  
        currentLift            = userVars.currentLift,
        maxLift                = userVars[currentLift],
        barBellConfiguration   = botVars.barBellConfig,
        minimumRemainingConfig = {"metric": .5, "imperial": 1.5},
        minimumRemainingWeight = minimumRemainingConfig[userVars.units]
      ;

    let barBellWeight          = barBellConfiguration[userVars.gender][userVars.units]
        commonLiftPercentage   = [.30, .35, .40, .45, .50, .55, .60, .65, .70, .75, .80, .85, .90, .95],
        calculatedLiftPercents = commonLiftPercentage.map(percent => (Math.round((maxLift * percent) * 10 ) / 10)),
        platesToLoad           = calculatedLiftPercents.map(getPlates)
      ;

// ugly -- not I have some weird bug in my mapping function i need to fix l8r
  var readableLifts = [];
  
  /**
   * Calculates the plates needed for calculated lift
   * 
   * @param {number} liftWeight
   * 
   * @return {string} of colors for each side of barbell plates.
   */
  function getPlates(liftWeight) {
    let plateWeightSingleSide = (liftWeight - barBellWeight) / 2;
    let plates;

    if (userVars.units === "metric") {
      plates = botVars.metricPlateConfig;
    } else {
      plates = botVars.imperialPlateConfig;
    }

    let plateIndex = 0;
    let platesToLoad = [];
    let formattedPlateCount = [];
      
    while(plateWeightSingleSide >= .25) {
      let plateType   = Object.keys(plates[plateIndex]);
      let plateWeight = plates[plateIndex][plateType];
      
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
      const theCount = plateCount[plate];
      formattedPlateCount.push(`${theCount} ${plate} ${theCount > 1 ? "s" : ""}`);
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
  function decimalPercent(decimal) {
    let string = ((decimal * 100) + "%");
    return string.substr(0, 4);
  }

  // TODO ---- SHOULD CHANGE THIS TO A Array.prototype.map()
  for (let i = 0; i < commonLiftPercentage.length; i++) {
    const theLiftPercentage = commonLiftPercentage[i];
    readableLifts.push(
      `
      ${decimalPercent(theLiftPercentage)} 
      ${calculatedLiftPercents[i]} 
      ${botVars.unitShrt[userVars.units]} 
      ${platesToLoad[i]} \n"
      `
    );
  }

  return readableLifts.join(' ');
}


module.exports = calculateLifts;