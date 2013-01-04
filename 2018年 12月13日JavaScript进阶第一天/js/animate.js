/*
* animate 函数能够实现动画
* @dom  要运动的元素 
* @json  css样式对象
* @time  时间  以毫秒值为单位
* callback 回调函数 
*/
function animate(dom, json, time, callback) {
	// 定义定时器的间隔
	var interval = 20;
	// 定义总次数
	var allCount = time / interval;
	// 获取初始值
	// 因为不确定json中有多少条css样式 所以不能写具体的代码条数
	// 使用对应的思想 所以 我们也定义一个json
	var nowJSON = {};
	// 使用for循环获取初始值
	for(var i in json) {
		// 强制性的给nowJSON添加属性 并赋值
		nowJSON[i] = parseInt(getComputedStyle(dom)[i]);
	}
	// 定义步长json
	var stepJSON = {};
	for(var i in json) {
		stepJSON[i] = (json[i] - nowJSON[i]) / allCount;
	}
	// 定义计数器
	var count = 0;
	var timer = setInterval(function() {
		count++;
		// 改变dom元素的css样式
		for(var i in json) {
			dom.style[i] = nowJSON[i] + stepJSON[i] * count + "px";
		}
		// 判断是否执行完毕
		if(count >= allCount) {
			// 停表
			clearInterval(timer);
			// 拉终
			for(var i in json) {
				dom.style[i] = json[i] + "px";
			}
			// 回调函数执行
			callback && callback();
		}
	}, interval);
}