var WSCore = new Object();
WSCore.config = {};
WSCore.param = {};
WSCore.func = {};
WSCore.loadingScreen = {};
WSCore.config.debug = true;
$( document ).ready(function() {
WSCore.func.init();
});
$( window ).resize(function() {
  if(typeof $('.wrapper') !== 'undefined'){
    var width = $(window).width() - $('nav').width() - 20;
    $('.wrapper').width(width);
  }
});



/* Modal */
WSCore.modal = {};
WSCore.modal.init = function (title, content, callback, binds, cancelable, buttontext, editable){
  if(typeof cancelable === 'undefined' || typeof cancelable === null){ cancelable = true; }
  if(typeof buttontext === 'undefined' || typeof buttontext === null){ buttontext = 'OK'; }
  if(typeof editable === 'undefined' || typeof editable === null){ editable = false; }
  
  if(cancelable){
    if(editable){
      var modalhtml = '<div class="modal" data-modal="'+title+'"><span class="close"><i class="fa fa-times"></i></span><span class="edit"><i class="fa fa-pencil"></i></span><h2>'+title+'</h2><div class="content">'+content+'<button data-button="submit" class="btn primary">'+buttontext+'</button><button data-button="cancel" class="btn">Abbrechen</button></div></div>';
    }else{
      var modalhtml = '<div class="modal" data-modal="'+title+'"><span class="close"><i class="fa fa-times"></i></span><h2>'+title+'</h2><div class="content">'+content+'<button data-button="cancel" class="btn">Abbrechen</button></div></div>';
    }
  }else{
    if(editable){
      var modalhtml = '<div class="modal" data-modal="'+title+'"><span class="edit"><i class="fa fa-pencil"></i></span><h2>'+title+'</h2><div class="content">'+content+'<button data-button="submit" data-form="submit" class="btn primary">'+buttontext+'</button></div></div>';
    }else{
      var modalhtml = '<div class="modal" data-modal="'+title+'"><h2>'+title+'</h2><div class="content">'+content+'<button data-button="submit" class="btn primary">'+buttontext+'</button></div></div>';
    }
  }

  var modalDOM = $(modalhtml).appendTo('body');
  var pos = $(window).width() - 400;
  modalDOM.width('400px');
  modalDOM.animate({right:0},1000);
  binds({
    callback : callback,
    title: title,
    DOM : modalDOM
  });
  
  /*  if(editable){
      $('[data-modal="'+title+'"] .edit').on('click',function(){
        console.log('Trigger Edit');
      });
    }
    if(cancelable){
      console.log('Trigger Close');
      $('[data-modal="'+title+'"] .close').on('click',function(){
        $('[data-modal="'+title+'"]').children().unbind();
        $('[data-modal="'+title+'"]').animate({left:'100%'},500);
        
      });
    }
  var modaldata = {
    title : title
  }
  $('[data-modal="'+title+'"] [data-button="submit"]').on('click', function(event){ callback(modaldata);});
  $('[data-modal="'+title+'"] [data-enter="submit"]').keydown(function (e){
    if(e.keyCode == 13){
        callback(modaldata);
    }
  });
  
  */
}
WSCore.modal.destroy = function (callback){
  $('.modal').animate({
    right : '-50%'
  }, function(){
    $('.modal').remove();
    if(typeof callback != 'undefined'){
      callback();
    }
  });
}
WSCore.modal.update = function(title, content){
  var modalcontent = $('.modal[data-modal="' + title + '"] .content');
  WSCore.debug(modalcontent);
  modalcontent.html(content);
};


WSCore.func.init = function(){
  $.getJSON( "/auth/info/", {})
  .fail(function() {
    console.log( "Exeption: Handler not reachable." );
  })
  .done(function(data){
    WSCore.debug(data);
    if(data.status == 4001){
      WSCore.loadingScreen.fadeOut();
      WSCore.debug("[DEBUG] Login required");
      WSCore.func.initlogin();
    }else{
      WSCore.param.permissions = {};
      for(p of data.permissions){
        WSCore.param.permissions[p.name] = p.value;
      }
      WSCore.loadingScreen.fadeOut(function(){
        WSCore.menu.init();
        WSCore.wrapper.init();
      });
      
    }
  });
};

