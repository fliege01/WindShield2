"use strict";
var WS = {
  modal : function(innerHtml, params){
    this.innerHtml = innerHtml;
    this.params = {
      title : '[DUMMY]',
      buttontext : '[DUMMY]',
      width : 400, 
      editable : true,
      cancelable : true,
      onButtonClick : null,
      onCancelClick : function(e){ e.data.hide(); },
      onEditClick : null,
      onShowFinish : null
    };
    this.params = WS.objectMerge(this.params, params);
    
    var modalHtml = '<div class="modal">';
    if(this.params.cancelable == true){ modalHtml += '<span class="close"><i class="fa fa-times"></i></span>'; }
    if(this.params.editable == true){ modalHtml += '<span class="edit"><i class="fa fa-pencil"></i></span>'; }
    modalHtml += '<h2>' + this.params.title + '</h2><div class="content">' + this.innerHtml + '<button data-button="submit" class="btn primary">'+ this.params.buttontext + '</button>';
    if(this.params.cancelable == true){ modalHtml += '<button data-button="cancel" class="btn">Abbrechen</button>'; }
    modalHtml += '</div></div>';
    
    this.DOM = $(modalHtml).appendTo('body');
    var pos = $(window).width() - this.params.width;
    this.DOM.width( this.params.width + 'px');
    this.DOM.animate({right:0},1000);
    
    if(this.params.cancelable == true){
      $(this.DOM).children('.close').on('click', null, this, this.params.onCancelClick);
    }
    if(this.params.editable == true){
      $(this.DOM).children('.edit').on('click', null, this, this.params.onEditClick);
    }
    
    this.hide = function(){
      
      console.log($(this.DOM));
      $(this.DOM).off();
      var outerwidth = 
      $(this.DOM).animate({right: '-' + this.params.width},1000, function(){
        $(this.DOM).remove();
        this.DOM = undefined;
      });
      
    }
      
    return this;
  },
  objectMerge : function(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  },
  ajax : function(path, params, callback){
    if(typeof callback == 'undefined' && typeof params == 'function'){
      var type = "GET";
      var ajaxparams = { url: path, type: type };
    }else if(typeof callback == 'function' && typeof params == 'object'){
      var type = "POST";
      var ajaxparams = { url: path, type: type, data: params };
    }
    $.ajax(ajaxparams)
    .done(function( d ) {
    	if(type == "GET"){
  			params(d);
  		}else if(type == "POST"){
  	  	callback(d);	
  		}
    });
  }
  
  
  
};



