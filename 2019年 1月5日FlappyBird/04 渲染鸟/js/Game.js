/**
 * Game 整个游戏类
 * @ctx 画笔
 * @bird 鸟的实例
 * @pipe 管子的实例
 * @land 背景的实例
 * @mountaion 背景的实例
 */
function Game(ctx, bird, pipe, land, mountain) {
	this.ctx = ctx;
	this.bird = bird;
	// 由于管子有多根， 所以我们将它放入数组中
	this.pipeArr = [pipe];
	this.land = land;
	this.mountain = mountain;
	this.timer = null;
	this.iframe = 0;


	this.init();
}


// 初始化方法
Game.prototype.init = function() {
	this.start();
	this.bindEvent();
}


// 渲染背景
Game.prototype.renderMountain = function() {
	// 这类绘制的不是this.mountain, 而是this.mountain.img
	var img = this.mountain.img;
	this.mountain.x -= this.mountain.step;
	// 判断图片移动的位置
	if (this.mountain.x < - img.width) {
		this.mountain.x = 0;
	}
	this.ctx.drawImage(img, this.mountain.x, this.mountain.y);
	this.ctx.drawImage(img, this.mountain.x + img.width, this.mountain.y);
	this.ctx.drawImage(img, this.mountain.x + img.width * 2, this.mountain.y);
}

// 渲染地面
Game.prototype.renderLand = function() {
	// 定义变量用于简化书写
	var img = this.land.img;
	this.land.x -= this.land.step;
	// 判断图片移动的位置
	if (this.land.x < -img.width) {
		this.land.x = 0;
	}
	// 绘制图片
	this.ctx.drawImage(img, this.land.x, this.land.y);
	this.ctx.drawImage(img, this.land.x + img.width, this.land.y);
	this.ctx.drawImage(img, this.land.x + img.width * 2, this.land.y);
}

// 游戏开始
Game.prototype.start = function() {
	// 缓存this
	var me = this;
	this.timer = setInterval(function() {
		// 帧++
		me.iframe++;
		// 清屏
		me.clear();
		// 渲染
		// 渲染远处的山
		me.renderMountain();
		// 渲染地面
		me.renderLand();
		// 渲染鸟
		me.renderBird();
		// 鸟飞翔
		if (!(me.iframe % 10)) {
			me.bird.fly();
		}
		// 鸟下降
		me.bird.flawDown();

	}, 20)
}

// 清屏
Game.prototype.clear = function() {
	this.ctx.clearRect(0, 0, 360, 512);
}


// 渲染鸟的方法
Game.prototype.renderBird = function() {
	// 获取鸟的图片
	var img = this.bird.img;
	// 保存状态
	this.ctx.save();
	// 平移
	this.ctx.translate(this.bird.x, this.bird.y);
	// 旋转
	// this.ctx.rotate(Math.PI / 180 * this.iframe);
	// 绘制图片
	this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
	// 恢复状态
	this.ctx.restore();
}



// 添加绑定事件方法
Game.prototype.bindEvent = function() {
	// 缓存this
	var me = this;
	// 添加点击事件
	this.ctx.canvas.onclick = function() {
		// 调用鸟上升的方法
		me.bird.goUp();
	}
}