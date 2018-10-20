// MODULE: log.js
// 
// DESC:   A simple logging utility:
//         - can be enabled/disabled at run-time
//         - logging probes can be prefixed with desired context (ex:  ***context***)
//         - a simple layer on top of console.log()
//      
//         API:
//         + log(msg [,obj]): void       ... conditionally log probe when logging is enabled
//         + log.force(msg [,obj]): void ... unconditionally log probe
//         + log.isEnabled(): true/false ... is logging enabled or disabled
//         + log.enable(): void          ... enable  logging
//         + log.disable(): void         ... disable logging
//         + log.prefix(prefix): log     ... return a new logger (HOF) that adds supplied prefix to all it's logging probes

var _enabled = false;

var log = exports = function(msg, obj) {
  if (log.isEnabled()) { // conditionally log when enabled
    log.force(msg, obj);
  }
}

// API: log.force(msg [,obj]): void ... unconditionally log probe
log.force = function(msg, obj) {
  if (obj) {
    console.log(msg, obj);
  }
  else {
    console.log(msg);
  }
};

// API: log.isEnabled(): true/false ... is logging enabled or disabled
log.isEnabled = function() {
  return _enabled;
};

// API: log.enabled(): void ... enable logging
log.enable = function() {
  _enabled = true;
  log('enabling log()');
};

// API: log.disable(): void ... disable logging
log.disable = function() {
  log('disabling log()');
  _enabled = false;
};

// API: log.prefix(prefix): log ... support plugin project logging with their own prefix (a HOF logger)
log.prefix = function(prefix) {

  const newLogger = function(msg, obj) {
    // re-implement to hook into our .force() ... where the prefixing occurs
    if (log.isEnabled()) {
      newLogger.force(msg, obj);
    }
  };

  // this is where the magic happens (i.e. the additional prefixing)
  newLogger.force = function(msg, obj) {
    return log.force(prefix+msg, obj);
  };

  // apply all same log.properties (for consistant API)
  // ... referencing original log master
  // >>> NOTE: this means there is ONE enablement!
  //           KIS:  Keep it Simple
  //           EX:   by enabling log, all logging is enabled (even new loggers)
  newLogger.isEnabled = log.isEnabled;
  newLogger.enable    = log.enable;
  newLogger.disable   = log.disable;
  newLogger.prefix    = log.prefix;  // NOTE: this does NOT accumulate prefixes (we draw the line somewhere in this simple implementation)
  
  // thats all folks
  return newLogger;
};
