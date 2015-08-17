module.exports = function(req, res, next){
let m = true;
if(m === true){
res.send("Wartungsmodus aktiv");
}else{
next();
}
