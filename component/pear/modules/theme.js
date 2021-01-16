layui.define(["jquery","layer"], function (exports) {
	var MOD_NAME = 'theme',
	    $ = layui.jquery;

	var theme = {};
	theme.config = {
		colors : {},
		allowCustom : false,
		defaultColor : {},
		autoHead : false
	};

	theme.changeTheme = function (target,themeConfig) {
		if(themeConfig == null){
			themeConfig = this.config;
		}
		this.themeRender(themeConfig);
		
		if (target.frames.length == 0) return;

		for (var i = 0; i < target.frames.length; i++) {
			try {
				if(target.frames[i].layui == undefined) continue;
				target.frames[i].layui.theme.changeTheme(target.frames[i],themeConfig);
			} catch (s) {

			}
		}
	}

	theme.themeRender = function (themeConfig) {
		this.config = themeConfig;

		if (this.config.allowCustom === false) {
			$(".setting").remove();
		}
		const colorId = localStorage.getItem("theme-color");
		const color = this.getColorById(colorId);
		localStorage.setItem("theme-color", color.id);
		localStorage.setItem("theme-color-context", color.color);
		this.colorSet(color.color);
	}

	theme.getColorById = function (id) {
		let color;
		let flag = false;
		$.each(this.config.colors, function(i, value) {
			if (value.id === id) {
				color = value;
				flag = true;
			}
		})
		if (flag === false || this.config.allowCustom === false) {
			$.each(colors, function(i, value) {
				if (value.id === this.config.defaultColor) {
					color = value;
					break;
				}
			})
		}
		return color;
	}

	theme.colorSet = function(color) {
				
		let style = '';
		// 自 定 义 菜 单 配 色
		style +=
			'.light-theme .pear-nav-tree .layui-this a:hover,.light-theme .pear-nav-tree .layui-this,.light-theme .pear-nav-tree .layui-this a,.pear-nav-tree .layui-this a,.pear-nav-tree .layui-this{background-color: ' +
			color + '!important;}';

		// 自定义 Logo 标题演示
		style +=
			'.pear-admin .layui-logo .title{color:' +
			color + '!important;}';

		// 自 定 义 标 签 配 色
		style += '.pear-frame-title .dot,.pear-tab .layui-this .pear-tab-active{background-color: ' + color +
			'!important;}';

		// 自 定 义 快 捷 菜 单
		style += '.bottom-nav li a:hover{background-color:' +
			color + '!important;}';

		// 自 定 义 顶 部 配 色
		style += '.pear-admin .layui-header .layui-nav .layui-nav-bar{background-color: ' + color + '!important;}'

		// 自 定 义 加 载 配 色
		style += '.ball-loader>span,.signal-loader>span {background-color: ' + color + '!important;}';

		// 自 定 义 顶 部 配 色
		style += '.layui-header .layui-nav-child .layui-this a{background-color:' + color +
			'!important;color:white!important;}';

		// 自 定 义 加 载 配 色
		style += '#preloader{background-color:' + color + '!important;}';

		// 自 定 义 样 式 选 择 边 框 配 色
		style +=
			'.pearone-color .color-content li.layui-this:after, .pearone-color .color-content li:hover:after {border: ' +
			color + ' 3px solid!important;}';

		style += '.layui-nav .layui-nav-child dd.layui-this a, .layui-nav-child dd.layui-this{background-color:' + color +
			'!important}';
			
		style += '.pear-social-entrance {background-color:' + color + '!important}';
		style += '.pear-admin .pe-collaspe {background-color:' + color + '!important}';
		if(this.config.autoHead){
			style += '.pear-admin .layui-header{background-color:' + color + '!important;}.pear-admin .layui-header .layui-nav .layui-nav-item>a{color:white!important;}';
		}

		style += '.layui-fixbar>li {background-color:' + color + '!important}';

		$("#pearadmin-bg-color").html(style);
	}

	theme.hello = function () {
		console.log("9527")
	}

	exports(MOD_NAME, theme);
});