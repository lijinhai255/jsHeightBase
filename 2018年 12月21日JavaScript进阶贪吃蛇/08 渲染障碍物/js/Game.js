/**
 * Game类  是整个游戏类
 * @map 地图的实例
 * @snake 蛇的实例
 * @food 食物的实例
 * @block 障碍物实例
 */
function Game(map, snake, food, block) {
	this.map = map;
	this.snake = snake;
	this.food = food;
	this.block = block;
	this.timer = null;
	this.flag = null;
	this.init();
}

// 初始化方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.renderBlock();
	this.start();
	this.bindEvent();
}

// 渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}

// 渲染食物
Game.prototype.renderFood = function() {
	// 定义变量用于简化书写
	var row = this.food.row;
	var col = this.food.col;
	// 渲染食物就是在地图中渲染食物坐标元素的背景图案
	// this.map.arr[row][col].style.backgroundColor = "red";
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
	this.map.arr[row][col].style.backgroundSize = "cover";

}


// 渲染蛇
Game.prototype.renderSnake = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 渲染头部图片
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
	

	// 渲染蛇就是在地图中渲染蛇身体坐标元素的背景图案
	for (var i = 1; i < this.snake.arr.length - 1; i++) {
		// 定义变量用于简化书写
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		// this.map.arr[row][col].style.backgroundColor = "green";
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
	}

	// 获取蛇的尾巴
	var tail = this.snake.arr[0];
	// 渲染尾部图片
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}

// 游戏开始
Game.prototype.start = function() {
	this.flag = true;
	// 缓存this
	var me = this;
	// 赋值timer
	this.timer = setInterval(function() {
		// 移动
		me.snake.move();
		// 检测是否撞墙
		me.checkMap();
		// 检测是否吃到食物
		me.checkFood();
		// 检测蛇是否吃到自己
		me.checkSnake();
		// 检测蛇是否撞到障碍物
		me.checkBlock();
		if (me.flag) {
			// 清屏
			me.map.clear();
			// 渲染食物
			me.renderFood();
			// 渲染蛇
			me.renderSnake();
			// 渲染障碍物
			me.renderBlock();
		}
	}, 200)
}

// 添加键盘事件
Game.prototype.bindEvent = function() {
	// 在一个类的原型中，不用使用除了window, document的其它自定义变量

	// 缓存this
	var me = this;
	// 给document添加键盘事件
	document.onkeydown = function(e) {
		// console.log(e);
		// 获取用户按下的字符
		var code = e.keyCode;
		// console.log(code);
		// 当用户按下对应的编码，此时，蛇应该进行转向
		if (code === 37 || code === 38 || code === 39 || code === 40) {
			// 此时， 应该调用蛇转向的方法
			me.snake.change(code);
		}
	}
}

// 游戏结束
Game.prototype.gameOver = function() {
	this.flag = false;
	// 清除定时器
	clearInterval(this.timer);
}

// 检测蛇是否撞墙
Game.prototype.checkMap = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// console.log(head.row);
	// console.log(head.col);
	// console.log(head);
	// 判断蛇头与地图中 row, col之间的关系
	if (head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col ) {
		console.log("撞墙了");
		// 结束游戏
		this.gameOver();
	}
}

// 检测是否吃到食物
Game.prototype.checkFood = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 获取食物
	var food = this.food;
	// console.log(food);
	// 判断蛇的头部是否与食物的坐标重合
	if (head.row === food.row && head.col === food.col) {
		// 说明吃到食物了
		console.log("吃到食物了");
		// 调用蛇生长的方法
		this.snake.growUp();
		// 重置食物
		this.resetFood();
	}
}

// 重置食物的方法
Game.prototype.resetFood = function() {
	// 随机生成row, col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);

	// 检测食物的合法性
	for (var i = 0; i < this.snake.arr.length; i++) {
		// 获取蛇的一节身体
		var one = this.snake.arr[i];
		if (one.row === row && one.col === col) {
			// 说明食物重合到了蛇的身上
			alert("重合到蛇身上了");
			this.resetFood();
			return;
		}
	}

	// 检测食物与障碍物之间的关系
	for (var i = 0; i < this.block.arr.length; i++) {
		// 获取蛇的一节身体
		var one = this.block.arr[i];
		if (one.row === row && one.col === col) {
			// 说明食物重合到了蛇的身上
			alert("重合到障碍物身上了");
			this.resetFood();
			return;
		}
	}

	this.food.reset(row, col);
}


// 蛇吃自己
Game.prototype.checkSnake = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环与蛇的每一节身体进行比较
	for (var i = 0; i < this.snake.arr.length - 1; i++) {
		// 获取蛇的一节身体
		var one = this.snake.arr[i];
		if (head.row === one.row && head.col === one.col) {
			// 蛇吃到自己了
			console.log("吃到自己了");
			// 调用gameOver方法
			this.gameOver();
		}
	}
}


// 渲染障碍物
Game.prototype.renderBlock = function() {
	// 渲染障碍物可以理解为渲染一条不会动的蛇
	for (var i = 0; i < this.block.arr.length; i++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;

		// 在地图中渲染障碍物
		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
}


// 检测蛇是否撞到障碍物
Game.prototype.checkBlock = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环与block的每一节进行比较
	for (var i = 0; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];
		if (head.row === one.row && head.col === one.col) {
			console.log("撞到障碍物了");
			// 游戏结束
			this.gameOver();
		}
	}
}