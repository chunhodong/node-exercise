/**
 * @description ECMAScript5까지 js에서 클래스를 만드는 방법
 * 생성자함수를 통해서 값을 할당하고 프로토타입에서 인스턴스가 공유하는 데이터/함수를 설정
 */
function PersonType(name){
    this.name = name;
}
PersonType.prototype.sayName = function(){
    console.log(this.name);
};

PersonType.prototype.high = 5;

let person = new PersonType('Nicol');
delete person.sayName;
person.sayName();

let conn = new PersonType('kay');
conn.high = 7;
conn.sayName();

/*
console.log('-----------------------------1');

console.log(conn.high);
console.log(person.high);

console.log('-----------------------------2');
console.log(person instanceof PersonType);
console.log(person instanceof Object);
console.log(PersonType.prototype.high);
console.log(typeof PersonType);
*/