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
    modulesfs.forEach(function(modulename){
      
      var jsonexists = global.core.fs.existsSync(moduledir + '/' + modulename + '/package.json');
        if(jsonexists){
          var jsonobj = JSON.parse(global.core.fs.readFileSync(moduledir + '/' + modulename + '/package.json'));
          var jsexists = global.core.fs.existsSync(moduledir + '/' + modulename + '/' + jsonobj.main);
          if(jsexists){
            global.modules[jsonobj.name] = require(moduledir + '/' + modulename + '/' + jsonobj.main);
            if(typeof global.modules[jsonobj.name] === 'function'){
              global.core.app.use(jsonobj.usepath, global.modules[jsonobj.name]);
            }else{
              console.log('Das Modul "%s" konnte nicht korrekt geladen werden. Es wird eine Funktion benötigt', jsonobj.name);
            }
          }
          var jsiexists = global.core.fs.existsSync(moduledir + '/' + modulename + '/' + jsonobj.include);
          if(jsexists){
            global.corepack[jsonobj.name] = require(moduledir + '/' + modulename + '/' + jsonobj.include);
          }else{
            console.log('CorePack "%s" nicht gefunden', jsonobj.name);
          }
          
        }else{
          console.log('Es fehlt für das Modul "%s" die package.json', modulename);
        }
     
      
      
    });
    global.core.app.get('/', function (req, res) {
      res.redirect('/static/');  // Noch nicht das wahre... :/
    });
    global.core.app.use('/static', global.core.modules.express.static(staticdir)); 
    
  }
}
