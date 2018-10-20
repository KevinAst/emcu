// MODULE: wifiService.js ... start the supplied service on a WiFi connection
// API:    start(wifiName, wifiPass, port, serviceFn(connection))

var wifi = require('Wifi');
var net  = require('net');

exports.start = function(wifiName, wifiPass, port, serviceFn) {

  // meta data (for diagnostics)
  var meta = {
    name:    'wifiService',
    version: '0.2.1',
    IP:      'in process of resolving ... check back later',
    running: serviceFn.meta || 'unknown',
  }

  // TODO: for some reason, this require() cannot be resolved in-line when it is included in other modules
  //       ... ERROR: Module log not found
  var log = require('util/log').prefix('***wifiService*** ');

  // make our wifi connection
  wifi.connect(wifiName, { password : wifiPass }, function(err) {

    if (err) {
      log.force('ERROR: Connecting to WiFi: ' + err);
      return;
    }

    wifi.getIP( function(err, ipInfo) {
      if (err) {
        log.force('ERROR: Fetching WiFi IP: ' + err);
        return;
      }
      var IP  = ipInfo.ip + ':' + port;
      meta.IP = IP;
      log('WiFi Connected ... Use IP: ' + IP /*, ipInfo*/);
    });

    // now run the supplied service on the given port
    // ... KJB: somehow the connection is globally known
    net.createServer(serviceFn).listen(port);
  });

  // return our meta data
  return meta;
}
