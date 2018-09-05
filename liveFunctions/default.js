
/**
 * Reset all users botUser Variables
 * 
 * return {string} confirmation
 */
function resetBotUserVars() {
  const userVars = rs.getUservars(rs.currentUser());
  Object.keys(userVars).forEach(userVar => {
    rs.setUservar(rs.currentUser(), userVar, undefined);
  });

  return 'your inputted data has been removed, this cannot be undone'
};


