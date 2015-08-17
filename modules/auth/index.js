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
}


res.send(JSON.stringify(out));
}
