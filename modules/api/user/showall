"use strict";

module.exports = function(req, res, next){

      global.core.db.select(
        "SELECT `user`.`id`,`user`.`username`,`user`.`name` FROM `user`;",
        [],
        function(err, row, fields) {
          if (err) throw err;
          res.send(JSON.stringify(row));
        }
}
