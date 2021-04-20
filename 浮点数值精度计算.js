/**
 * 浮点数值精度计算
 * 方法一：计算两个数中最大的倍数，用最大的倍数算
 * 方法二：写一个方法单独计算每个数的整数与倍数，如下
 */
const float = function () {
  /**
   * 将一个浮点数转化为整数在进行运算
   */
  function toInteger(floatNum) {
    let ret = { times: 1, num: 0 }; // times代表倍数，num代表浮点数转化后的整数
    if (Number.isInteger(floatNum)) {
      ret.num = floatNum;
      return ret;
    }
    let strfi = floatNum.toString(); // 数值字符串化
    let n = strfi.split('.')[1].length;
    let times = Math.pow(10, n); // 10的len次方
    let intNum = Math.trunc(floatNum * times); // Math.trunc方法用于去除一个数的小数部分，返回整数部分。
    ret.times = times;
    ret.num = intNum;
    return ret;
  }
  /**
   * 精度计算，化为整数
   */
  function operation(a, b, op) {
    let o1 = toInteger(a);
    let o2 = toInteger(b);
    let n1 = o1.num;
    let n2 = o2.num;
    let t1 = o1.times;
    let t2 = o2.times;
    let max = t1 > t2 ? t1 : t2; // 选最大的倍数
    let result = null;
    switch (op) {
      case "add":
        if (t1 > t2) {
          result = (n1 + n2 * (t1 / t2)) / t1;
        } else if (t1 < t2) {
          result = (n1 * (t2 / t1) + n2) / t2;
        } else {
          result = (n1 + n2) / max;
        }
        console.log(result)
        return result;
      case "subtract":
        if (t1 > t2) {
          result = (n1 - n2 * (t1 / t2)) / t1;
        } else if (t1 < t2) {
          result = (n1 * (t2 / t1) - n2) / t2;
        } else {
          result = (n1 - n2) / max;
        }
        console.log(result)
        return result;
      case "multiply":
        result = (n1 * n2) / (t1 * t2);
        console.log(result)
        return result;
      case "divide":
        result = (n1 / n2) * (t2 / t1);
        console.log(result)
        return result;
      default:
        break;
    }
  }
  // 加减乘除的四个接口
  function add(a, b) {
    return operation(a, b, 'add');
  }
  function subtract(a, b) {
    return operation(a, b, 'subtract');
  }
  function multiply(a, b) {
    return operation(a, b, 'multiply');
  }
  function divide(a, b) {
    return operation(a, b, 'divide');
  }
  // 如果是整数，就不会保留小数点，只保留小数点超过指定位数的情况
  function toFixed(num, digits) {
    let times = Math.pow(10, digits);
    let des = num * times;
    return Math.trunc(des) / times;
  }
  // exports
  return {
    add,
    subtract,
    multiply,
    divide,
    toFixed
  }
}(); // 立即执行
float.add(0.07, 0.000001);
float.subtract(0.18, 0.2);
float.multiply(0.18, 0.2);
float.divide(0.1, 0.2);