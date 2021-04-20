/**
 * 识别变量是否存在
 * @param {*} x 任意变量
 * @returns Boolean
 * @example
 * existy(undefined)  false
 * existy(null)       false
 * existy({}.a)       false
 * existy(false)      true
 * existy(0)          true
 * existy('')         true
 */
function existy(x) { return x != null; }


/**
 * 判断一个对象是否被认为是true的同义词
 * @param {*} x 任意变量
 * @returns Boolean
 * @example
 * truthy(false)      false
 * truthy(undefined)  false
 * truthy(0)          true
 * truthy('')         true
 */
function truthy(x) { return x !== false && existy(x) }

/**
 * 判断是否为类数组
 * @param {*} o 
 * @returns 
 */
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