
$( document ).ready(function() {
WS.ajax('/auth/info', {}, function(data){
  $('.loadingscreen').fadeOut(800);
  data = JSON.parse(data);
  console.log(data);
});  
  

});
