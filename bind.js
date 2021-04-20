/**
 * 用原生JavaScript实现bind
 * 
 * 返回func的拷贝，并拥有指定的this值和初始参数。
 * func.bind(thisArg, param1, param2, ...);
 * bind则是返回改变了this指向后的函数，不执行该函数。
 * func.bind(thisArg, param1)(param2); // bind返回的函数立即调用
 */
Function.prototype._bind = function (objThis, ...params) {
  const thisFn = this; // 存储调用bind的函数

  // 返回出去的函数不是立即执行，所以会出现func.bind(...)(param2)这种使用，此处处理第二次传入的参数
  const funcForBind = function(...secParams) {
    console.log(this instanceof funcForBind);
    // instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
    // 判断this 是否是 funcForBind 的实例？也就是检查funcForBind是否通过new调用
    const isNew = this instanceof funcForBind;
    // new 调用就绑定到this上，否则就绑定到传入的objThis
    const thisArg = isNew ? this : Object(objThis);
    // 用call执行调用函数，绑定this的指向，并传递参数，返回执行结果
    return thisFn.call(thisArg, ...params, ...secParams);
  }

  // 复制调用函数的prototype给funcForBind
  funcForBind.prototype = Object.create(thisFn.prototype);
  return funcForBind; // 返回拷贝的函数
}

function funa(c) {
  this.d = 'ddd';
  console.log(this.a, c);
}
const b = {
  a: 222
}
funa._bind(b)('ccc');


// 使用new操作符
// const d = funa._bind(b);
// console.log('a', d)
// const e = new d(111);
// console.log(e)

// 二次传参的例子
let func = function(p,secondParams){//其实测试用的func其参数可以是任意多个
  console.log(p.name);
  console.log(this.name);
  console.log(secondParams);
}
let obj={
  name:"1891"
}
func.myBind(obj,{name:"coffe"})("二次传参");
//>> coffe
//>> 1891
//>> 二次传参
