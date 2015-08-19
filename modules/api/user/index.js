"use strict";
var CMDusershowall = require('./showall.js');
module.exports = function(req, res, next){
var requrl = req.url.split('/').filter(Boolean);
switch (requrl[1]){
  
  default :
    CMDusershowall(CMDusershowall(req, res, next));
}
};
