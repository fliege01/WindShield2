"user strict";

module.exports = function(req, res, next){
    if(req.method == 'POST'){
      global.core.db.insert(
        "INSERT INTO `user` (`id`, `username`, `password`) VALUES (NULL, ? , ? );",
        [req.body.username, global.corepack['passwordcrypt'].generate(req.body.password)],
        function(result, info) {
            
            var out = {
              status : 200,
              message : 'User added'
            };
            res.send(JSON.stringify(out));
          });
    }else{
      var out = {
        status : 4004,
        message : "endpoint doesn't esists"
      };
      res.send(JSON.stringify(out));
      
    }
  }

