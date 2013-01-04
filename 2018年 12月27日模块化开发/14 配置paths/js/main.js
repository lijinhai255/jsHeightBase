// 使用requier.config进行配置
require.config({
	// 配置paths
	paths: {
		"module": "module/header"
	}
})

define(["module/header"], function(header) {
	console.log(header);
})