WSCore.func.initlogin = function(){
        var loginform = '<form><input type="text" data-form="input" class="modalinput" placeholder="Benutzername"><input data-form="input" data-enter="submit" type="password" class="modalinput" placeholder="Passwort"></form>';
      WSCore.modal.init('Login', loginform,function(binds){
       var dataset = [];
       var modalDOM = $('[data-modal="'+ binds.title +'"]');
       var modalFormDOM = $('[data-modal="'+ binds.title +'"] form [data-form="input"]');
        modalFormDOM.each(function(){
          dataset.push($(this).context.value);
        });
      WSCore.func.login(dataset[0],dataset[1], function(res){
      	console.log(res);
        if(!res){
          WSCore.debug('[DEBUG] Login canceled');
          WSCore.debug('Update Login');
          WSCore.modal.destroy(function(){
            WSCore.message.alert("Login fehlgeschlagen");
            WSCore.func.initlogin ();
          });
        }else{
          $.ajax({
            type : "POST",
            url : "/auth/info"
          })
          .done(function(data){
            if(data.status == 200){
              WSCore.param.permissions = {};
              for(p of data.permissions){
                WSCore.param.permissions[p.name] = p.value;
              }
              WSCore.debug("[DEBUG] Logged in");
              WSCore.modal.destroy();
              WSCore.menu.init();
              WSCore.wrapper.init();
            }else{
              WSCore.debug('Update Login');
              var loginform = '<form><p>Login fehlgeschlagen</p><input type="text" data-form="input" class="modalinput" placeholder="Benutzername"><input data-form="input" data-enter="submit" type="password" class="modalinput" placeholder="Passwort"></form>';
              WSCore.modal.destroy();
            }
          });
          
        }
      });
      }, function(binds){
        var res = {
          title : binds.title,
          DOM : binds.DOM
        };
        WSCore.debug("[DEBUG] Setting Binds");
        $('[data-modal="'+binds.title+'"] [data-button="submit"]').on('click', function(e){ 
          WSCore.debug("[DEBUG] Trigger");
          binds.callback(res);
        });
        $('[data-modal="'+binds.title+'"] [data-enter="submit"]').keydown(function (e){
          if(e.keyCode == 13){
            binds.callback(res);
          }
        });
        $('[data-modal="'+binds.title+'"] [data-button="submit"]').on("remove", function () {
          $(this).off();
        });
        $('[data-modal="'+binds.title+'"] [data-enter="submit"]').on("remove", function () {
          $(this).off();
        });
      }, false, 'Login');
};
WSCore.func.login = function (username,password, callback) {
  WSCore.debug('[DEBUG] Try to login');
  $.ajax({
        type : "POST",
        url : "/auth/login",
        data : {
            username : username,
            password : password
          }
      })
      .done(function( data ) {
      	data = JSON.parse(data);
        var result;
        if(data.status == 200){
          result = data;
        }else{
          result = false;
        }
        callback(result);
       });
};

WSCore.func.logout = function(){
  $.ajax({
        type : "GET",
        url : "/auth/logout"
      })
      .done(function( data ) {
        WSCore.menu.destroy();
        WSCore.wrapper.destroy();
        WSCore.func.initlogin();
        WSCore.param = {};
        WSCore.debug('[DEBUG] Logged out');
       });
};

WSCore.loadingScreen.fadeOut = function(callback){
  $('.loadingscreen').fadeOut(800, function(){
  	callback();
  });
};
WSCore.loadingScreen.fadeIn = function(){
  $('.loadingscreen').fadeIn(800);
};
WSCore.debug = function (data){
  if(WSCore.config.debug){
    console.log(data);
  }
};

