"use strict";
$( document ).ready(function() {
  tryLogin();
});

function tryLogin(){
  WS.ajax('/auth/info', function(data){
  $('.loadingscreen').fadeOut(800);
  data = JSON.parse(data);
  if(data.status == 4001){
    initlogin();
  }else{
    console.log(data);
    global.permissions.addPermissions(data.permissions);
    global.menu = WS.menu();
  }
});  
}
function initlogin (){
  var html = '<form><input type="text" data-form="input" class="modalinput" placeholder="Benutzername"><input data-form="input" data-enter="submit" type="password" class="modalinput" placeholder="Passwort"></form>';
  global.loginmodal = new WS.modal(html, {
    title : 'Login',
    buttontext : 'Login',
    cancelable : false,
    onButtonClick : function(e){
      var dataset = [];
      var modalFormDOM = $(e.data.DOM).children('.content').children('form').children('[data-form="input"]');
      modalFormDOM.each(function(){
        dataset.push($(this).context.value);
      });
      
      WS.ajax('/auth/login', {username : dataset[0], password : dataset[1]}, function(d){
        d = JSON.parse(d);
        if(d.status == 403){ // Login incorrect
          var updatehtml = '<div class="alert alert-danger">Login fehlerhaft</div><form><input type="text" data-form="input" class="modalinput" placeholder="Benutzername"><input data-form="input" data-enter="submit" type="password" class="modalinput" placeholder="Passwort"></form>';
          global.loginmodal.update(updatehtml);
        }
        if(d.status == 200){
          global.loginmodal.hide();
          tryLogin();
        }
      });
      
    }
  })
}


global.moduleManager.addModule('logout', {
  locate : function(){
    WS.ajax('/auth/logout',  function(d){
      global.menu.destroy();
      tryLogin();
    });
  }
});

