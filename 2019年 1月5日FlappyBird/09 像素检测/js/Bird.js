/*鸟类*/
function Bird(imgArr, x, y) {
	// 图片数组属性
	this.imgArr = imgArr;
	// 定义图片的索引
	this.index = parseInt(Math.random() * imgArr.length);
	// 精确一张图片
	this.img = this.imgArr[this.index];
	// 图片的x,y值
	this.x = x;
	this.y = y;
	// 定义鸟的状态
	this.state = "D"; // D Down  U up
	// 为了控制鸟上升与下降的速度， 定义speed属性
	this.speed = 0;
}

// 鸟煽动翅膀
Bird.prototype.fly = function() {
	// 改变图片的索引值
	this.index++;
	// 确保图片的有效值
	if (this.index > this.imgArr.length - 1) {
		this.index = 0;
	}
	// 这里虽然改变了图片的索引值， 但是图片没有改变
	this.img = this.imgArr[this.index];
}


// 鸟下降
Bird.prototype.flawDown = function() {
	// 判断鸟的状态
	if (this.state === "D") {
		this.speed++;
		this.y += Math.sqrt(this.speed);
	} else {
		this.speed--;
		if (this.speed === 0) {
			// 改变鸟的状态
			this.state = "D";
			return;
		}
		this.y -= Math.sqrt(this.speed);
	}
}


// 鸟上升
Bird.prototype.goUp = function() {
	// 改变鸟的y值
	// this.y -= 25;
	// 改变鸟的状态
	this.state = "U";

	this.speed = 20;
}