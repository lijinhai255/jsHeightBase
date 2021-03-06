/*蛇类*/
function Snake() {
	// 数组属性, 用于存放蛇的每一节身体
	this.arr = [
		{row: 4, col: 4},
		{row: 4, col: 5},
		{row: 4, col: 6},
		{row: 4, col: 7},
		{row: 4, col: 8},
	];
	// 方向属性
	this.direction = 39; // left 37  top 38 right 39 bottom 40
}

// 蛇的移动
Snake.prototype.move = function() {
	// 创建新的头部
	var newHead = {
		row: this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length - 1].col
	}
	// 判断蛇的方向，从而决定新头出现的位置
	if (this.direction === 37) {
		// 新的头部应该出现在老的头部的左侧，行不变， 列--
		newHead.col--;
	} else if (this.direction === 38) {
		// 新的头部应该出现在老的头部的上方， 列不变， 行--
		newHead.row--;
	} else if (this.direction === 39) {
		// 新的头部应该出现在老的头部的右侧，行不变， 列++
		newHead.col++;
	} else if (this.direction === 40) {
		// 新的头部应该出现在老的头部的下方， 列不变， 行++
		newHead.row++;
	}

	// 将新的头部放入数组的最后一项
	this.arr.push(newHead);
	// 去掉尾部
	this.arr.shift();
}