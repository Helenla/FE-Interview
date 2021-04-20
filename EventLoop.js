/**
 * Event Loop 事件循环
 * 
 * JS 是一门单线程语言，为啥？因为当初设计者觉得 JS 不需要承载多大的功能。且如果是多线程，那么程序逻辑的交互、DOM操作就会变得复杂起来。
 * 
 * 单线程会导致任务执行阻塞，JS 用异步回调解决这些问题，而这是基于 Event Loop 事件循环。
 * 
 * Event Loop（事件循环）是让 JavaScript 做到既是单线程，又绝对不会阻塞的核心机制，
 * 也是 JavaScript 并发模型的基础，是用来协调各种事件、用户交互、脚本执行、UI 渲染、网络请求等的一种机制。
 * 
 * Event Loop的作用很简单： 监控调用栈和任务队列（见 壹.2.8.3），如果调用栈是空的，
 * 它就会取出队列中的第一个"callback函数"，然后将它压入到调用栈中，然后执行它。
 * 
 * Event Loop 是实现异步回调的一种机制而已。
 */


/**
 * JS 存在 Engine（引擎） 和 Runtime（运行时，一般指浏览器）
 * 
 * Engine（JS引擎）：编译并执行 JavaScript 代码，完成内存分配、垃圾回收等；
 * Runtime（运行时）：为 JavaScript 提供一些对象或机制，使它能够与外界交互；
 */

/**
 * JS引擎是单线程的，但是浏览器是多线程的。
 */


/**
 * Event Loop 重要考点！！！
 * 宏任务、微任务
 * 
 * 1. 宏任务
 * Event Loop 会有一个或多个 宏任务列表（MacroTask Queue），这是一个先进先出（FIFO）的有序列表；
 * 常见的鼠标、键盘事件，AJAX，数据库操作（例如 IndexedDB），以及定时器相关的 setTimeout、setInterval 等等都属于宏任务。
 * 同一个宏任务队列中都是按顺序执行，但对于不同的队列浏览器会进行调度，允许优先执行来自特定宏任务（比如这里的鼠标、键盘事件，从而保证流畅的用户体验。）
 * 
 * 2. 微任务
 * 与宏任务类似也是一个有序列表，但是一个 Event Loop 只有一个 微任务列表。
 * Promise 可以算作微任务
 */


/**
 * 面试题
 * 执行顺序问题，考察频率挺高
 */
setTimeout(function() {
  console.log(1);
});
new Promise(function(resolve, reject) {
  console.log(2);
  resolve(3);
}).then(function(val) {
  console.log(val);
});
console.log(4);

// 2,4,3,1