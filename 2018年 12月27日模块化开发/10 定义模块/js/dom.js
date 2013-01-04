// console.log(this); 指向window

// 定义模块
// 传递数字
// define(123);
// 传递字符串
// define("abc"); // 这种方式不可以
// 传递布尔值
// define(true);

// 传递对象
// define({
// 	a: 1,
// 	b: 2
// });


// 传递函数
// define(function(require, exports, module) {
// 	console.log(this, arguments);
// 	this.color = "red";
// })


// 传递两个参数， 第一个是字符串
// define("abc", function() {
// define("dom", function(require) {
// 	console.log(this, arguments);
// })


// 传递两个参数， 第一个参数是一个数组
// define(["color", "require", "exports", "module"], function(color, require, exports, module) {
// 	console.log(this, arguments);
// 	console.log(color);
// 	console.log(require);
// 	console.log(exports);
// 	console.log(module);
// })



// 传递三个参数
// define("abc", ["color"], function() {
define("dom", ["color", "require", "exports", "module"], function() {
	console.log(this, arguments);
})