WSCore.menu = {};
WSCore.menu.init = function(){
  var menubar = '<nav style="left: -20em;"><input type="test" class="globalsearch" value="Suche"><ul><li><a href="#" class="mainlink">Dashboard</a></li><li><a href="#" class="mainlink" data-action="athletes">Athleten</a><div class="dropdownbtn">&gt;</div><ul class="dropdown"><li><a href="#" data-action="addathlete">Athleten hinzufügen</a></li></ul></li><li><a href="#" class="mainlink">Disziplinen</a><div class="dropdownbtn">&gt;</div><ul class="dropdown"><li><a href="#">Ergebnis hinzufügen</a></li><li><a href="#">Staffelteam hinzufügen</a></li></ul></li><li><a href="#" class="mainlink">Resultate</a><div class="dropdownbtn">&gt;</div><ul class="dropdown"><li><a href="#">Übersicht</a></li><li><a href="#">Suche</a></li><li><a href="#">Urkunde</a></li></ul></li><li><a href="#" class="mainlink">System</a> <div class="dropdownbtn">&gt;</div><ul class="dropdown"><li><a href="#">Konfiguration</a></li><li><a href="#">Benutzer</a></li><li><a href="#">Urkunde bearbeiten</a></li><li><a href="#">Datenhaltung</a></li><li><a href="#">Konfiguration</a></li></ul></li><li><a href="#" class="mainlink" data-action="logout">Logout</a></li></ul></nav>';
  WSCore.menu.DOM = $(menubar).appendTo('body');
  var dropdowns = $( "nav" ).find( ".dropdownbtn" );
  $('input.globalsearch').on('click', function(e){
  	if(e.target.value == 'Suche'){
  			e.target.value = '';
  	}
  });
  $('input.globalsearch').on('focusout', function(e){
  	if(e.target.value == ''){
  		e.target.value = 'Suche';
  		WSCore.menu.globalSearchReset();
  	}
  });
  $('input.globalsearch').on('keyup', function(e){
  	WSCore.menu.globalSearch(e.target.value);
  });
  $('input.globalsearch').on('remove', function(e){
    $('[data-action]').off();
  });
  $('[data-action]').on('click', function(e){
    WSCore.menu.navigate(e.target.dataset.action);
  });
  $('[data-action]').on('remove', function(e){
    $('[data-action]').off();
  });
  dropdowns.each(function(i, obj){
    obj.onclick = function(e){
      switch (e.target.parentElement.children[2].style.display){
        case 'none':
          e.target.parentElement.children[2].style.display = "block";
          e.target.style.transform = 'rotate(90deg)';
          break;
        case 'block':
          e.target.parentElement.children[2].style.display = "none";
          e.target.style.transform = 'rotate(0deg)';
          break;
        default:
          e.target.parentElement.children[2].style.display = "block";
          e.target.style.transform = 'rotate(90deg)';
      }

    };
  });
  WSCore.menu.DOM.animate({
    left: '0em'
  }, 600);
};
WSCore.menu.destroy = function(){
  var nav = $('nav');
  nav.animate({
    left : '-18rem'
  }, function(){
    nav.remove();
    WSCore.menu.DOM = null;
  });
};
WSCore.menu.navigate = function(page){
  switch(page){
    case 'logout':
      WSCore.func.logout();
      break;
    case 'athletes':
      WSCore.pages.athlete.load();
      break;
    case 'addathlete':
    	WSCore.pages.addathlete.load();
    	break;
  }
};
WSCore.menu.globalSearch  = function(query){
	if($('.wrapper').hasClass('athlete')){
		WSCore.pages.athlete.searchquery(query);
	}else{
		$('input.globalsearch').addClass('warning');
	}
};
WSCore.menu.globalSearchReset = function(){
	var box = $('input.globalsearch');
	if(box.hasClass('warning')){
		box.removeClass('warning');
	}
	if(!box.is(":focus")){
		box.val('Suche');
	}
};


WSCore.wrapper = {};
WSCore.wrapper.pageclass = '';
WSCore.wrapper.init = function(callback){
  var wrapper = '<div class="wrapper"></div>';
  var wrapperwidth = $(window).width() - $('nav').width() - 20;
  WSCore.wrapper.DOM = $(wrapper).appendTo('body');
  WSCore.wrapper.DOM.width(wrapperwidth);
  WSCore.wrapper.DOM.css('right','-' + wrapperwidth + 'px');
  WSCore.wrapper.DOM.animate({
    right: '0px'
  }, 800, null, function(){
    if(typeof callback != 'undefined'){
      callback();
    }
  });
};
WSCore.wrapper.destroy = function(){
  var wrapper = $('.wrapper');
  var wrapperwidth = wrapper.width();
  wrapper.animate({
    right : '-' + wrapperwidth + 'px'
  }, function(){
    wrapper.remove();
    WSCore.wrapper.DOM = null;
  })
};
WSCore.wrapper.update = function(content, pageclass, bind){
  $('.wrapper').html(content);
  $('.wrapper').removeClass(WSCore.wrapper.pageclass);
  WSCore.menu.globalSearchReset();
  if(typeof pageclass !== 'undefined'){
  	$('.wrapper').addClass(pageclass);
  	WSCore.wrapper.pageclass = pageclass;
  }else{
  	WSCore.wrapper.pageclass = '';
  }
  if(typeof bind == 'function'){
  	bind();
  }
}



WSCore.message = {};
WSCore.message.alert = function(message){
  alert(message);
};

WSCore.api = {};
WSCore.api.get = function (url, callback){
  $.ajax({
        url: url,
		type: "GET"
  })
  .done(function( data ) {
  	if(typeof callback == 'function'){
  		callback(data); 
  	}
  });
}
WSCore.api.post = function (url, postdata, callback){
  $.ajax({
        url: url,
		type: "POST",
		data : postdata
  })
  .done(function( data ) { 
  	if(typeof callback == 'function'){
  		callback(data); 
  	}
  });
}

WSCore.pages = {};
WSCore.pages.athlete = {};

WSCore.pages.athlete.load = function(){
  WSCore.api.get('/api/athlete', function(data){
    var html = '<table>';
    html += '<thead><tr><th>St.Nr.</th><th>Vorname</th><th>Nachname</th><th>Jahrgang</th><th>Einheit</th><th>Rang</th><th>Geschlecht</th></tr></thead><tbody>'
    for(elem of data){
      html += '<tr><td>'+elem.id+'</td><td>'+elem.firstname+'</td><td>'+elem.lastname+'</td><td>'+elem.age+'</td><td>'+elem.unit+'</td><td>'+elem.rank+'</td><td>'+elem.gender+'</td></tr>'
    }
    html += '</tbody></table>';
    WSCore.wrapper.update(html, 'athlete');
  });
};

