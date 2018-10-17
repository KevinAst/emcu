// PROJECT: MCU.DiddlySquat.puck.js ... a mainline for the DiddlySquat controller bound to the Espruino Puck board (not really just pretend)
var DiddlySquat = require('DiddlySquat');

var meta = null;

E.on('init', function() {

  meta = DiddlySquat.main(
    { // bindings: DiddlySquat hardware bindings for puck: the Espruino Puck board (not really just pretend)
      cntlButtonPin: BTN1,         // the controlling button
      ledPins:       [LED2],       // the set of LEDs to progressively pulse on/off ... for the Puck, we only have ONE LED
      // TEST: vary this to see it alter controller
    },
    { // options: try these variations
      enableLogs:          true, // default: false
      includeTelnetServer: true, // default: false
      pulseSpeed:          1000, // default: 500
    }
  );

});
