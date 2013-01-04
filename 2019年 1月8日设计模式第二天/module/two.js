// 定义模块
define(function(require, exports, module) {
	// 引入工具模块
	var Observer = require("module/tools");
	// console.log(Observer);
	// console.log("第二个模块");
	// 获取元素
	var ul = document.getElementById("list");

	// 监听消息添加事件
	Observer.on("add", function(val) {
		// 创建li元素
		var li = document.createElement("li");
		// 创建span元素
		var span = document.createElement("span");
		// 创建文本节点
		var val = document.createTextNode(val);
		// 设置内部文本
		span.innerHTML = "&times;";

		// 给span 添加点击事件
		span.onclick = function() {
			ul.removeChild(this.parentNode);
			// 当点击span的时候， 要告诉第一个模块消息数量要减1
			Observer.trigger("remove");
		}
		// 追加子元素
		li.appendChild(val);
		li.appendChild(span);
		ul.appendChild(li);

	})
})