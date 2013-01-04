// 定义模块
// commonjs
// define(function(require, exports, module) {
	// console.log(this, arguments);
	// exports.a = 123;

	// 这种方式是绝对不允许
	// exports = {

	// }


	// 1
	exports.a = 123;


	// 2
	module.exports.a = 123;


	// 3
	module.exports = 234;


	// 4
	module.exports = {
		a: 1,
		b: 2
	}

	// 5
	module.exports = function() {
		console.log("sueccess");
	}
// })



// module transports
// define([], function() {
	// 6
	return 123;


	// 7 
	return {
		a: 1,
		b: 2
	}

	// 8
	return function() {
		console.log("suecess")
	}
// })

// 9 
define(123);
// define("abc"); // 这种方式不允许

// 10 也支持对象
define({
	a: 1,
	b: 2
})


define(function(require, exports, module) {
	console.log(this);
	this.color = "red";
})


