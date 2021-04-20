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