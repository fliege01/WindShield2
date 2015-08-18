"use strict";

module.exports = function(req, res, next){
  var out = {};
  if(req.method == 'POST' && typeof req.body.username !== 'undefined' && typeof req.body.password !== 'undefined'){
    if(global.core.moduleExists('passwordcrypt')){
      global.core.db.select(
        "SELECT * FROM `users` WHERE `username` LIKE ? ",
        [req.body.username],
        function(rows, fields, info){
          if(global.modules['passwordcrypt'].verify(rows[0].password, req.body.password)){
            out = {
              status : 200,
              message : "login success"
            };
            res.send(JSON.stringify(out));
          }else{
            out = {
              code : 403,
              message : 'login canceled'
            };
            res.send(JSON.stringify(out));
          }
          
        }
        )
      
      
    }else{
    out = {
      code : 500,
      message : 'Module missed'
    };
    res.send(JSON.stringify(out));
    }
  }else{
    out = {
      code : 403,
      message : 'login canceled'
    };
    res.send(JSON.stringify(out));
  }
}
