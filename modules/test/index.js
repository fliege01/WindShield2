
module.exports = function(req, res, next){
  res.send('Test Module');
  global.core.httpserver.close();
}
