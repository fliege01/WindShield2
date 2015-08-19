"use strict";
var CMDusershowall = require('./showall.js');
var CMDuseradd = require('./add.js');
module.exports = function(req, res, next){
var requrl = req.url.split('/').filter(Boolean);
switch (requrl[1]){
  case 'add':
    CMDuseradd(req, res, next);
    break;
  
  default :
    CMDusershowall(req, res, next);
}
};
