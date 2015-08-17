module.exports = function(req, res, next){

var out = {
  path : 'url',
  params : req.url.split('/')
}
res.send(JSON.stringify(out));
}
