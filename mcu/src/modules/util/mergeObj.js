// MODULE: mergeObj.js
// 
// DESC:   Merge two supplied objects into one new returned object,
//         using ES5 constructs only (sutable for espruino).
// 
// API:    mergeObj(obj1={}, obj2={}): mergedObj

exports = function(obj1, obj2) {

  // default supplied params
  obj1 = obj1 || {};
  obj2 = obj2 || {};

  // merge into 3rd object
  var mergedObj = {};
  for (var name in obj1) { mergedObj[name] = obj1[name]; }
  for (var name in obj2) { mergedObj[name] = obj2[name]; }

  return mergedObj;
}
