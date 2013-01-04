// 定义一个函数
function bindEvent(dom, type, fn) {
	// 存储备份
	var ua = navigator.userAgent;
	// 如果事件是滚轮事件，
	if (type === 'mousewheel') {
		// 是否是火狐浏览器
		if (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0) {
			// 这是火狐浏览器。用火狐的兼容方式绑定滚动事件
			window.addEventListener('DOMMouseScroll', fn, false)
			// 事件绑定完成，就可以结束了
			return;
		}
		// 获取ie低版本浏览器
		ua.replace(/MSIE (\d+)/, function(match, $1) {
			// 打印版本号
			// console.log($1)
			// 如果版本小于等于8，我们要为document绑定。就是让dom变量变成document
			if ($1 <= 8) {
				dom = document;
			}
		})
	}

	// 进行能力检测
	if (dom.addEventListener) {
		// 说明是高级浏览器
		dom.addEventListener(type, fn, false);
	} else if (dom.attachEvent) {
		// 说明是IE中的高版本
		dom.attachEvent("on" + type, fn);
	} else {
		// dom0级绑定方式
		dom["on" + type] = fn;
	}
}