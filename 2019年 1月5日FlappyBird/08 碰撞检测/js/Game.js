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
		// 管子移动
		me.movePipe();
		// 渲染管子
		me.renderPipe();
		// 渲染鸟
		me.renderBird();
		// 鸟飞翔
		if (!(me.iframe % 10)) {
			me.bird.fly();
		}
		// 鸟下降
		me.bird.flawDown();
		// 每iframe65次， 创建一根管子
		if (!(me.iframe % 65)) {
		// 创建管子
			me.createPipe();
		}
		// 清除管子
		me.clearPipe();
		// 绘制鸟的四个点
		me.renderBirdPoints();
		// 绘制管子的8个点
		me.renderPipePoints();

		// 碰撞检测
		me.checkBoom();

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
	// 绘制矩形
	// this.ctx.strokeRect(-this.bird.img.width / 2 + 6, -this.bird.img.height / 2 + 6, this.bird.img.width - 12, this.bird.img.height - 12);
	// 判断鸟的状态
	var deg = this.bird.state === "D" ? Math.PI / 180 * this.bird.speed : - Math.PI / 180 * this.bird.speed;
	// 旋转
	this.ctx.rotate(deg);

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


// 渲染管子
Game.prototype.renderPipe = function() {
	// 缓存this
	var me = this;
	// 由于管子有多根，所以要循环渲染
	this.pipeArr.forEach(function(value, index) {
		// 获取上管子的图片
		var img = value.pipe_up;
		// 图片的x值
		var img_x = 0;
		// 图片的y值
		var img_y = img.height - value.up_height;
		// 图片的宽
		var img_w = img.width;
		// 图片的高
		var img_h = value.up_height;
		// 在canvas上的x值
		var canvas_x = me.ctx.canvas.width - value.step * value.count;
		// 在canvas上的y值
		var canvas_y = 0;
		// 在canvas上的图片的宽
		var canvas_w = img.width;
		// 在canvas上的图片的高
		var canvas_h = value.up_height;
		// 绘制上管子
		me.ctx.drawImage(img, img_x, img_y, img_w, img_h, canvas_x, canvas_y, canvas_w, canvas_h);


		// 绘制下管子
		// 获取下管子的图片
		var img_down = value.pipe_down;
		// 图片的x值
		var img_down_x = 0
		// 图片的y值
		var img_down_y = 0
		// 下管子图片的宽
		var img_down_w = img_down.width;
		// 下管子图片的高
		var img_down_h = value.down_height;
		// 在canvas中的x值
		var canvas_down_x = me.ctx.canvas.width - value.step * value.count;
		// 在canvas中的y值
		var canvas_down_y = value.up_height + 150;
		// 在canvas中的图片的宽
		var canvas_down_w = img_down.width;
		// 在canvas中的图片的高
		var canvas_down_h = 250 - value.up_height;
		// 绘制管子
		me.ctx.drawImage(img_down, img_down_x, img_down_y, img_down_w, img_down_h, canvas_down_x, canvas_down_y, canvas_down_w, canvas_down_h);
	})
}


// 管子移动的方法
Game.prototype.movePipe = function() {
	this.pipeArr.forEach(function(value, index) {
		value.count++;
	})
}


// 创建管子
Game.prototype.createPipe = function() {
	var pipe = this.pipeArr[0].createPipe();
	// 放入管子数组中
	this.pipeArr.push(pipe);
}


// 清理管子
Game.prototype.clearPipe = function() {
	for (var i = 0; i < this.pipeArr.length; i++) {
		// 获取一根管子
		var pipe = this.pipeArr[i];
		if (pipe.x - pipe.step * pipe.count < - pipe.pipe_up.width) {
			this.pipeArr.splice(i, 1);
			return;
		}
	}
}


// 绘制鸟的四个点
Game.prototype.renderBirdPoints = function() {
	// 鸟的A点
	var Bird_A = {
		x: -this.bird.img.width / 2 + 6 + this.bird.x,
		y: -this.bird.img.height / 2 + 6 + this.bird.y
	}

	// 鸟的B点
	var Bird_B = {
		x: Bird_A.x + this.bird.img.width - 12,
		y: Bird_A.y
	}

	// 鸟的C点
	var Bird_C = {
		x: Bird_A.x,
		y: Bird_A.y + this.bird.img.height - 12
	}

	// 鸟的D点
	var Bird_D = {
		x: Bird_B.x,
		y: Bird_C.y
	}


	// 开启路径
	this.ctx.beginPath();
	// 移动画笔到某个位置
	this.ctx.moveTo(Bird_A.x, Bird_A.y);
	this.ctx.lineTo(Bird_B.x, Bird_B.y);
	this.ctx.lineTo(Bird_D.x, Bird_D.y);
	this.ctx.lineTo(Bird_C.x, Bird_C.y);
	// 关闭路径
	this.ctx.closePath();
	// 改变描边色
	this.ctx.strokeStyle = "blue";
	// 描边
	this.ctx.stroke();
}


