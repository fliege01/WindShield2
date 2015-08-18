"use strict";

module.exports = function(){
  return {
    verify : function(hash, pass){
      var passarr = hash.split("."),
          salt = passarr[0],
          hash = passarr[1],
          passhash = global.core.modules.crypto.createHash('sha1').update(salt + pass).digest('hex');
      if(passhash === hash){
        return true;
      }else{
        return false;
      }
      
    },
    generate : function(pass){
      var salt = global.core.modules.crypto.randomBytes(Math.ceil(25/2)).toString('hex').slice(0,25),
        password = salt +  pass,
        hash = global.core.modules.crypto.createHash('sha1').update(password).digest('hex');
      return salt + '.' + hash;
    }
  };
}
