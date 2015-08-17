module.exports = function(req, res, next){

var out = {
  path : 'url',
  params : req.params
}
console.log(req);
res.send(JSON.stringify(out));
}
