// PROJECT: diddlySquat.eWiFi.js ... a mainline for the diddlySquat controller bound to the Espruino WiFi board.
var diddlySquat = require('diddlySquat');

var meta = null;

E.on('init', function() {

  meta = diddlySquat.main(
    { // bindings:
      cntlButtonPin: BTN1,         // the controlling button
      ledPins:       [LED1, LED2], // the set of LEDs to progressively pulse on/off
    },
    { // options:
    //enableLogs:          true, // default: false
      includeTelnetServer: true, // default: false
    //pulseSpeed:          1000, // default: 500
    }
  );

});
