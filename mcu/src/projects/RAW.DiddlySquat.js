// PROJECT: RAW.DiddlySquat.js ... a controller that does NOTHING
//          SEE:  DOC.DiddlySquat.md
//          NOTE: this logic has embedded hardware knowledge
//                ... could NOT be easily retrofitted to other boards
//                    WITHOUT a TON of duplicate code (i.e. copy/paste)
//                ... i.e. it is NOT MAINTAINABLE!
function onInit() {

  // baseline our board to it's initial state
  clearInterval();
  clearWatch();

  // initialize our internal state
  var ledPins = [LED1, LED2]; // the set of LEDs to progressively pulse on/off

  var state = {
    pinIndx: 9999, // current index into ledPins[] (when surpassed, simply start over)
    pulseId: 0,    // pulse interval id (0 if NOT pulsing)
  };

  // utility functions ...
  function startLEDPulse() {
    state.pulseId = setInterval( function() {
      ledPins[state.pinIndx].toggle();
    }, 500);
  }

  function stopLEDPulse() {
    clearInterval(state.pulseId);
    state.pulseId = 0;
    ledPins[state.pinIndx].write(0);
    state.pinIndx++;
  }

  function nextState() {
    if (state.pinIndx >= ledPins.length) { // at end of LEDs ... start over
      state.pinIndx = 0;
      startLEDPulse();
    }
    else if (state.pulseId) { // currently pulsing ... turn off
      stopLEDPulse();
    }
    else { // not pulsing
      startLEDPulse();
    }
  }

  // monitor our controlling button
  setWatch( nextState, BTN1, { // options
    repeat:   true,
    edge:     'rising', // button down
    debounce: 25
  });

  // initially advance to next state
  nextState();
}
