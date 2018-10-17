// PROJECT: MCU.DiddlySquat.eWiFi.js ... a mainline for the DiddlySquat controller bound to the Espruino WiFi board
var DiddlySquat = require('DiddlySquat');

var meta = null;

E.on('init', function() {

  meta = DiddlySquat.main(
    { // bindings: DiddlySquat hardware bindings for eWiFi: the Espruino WiFi board
      cntlButtonPin: BTN1,         // the controlling button
      ledPins:       [LED1, LED2], // the set of LEDs to progressively pulse on/off
                                   // TEST: vary this to see it alter controller
    },
    { // options: try these variations
      enableLogs:          true, // default: false
      includeTelnetServer: true, // default: false
      pulseSpeed:          1000, // default: 500
    }
  );

});
