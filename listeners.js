"use strict";

module.exports = function() {
  listeners.init();
}

var listeners = {
  init : function(){
    var moduledir = './modules',
        staticdir = './static';
        
    var modulesfs = global.core.fs.readdirSync(moduledir);
    console ('Es wurden folgende Module erkannt: %o ', modulefs);
  }
}
