var global = {};
$( document ).ready(function() {
WS.ajax('/auth/info', function(data){
  $('.loadingscreen').fadeOut(800);
  data = JSON.parse(data);
  console.log(data);
  if(data.status == 4001){
    initlogin();
  }else{
    // Init software
  }
});  
  

});

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
        console.log(data);
      });
      
    }
  })
}


