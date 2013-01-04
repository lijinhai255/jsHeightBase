// 定义模块
// define(function(require, exports, module) {
	// console.log(this, arguments);
	// 通过require引入其它模块文件
	// var dom = require("module/dom");
	// console.log(dom);
// })


// 1 require不能被简写
// define(function(req, exports, module) {
// 	var dom = req("module/dom");
// 	console.log(dom);
// })


// 2 require不能被修改
define(function(require, exports, module) {
	// 1 require不能被赋值
	// require = 123;

	// 2 require不能赋值给其它变量
	// var a = require;

	// 3 不能在子函数中作为参数传递
	// function demo(require) {
		// 1 require不能被赋值
		// require = 123;

		// 2 require不能赋值给其它变量
		// var a = require;

		// 引入其它模块文件
	// 	var dom = a("module/dom");
	// 	console.log(dom);
	// }
	// demo(require);

	var dom = require("module/dom");
	console.log(dom);
})


// 3 不能拼接
// define(function(require, exports, module) {
	// 引入其它模块文件
	// var dom = require("module" + "/" + "dom");
// 	var dom = require("module/dom");
// 	console.log(dom);
// })


// 加载具有id的模块
// define(["module/dom"], function(require, exports, module) {
// 	// 引入dom.js
// 	var dom = require("myId");
// 	console.log(dom);
// })
