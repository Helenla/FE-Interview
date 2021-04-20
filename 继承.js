function father(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green']; // 复杂类型
}
father.prototype.sayName = function (age) {
  console.log(this.name, age)
}

function son(name, age) {
  father.call(this, name);
  this.age = age;
}
function inheritPrototype(sonFn, fatherFn) {
  sonFn.prototype = Object.create(fatherFn.prototype);
  sonFn.prototype.constructor = sonFn;
}

inheritPrototype(son, father);
son.prototype.sayAge = function () {
  console.log('age:', this.age)
}

const instance1 = new son('Onkoro1', 20);
const instance2 = new son('girl1', 18);
instance1.colors.push('black');
instance1.sayName(20)

console.log(instance1, instance2)

// function superType() {
//   this.colors = ['red', 'black', 'white'];
// }
// superType.prototype.sayColors = function () {
//   console.log(this.colors);
// }
// function subType() {
//   superType.call(this)
// }
// subType.prototype = new superType();
// subType.prototype.constructer = subType;

// let instance = new subType();
// instance.colors.push('grey');
// instance.sayColors();

// let instance2 = new subType();
// instance2.sayColors();