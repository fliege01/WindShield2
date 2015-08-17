module.exports = function(req, res, next){

var out = {
  path : 'url',
  params : req
}
res.send(JSON.stringify(out));
}
