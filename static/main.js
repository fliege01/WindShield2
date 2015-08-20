
$( document ).ready(function() {
WS.ajax('/auth/info', function(data){
  $('.loadingscreen').fadeOut(800);
  console.log(data);
});  
  

});
