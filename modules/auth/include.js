"use strict";

module.exports = function(){
  var include = {
    hasPermission : function(req, name, callback){
      var permissions = {};
      global.core.db.select(
        "SELECT `permissions`.`permission` as `name`, `permissions`.`value` FROM `permissions`, `session` WHERE `session`.`userid` = `permissions`.`userid` AND `session`.`sessionid` = ? AND `session`.`checkid` = ? ;",
        [req.signedCookies.WSSESSION, req.signedCookies.WSCHECK],
        function(rows, fields, info){
          for(row in rows){
            permissions[row.name] = row.value;
          }
          if(permissions[name] == 1){
            callback(true);
          }else{
            callback(false);
          }
        });
    }
  };
};
