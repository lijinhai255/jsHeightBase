// 定义模块
define(function(require, exports, module) {
// define(["module/dom"], function(require, exports, module) {
	// 通过require引入其它模块
	// var dom = require("module/dom");
	// console.log(dom);

	// 异步加载
	// var dom = require.async("module/dom", function(dom) {
	// var dom = require.async(["module/dom", "module/color"], function(dom, color) {
	// var dom = require.async("myId", function(dom) {
		// console.log(dom);
		// console.log(color);		
		// console.log(this, arguments);
	// });


	// 条件语句
	// if (true) {
		// 这里会执行
		// var dom = require("module/dom");
		// console.log(dom);

		// async
		// require.async("module/dom", function(dom) {
		// 	console.log(dom);
		// })

	// } else {
		// 这里不会执行
		// var color = require("module/color");
		// console.log(color);

		// async
	// 	require.async("module/color", function(color) {
	// 		console.log(color);
	// 	})
	// }


	// 异步操作
	setTimeout(function() {
		// require
		// var dom = require("module/dom");
		// console.log(dom);

		// async
		require.async("module/color", function(color) {
			console.log(color);
		})
	}, 2000)
	
})