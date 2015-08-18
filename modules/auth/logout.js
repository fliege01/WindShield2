"use strict";

module.exports = function(req, res, next){
global.core.db.delete(
  "DELETE FROM `session` WHERE `session`.`sessionid` = ? AND `session`.`checkid` = ?",
  [req.signedCookies.WSSESSION, req.signedCookies.WSCHECK],
  function(result, info){
    res.clearCookie('WSSESSION');
    res.clearCookie('WSCHECK');
    var out = {
      status : 200,
      message : "logout success"
    };
    res.send(JSON.stringify(out));
  }
  
  )
};
