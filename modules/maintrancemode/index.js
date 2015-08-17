module.exports = function(req, res, next){
  var m = true;
  if(m === true){
    res.send("Wartungsmodus aktiv");
  }else{
    next();
  }
}
