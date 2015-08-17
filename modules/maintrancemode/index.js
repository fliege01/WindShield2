module.exports = function(req, res, next){
  var m = false;
  if(m === true){
    res.send("Wartungsmodus aktiv");
  }else{
    next();
  }
}
