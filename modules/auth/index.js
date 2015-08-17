module.exports = function(req, res, next){

var out = {
  path : 'url'
}
res.send(JSON.stringify(out));
}
