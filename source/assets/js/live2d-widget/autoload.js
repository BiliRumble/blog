const live2d_js_path = "/assets/js/live2d-widget/";
const live2d_css_path = "/assets/css/live2d-widget/"

function initLive2d() {
    // 加载 waifu.css live2d.min.js waifu-tips.js
	if (screen.width >= 768) {
		Promise.all([
			loadExternalResource(live2d_css_path + "waifu.css", "css"),
			loadExternalResource(live2d_js_path + "live2d.min.js", "js"),
			loadExternalResource(live2d_js_path + "waifu-tips.js", "js")
		]).then(() => {
			// 配置选项的具体用法见 README.md
			initWidget({
				waifuPath: "/assets/config/waifu-tips.json",
				//apiPath: "https://live2d.fghrsh.net/api/",
				cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
				tools: ["asteroids", "switch-model", "switch-texture", "quit"]
			});
		});
	}

	console.log(`
	く__,.ヘヽ.        /  ,ー､ 〉
			＼ ', !-─‐-i  /  /´
			／｀ｰ'       L/／｀ヽ､
			/   ／,   /|   ,   ,       ',
		ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
			ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
			!,/7 '0'     ´0iソ|    |
			|.从"    _     ,,,, / |./    |
			ﾚ'| i＞.､,,__  _,.イ /   .i   |
				ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
				| |/i 〈|/   i  ,.ﾍ |  i  |
				.|/ /  ｉ：    ﾍ!    ＼  |
				kヽ>､ﾊ    _,.ﾍ､    /､!
				!'〈//｀Ｔ´', ＼ ｀'7'ｰr'
				ﾚ'ヽL__|___i,___,ンﾚ|ノ
					ﾄ-,/  |___./
					'ｰ'    !_,.:
		Live2d Widget For Butterfly 已加载
	`);
}