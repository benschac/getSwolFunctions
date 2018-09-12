const rs = require('../../mockUser');

/**
 * Reset all users botUser Variables
 * 
 * THIS IS THE FUCKING NUCLEAR OPTION. IT NEEDS TO BE DONE BETTER.
 * 
 * @return {string} confirmation
 */
function resetBotUserVars() {
  const userVars = rs.getUservars(rs.currentUser());
  Object.keys(userVars).forEach(userVar => {
    rs.setUservar(rs.currentUser(), userVar, undefined);
  });

  return 'your inputted data has been reset, this cannot be undone'
};

module.exports = resetBotUserVars;