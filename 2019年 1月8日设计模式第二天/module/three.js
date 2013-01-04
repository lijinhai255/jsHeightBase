// 定义模块
define(function(require, exports, module) {
	// console.log("第三个模块");
	// 引入工具模块
	var Observer = require("module/tools");
	// console.log(Observer);
	// 获取元素
	var words = document.getElementById("words");
	var btn = document.getElementById("btn");

	// 给btn添加点击事件
	btn.onclick = function() {
		// 获取用户输入的内容
		var val = words.value
		// console.log(val);
		// 发布消息
		Observer.trigger("add", val);
	}		  
})