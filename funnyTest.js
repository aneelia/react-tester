///
var foo = function foo() {
  console.log(foo === foo);
};
foo();

////
function aaa() {
  return;
  {
    test: 1;
  }
}
console.log(typeof aaa());

///
Number('1') - 1 ==
  0(
    ///
    true + false
  ) >
    2 + true;

///
function bar() {
  return foo;
  foo = 10;
  function foo() {}
  var foo = '11';
}
console.log(typeof bar());

///
'1' - -'1';

///
var x = 3;

var foo = {
  x: 2,
  baz: {
    x: 1,
    bar: function() {
      return this.x;
    }
  }
};

var go = foo.baz.bar;

console.log(go());
console.log(foo.baz.bar());

///
new String('This is a string') instanceof String;

///
[] + [] + 'foo'.split('');

///
new Array(5).toString();

///
var myArr = ['foo', 'bar', 'baz'];
myArr.length = 0;
myArr.push('bin');
console.log(myArr);

///
String('Hello') === 'Hello';

///
var x = 0;
function foo() {
  x++;
  this.x = x;
  return foo;
}
var bar = new new foo()();
console.log(bar.x);

///
'This is a string' instanceof String;

///
var bar = 1,
  foo = {};

foo: {
  bar: 2;
  baz: ++bar;
}
foo.baz + foo.bar + bar;

///
var myArr = ['foo', 'bar', 'baz'];
myArr[2];
console.log('2' in myArr);

///
var arr = [];
arr[0] = 'a';
arr[1] = 'b';
arr.foo = 'c';
console.log(arr.length);

///
10 > 9 > 8 === true;

///
function foo(a, b) {
  arguments[1] = 2;
  console.log(b);
}
foo(1);

///
NaN === NaN;

///
({
  valueOf: function() {
    return 1;
  }
} -
  '1' +
  {
    valueOf: function() {
      return 1;
    }
  } +
  '1' -
  {
    toString: function() {
      return 1;
    }
  });

///
parseInt(null, 24) === 23;
