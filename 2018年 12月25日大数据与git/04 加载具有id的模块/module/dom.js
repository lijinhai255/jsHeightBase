// 定义模块
// define(function(require, exports, module) {
// 	exports.a = 123;
// })

// 定义一个具有id的模块
// define("myId", function(require, exports, module) {
// 	exports.a = 123;
// })

// 两个没有id的模块
// define(function(require, exports, module) {
// 	exports.b = 234;
// })
// define(function(require, exports, module) {
// 	exports.a = 123;
// })


// 两个相同id的模块
// define("myId", function(require, exports, module) {
// 	exports.b = 234;
// })

// define("myId", function(require, exports, module) {
// 	exports.a = 123;
// })



// 两个不同id的模块
define("myId", function(require, exports, module) {
	exports.b = 234;
})

define("myId1", function(require, exports, module) {
	exports.a = 123;
})






