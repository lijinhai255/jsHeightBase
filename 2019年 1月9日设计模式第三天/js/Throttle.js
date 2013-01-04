/**
 * Throttle 可以实现节流函数
 * 1 开启节流器  Throttle(fn, {});
 * @fn 要被节流的函数
 * @options 是一个配置对象
 *          context: 函数执行的时候的上下文(this)
 *          args: [], 是一个数组， 数组中的每一项都是原函数所需要的参数
 *          time: 决定了要延迟的时间
 *
 *2 关闭节流器 Throttle(false, fn);
 *@false 是一个标识， 当传递false的时候，是确定要关闭节流器了
 *@fn 要节流的函数
 * 
 */
function Throttle(fn, options) {	// 判断第一个参数是函数还是布尔值
	if (typeof fn === "function") {
		// 说明要开启节流器了
			// 配置
		var options = options || {
			context: null,
			args: [],
			time: 1000
		}

		// 清除延迟器
		clearTimeout(fn.__throttle);
		// 因为每一个函数都要对应一个节流器， 所以我们可以给fn添加一个自定义属性
		fn.__throttle = setTimeout(function() {
			fn.apply(options.context, options.args);
		}, options.time);
	} else {
		// 说明要关闭节流器了
		// fn 对应的是false, options对应的是函数
		clearTimeout(options.__throttle);
	}
}