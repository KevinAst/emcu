# DiddlySquat *(a controller that does NOTHING)*

This controller is a sample app that does as little as possible :-)

It demonstrates how control logic can be isolated from other
functionality using modules.

A cntlButton is used to toggle through a set of supplied LEDs, pulsing
them on/off.  Each button press progresses the system state as follows
(assuming two LED's are supplied):

- LED1: pulse  (initial state)
- LED1: off
- LED2: pulse
- LED2: off    (startup initial state)
- ... _repeat from start_ ...


## Implementation

This controller has two different implementations, demonenstrating how
a "raw" implementation can be broken up into reusable components.

- RAW implementation (all self contained)

  ```
  c:/TEMP/espruinoSandbox/
     projects/
       RAW.DiddlySquat.js
  ```

- MODULAR (in separate files)

  ```
  c:/TEMP/espruinoSandbox/
     projects/
       MCU.DiddlySquat.eWiFi.js    DiddlySquat flash bound to the Espruino WiFi board
       MCU.DiddlySquat.puck.js     DiddlySquat flash bound to the Espruino Puck board
     modules/
       DiddlySquat.js              DiddlySquat Controller with NO hardware dependency
                                   API: start(bindings, options)
                                        -or-
                                        main(bindings, options)
  ```

  **Hardware Bindings:**
  ```js
  bindings: {
    cntlButtonPin: BTN1,         // the controlling button
    ledPins:       [LED1, LED2], // the set of LEDs to progressively pulse on/off
                                 // AI: consider some bindings may call into the 
                                 //     controller process BY injecting a 
                                 //     cntl {} member in the binding
  }
  ```

  **Options:**
  ```js
  options: {
    enableLogs:          false, // defaults to false
    includeTelnetServer: true,  // defaults to false ... part of main() API
    pulseSpeed:          1000,  // defaults to 500
  }
  ```




## File Types:

```
projectRoot/
  projects/

    MCU.xyz.hdw.js .... a project mainline for the 'xyz' primary controller,
                        bound to the 'hdw' hardware board

  modules/

    xyz.js ............ a module containing the logic for an 'xyz' controller,
                        using configurable hardware bindings
                          Controller: API: start(bindings, options) -and-
                          Mainline    API: main(bindings, options)
```
