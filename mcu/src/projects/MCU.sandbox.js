// PROJECT: MCU_sandbox.js ... sandbox play app, testing things like modules

var TestMod1 = require('TestMod1');

(function () { // IIFE START: place all in-line code in functions to bypass espruino special processing issues with windows cr/lf

// prove default exports can be a function
if (TestMod1() === 'TestMod1 PRIVATE STATE') {
  print('GREAT: TestMod1 private state is availble to it');
}
else {
  print('BAD: TestMod1 private state value is unexpected: ' + TestMod1());
}

// prove non-default exports are available
if (TestMod1.abc === 'abc-resource' && TestMod1.def === 'def-resource') {
  print('GREAT: TestMod1 non-default exports are as expected!');
}
else {
  print(`BAD: TestMod1 non-default exports are unexpected ${TestMod1.abc}/${TestMod1.def}`);
}

// prove module variable are scoped within the module only!
if (global.privateVar) {
  print('BAD: TestMod1 privateVar IS available from our PROJECT mainline: ' + privateVar);
}
else {
  print('GREAT: TestMod1 privateVar is NOT available from our PROJECT mainline!');
}

// prove module inline code only executes ONCE no matter how many times it is "required"
// ... MANUALL CHECK THAT "expanding TestMod1.js" is logged ONLY once
print('expecting "abc-resource" WITHOUT additional "expanding TestMod1.js" log ... ' + 
      require('TestMod1').abc);

// NOTE: esprino supports SOME es6 constructs HOWEVER in mainline ONLY (NOT Modules)
//       ACTUALLY, if modules are uncompressed, it works there too
var myFunc = () => 'hello world';
print(`es6 template, with arrow functions: ${myFunc()}`);

// NOTE: simply requiring a module loads it and executes it's inline code
//       EVEN when it is never dereferenced!
//       ... prove this by seeing the in-line expansion log output
require('TestMod3');

})(); // IIFE END
