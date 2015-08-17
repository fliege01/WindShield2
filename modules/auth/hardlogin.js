"use strict";

module.exports = function(req, res, next){
  var out = {};
  var newuuid = global.core.modules.uuid.v4();
    var checkid = global.core.modules.uuid.v4();
    res.cookie('WSSESSION', newuuid , { maxAge: 900000, signed: true });
    res.cookie('WSCHECK', checkid , { maxAge: 900000, signed: true });
    
    global.core.db.insert(
      "INSERT INTO `WS2`.`session` (`sessionid`, `userid`, `checkid`) VALUES (?, ? , ? );", 
      [newuuid,1,checkid]
    );
    out = {
      message : 'Logged In'
    }
    res.send(JSON.stringify(out));
}
