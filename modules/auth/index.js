"use strict";
module.exports = function(req, res, next){
var requrl = req.url.split('/').filter(Boolean);
var out = {};

switch (requrl[0]){
  case 'info':
    global.core.db.select(
      'SELECT `userid` FROM `session` WHERE `sessionid` = ? AND `checkid` = ? ;',
      [req.signedCookies.WSSESSION, req.signedCookies.WSCHECK],
      function(rows, fields, info){
        if(typeof rows[0] !== 'undefined'){
          global.core.db.select(
            'SELECT `permission` as `name`, `value` FROM `permissions` WHERE `userid` = ? ;',
            [rows[0].userid],
            function(permrows, permfields, perminfo){
              console.log(permrows);
              out = {
                status : 200,
                permissions : permrows
              };
              res.send(JSON.stringify(out));
            });
        }else{
          out = {
            status : 4001,
            message : "You're not logged in"
          };
          res.send(JSON.stringify(out));
        }
          
      });
    
    break;
    
  case 'hardlogin':
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
    break;
}




}
