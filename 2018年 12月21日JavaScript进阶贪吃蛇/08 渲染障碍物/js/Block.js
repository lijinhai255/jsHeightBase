/*障碍物类*/
function Block(img) {
	// 数组属性
	this.arr = [
		// {row: 8, col: 8},
		// {row: 8, col: 9},
		// {row: 8, col: 10},
		// {row: 9, col: 10},
		// {row: 10, col: 10},
		// {row: 11, col: 10},
		// {row: 12, col: 10},
		// {row: 13, col: 10},
		// {row: 14, col: 10},
		// {row: 15, col: 10},



		// 测试
		{row: 5, col: 5},
		{row: 5, col: 6},
		{row: 5, col: 7},
		{row: 5, col: 8},
		{row: 6, col: 8},
		{row: 7, col: 8},
		{row: 8, col: 8},

	];
	// 图片属性
	this.img = img;
}