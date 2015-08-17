"use strict";

module.exports = function() {
  listeners.init();
}

var listeners = {
  init : function(){
    global.modules = {};
    var moduledir = './modules',
        staticdir = './static';
        
    var modulesfs = global.core.fs.readdirSync(moduledir);
    console.log ('Es wurden folgende Module erkannt: ', modulesfs);
    modulesfs.forEach(function(modulename){
      console.log('Verarbeite Modul "'+ modulename +'"');
      var jsexists = global.core.fs.existsSync(moduledir + '/' + modulename + '/index.js');
      var jsonexists = global.core.fs.existsSync(moduledir + '/' + modulename + '/package.json');
        if(jsexists && jsonexists){
          var jsonobj = JSON.parse(global.core.fs.readFileSync(moduledir + '/' + modulename + '/package.json'));
          global.modules[modulename] = require(moduledir + '/' + modulename + '/index.js');
          if(typeof global.modules[modulename] === 'fucntion'){
            global.core.app.use(jsonobj.usepath, global.modules[modulename]);
          }else{
            console.log('Das Modul "%s" konnte nicht korrekt geladen werden. Es wird eine Funktion benötigt');
          }
        }else{
          console.log('Es fehlt für das Modul "%s" die index.js/package.json');
        }
     
      
      
    });
  }
}
