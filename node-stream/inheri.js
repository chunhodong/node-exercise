const inherits = require('util').inherits;

function Person() {
   
};
Person.prototype.m = function(){
      console.log('Person m');
  }

function Teacher() {
    Person.call(this);
};
Teacher.prototype.m = function(){
    console.log('Teacher m');
}

  inherits(Teacher,Person);

  const pp = new Teacher();
  pp.m();