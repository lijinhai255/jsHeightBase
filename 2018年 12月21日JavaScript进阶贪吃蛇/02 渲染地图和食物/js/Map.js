/**
 * Map类 地图类
 * @row 行属性
 * @col 列属性
 * @width 宽度属性
 * @height 高度属性
 **/
function Map(row, col, width, height) {
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	this.arr = [];
	// 因为最终要渲染在页面中，所以要借助dom元素
	this.dom = document.createElement("div");
}

// 填充方法
Map.prototype.fill = function() {
	for (var j = 0; j < this.row; j++) {
		// 因为要一行一行的创建， 所以要创建行容器
		var row_dom = document.createElement("div");
		// 创建行数组
		var row_arr = [];
		// 添加类名
		row_dom.className = "row";
		// 循环将每一行填充满
		for (var i = 0; i < this.col; i++) {
			// 创建每一个小方格元素
			var col_dom = document.createElement("span");
			// 给每一个小方格元素添加类名
			col_dom.className = "grid";
			// 填满行容器
			row_dom.appendChild(col_dom);
			// 将小方格元素放入到行数组中
			row_arr.push(col_dom);
		}
		// 每创建一行要追加到dom中
		this.dom.appendChild(row_dom);
		// 将行数组放入到新的数组中
		this.arr.push(row_arr);
		// 给dom添加类名
		this.dom.className = "box";
	}
	// 上树
	document.body.appendChild(this.dom);
}