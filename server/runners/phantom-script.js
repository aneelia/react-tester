var page = require('webpage').create();
var args = require('system').args;

var filename = args[1];

page.open('./server/runners/' + filename, function(status) {
  var ua = page.evaluate(function() {
    return document.getElementById('result').textContent;
  });

  console.log(ua);

  phantom.exit();
});
