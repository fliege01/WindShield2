"use strict";
/* Include URL Commands */
var CMDinfo = require('./info.js');
var CMDhardlogin = require('./hardlogin.js');


module.exports = function(req, res, next){
var requrl = req.url.split('/').filter(Boolean);

switch (requrl[0]){
  case 'info':
    CMDinfo(req, res, next);
    break;
    
  case 'hardlogin':
    CMDhardlogin(req, res, next);
    break;
}




}
