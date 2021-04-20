/**
 * 闭包
 * 闭包是指有权访问另一个函数作用域中的变量的函数
 * 
 * 有关如何创建 一个作用域以及作用域链 有什么作用的细节，对彻底理解闭包至关重要！
 * 
 * 自由变量
 * 如果一个函数包含内部函数，那么他们都可以看到其中申明的变量，这些变量被称为自由变量。
 * 
 * 
 * 防抖 就是闭包的体现！！！！！
 */


/**
 * 闭包的副作用
 * 
 * 闭包只能取得包含函数中任何变量的最后一个值
 */

/**
 * 闭包中 this 对象的问题
 * 
 * this 对象是运行时基于函数的运行环境绑定的
 * 当函数被某个对象的方法调用的时候，this 指向那个对象
 * 但是 匿名函数中的执行环境具有全局性，因此其 this 对象通常指向 window。
 */
var name = 'My Window'
var object = {
  name: 'my object',
  getName: function() {
    return function() {
      return this.name;
    }
  }
}
object.getName()() // my window

// ...此处应用的是that ，事先存储了object的this
var object = {
  // ...
  getName: function() {
    var that = this;
    return function() {
      return that.name;
    }
  }
}
object.getName()() // my object
// ...


/**
 * 闭包的好处
 * 变量a类似于高级语言的私有属性，无法被func外部作用域访问和修改，只有func内部的作用域（含嵌套作用域）可以访问。
 * 这样可以实现软件设计上的封装，设计出很强大的类库、框架，比如我们常用的jQuery、AngularJS、Vue.js。
 */
//定义一个模块
function module(n) {
  //私有属性
  let name = n;
  //私有方法
  function getModuleName() {
    return name;
  }
  //私有方法
  function someMethod() {
    console.log("coffe1891");
  }
  //以一个对象的形式返回
  return {
    getModuleName: getModuleName,
    getXXX: someMethod
  };
}

let myapp = module("myModule");//定义一个模块
console.log(myapp.getModuleName()); //>> myModule
console.log(myapp.getXXX()); //>> coffe1891


/**
 * 闭包的缺点
 * 
 * 通常函数的作用域及其所有变量都会在函数执行结束后被销毁
 * 
 * 说到闭包的缺点就得知道js中的垃圾回收机制：
 * 如果对象不再被引用，或者对象互相引用形成数据孤岛后且没有被孤岛之外的其他对象引用，那么这些对象将会被JS引擎的垃圾回收器回收；
 * 反之，这些对象一直无法被销毁。
 * 
 * 由于闭包会引用包含它的外层函数作用域，因此会比其他非闭包形式的函数占用更多内存。
 * 
 * 当外层函数执行完毕退出函数调用栈（call stack）的时候，外层函数作用域里变量因为被引用着，可能并不会被JS引擎的垃圾回收器回收，因而会引起内存泄漏。
 * 过度使用闭包，会导致内存占用过多，甚至内存泄漏。
 * V8引擎对其做了优化，但尽量不过多使用闭包！
 */
function A(){
  var count = 0;
  function B(){
    count ++;
    console.log(count);
  }
  count = null; // 清除引用，防止内存过多占用
  return B; //函数B保持了对count的引用
}
var b = A();
b();//>> 1
b();//>> 2
b();//>> 3


/**
 * 反转谓词，闭包的极致应用
 * 比如判断是否为偶数，反转之后为判断是否为奇数
 */
function complement(PRED) {
  return function() {
    return !PRED.apply(null, Array.from(arguments));
  }
}
// example
function isEven(n) { return (n%2) === 0; };
const isOdd = complement(isEven);

// 如果后期修改了isEven函数
function isEven() { return false; }

// 变量捕获是在闭包创建的阶段进行的，所以不会对isOdd有影响
isEven(12) // false
isOdd(12) // false
isOdd(13) // true


/**
 * 捕获变量作为私有数据，这样可以减少风险
 */
var pingpong = (function() {
  // ... 这里就是块级作用域
  var PRIVATE = 0;

  return {
    inc: function(n) {
      return PRIVATE += n;
    },
    dec: function(n) {
      return PRIVATE -= n;
    }
  }
})();

pingpong.div = function(n) {return PRIVATE / n};
// 因为PRIVATE为私有变量，所以外部新增的方法无法使用
pingpong.div(3) // error: PRIVATE is not defined


/**
 * 闭包应用：延长局部变量生命
 */
// 这段代码在运行时，发现在一些低版本浏览器上存在bug，会丢失部分数据上报。原因是Image对象是report函数中的局部变量，当report函数调用结束后，Image对象随即被JS引擎垃圾回收器回收，而此时可能还没来得及发出http请求，所以可能导致此次上报数据的请求失败。
var report = function(src) {
  var img = new Image();
  img.src = src;
}
report('http://www.xxx.com/getClientInfo');//把客户端信息上报数据

// 修改之后, Image对象封闭起来
var report = (function() {
  var imgs = [];//在内存里持久化
  return function(src) {
    var img = new Image();
    imgs.push(img);//引用局部变量imgs
    img.src = src;
  }
}());
report('http://www.xxx.com/getClientInfo');//把客户端信息上报数据
