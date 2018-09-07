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
          "deadlift": "221",
          "benchpress": "185",
          "backsquat": "195",
          "frontsquat": "160",
          "overheadsquat": "100",
          "snatch": "100",
          "clean and jerk": "100",
          "overhead press": "100",
          "hangclean": "100",
          "units": "metric",
          "gender": "male"
        }
      }
     },
     {
      "someuuidofsomesort2": {
        name: "Rebecca Cohen",
        userVars: {
          currentLift: "deadlift",
          "deadlift": "221",
          "benchpress": "185",
          "backsquat": "195",
          "frontsquat": "160",
          "overheadsquat": "100",
          "snatch": "100",
          "clean and jerk": "100",
          "overhead press": "100",
          "hangclean": "100",
          "units": "imperial",
          "gender": "male",
          units: "metric",
          gender: "female"
        }
      }
     }
   ];

/**
 * User inputs 
 */
const botUserVariables = {
  liftTypes: [
    "deadlift",
    "benchpress",
    "backsquat",
    "frontsquat",
    "overheadsquat",
    "snatch",
    "clean and jerk",
    "overhead press",
    "hangclean"
  ]
}

/**
 * Bot wide variables
 */
const botBrainVars = {
 toKilos: 0.453592,
 toPounds: 2.20462,
 lifts: 'deadlift, benchpress, backsquat, frontsquat, overheadsquat, snatch, clean and jerk, overhead press, hangclean',
 barBellConfig: '{"male": {"metric": 20, "imperial": 44}, "female": {"metric": 15, "imperial": 33}}',
 metricPlateConfig: '[{"Large Red": 25}, {"Large Blue": 20}, {"Large Yellow": 15}, {"Large Green": 10}, {"Large White": 5}, {"Small Red": 2.5}, {"Small Blue": 2}, {"Small Yellow": 1.5}, {"Small Green": 1}, {"Small White": .5}]',
 imperialPlateConfig: '[{"45": 45}, {"35": 35}, {"25": 25}, {"10": 10}, {"5": 5}, {"2.5": 2.5}, {"1.25": 1.25}]',
 unitShrt: {metric: 'kgs', imperial: 'lbs'},
 unitLng: {metric: 'kilos', imperial: 'pounds'}
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
   * Return botBrain vars
   * 
   * @return {object} vars (key|value)
   */
  Rs.prototype.getBotvars = function () {
    return botBrainVars;
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
   * @param {string} currentUser 
   * @param {string} trigger 
   */
  Rs.prototype.reply = function(currentUser, trigger) {
    return trigger;
  }

  /**
   * 
   * @param {string} variable key to bot variable
   * 
   * @return {*} saved bot variable value 
   */
  Rs.prototype.getBotvar = function(variable) {
    return this.botUserVariables[variable];
  }

  function Rs(user, botUserVariables) {
    this.user = user;
  }

  function Bot() {
    this.users = {user :new Rs(users[0], botUserVariables)};
  }


  /** Export a new instantiated user to mock with our local functions */
  const rs = new Rs(users[0]);
  module.exports = rs;