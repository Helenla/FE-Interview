(() => { // IIFE+箭头函数，把要写的代码包起来，避免影响外界，一个写函数的好习惯
  // 当函数成为一个对象的属性的时候，可以称之为该对象的方法
  /**
  * @param {object}  一个对象，以便接下来给这个对象添加重载的函数(方法)
  * @param {name}    object被重载的函数名(方法名)
  * @param {fn}      被添加进object参与重载的函数逻辑
  */
  function overload(object, name, fn) {
    const oldMethod = object[name]; // 缓存！，存放旧函数，本方法灵魂所在。将多个fn串联起来
    object[name] = function () {
      // fn.length为fn定义时的参数个数,arguments.length为重载方法被调用时的参数个数
      if (fn.length === arguments.length) {
        return fn.apply(this, arguments)
      } else if (typeof oldMethod === 'function') {
        // 当多次调用overload时，旧函数中又有旧函数，层层嵌套，递归执行if-else判断，知道找到参数个数匹配的fn
        return oldMethod.apply(this, arguments)
      }
    }
  }
  function fn0() {
    return 'no params'
  }
  function fn1(p1) {
    return p1 + ' params'
  }
  function fn2(p1, p2) {
    return p1 + ',' + p2 + ' params'
  }
  // 给对象添加重载设定的函数
  let obj = {};
  overload(obj, 'fn', fn0);
  overload(obj, 'fn', fn1);
  overload(obj, 'fn', fn2);

  console.log(obj.fn())
  console.log(obj.fn(1))
  console.log(obj.fn(1, 2))
})()
