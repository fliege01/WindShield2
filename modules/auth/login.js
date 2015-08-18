"use strict";

module.exports = function(req, res, next){
  var out = {};
  if(req.method == 'POST' && typeof req.body.username !== 'undefined' && typeof req.body.password !== 'undefined'){
    if(global.core.moduleExists('passwordcrypt')){
      
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
