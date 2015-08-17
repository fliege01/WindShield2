module.exports = function(req, res, next){

var out = {
  path : 'url',
  params : req.url.split('/')
}
console.log(req);
res.send(JSON.stringify(out));
}
