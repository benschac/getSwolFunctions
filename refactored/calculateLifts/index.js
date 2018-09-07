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
  const cu                       = rs.currentUser(),
        userVars                 = rs.getUservars(cu),
  /**
   * End RiveScript | Boiler Plate
   */  
        liftType                 = userVars.currentLift,
        maxLift                  = userVars[liftType],
        barBellConfiguration     = {"male": {"metric": 20, "imperial": 44}, "female": {"metric": 15, "imperial": 33}},
        minRemainingWeightConfig = {"metric": .5, "imperial": 1.5},
        minimumRemainingWeight   = minRemainingWeightConfig[userVars.units],
        barBellWeight            = barBellConfiguration[userVars.gender][userVars.units],
        metricPlates             = [{"Large Red": 25}, {"Large Blue": 20}, {"Large Yellow": 15}, {"Large Green": 10}, {"Large White": 5}, {"Small Red": 2.5}, {"Small Blue": 2}, {"Small Yellow": 1.5}, {"Small Green": 1}, {"Small White": .5}],
        imperialPlates           = [{"45": 45}, {"35": 35}, {"25": 25}, {"10": 10}, {"5": 5}, {"2.5": 2.5}, {"1.25": 1.25}]
      ;
  
  let   commonLiftPercentage     = [.30, .35, .40, .45, .50, .55, .60, .65, .70, .75, .80, .85, .90, .95],
        calculatedLiftPercents   = commonLiftPercentage.map(percent => (Math.round((maxLift * percent) * 10 ) / 10)),
        platesToLoad             = calculatedLiftPercents.map(getPlates)
      ;

// ugly -- not I have some weird bug in my mapping function i need to fix l8r
  //var readableLifts = [];

  /**
   * Append 's' if needed
   * 
   * @param {number} count 
   */
  function pluralize(count) {
    return (count > 1 ? "s" : "");
  }

  
  /**
   * Calculates the plates needed for calculated lift
   * 
   * @param {number} liftWeight
   * 
   * @return {string} of colors for each side of barbell plates.
   */
  function getPlates(liftWeight) {
    const plates           = userVars.units === "metric" ? metricPlates : imperialPlates,
          platesToLoad     = []
        ;
    let   weightSingleSide = (liftWeight - barBellWeight) / 2,
          plateIndex       = 0
        ;

      
    while(weightSingleSide >= .25) {
      let plateIdx    = plates[plateIndex],
          plateType   = Object.keys(plateIdx),
          plateWeight = plateIdx[plateType]
        ;
      
      if((weightSingleSide - plateWeight) >= 0) {
        platesToLoad.push(plateType);
        weightSingleSide -= plateWeight;
      } else if (weightSingleSide <= minimumRemainingWeight) {
        break;
      } else {
        Math.min(plateIndex++, plates.length);
      }
    }
    
    let plateCount = platesToLoad.reduce((prev, curr) => {
      prev[curr] ? prev[curr] += 1 : prev[curr] = 1;
      return prev;
    }, {});

    return Object.keys(plateCount)
          .map(type => {
            const countType = plateCount[type];
            return `${
              countType.length 
               ? "<= Bar Weight"
               : `${countType} ${type}${pluralize(countType)}`
             }`
          })
          .join(', ')
          ;
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

  return commonLiftPercentage.map((liftPercent, i) => {
    return `${convertDecimalToStringPercent(liftPercent)} ${calculatedLiftPercents[i]}${userVars.units === "metric" ? "kgs " : "lbs "} -> ${platesToLoad[i]}`;
  });
}
// calculateLifts();
console.log(calculateLifts());
module.exports = calculateLifts;