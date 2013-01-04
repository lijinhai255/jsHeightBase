// 定义模块
define(function(require, exports, module) {
	// var Observer = (function() {
		// 定义真正的观察者对象
		// var ob = {
			// aaa: [function() {console.log(234)}, function() {console.log(123)}];
		// };

		// 定义接口
		// return {
			/**
			 * on方法 用于向观察者中添加 方法的
			 * @type 要添加的事件名称
			 * @fn 要添加的事件函数
			 */
			// on: function(type, fn) {
			// 	ob[type] = fn;
			// },
			/**
			 * trigger方法 用于触发观察者中的方法
			 * @type 要触发的事件名称
			 */
	// 		trigger: function(type, val) {
	// 			ob[type](val);
	// 		}
	// 	}
	// })();

	// 现在我们要升级观察者模式， 从原来一个事件属性对应的一个函数，升级为一个事件属性对应多个事件函数


	var Observer = (function() {
		// 定义真正的观察者对象
		var ob = {
			// aaa: [function() {console.log(234)}];
		};

		// 定义接口
		return {
			/**
			 * on方法 用于向观察者中添加 方法的
			 * @type 要添加的事件名称
			 * @fn 要添加的事件函数
			 */
			on: function(type, fn) {
				// 判断当前的事件属性是否存在， 如果存在就直接push进来
				if (ob[type]) {
					ob[type].push(fn);
				} else {
					// 不是数组， 变为数组
					ob[type] = [fn];
				}
			},
			/**
			 * trigger方法 用于触发观察者中的方法
			 * @type 要触发的事件名称
			 */
			trigger: function(type, val) {
				// 循环执行
				for (var i = 0; i < ob[type].length; i++) {
					ob[type][i](val);
				}
			},
			check: function() {
				console.log(ob);
			}
		}
	})();


	Observer.on("aaa", function() {
		console.log(123);
	})

	Observer.on("aaa", function() {
		console.log(234);
	})

	Observer.trigger("aaa");

	Observer.check();

	// 向外暴露功能
	module.exports = Observer;
})