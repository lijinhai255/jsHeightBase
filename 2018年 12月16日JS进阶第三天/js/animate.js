function animate(dom, json, time, callBack) {

	// 计数器
	var count = 0;
	// 定义间隔时间
	var interval = 20;
	// 总次数
	var allCount= time / interval;
	
	// 计算总距离： 目标值 - 初始值
	// 定义一个对象用于保存元素的初始值
	var nowJson = {

	};
	for (var i in json) {
		nowJson[i] = parseInt(getComputedStyle(dom)[i]);
		// console.log(i);
	}
	// console.log(nowJson);
	// 循环完毕之后，元素的初始值也就有了


	// 得到总距离 计算步长值
	var stepJson = {

	};

	for (var i in json) {
		// 步长值 = (目标值 - 初始值) / 总次数
		stepJson[i] = (json[i] - nowJson[i]) / allCount;
	}

	// 循环完毕之后， 步长值就得到了
	// console.log(stepJson)

	// 赋值定时器
	var timer = setInterval(function() {
		// 计数器++
		count++;
		// 不断的改变元素的定位值
		for (var i in json) {
			// 当前值 = 初始值 + 步长值 * 次数
			dom.style[i] = nowJson[i] + stepJson[i] * count + "px";
		}


		// 判断元素是否到达边界
		if (count >= allCount) {
			// 停止定时器
			clearInterval(timer);

			// 执行回调函数
			callBack && callBack.call(dom);
		}
		
	}, interval)
}