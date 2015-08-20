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
      console.log(e.data.DOM);
      var modalFormDOM = $(e.data.DOM).children('.content form [data-form="input"]');
      console.log(modalFormDOM);
      modalFormDOM.each(function(){
        dataset.push($(this).context.value);
      });
      console.log(dataset);
      
      /*WS.ajax('/auth/login', {username : username, password : password}, function(d){
        
      });*/
      
    }
  })
}


