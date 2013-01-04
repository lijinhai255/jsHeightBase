// 这里是自己公司的工具库
var ickt = {
	$: function(id) {
		return document.getElementById(id);
	},
	// $(dom).html();
	// $(dom).html(str);
	// ickt.html(dom);
	// ickt.html(dom, str);
	// html方法
	html: function(dom, str) {
		// 判断传递几个参数
		if (arguments.length === 2) {
			// 说明是要设置内部文本
			dom.innerHTML = str;
		} else {
			// 读取内部文本
			return dom.innerHTML;
		}
	},
	// $(dom).css(key)
	// $(dom).css(key, value);
	// $(dom).css(json)
	// ickt.css(dom, key);
	// ickt.css(dom, json);
	// ickt.css(dom, key, value);
	css: function(dom, key, value) {
		// 判断传递几个参数
		if (arguments.length === 3) {
			// 说明要设置单一样式
			dom.style[key] = value;
		} else if (arguments.length === 2) {
			// 由于读取和设置json都是传递的两个参数， 所以要多加一条类型判断
			if (typeof key === "object") {
				// 说明传递的是json, 设置多个属性样式
				for (var i in key) {
					dom.style[i] = key[i];
					// ickt.css(dom, i, key[i]);
				}
			} else {
				// 说明要读取
				return dom.style[key];
				// return getComputedStyle(dom)[key];
			}
		}
	},
	// 点击事件
	click: function(dom, fn) {
		dom.onclick = fn;
	}
}