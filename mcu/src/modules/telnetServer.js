// MODULE: telnetServer.js
// API:    function(connection)

var telnetServer = exports = function(connection) {
  connection.pipe(LoopbackA); // KJB: pipe content of connection to LoopbackA
  LoopbackA.pipe(connection); // KJB: hmmm
  LoopbackB.setConsole();     // KJB: hmmm
}

telnetServer.meta = exports.meta = {
  name:    'telnetServer',
  version: '3.1.2'
};
