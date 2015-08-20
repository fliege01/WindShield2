"use strict";
var global = {};
global.permissions = new WS.permissions();
var WS = {
  modal : function(innerHtml, params){
    this.innerHtml = innerHtml;
    this.params = {
      title : '[DUMMY]',
      buttontext : '[DUMMY]',
      width : 400, 
      editable : false,
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
    
    this.bind = function(){
      if(this.params.cancelable == true){
        $(this.DOM).children('.close').on('click', null, this, this.params.onCancelClick);
      }
      if(this.params.editable == true){
        $(this.DOM).children('.edit').on('click', null, this, this.params.onEditClick);
      }
      if(typeof this.params.onButtonClick == 'function'){
        $(this.DOM).children('.content').on('keydown', null, this, function (e){
          if(e.keyCode == 13){
            e.data.params.onButtonClick(e);
          }
        });
        $(this.DOM).children('.content').children('button').on('click', null, this, this.params.onButtonClick);
      }
    }
    
    
    this.hide = function(){
      $(this.DOM).off();
      var outerwidth = 
      $(this.DOM).animate({right: '-' + this.params.width},1000, function(){
        $(this.DOM).remove();
        this.DOM = undefined;
      });
    }
    this.update = function(html){
      $(this.DOM).off();
      var modalHtml = '';
      if(this.params.cancelable == true){ modalHtml += '<span class="close"><i class="fa fa-times"></i></span>'; }
      if(this.params.editable == true){ modalHtml += '<span class="edit"><i class="fa fa-pencil"></i></span>'; }
      modalHtml += '<h2>' + this.params.title + '</h2><div class="content">' + html + '<button data-button="submit" class="btn primary">'+ this.params.buttontext + '</button>';
      if(this.params.cancelable == true){ modalHtml += '<button data-button="cancel" class="btn">Abbrechen</button>'; }
      modalHtml += '</div>';
    
      
      $(this.DOM).html(modalHtml);
      this.bind();
    }
      
    this.bind();
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
  },
  
  menu : function(){
    var nav = "";
    nav +='<input type="test" class="globalsearch" value="Suche" /><ul>';
    if(global.permissions.hasPermission("dashboard.view")) nav += '<li><a href="#" class="mainlink">Dashboard</a></li>';
    if(global.permissions.hasPermission("athletes.view")) nav += '<li><a href="#" class="mainlink">Athleten</a>';
    if(global.permissions.hasPermission("athletes.add") && global.permissions.hasPermission("athletes.view")) nav += '<div class="dropdownbtn">&gt;</div><ul class="dropdown"><li><a href="#">Athleten hinzufügen</a></li></ul>';
    if(global.permissions.hasPermission("athletes.view")) nav += '</li>';
    
    if(global.permissions.hasPermission("discipline.view")) nav += '<li><a href="#" class="mainlink">Disziplinen</a>';'
    if(global.permissions.hasPermission("discipline.add.result") || global.permissions.hasPermission("discipline.add.relay") && global.permissions.hasPermission("discipline.view")) nav += '<div class="dropdownbtn">&gt;</div><ul class="dropdown">';
    if(global.permissions.hasPermission("discipline.add.result") && global.permissions.hasPermission("discipline.view")) nav += '<li><a href="#">Ergebnis hinzufügen</a></li>';'
    if(global.permissions.hasPermission("discipline.add.relay") && global.permissions.hasPermission("discipline.view")) nav += '<li><a href="#">Staffelteam hinzufügen</a></li>';'
    if(global.permissions.hasPermission("discipline.add.result") || global.permissions.hasPermission("discipline.add.relay") && global.permissions.hasPermission("discipline.view")) nav += '</ul>';
    if(global.permissions.hasPermission("discipline.view")) nav += '</li>';
        
    if(global.permissions.hasPermission("result.view")) nav += '<li><a href="#" class="mainlink">Resultate</a><div class="dropdownbtn">&gt;</div><ul class="dropdown"><li><a href="#">Übersicht</a></li>';
    if(global.permissions.hasPermission("result.view" && global.permissions.hasPermission("result.certificate")) nav += '<li><a href="#">Urkunde</a></li>';
    if(global.permissions.hasPermission("result.view")) nav += '</ul></li>';

    if(global.permissions.hasPermission("system.view")) nav += '<li><a href="#" class="mainlink">System</a> <div class="dropdownbtn">&gt;</div><ul class="dropdown"><li><a href="#">Konfiguration</a></li><li><a href="#">Benutzer</a></li><li><a href="#">Urkunde bearbeiten</a></li><li><a href="#">Datenhaltung</a></li><li><a href="#">Konfiguration</a></li></ul></li>';      
          
    nav += '<li><a href="#" class="mainlink">Logout</a></li></ul>';
      
    var menubar = '<nav style="left: -20em;">' + nav + '</nav>';
    this.DOM = $(menubar).appendTo('body');
       
    this.DOM.animate({
      left: '0em'
    }, 600);
       
    $(this.DOM).children('nav').children('.globalsearch').on('click', null, this, function(e){
      if(e.target.value == 'Suche'){
        e.target.value = '';
      }
    });
    $(this.DOM).children('nav').children('.globalsearch').on('focusout', null, this, function(e){
      if(e.target.value == ''){
		    e.target.value = 'Suche';
		    // Searchreset
  	  }
    });
    $(this.DOM).children('nav').children('.globalsearch').on('keyup', function(e){
  	  // Suche durchführen
    });
    $(this.DOM).children('nav').children('.globalsearch').on('remove', function(e){
      
    });
    
  },
  
  search : function(query, page){
	  
  },
  
  permissions : function(){
    this.permobj = {};
    
    this.addPermissions = function(obj){
      this.permobj = WS.objectMerge(this.permobj, obj);
    };
    
    this.hasPermission = function(name){
      if(typeof this.permobj[name] !== 'undefined' && this.permobj[name] == true){
        return true;
      }else{
        return false;
      }
    }
    
    
  }
  
  
  
};



