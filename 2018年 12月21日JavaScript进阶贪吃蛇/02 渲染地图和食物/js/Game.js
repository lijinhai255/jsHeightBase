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

	this.init();
}

// 初始化方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
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
	this.map.arr[row][col].style.backgroundColor = "red";
}