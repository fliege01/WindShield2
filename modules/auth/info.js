"use strict";
module.exports = function(req, res, next){
global.core.db.select(
      'SELECT `userid` FROM `session` WHERE `sessionid` = ? AND `checkid` = ? ;',
      [req.signedCookies.WSSESSION, req.signedCookies.WSCHECK],
      function(rows, fields, info){
        if(typeof rows[0] !== 'undefined'){
          global.core.db.select(
            'SELECT `permission` as `name`, `value` FROM `permissions` WHERE `userid` = ? ;',
            [rows[0].userid],
            function(permrows, permfields, perminfo){
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
};
