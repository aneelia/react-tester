var util = require('util');
var vm = require('vm');

module.exports = ({ test }, code) => {
  console.log(code);
  const sourceCode = test.replace(/__CODE__/g, code);
  console.log(sourceCode);
  const script = new vm.Script(sourceCode);
  const context = new vm.createContext();
  return script.runInContext(context);
};
