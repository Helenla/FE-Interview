/**
 * apply 实现方案
 * 相比于call方法，新增参数处理逻辑
 * 
 * func.apply(thisArg, [param1,param2,...])
 * 参数为数组或者类数组
 * 返回的函数立即执行
 */
Function.prototype._apply = function(thisArg) {
  if (thisArg === null || thisArg === undefined) {
    thisArg = window;
  } else {
    thisArg = Object(thisArg);
  }

  // 判断是否为类数组
  function isArrayLike(o) {
    if (
      o &&
      typeof o === "object" &&
      isFinite(o.length) &&
      o.length >= 0 &&
      o.length === Math.floor(o.length) &&
      o.length < 4294967296
    ) {
      // o.length < 2^32
      return true;
    }
    return false;
  }

  const symbolname = Symbol('anything');
  thisArg[symbolname] = this;

  let args = arguments[1];
  let result;

  // 处理传进来的第二个参数
  if (args) {
    if (!Array.isArray(args) && !isArrayLike(args)) {
      throw new TypeError("第二个参数既不是数组，也不是类数组对象，抛出错误！")
    } else {
      args = Array.from(args); // 转化为数组
      result = thisArg[symbolname](...args);
    }
  } else {
    result = thisArg[symbolname]();
  }

  delete thisArg[symbolname];
  return result;
}
