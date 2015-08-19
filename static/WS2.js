var WS = {
  modal : function(innerHtml, params){
    console.log(typeof innerHtml);
    if(typeof innerhtml === 'string'){
      this.innerHtml = innerHtml;
    }else{
      //this.innerHtml = '[DUMMY]';
    }
    console.log(this.innerHtml);
    this.params = {
      title : '[DUMMY]',
      buttontext : '[DUMMY]',
      editable : true,
      cancelable : true,
      onButtonClick : null,
      onCancelClick : null,
      onEditClick : null,
      onShowFinish : null
    };
    if(typeof params !== 'undefined' && typeof params === 'object'){
      WS.objectMerge(this.params, params);
    } 
      
    
  },
  objectMerge : function(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }
  
  
  
};
