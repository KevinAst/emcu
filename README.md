# emcu _(Espruino MCU (Micro Controller Unit))_

## At a Glance

- [Overview]
- [Controllers]
- [Install]
- [NPM Scripts]
- [Revision History]

## Overview

This project consists of two projects in one:

1. Micro Controller code that runs on a microcontroller board _(see:
   [`mcu/`] directory)_

2. Remote Manager web app that connects to the board to monitor/adjust
   a running microcontroller _(see: [`web/`] directory)_ **TODO**.


## Controllers

This project contains the following controllers:

- [diddlySquat] *(a controller that does NOTHING)*

  It's primary purpose is to demonstrate how control logic can be
  isolated from the physical hardware (using a bindings structure),
  supporting multiple boards with no code duplication (using modules).



## Install

If you want to run this project locally on your machine, simply clone
the git repo _(or zip it up)_, and initialize it as follows:

```
$ cd {project-root}

$ npm install    # install project dependencies
```

You are now ready to **add/modify code** and run the various **NPM
Scripts**!


## NPM Scripts

The following npm scripts are available to this project:

```
TOOLING
=======
pkgReview ... Show outdated installed packages


Espruino Scripts
================
e ........................... run an Espruino interactive session (Ctrl-c Ctrl-C to exit)

e:list ...................... list Espruino list devices

e:flash:diddlySquat.eWiFi ... flash the diddlySquat controller for the Espruino WiFi board
e:flash:diddlySquat.puck .... flash the diddlySquat controller for the Espruino Pico board
```


**NOTE**: All the `e` scripts that **connect to a microcontroller**, do so
using the `espruinoPort` OS Env variable.

<ul><ul><!--- indentation hack for github - other attempts with style is stripped (be careful with number bullets) ---> 

Here is an example:

**List available ports** ...
```
$ npm run e:list
  > output:
    *** Espruino list devices:
    Espruino Command-line Tool 0.1.15
    -----------------------------------

    PORTS:
      COM6 (Microsoft)
      COM4 (Microsoft)
      COM3 (Microsoft)
```

**Define `espruinoPort` OS Env variable as needed** ...
```
# DOS:
  $ set espruinoPort=COM6
  $ echo %espruinoPort%
    > output:
      COM6

# Power Shell (Window 10)
  $ setx espruinoPort COM6  # sets User Variable on subsequent shells
  * launch NEW Power Shell (prior setx will now be available)
  $ echo $Env:espruinoPort
    > output:
      COM6

# Unix / Linux
  $ espruinoPort=COM6
  $ echo $espruinoPort
    > output:
      COM6
```

**Run `e` script** ...
```
$ npm run e
  > output:
    *** Espruino interactive session (Ctrl-c Ctrl-C to exit):
    Espruino Command-line Tool 0.1.15
    -----------------------------------

    Connecting to 'COM6'
    Connected
    > 
```
</ul></ul>




## Revision History

Release  | What                                            | *When*
---------|-------------------------------------------------|------------------
[v0.1.0] | Initial Release                                 | *October xx, 2018*


<!-- *** RELEASE *************************************************************** -->

### v0.1.0 - Initial Release *(October xx, 2018)*

<ul><ul><!--- indentation hack for github - other attempts with style is stripped (be careful with number bullets) ---> 

[GitHub Content](https://github.com/KevinAst/emcu/tree/v0.1.0)
&bull;
[GitHub Release](https://github.com/KevinAst/emcu/releases/tag/v0.1.0)
<!-- Diff ONLY for subsequent releases
&bull;
[Diff](https://github.com/KevinAst/emcu/compare/v0.1.0...v0.2.0)
-->

**This is where it all began ...**

</ul></ul>

<!--- *** REFERENCE LINKS *** ---> 
[Overview]:            #overview
[Controllers]:         #controllers
[Install]:             #install
[NPM Scripts]:         #npm-scripts
[Revision History]:    #revision-history
 [v0.1.0]:             #v010---initial-release-october-xx-2018


[`mcu/`]:              mcu/
[`web/`]:              web/
[diddlySquat]:         mcu/src/modules/diddlySquat.md
