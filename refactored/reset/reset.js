const rs = require('../../mockUser');

/**
 * Reset all users botUser Variables
 * 
 * @return {string} confirmation
 */
function resetBotUserVars() {
  const userVars = rs.getUservars(rs.currentUser());
  Object.keys(userVars).forEach(userVar => {
    rs.setUservar(rs.currentUser(), userVar, null);
  });

  return 'your inputted data has been reset, this cannot be undone'
};

module.exports = resetBotUserVars;