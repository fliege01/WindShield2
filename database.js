var database = {
  select : function(query, vals, callback){
    var validsql = global.core.modules.mysql.format(query, vals);
    global.core.pool.query(validsql, function(err, rows, fields) {
      if (err) throw err;
      var info = {
        sql : validsql,
      }
      if(typeof callback === 'function') callback(rows, fields, info);
    });
  },
  
  insert : function(query, vals, callback){
    var validsql = global.core.modules.mysql.format(query, vals);
    global.core.pool.query(validsql, {title: 'test'}, function(err, result) {
      if (err) throw err;
      var info = {
        sql : validsql
      }
      if(typeof callback === 'function') callback(result, info);
      
    });
  }
}
module.exports = database;
