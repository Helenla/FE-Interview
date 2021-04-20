/**
 * 深拷贝：指源对象与拷贝对象互相独立，其中任何一个对象的改动都不会对另外一个对象造成影响；
 * 比较典型的深拷贝就是 JavaScript 的“值类型”(7种数据类型），如 string，number，bigint，boolean，null，undefined，symbol 。
 */

/**
 * 3种简单的深拷贝！！！
 */

/**
 * 方法一：
 * JSON 内置方法
 * 
 * 缺点：
 * 1. 会忽略 undefined；
 * 2. 会忽略 symbol；
 * 3. 如果对象的属性为 Function，因为 JSON 格式字符串不支持 Function，在序列化的时候会自动删除；
 * 4. 诸如 Map, Set, RegExp, Date, ArrayBuffer 和其他内置类型在进行序列化时会丢失；
 * 5. 不支持循环引用对象的拷贝；
 */
JSON.parse(JSON.stringify(a))


/**
 * 方法二：
 * Object的内置方法assign
 * 
 * 该方法是用Object.assign对对象进行拼接， 将后续对象的内容插入到第一个参数指定的对象，不会修改第一个参数之后的对象，而我们将第一个对象指定为一个匿名空对象，实现深拷贝。
 * Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。
 * 
 * 
 * 缺点：
 * 1. 对象嵌套层次超过2层，就会出现浅拷贝的状况；
 * 2. 非可枚举的属性无法被拷贝；
 */

(() => {
    let a = { x: 1 }
    let b = Object.assign({},a);
    console.log(b)//>> {x:1}
    b.x = 2
    console.log(b)//>> {x:2}
    console.log(a)//>> {x:1}
})();

/**
 * 方法三：
 * MessageChannel
 * 
 * 缺点：
 * 1. 这个方法是异步的；
 * 2. 拷贝有函数的对象时，还是会报错；
 */

function deepCopy(obj) {
    return new Promise((resolve) => {
        const {port1, port2} = new MessageChannel();
        port2.onmessage = ev => resolve(ev.data);
        port1.postMessage(obj);
    });
}

deepCopy(obj).then((copy) => { // 异步的
    let copyObj = copy;
    console.log(copyObj, obj)
    console.log(copyObj == obj)
});


/**
 * 复杂深拷贝：
 * 循环引用深拷贝
 * 
 */

function deepcopy(obj) {
    const result = {}; // 创建一个对象
    const keys = Object.keys(obj);
    let key = null;
    let temp = null; // 存储需要复制的项
    let _parent = parent;

    while (_parent) {
        if (_parent.originParent === obj) {
            return _parent.currentParent;
        }
        parent = _parent.parent; // 服务下一个递归
    }

    for (let i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        temp = obj[key];

        // 如果字段也是一个对象
        if (temp && typeof temp === 'object') {
            if (Array.isArray(temp)) {
                result[key] = [...temp];
            } else {
                // 递归执行深拷贝 将同级的待拷贝对象与新对象传递给 parent 方便追溯循环引用
                result[key] = deepcopy(obj[key], {
                    originParent: obj,
                    currentParent: result,
                    parent
                });
            }
        } else {
            result[key] = temp;
        }
    }

    return result;
}

const a = {
    obj: {
        a: 1
    },
    arr: [1, 2, 3, 4]
}

const b = deepcopy(a)
b.obj.b = 2
b.arr.push(5)
console.log('b', b)
console.log('a', a)

/**
 * 浅拷贝：深拷贝之外的拷贝；
 * 出于节省内存的考虑，JavaScript对“引用类型”(也即第8种数据类型)Object的拷贝默认是浅拷贝。
 */
