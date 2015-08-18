"use strict";

module.exports = function(req, res, next){
var requrl = req.url.split('/').filter(Boolean);
switch (requrl[0]){
  
  default :
    res.send('');
}

}
