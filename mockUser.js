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
          gender: "male"
        }
      }
     },
     {
      "someuuidofsomesort2": {
        name: "Rebecca Cohen",
        userVars: {
          currentLift: "deadlift",
          deadlift: "100",
          benchpress: "40",
          units: "metric",
          gender: "female"
        }
      }
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
   * @param {string} currentUser 
   * @param {string} trigger 
   */
  Rs.prototype.reply = function(currentUser, trigger) {
    console.log("The trigger executed was" + trigger);
    return 1;
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


  /** Export a new instantiated user to mock with our local functions */
  const rs = new Rs(users[0], botVariables);
  module.exports = rs;