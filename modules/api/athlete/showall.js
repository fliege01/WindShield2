"use strict";

module.exports = function(req, res, next){
  if(req.method == 'POST'){
    global.core.db.select(
      "SELECT `athlete`.`id`, `athlete`.`firstname`, `athlete`.`lastname`, `athlete`.`age`, `athlete`.`gender`, `unit`.`shortdesc` as `unit`, `rank`.`name` as `rank` " + 
      "FROM `athlete`, `unit`, `rank` " +
      "WHERE `athlete`.`unit` = `unit`.`id` AND `athlete`.`rank` = `rank`.`id`;",
      [],
      function(err, row, fields) {
      if (err) throw err;
      res.send(JSON.stringify(row));
    });
  }else{
    var searchreq = req.body.search;
    var sql = "SELECT `athlete`.`id`, `athlete`.`firstname`, `athlete`.`lastname`, `athlete`.`age`, `athlete`.`gender`, `unit`.`shortname` as `unit`, `rank`.`shortname` as `rank` FROM `athlete`, `unit`, `rank` WHERE `athlete`.`unit` = `unit`.`id` AND `athlete`.`rank` = `rank`.`id`" + queryFilter.athlete(WST, searchreq) + ";";
      global.core.db.select(
        "SELECT `athlete`.`id`, `athlete`.`firstname`, `athlete`.`lastname`, `athlete`.`age`, `athlete`.`gender`, `unit`.`shortname` as `unit`, `rank`.`shortname` as `rank` ",
        "FROM `athlete`, `unit`, `rank` "+
        "WHERE `athlete`.`unit` = `unit`.`id` AND `athlete`.`rank` = `rank`.`id`" + athleteQueryFilter(searchreq) + ";";
        [],
        function(err, row, fields) {
        if (err) throw err;
        
      });
  }
};

var athleteQueryFilter = function(query){
  var year = global.core.date.getFullYear();
  query = query.toLowerCase();
  for (filterobj of global.config.athletequery.filter){
    for (filterobjalt of filterobj.alt){
      var re = new RegExp(filterobjalt,"g");
      query = query.replace(re , filterobj.name);
    }
  }
  for (filterobj of global.config.athletequery.operator){
    for (filterobjalt of filterobj.alt){
      var re = new RegExp(filterobjalt,"g");
      query = query.replace(re, filterobj.origin);
    }
  }
  var queryarray = query.split(' ');
  var returnquery = '';
  for (str of queryarray){
    if(str == parseInt(str, 10)){
      var int = parseInt(str, 10);
      returnquery += " AND `athlete`.`id` = " + global.core.db.escape(int);
    }else{
      if(str.indexOf("rank:") > -1){
        str = str.replace('rank:','');
        returnquery += " AND (`rank`.`shortname` LIKE CONCAT('%', " + global.core.db.escape(str) + ", '%') OR `rank`.`longname` LIKE CONCAT('%', " + global.core.db.escape(str) + ", '%'))";
      }else if(str.indexOf("unit:") > -1){
        str = str.replace('unit:','');
        returnquery += " AND (`unit`.`shortname` LIKE CONCAT('%', " + global.core.db.escape(str) + ", '%') OR `unit`.`longname` LIKE CONCAT('%', " + global.core.db.escape(str) + ", '%'))";
      }else if(str.indexOf("age:") > -1){
        str = str.replace('age:','');
        if(str !== ''){
          if(str == parseInt(str, 10)){
            var int = parseInt(str, 10);
            var age = year - int;
            returnquery += " AND `athlete`.`age`= " + global.core.db.escape(age);
          }
        }
      }else if(str.indexOf("year:") > -1){
        str = str.replace('year:','');
        if(str !== ''){
          if(str == parseInt(str, 10)){
            if(str.length == 2){
              var yearshort = year % 100;
              var int = parseInt(str, 10);
              if(yearshort <= int){
                var age = '19' + int;
              }else{
                int = int + '';
                if(int.length == 1){
                  int = '0' + int;
                }
                var age = '20' + int;
              }
            }else{
              var age = str;
            }
            age = parseInt(age, 10);
            returnquery += " AND `athlete`.`age`= " + global.core.db.escape(age);
          }
        }
      }else if(str.indexOf("ag:") > -1){
        str = str.replace('ag:','');
        if(str !== ''){
          if(str == parseInt(str, 10)){
            if(typeof global.config.athletequery.ag == 'undefined'){
              var old = year - 69;
              var young = year - 18;
            }else{
              var old = year - global.config.athletequery.ag[str][1];
              var young = year - global.config.athletequery.ag[str][0];
            }
            returnquery += " AND `athlete`.`age` BETWEEN " + global.core.db.escape(old) + " AND " + global.core.db.escape(young);
          }
        }
      }else if(str.indexOf("gender:") > -1){
        str = str.replace('gender:','');
        returnquery += " AND `athlete`.`gender` = " + global.core.db.escape(str);
      }else{
        returnquery += " AND (`athlete`.`firstname` LIKE CONCAT('%', " + global.core.db.escape(str) + ", '%') OR `athlete`.`lastname` LIKE CONCAT('%', " + global.core.db.escape(str) + ", '%'))";
      }
      
      
    }
  }
return returnquery;
  
};





