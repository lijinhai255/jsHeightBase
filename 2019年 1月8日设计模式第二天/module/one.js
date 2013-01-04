// 定义模块
define(function(require, exports, module) {
	// console.log("第一个模块");
	var Observer = require("module/tools");
	// console.log(Observer);

	// 获取元素
	var num = document.getElementById("num");
	// console.log(Observer);
	// 监听消息添加事件
	Observer.on("add", function() {
		num.innerHTML++;
	})


	// 监听消息减少事件
	Observer.on("remove", function() {
		num.innerHTML--;
	})
	
})