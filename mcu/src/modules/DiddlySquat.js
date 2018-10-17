// MODULE: DiddlySquat.js
// 
// DESC:   A sample controller that demonstrates how control logic
//         can be isolated from other functionality using modules.
// 
//         This module contains the DiddlySquat logic, 
//         stripped of specific hardware knowledge!
//         ... the hardware knowledge is provided through 
//             the supplied bindings
// 
//         ... see: DOC.DiddlySquat.md
// 
// API:    start(bindings, options): meta
//         -or-
//         main(bindings, options): meta

var mergeObj     = require('mergeObj');
var log          = require('log').prefix('***DiddlySquat*** ');

var myWiFi       = require('myWiFi');
var wifiService  = require('wifiService');
var telnetServer = require('telnetServer');

// meta data (for diagnostics)
var meta = {
  name:    'DiddlySquat',
  version: '0.1.0',
}

// start the DiddlySquat controller
var start = exports.start = function(bindings, options) {

  // default supplied options
  options = mergeObj({
    pulseSpeed: 500,
    enableLogs: false,
  }, options);

  if (options.enableLogs) {
    log.enable();
  }

  log('starting controller service with options: ', options);

  // initialize our internal state
  var state = {
    pinIndx: 9999, // current array index into bindings.ledPins[] (when surpassed, simply start over)
    pulseId: 0,    // pulse interval id (0 if NOT pulsing)
  };

  // utility functions ...
  function startLEDPulse() {
    state.pulseId = setInterval( function() {
      bindings.ledPins[state.pinIndx].toggle();
    }, options.pulseSpeed);
  }

  function stopLEDPulse() {
    clearInterval(state.pulseId);
    state.pulseId = 0;
    bindings.ledPins[state.pinIndx].write(0);
    state.pinIndx++;
  }

  function nextState() {
    // at end of LEDs ... start over
    if (state.pinIndx >= bindings.ledPins.length) {
      state.pinIndx = 0;
      startLEDPulse();
      log('in nextState(): at end ... starting over: ', state);
    }
    // currently pulsing ... turn off
    else if (state.pulseId) {
      stopLEDPulse();
      log('in nextState(): pulsing ... turn off: ', state);
    }
    // not pulsing ... turn on
    else {
      startLEDPulse();
      log('in nextState(): not pulsing ... turn on: ', state);
    }
  }

  // monitor our controlling button
  log('watching cntlButtonPin');
  setWatch( nextState, bindings.cntlButtonPin, { // options
    repeat:   true,
    edge:     'rising', // button down
    debounce: 25
  });

  // initially, our state is advanced to the very start
  nextState();

  // return our meta data
  return meta;
}


// a DiddlySquat mainline
// ... invocation is mutually exclusive to start()
// ... usage minimizes redundant code for various hardware bindings
exports.main = function(bindings, options) {

  // default supplied options
  options = mergeObj({
    includeTelnetServer: false,
    enableLogs:          false,
  }, options);

  if (options.enableLogs) {
    log.enable();
  }

  log('starting controller mainline with options: ', options);

  // baseline our board to it's initial state
  clearInterval();
  clearWatch();

  // accumulate our meta data (for diagnostics)
  var meta = {};

  // start our controller
  meta.DiddlySquat = start(bindings, options);

  // we can also start a telnet server (very simply)
  // ... test this by powering up MCU (no data connection), connect to WiFi, see it's logs!!
  if (options.includeTelnetServer) {
    meta.wifiService = wifiService.start(myWiFi.name, myWiFi.pass, 23, telnetServer);
  }

  // return our meta data
  return meta;
}
