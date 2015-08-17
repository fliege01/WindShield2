module.exports = function(req, res, next){

var out = {
  path : 'url',
  params : req.url.split('/').filter(Boolean)

}
res.send(JSON.stringify(out));
}
