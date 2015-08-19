"use strict";

module.exports = function(req, res, next){

      global.core.db.select(
        "SELECT `user`.`id`, `user`.`username` FROM `user`;",
        [],
        function(row, fields, info) {
              console.log (err);
          if (err) throw err;
          
          res.send(JSON.stringify(row));
        });
};
