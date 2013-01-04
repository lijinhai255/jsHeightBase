/*食物类*/
function Food(x, y) {
	// 食物的坐标
	this.row = x;
	this.col= y;
}

// 重置食物
Food.prototype.reset = function(x, y) {
	this.row = x;
	this.col = y;
}