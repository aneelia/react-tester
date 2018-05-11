const tasks = [
  {
    tabName: 'Question 1',
    tabKey: 'question1',
    result: 'notAnswered',
    test: `(function(){ 
      __CODE__; 
      const p = new Person('Jake');
      console.log(p);
      const ps = p.speak();

      if (ps !== 'Jake greets you all') throw new Error('Method speak is incorrect');
      if (typeof Person.prototype.speak !== 'function') throw new Error('Method speak must be in prototype object');

    })();`,
    code: '',
    errorMessage: '',
    description: `Create a class Person, that accepts name as a parametr and add a
              method 'speak' to his prototype. The result of a method must return
              following string 'Jake greets you all'`,
    mode: {
      editor: true,
      lang: 'javascript'
    }
  },
]

module.exports = { tasks };
