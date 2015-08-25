"use strict";
let filters = {
  filter : [
    
    {
      name : 'age',
      alt: ['alter']
    },
    {
      name : 'ag',
      alt : ['ak', 'altersklasse']
    },
    {
      name : 'year',
      alt : ['jahrgang', 'jahr', 'jg']
    },
    {
      name : 'rank',
      alt : ['rang']
    },
    {
      name : 'unit',
      alt : ['einheit', 'staffel']
    },
    {
      name : 'gender',
      alt : ['geschlecht']
    }
  ],
  operator : [
    {
      origin : ':',
      alt : [': ', ' :', ' : ']
    }
  ],
  ag : {
    1 : [18 , 19],
    2 : [20, 24],
    3 : [25 , 29],
    4 : [30 , 34],
    5 : [35 , 39],
    6 : [40 , 44],
    7 : [45 , 49],
    8 : [50 , 54],
    9 : [55 , 59],
    10 : [60 , 64],
    11 : [65 , 69]
  }
};

module.exports.athlete = function(query){
  let year = global.core.date.getFullYear();
  query = query.toLowerCase();
  for (filterobj of filters.filter){
    for (filterobjalt of filterobj.alt){
      var re = new RegExp(filterobjalt,"g");
      query = query.replace(re , filterobj.name);
    }
  }
  for (filterobj of filters.operator){
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
        returnquery += " AND (`rank`.`shortname` LIKE CONCAT('%', " + global.core.escape(str) + ", '%') OR `rank`.`longname` LIKE CONCAT('%', " + global.core.db.escape(str) + ", '%'))";
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
            if(typeof filters.ag == 'undefined'){
              var old = year - 69;
              var young = year - 18;
            }else{
              var old = year - filters.ag[str][1];
              var young = year - filters.ag[str][0];
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
  

}

