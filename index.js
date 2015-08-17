"use strict";
/* Multicore Support */
var cluster = require ('cluster');
if (cluster.isMaster){ 
  var numCPUs = require('os').cpus().length;
  console.log("Es wurden %i CPU-Kerne gefunden", numCPUs);
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}else{
  /* Main Process */
global.core = {
  init : function(){
    this.config = require('./config.js');
    this.modules.express = require('express');
    this.modules.mysql = require('mysql');
    this.modules.cookieParser = require('cookie-parser');
    this.modules.bodyParser = require('body-parser');
    this.modules.crypto = require('crypto');
    this.date = new Date();
    this.fs = require('fs');
    this.pool = this.modules.mysql.createPool({           // Create MySQL-Connection-Pool
      connectionLimit : 100,
      host            : this.config.mysqlhost,
      user            : this.config.mysqluser,
      password        : this.config.mysqlpass,
      database        : this.config.mysqlname
    });
    this.app = this.modules.express();
    this.app.use(this.modules.cookieParser());            // Cookie-Pharser included
    this.app.use(this.modules.bodyParser.json());         // Enable JSON-body support
    this.app.use(this.modules.bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }));
    this.module.events = require('events');
    this.e = new this.module.events.EventEmitter();
    this.listener();
  },
  modules : {},
  listener : require('./listeners.js')
  

}

global.core.init();

}
