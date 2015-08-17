module.exports = function(req, res, next){

var out = {
  path : 'url',
  params : req.params
}
res.send(JSON.stringify(out));
}
