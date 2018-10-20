/**
 * MODULE: diddlySquat.js
 * 
 * DESC:   A sample controller that demonstrates how control logic can
 *         be isolated from the physical hardware (using a bindings
 *         structure), supporting multiple boards with **no code
 *         duplication** (using modules).
 * 
 * DOCS:   diddlySquat.md
 */

var mergeObj     = require('util/mergeObj');
var log          = require('util/log').prefix('***diddlySquat*** ');

var myWiFi       = require('myWiFi');
var wifiService  = require('wifiService');
var telnetServer = require('telnetServer');

// meta data (for diagnostics)
var meta = {
  name:    'diddlySquat',
  version: '0.1.0',
}

// start(bindings, options): meta
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


// main(bindings, options): meta
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
  meta.diddlySquat = start(bindings, options);

  // we can also start a telnet server (very simply)
  // ... test this by powering up MCU (no data connection), connect to WiFi, see it's logs!!
  if (options.includeTelnetServer) {
    meta.wifiService = wifiService.start(myWiFi.name, myWiFi.pass, 23, telnetServer);
  }

  // return our meta data
  return meta;
}
