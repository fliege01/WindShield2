"use strict";
var CMDuserindex = require('./user');



module.exports = function(req, res, next){
var requrl = req.url.split('/').filter(Boolean);
switch (requrl[0]){
  case 'user':
    
    
    break;
  default :
    res.send('');
}

}
