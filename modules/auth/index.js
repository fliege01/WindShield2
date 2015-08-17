"use strict";
module.exports = function(req, res, next){
var requrl = req.url.split('/').filter(Boolean);
var out = {};

switch (requrl[0]){
  case 'info':
    
    
    
    
    out = {
        status : 4001,
        message : "You're not logged in"
      };
    break;
    
  case 'hardlogin':
    var newuuid = global.core.modules.uuid.v4();
    var checkid = global.core.modules.uuid.v4();
    res.cookie('WSSESSION', newuuid , { maxAge: 900000, signed: true });
    res.cookie('WSCHECK', newuuid , { maxAge: 900000, signed: true });
    
    global.core.db.insert(
      "INSERT INTO `WS2`.`session` (`sessionid`, `userid`, `checkid`) VALUES (?, ? , ? );", 
      [newuuid,1,checkid]
    );
    break;
}


res.send(JSON.stringify(out));

}
