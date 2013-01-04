// 定义模块
// define(function(require, exports, module) {
define(["module/dom"], function(require, exports, module) {
	// 引入dom.js
	var dom = require("myId1");
	console.log(dom);
})

// define(function(require, exports, module) {
// 	// 引入dom.js
// 	var dom = require("module/dom");
// 	console.log(dom);
// })