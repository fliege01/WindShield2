"use strict";

module.exports = function(req, res, next){
  if(req.xhr){
    var html = "<h2>Athleten</h2>";
    
    res.send(html);
  }else{
    // NORMAL REQUEST
  }
};
