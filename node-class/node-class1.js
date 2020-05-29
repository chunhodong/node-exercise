class PersonClass{
    constructor(name){
        this.name = name;
    }

    sayName(){
        console.log(this.name);
    }
}

class Foo{
    constructor(){

        //클래스내부에서 같은이름을 쓰면 에러 발생
        //Foo = 'faev';
    }
}
Foo = 'dong';

let person = new PersonClass('Macoy');
person.sayName();
console.log(person.name);

console.log(typeof PersonClass);

console.log(new Foo());