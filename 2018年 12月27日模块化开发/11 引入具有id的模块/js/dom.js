// 定义模块
// define(function(require, exports, module) {
	// console.log(this, arguments);
	// var color = require("color");
	// console.log(color);
	// console.log(require);
// })


// 引入具有id的模块
define(["color", "require"], function(color, require) {
	// console.log(this, arguments);
	// 通过require指定id
	require(["myId", "myId1"], function(color, color1) {
		console.log(color, color1);
	});

	
})