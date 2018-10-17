// PROJECT: MCU_telnetService.js ... run a simple MCU telnet service

var myWiFi       = require('myWiFi');
var wifiService  = require('wifiService');
var telnetServer = require('telnetServer');

E.on('init', function() {
  wifiService.start(myWiFi.name, myWiFi.pass, 23, telnetServer);
});
