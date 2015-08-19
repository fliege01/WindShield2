"use strict";

CMDathleteshowall = require('./showall.js');
module.exports = function(req, res, next){
  var requrl = req.url.split('/').filter(Boolean);
  switch (requrl[1]){
  
   
  default :
    CMDathleteshowall(req, res, next);
  }
}
