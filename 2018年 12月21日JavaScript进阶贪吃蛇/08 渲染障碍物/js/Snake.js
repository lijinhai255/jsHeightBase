/*蛇类*/
function Snake(pic_obj) {
	// 数组属性, 用于存放蛇的每一节身体
	this.arr = [
		{row: 4, col: 4},
		{row: 4, col: 5},
		{row: 4, col: 6},
		// {row: 4, col: 7},
		// {row: 4, col: 8},
	];
	// 方向属性
	this.direction = 39; // left 37  top 38 right 39 bottom 40
	this.lock = true;
	// 定义蛇的头部图片属性
	this.head_pic = pic_obj.head_pic;
	// 定义蛇的身体图片属性
	this.body_pic = pic_obj.body_pic;
	// 定义蛇的尾部图片属性
	this.tail_pic = pic_obj.tail_pic;
	// 定义头部图片的索引
	this.head_idx = 2;
	// 定义尾部图片的索引
	this.tail_idx = 0;
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


	// 开锁
	this.lock = true;



	// 在移动的时候改变尾部图片
	var tail = this.arr[0];
	var pg = this.arr[1];

	//  判断tail 与 pg之间的关系
	if (tail.row === pg.row) {
		// 说明是在同一行， 比较列的关系
		this.tail_idx = tail.col > pg.col ? 2 : 0;
	} else {
		// 说明在同一列， 比较行的关系
		this.tail_idx = tail.row > pg.row ? 3 : 1;
	}
}

// 蛇转向的方法
Snake.prototype.change = function(direction) {
	// 函数节流
	if (!this.lock) {
		return;
	}
	// 把锁关闭
	this.lock = false;
	// 当用户传递的方向是与蛇自身的方向属性相背的时候， 此时， 蛇不应该有任何的操作
	var result = Math.abs(direction - this.direction);
	if (result === 2 || result === 0) {
		// 此时， 蛇不应该有任何的操作
		return;
	} else {
		// 说明用户传递的方向是合法， 直接设置
		this.direction = direction;
	}


	// 在change的时候改变头部图片
	if (direction === 37) {
		this.head_idx = 0;
	} else if (direction === 38) {
		this.head_idx = 1;
	} else if (direction === 39) {
		this.head_idx = 2;
	} else if (direction === 40) {
		this.head_idx = 3;
	}
}


// 蛇生长
Snake.prototype.growUp = function() {
	// 获取蛇的尾部
	var tail = this.arr[0];
	// 添加到数组的第一项
	this.arr.unshift(tail);
	// console.log(this.arr);
}