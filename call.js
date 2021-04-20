/**
 * call 实现方法
 * 
 * func.call(thisArg, param1, param2, ...);
 * 改变this指向，指向thisArg。
 * 调用之后函数立即执行。
 */
Function.prototype._call = function(thisArg, ...arg) {
  // 方法进入进行类型判断，所有插件或者方法都得进行这一步，是的函数更加健壮
  if (thisArg === null || thisArg === undefined) {
    thisArg = window; // 默认在浏览器中
  } else {
    thisArg = Object(thisArg);
  }

  // 使用一个不会重复的名字来储存函数func
  const specialMethod = Symbol('anything');
  // 此处this相当于调用的函数func
  thisArg[specialMethod] = this;

  // 此处相当于func(...arg)，函数在thisArg对象中，所以可以使用thisArg中的数据，这样达到call函数的效果
  const result = thisArg[specialMethod](...arg);

  // 删除临时创造的变量，释放内存
  delete thisArg[specialMethod];
  //返回临时方法的执行结果
  return result;
}
