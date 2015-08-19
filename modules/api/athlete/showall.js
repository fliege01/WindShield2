"use strict";

module.exports = function(req, res, next){
  WST.db.query("SELECT `athlete`.`id`, `athlete`.`firstname`, `athlete`.`lastname`, `athlete`.`age`, `athlete`.`gender`, `unit`.`shortname` as `unit`, `rank`.`shortname` as `rank` FROM `athlete`, `unit`, `rank` WHERE `athlete`.`unit` = `unit`.`id` AND `athlete`.`rank` = `rank`.`id`;", function(err, row, fields) {
    if (err) throw err;
    
  });
}
