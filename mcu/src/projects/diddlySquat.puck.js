// PROJECT: diddlySquat.puck.js ... a mainline for the diddlySquat controller bound to the Espruino Puck board (not really just pretend).
var diddlySquat = require('diddlySquat');

var meta = null;

E.on('init', function() {

  meta = diddlySquat.main(
    { // bindings:
      cntlButtonPin: BTN1,   // the controlling button
      ledPins:       [LED2], // the set of LEDs to progressively pulse on/off ... Puck only has ONE
    },
    { // options:
    //enableLogs:          true, // default: false
      includeTelnetServer: true, // default: false
      pulseSpeed:          1000, // default: 500
    }
  );

});
