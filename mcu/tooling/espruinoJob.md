# espruinoJob.json

## Overview

The `espruinoJob.json` contain configuration options for interacting
to MCU boards containing the espruino JavaScript interpreter.

This job file is referenced by the npm scripts to minimize repeated
command-line configuration.

## Configuration Options

The following list specifies various options, giving insight as to
where each option is specified.

For a complete list of options, please refer to the
[EspruinoTools](https://github.com/espruino/EspruinoTools)
documentation -and-
[configDefaults.json](https://github.com/espruino/EspruinoTools/blob/gh-pages/configDefaults.json).

- **verbose**: true/false

  Enable this option to see actual code sent to the espruino board!

  **Recommendation**: false (the default)


- **quiet**: true/false

  Enable this to minimize output from the espruino board!

  **Recommendation**: false (the default)


- **expr**: "JS expression to execute on board"

  **Recommendation**: use command-line option (`-e command`)
  **BECAUSE** cannot specify in job file for interactive sessions, as
  espruino will exit after command executes :-(

  **Example (job file)**: `"expr":  "save()",`

  **Example (command-line)**: `-e "save()"`


- **file**: "file path to upload"

  **Recommendation**: use command-line option (`file_to_upload.js`)
  **BECAUSE** it will vary on each npm flash script!


- **ports**: `[{ "type": "path", "name": "COM6" }]`

  **Recommendation**: use command-line option (`--port $espruinoPort`)
  **USING** OS Env Var, **BECAUSE** it will vary for each user!

- Espruino Options (only available in job file)

  * **MODULE_URL**: specify multiple paths to resolve modules in require()

    **Example**: 
    ```
    "espruino": {
      "MODULE_URL":   "mcu/src/modules|http://www.espruino.com/modules"
    }
    ```

    **NOTE**: require() supports depth beneath these directory paths

  * **MODULE_EXTENSIONS**: specify file extensions to resolve modules in require()

    **Example**: 
    ```
    "espruino": {
      "MODULE_EXTENSIONS": ".min.js|.js",
    }
    ```

    **Recommendation**: only resolve non minified code - PRIMARILY to
    avoid FALSE errors from espruino flash saying: no such file for
    *.min.js :-(