// 绘制管子的8个点
Game.prototype.renderPipePoints = function() {
	// 循环渲染
	for (var i = 0; i < this.pipeArr.length; i++) {
		// 获取一根管子
		var pipe = this.pipeArr[i];

		// 绘制上管子的四个点
		var pipe_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: 0
		}

		// 上管子的B点
		var pipe_B = {
			x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
			y: 0
		}

		// 上管子的C点
		var pipe_C = {
			x: pipe_A.x,
			y: pipe.up_height
		}

		// 上管子的D点
		var pipe_D = {
			x: pipe_B.x,
			y: pipe_C.y
		}

		// 开启路径
		this.ctx.beginPath();
		// 移动画笔到某个位置
		this.ctx.moveTo(pipe_A.x, pipe_A.y);
		this.ctx.lineTo(pipe_B.x, pipe_B.y);
		this.ctx.lineTo(pipe_D.x, pipe_D.y);
		this.ctx.lineTo(pipe_C.x, pipe_C.y);
		// 关闭路径
		this.ctx.closePath();
		// 改变描边色
		this.ctx.strokeStyle = "blue";
		// 描边
		this.ctx.stroke();



		// 绘制下管子的四个点
		var pipe_down_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: pipe.up_height + 150
		}

		// 上管子的B点
		var pipe_down_B = {
			x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
			y: pipe_down_A.y
		}

		// 上管子的C点
		var pipe_down_C = {
			x: pipe_down_A.x,
			y: 400
		}

		// 上管子的D点
		var pipe_down_D = {
			x: pipe_down_B.x,
			y: 400
		}

		// 开启路径
		this.ctx.beginPath();
		// 移动画笔到某个位置
		this.ctx.moveTo(pipe_down_A.x, pipe_down_A.y);
		this.ctx.lineTo(pipe_down_B.x, pipe_down_B.y);
		this.ctx.lineTo(pipe_down_D.x, pipe_down_D.y);
		this.ctx.lineTo(pipe_down_C.x, pipe_down_C.y);
		// 关闭路径
		this.ctx.closePath();
		// 改变描边色
		this.ctx.strokeStyle = "blue";
		// 描边
		this.ctx.stroke();
	}
}


// 碰撞检测
Game.prototype.checkBoom = function() {
	for (var i = 0; i < this.pipeArr.length; i++) {
		// 获取一根管子
		var pipe = this.pipeArr[i];

		// 绘制上管子的四个点
		var pipe_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: 0
		}

		// 上管子的B点
		var pipe_B = {
			x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
			y: 0
		}

		// 上管子的C点
		var pipe_C = {
			x: pipe_A.x,
			y: pipe.up_height
		}

		// 上管子的D点
		var pipe_D = {
			x: pipe_B.x,
			y: pipe_C.y
		}


		// 绘制下管子的四个点
		var pipe_down_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: pipe.up_height + 150
		}

		// 上管子的B点
		var pipe_down_B = {
			x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
			y: pipe_down_A.y
		}

		// 上管子的C点
		var pipe_down_C = {
			x: pipe_down_A.x,
			y: 400
		}

		// 上管子的D点
		var pipe_down_D = {
			x: pipe_down_B.x,
			y: 400
		}


		// 鸟的A点
		var Bird_A = {
			x: -this.bird.img.width / 2 + 6 + this.bird.x,
			y: -this.bird.img.height / 2 + 6 + this.bird.y
		}

		// 鸟的B点
		var Bird_B = {
			x: Bird_A.x + this.bird.img.width - 12,
			y: Bird_A.y
		}

		// 鸟的C点
		var Bird_C = {
			x: Bird_A.x,
			y: Bird_A.y + this.bird.img.height - 12
		}

		// 鸟的D点
		var Bird_D = {
			x: Bird_B.x,
			y: Bird_C.y
		}


		// 用鸟的B点x值与上管子的C点的x值进行对比
		if (Bird_B.x >= pipe_C.x && Bird_B.y <= pipe_C.y && Bird_C.x <= pipe_D.x) {
			console.log("撞到上管子了");
			// 游戏结束
			this.gameOve();
		}


		// 与下管子进行比较
		if (Bird_D.x >= pipe_down_A.x && Bird_D.y >= pipe_down_A.y && Bird_A.x <= pipe_down_B.x) {
			console.log("撞到下管子了");
			// 游戏结束
			this.gameOve();
		}
	}
}

// 游戏结束
Game.prototype.gameOve = function() {
	// 清除定时器
	clearInterval(this.timer);
}