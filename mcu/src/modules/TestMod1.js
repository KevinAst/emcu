// MODULE: TestMod1.js
// API:    TODO

// NOTE: inline code only executes ONCE no matter how many times it is "required"
//       ... PROVE this by requiring it multiple times (you should only see this output ONCE)!
print('expanding TestMod1.js ... inline code');

// NOTE: can overwrite the default exports object with a function
//       ... HOWEVER must be executed BEFORE any other exports.xyz
//           because it clobers any prior exports wrapper object
//       ... ALSO NOTE: a function can in fact have properties too
exports = function() {
  return privateVar;
}

// NOTE: non-default exports can be apended to our exports wrapper object
exports.abc = 'abc-resource';
exports.def = 'def-resource';

// NOTE: inline vars are private (NOT poluting the global namespace)
//       ... PROVE THIS by trying to reference it in our mainline (global.privateVar)
var privateVar = 'TestMod1 PRIVATE STATE';

// BAD: esprino does NOT support it's limited es6 constucts in module code
// var es6Template = `this is a test ${privateVar}`; // Error: Line nn: Unexpected token ILLEGAL in TestMod1
// var myFunc = () => 'hello world';                 // TypeError: Cannot read property 'length' of undefined in TestMod1

// PROVE modules can require other modules
if (require('TestMod2').xyz === 'xyz-resource') {
  print('GREAT: TestMod1 can require TestMod2');
}
else {
  print('BAD: TestMod1 had unexpected result in requiring TestMod2: ' + require('TestMod2').xyz);
}
