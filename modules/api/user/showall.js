"use strict";

module.exports = function(req, res, next){

      global.core.db.select(
        "SELECT `user`.`id`, `user`.`username` FROM `user`;",
        [],
        function(row, fields, info) {
          
          res.send(JSON.stringify(row));
        });
};
