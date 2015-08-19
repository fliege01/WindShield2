"use strict";

module.exports = function(req, res, next){

      global.core.db.select(
        "SELECT `user`.`id`, `user`.`username` FROM `user`;",
        [],
        function(err, row, fields) {
              console.log (err);
          if (err) throw err;
          
          res.send(JSON.stringify(row));
        });
};
