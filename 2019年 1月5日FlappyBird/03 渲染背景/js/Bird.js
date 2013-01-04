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
}