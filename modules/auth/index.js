"use strict";
/* Include URL Commands */
var CMDinfo = require('./info.js');
var CMDhardlogin = require('./hardlogin.js');
var CMDlogin = require('./login.js');
var CMDlogout = require('./logout.js');

module.exports = function(req, res, next){
var requrl = req.url.split('/').filter(Boolean);

switch (requrl[0]){
  case 'info':
    CMDinfo(req, res, next);
    break;
    
  case 'hardlogin':
    CMDhardlogin(req, res, next);
    break;
  
  case 'login':
    CMDlogin(req, res, next);
    break;
    
  case 'logout':
    CMDlogout(req, res, next);
    break;
    
  default :
    req.send('');
}




}
