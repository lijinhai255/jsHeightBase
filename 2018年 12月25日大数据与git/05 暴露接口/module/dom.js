// 定义模块
// define(function(require, exports, module) {
	// 第一种向外暴露功能的方式
	// exports.a = 123;

	// 这种方式，是绝对不允许使用
	// exports = {
	// 	color: "red"
	// }

	// 第二种方式
	// module.exports.b = 123;


	// 3
	// module.exports = 123;

	// 4 
	// 这种方式会覆盖上面向外暴露的数据
	// module.exports = {
	// 	color: "red"
	// }

	// 5
	// 这种暴露功能的方式，如果外部要使用，要作为方法来使用
	// module.exports = function() {
	// 	console.log("success");
	// }


	// 6
	// return 123;

	// 7
	// return {
	// 	a: 1,
	// 	b: 2
	// }


	// 8
	// 外部如果要使用，要作为方法来使用
	// return function() {
	// 	console.log("success");
	// }
// })



// 9
// define(1);
// define("abc");


// 10
define({
	color: "red"
})