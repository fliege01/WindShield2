"use strict";

module.exports = function(req, res, next){
  var out = {};
  if(req.method == 'POST' && typeof req.body.username !== 'undefined' && typeof req.body.password !== 'undefined'){
    if(global.core.moduleExists('passwordcrypt')){
      global.core.db.select(
        "SELECT * FROM `user` WHERE `username` LIKE ? ",
        [req.body.username],
        function(rows, fields, info){
          if(typeof rows[0] !== 'undefined'){
            var check = global.corepack['passwordcrypt']().verify(rows[0].password, req.body.password);
            console.log(check);
          if(check){
            
            var newuuid = global.core.modules.uuid.v4();
            var checkid = global.core.modules.uuid.v4();
            res.cookie('WSSESSION', newuuid , { maxAge: 900000, signed: true });
            res.cookie('WSCHECK', checkid , { maxAge: 900000, signed: true });
    
            global.core.db.insert(
              "INSERT INTO `session` (`sessionid`, `userid`, `checkid`) VALUES (?, ? , ? );", 
              [newuuid,rows[0].id,checkid]
            );
            
            
            
            
            out = {
              status : 200,
              message : "login success"
            };
            console.log(out);
            res.send(JSON.stringify(out));
          }else{
            out = {
              status : 403,
              message : 'login canceled'
            };
            res.send(JSON.stringify(out));
          }
          }else{
            out = {
              status : 403,
              message : 'login canceled'
            };
            res.send(JSON.stringify(out));
          }
          
        }
        )
      
      
    }else{
    out = {
      status : 500,
      message : 'Module missed'
    };
    res.send(JSON.stringify(out));
    }
  }else{
    out = {
      status : 403,
      message : 'login canceled'
    };
    res.send(JSON.stringify(out));
  }
}
