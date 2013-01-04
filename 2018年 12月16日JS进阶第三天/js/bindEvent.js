// 定义一个函数
function bindEvent(dom, type, fn) {
	if (type.toLowerCase() === "mousewheel") {
		// 判断浏览器信息
		var isFF = window.navigator.userAgent.indexOf("Firefox") === - 1 ? false : true;
		// console.log(isFF);
		// 如果是火狐浏览器， 那就绑定DOMMouseScroll事件
		if (isFF) {
			dom.addEventListener("DOMMouseScroll", fn, false);
			return;
		}
	}

	// 进行能力检测
	if (dom.addEventListener) {
		// 说明是高级浏览器
		dom.addEventListener(type, fn, false);
	} else if (dom.attachEvent) {console.log(1);
		// 说明是IE中的高版本
		dom.attachEvent("on" + type, fn);
	} else {console.log(2);
		// dom0级绑定方式
		dom["on" + type] = fn;
	}
}