// 当前模块文件中的this是window， 所以不要通过this去添加任何的属性和方法
// console.log(this);

// 第一种定义模块的方式
// 传递数字
define(1);
// 传递字符串
define("abc");
// 传递布尔值
define(true);

// 第二种方式
// 传递数组
define(["red", "blue", "green"]);
// 传递对象
define({
	num: 100,
	color: "red"
})

// 第三种方式
define(function(require, exports, module) {
	console.log(this, arguments);
	console.log(require);
	console.log(exports);
	console.log(module);
	this.color = "red";
})


// 第四种方式
// define("abc", function() {
define("modules/main", function() {
	console.log(this, arguments);
})


// 第五种方式
define(["modules/dom"], function() {
	console.log(this, arguments);
})


// 第六种方式
// define("abc", ["modules/dom"], function() {
define("modules/main", ["modules/dom"], function() {
	console.log(this, arguments);
})