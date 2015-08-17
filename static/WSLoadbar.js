var LoadBar = new Object();

LoadBar.bar = null;
LoadBar.status = 0;

LoadBar.start = function(){
  LoadBar.bar = $('.loadingbar');
  LoadBar.bar.fadeIn('fast')
  LoadBar.bar.css('width','10%');
  LoadBar.status = 10;
  return true;
}

LoadBar.finish = function(){
  if(LoadBar.bar === null){
    return false;
  }
  LoadBar.bar.css('width','100%').delay(1000).fadeOut('fast',function(){
    LoadBar.bar.css('width','0%');
    LoadBar.bar = null;
  });
  LoadBar.status = 0;
  
  return true;
}

LoadBar.value = function(value){
  if(LoadBar.bar === null){
    return false;
  }
   if(typeof value === 'undefined'){
     return LoadBar.status;
   }else{
     LoadBar.status = value;
     LoadBar.bar.css('width',value + '%')
     return true;
   }
  
}
