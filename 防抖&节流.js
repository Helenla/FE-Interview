/**
 * 防抖
 * 函数调用的时间是以最后一次点击开始等待 wait 时间
 * 此方法用到了 闭包：私有变量，延长作用域
 * @param {Function} func 调用函数
 * @param {Number} wait 防抖间隔
 * @param {Boolean} immediate 是否需要立即调用，immediate = true，则函数为立即调用，不需要时间间隔
 */
 export function debounce(func, wait, immediate) {
  let timeout = null; // 关键，用来判断间隔时间，继续点击调用函数
  let args = null; // 调用 func 函数的入参
  let context = null; // 是否需要改变 func 的内部 this 指向，null 代表不需要
  let timestamp = 0; // 现在的时间戳，用于计算时间间隔
  let result = null; // 最后返回出的函数

  const later = () => {
    const last = +new Date() - timestamp; // 据上一次触发时间间隔

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) { // 如果第二次点击，timestamp 已经被改变了，所以 last 就会小于 wait
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null; // 清除，下一次点击开始恢复使用
      if (!immediate) {
        result = func.apply(context, args); // 立即执行 func 函数，完成函数的使用
        if (!timeout) context = args = null; // 下一次事件触发前清除数据
      }
    }
  };

  return function (that, ...args) {
    context = that; // 是否有需要改变函数 func 内部调用的this
    timestamp = +new Date(); // 变为目前的时间戳，用于计算倒计时，此处会因为点击改变 later中的timestamp，也就是每点击一次，就会重新计时一次 wait 时间

    // 如果延时不存在，重新设定延时
    // 因为闭包的原因，timeout 被调用之后，不会被回收，所以下次点击的时候 timeout 已经被赋值过
    if (!timeout) timeout = setTimeout(later, wait);

    // 判断是否需要立即调用
    const callNow = immediate && !timeout;
    if (callNow) {
      result = func.apply(context, args); // 立即执行 func 函数，完成函数的使用
      context = args = null;
    }

    return result; // 这个return 可有可无？类似于 return? 主要是 func 的立即执行触发函数运行
  };
}
