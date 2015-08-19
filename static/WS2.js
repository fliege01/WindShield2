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
      onCancelClick : null,
      onEditClick : null,
      onShowFinish : null
    };
    this.params = WS.objectMerge(this.params, params);
    
    var modalHtml = '<div class="modal">';
    if(this.params.cancelable == true){
    modalHtml += '<span class="close"><i class="fa fa-times"></i></span>';
    }
    if(this.params.editable == true){
    modalHtml += '<span class="edit"><i class="fa fa-pencil"></i></span>';
    }
    modalHtml += '<h2>' + this.params.title + '</h2><div class="content">' + this.innerHtml + '<button data-button="submit" class="btn primary">'+ this.params.buttontext + '</button>';
    if(this.params.cancelable == true){
    modalHtml += '<button data-button="cancel" class="btn">Abbrechen</button>';
    }
    modalHtml += '</div></div>';
    this.modalHtml = modalHtml;
    
    this.DOM = $(this.modalHtml).appendTo('body');
    var pos = $(window).width() - this.params.width;
      this.DOM.width( this.params.width + 'px');
      this.DOM.animate({right:0},1000);
      
    
      
    return this;
  },
  objectMerge : function(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }
  
  
  
};
