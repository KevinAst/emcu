# diddlySquat *(a controller that does NOTHING)*

This sample controller does as little as possible :-)

It's primary purpose is to demonstrate how control logic can be
isolated from the physical hardware (using a bindings structure),
supporting multiple boards with **no code duplication** (using
modules).

diddlySquat uses a cntlButton to toggle through a set of supplied
LEDs, pulsing them on/off.  Each button press progresses the system
state as follows (assuming two LED's are supplied):

- LED1: pulse  (initial state)
- LED1: off
- LED2: pulse
- LED2: off    (startup initial state)
- ... _repeat from start_ ...


## Table of Contents

- [Implementation]
- [API]
- [Hardware Bindings]
- [Runtime Options]
- [Revision History]


## Implementation

The complete controller implementation is found in the `modules/`
directory, and this logic is isolated from the physical hardware using
a paramaterized `bindings` structure.

Multiple "image flashes" can be found in the `projects/` directory,
that correspond to specific hardware bindings.  Each of these images
contain a very small piece of code, simply launching the `modules/`
controller, passing the hardware bindings definition specific to that
image.

```
mcu/src/
   projects/
     diddlySquat.eWiFi.js    image flash bound to the Espruino WiFi board
     diddlySquat.puck.js     image flash bound to the Espruino Puck board
   modules/
     diddlySquat.js          pure controller logic with NO hardware dependency
```

## API

The API of diddlySquat contains two entry points that are **mutually
exclusive**:

- `start(bindings, options): meta`

  The `start()` API is the low-level entry point that starts the
  diddlySquat service in isolation.

  This function contains the actual diddlySquat control logic.

  The low-level `start()` API should be used when multiple service are
  to be started ... _one of which is diddlySquat_.

- `main(bindings, options): meta`

  The `main()` API is a high-level entry point that starts the
  diddlySquat service along with other pre-defined services (as
  directed by `options`) ... _such as a telnetServer_.

  The high-level `main()` API should be used as a mainline entry
  point, when only the diddlySquat service is required (along with the
  additional services `main()` supports).

  This eliminates redundant code for various hardware bindings.


## Hardware Bindings

The following **Hardware Bindings** are required by diddlySquat:

```js
bindings: {
  cntlButtonPin: BTN1,         // the controlling button
  ledPins:       [LED1, LED2], // the set of LEDs to progressively pulse on/off
                               // AI: consider some bindings may call into the 
                               //     controller process BY injecting a 
                               //     cntl {} member in the binding
}
```


## Runtime Options

The following _optional_ **Runtime Options** are supported by
diddlySquat:

**Options:**
```js
options: {
  enableLogs:          true,  // defaults to false
  includeTelnetServer: true,  // defaults to false ... part of main() API
  pulseSpeed:          1000,  // defaults to 500
}
```


## Revision History

Release  | What                                            | *When*
---------|-------------------------------------------------|------------------
[v0.1.0] | Initial Release                                 | *October 20, 2018*


<!-- *** RELEASE *************************************************************** -->

### v0.1.0 - Initial Release *(October 20, 2018)*

<ul><ul><!--- indentation hack for github - other attempts with style is stripped (be careful with number bullets) ---> 

**This is where it all began ...**

</ul></ul>





<!--- *** REFERENCE LINKS *** ---> 
[Implementation]:     #implementation
[API]:                #api
[Hardware Bindings]:  #hardware-bindings
[Runtime Options]:    #runtime-options
[Revision History]:   #revision-history
 [v0.1.0]:             #v010---initial-release-october-20-2018