WSCore.pages.athlete.searchquery = function (query){
	if(query == ''){
		if($('.wrapper.athlete table thead').hasClass('search')){
			$('.wrapper.athlete table thead').removeClass('search');
		}
	}else{
		if(!$('.wrapper.athlete table thead').hasClass('search')){
			$('.wrapper.athlete table thead').addClass('search');
		}
	}
	var table = $('.wrapper.athlete tbody');
		table.stop();
		table.animate({
			opacity : 0
		}, 200, function(){
			WSCore.api.post('/api/athlete', {search : query}, function(data){
				var html = '';
				for(elem of data){
  	  		html += '<tr><td>'+elem.id+'</td><td>'+elem.firstname+'</td><td>'+elem.lastname+'</td><td>'+elem.age+'</td><td>'+elem.unit+'</td><td>'+elem.rank+'</td><td>'+elem.gender+'</td></tr>'
	    	}		table.html(html);
		   	table.animate({
					opacity : 1
				}, 400);
	  	});
		});
};

WSCore.pages.addathlete = {};
WSCore.pages.addathlete.formdata = [];
WSCore.pages.addathlete.load = function(){
	var formobj = [
		{
			type : 'text',
			name : 'firstname',
			placeholder : 'Vorname'
		},
		{
			type : 'text',
			name : 'lastname',
			placeholder : 'Nachname'
		},
		{
			type : 'text',
			length : 4,
			name : 'year',
			placeholder : 'Geburtsjahr'
		},
		{
			type : 'radio',
			name : 'gender',
			options : [
					{
						text : 'männlich',
						value : 'm'
					},
					{
						text : 'weiblich',
						value : 'f'
					}
				]
		},
		{
			type : 'toggle',
			name : 'unit',
			placeholder : 'Einheit',
			options : [
				{
					value : '1',
					text : 'Ausbildungswerkstatt'
				}
			]
		},
		{
			type : 'toggle',
			name : 'rank',
			placeholder : 'Rang',
			options : [
				{
					value : '1',
					text : 'Auszubildender'
				}
			]
		}
	];
	var html = '';
	html += '<h2>Sportler hinzufügen</h2>';
	html += '<form><div class="row"><div class="col-6">';
	for(input of formobj){
		if(input.type == 'text'){
			html += '<input type="text" class="form-control"';
			if(typeof input.name !== 'undefined'){
				html += ' name="' + input.name + '"';
			}
			if(typeof input.placeholder !== 'undefined'){
				html += ' placeholder="' + input.placeholder + '"';
			}
			html += ' /><br>';
		}else if(input.type == 'toggle'){
			html += '<select class="form-control"';
			if(typeof input.name !== 'undefined'){
				html += ' name="' + input.name + '"';
			}
			if(typeof input.placeholder !== 'undefined'){
				html += ' placeholder="' + input.placeholder + '"';
			}
			html += '>';
			if(typeof input.options !== 'undefined'){
				for(option of input.options){
					html += '<option';
					if(typeof option.value !== 'undefined'){
						html += ' value="' + option.value + '"';
					}
					html += '>';
					if(typeof option.text !== 'undefined'){
						html += option.text;
					}
					html += '</option>';
					
				}
			}
			html += '</select><br>'
		}else if(input.type == 'radio'){
			for(radio of input.options){
				html += '<input type="radio"';
				if(typeof input.name !== 'undefined' && typeof radio.text !== 'unefined'){
					html += ' name="' + input.name + '" id="RE' + radio.text + '"';
				}
				if(typeof radio.value !== 'undefined'){
					html += ' value="' + radio.value + '"';
				}
				
				html += ' />';
				if(typeof input.name !== 'undefined' && typeof radio.text !== 'unefined'){
					html += '<label for="RE' + radio.text + '"> ' + radio.text + '</label>';
				}
			}
		}
	}
	html += '<button class="btn success" type="submit" data-form="submit">Hinzufügen</button>';
	html += '</div></div></form>';
	WSCore.wrapper.update(html, 'addathlete', function(){
		$('form').on('submit', function (e){
			e.preventDefault();
			var target = e.target.children;
			var data = {};
			$(target).find('input[type="text"], input[type="radio"]:checked, select').each(function(){
				var elem = $(this).context;
				data[elem.name] = elem.value;
			});
			WSCore.api.post("/api/athlete/add", data, function(result){
				if(result.status == 200){
					// Athlete added
				}
			});
		});

	});
};
