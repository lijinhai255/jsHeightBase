// 使用requier.config进行配置
require.config({
	// 配置shim
	shim: {
		"lib/jquery-1.7.2": {
			// 配置接口
			exports: "$",
			// 配置依赖集合
			deps: []
		}
	},
	// 配置map
	map: {
		"module/header": {
			"lib/jquery": "lib/jquery-1.7.2"
		},
	},
	// 配置baseUrl
	baseUrl: "js/module"
})

define(["module/header/header"], function() {
})