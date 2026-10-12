(function() {

	const custom_ruby = {

		scale      : TYRANO.kag.stat.mp.scale      || "0.5",
		x          : TYRANO.kag.stat.mp.x          || "0",
		y          : TYRANO.kag.stat.mp.y          || "0"

	}


	TYRANO.kag.tag.ruby.start = function(pm) {
		//バックログの処理のために追加
		this.kag.tmp.rubyFlg = true;

		let ruby_scale = pm.scale === undefined ? custom_ruby.scale : pm.scale;
		let ruby_x = pm.x === undefined ? custom_ruby.x : pm.x;
		let ruby_y = pm.y === undefined ? custom_ruby.y : pm.y;

		let text = String(pm.text);
		if ( text.length >= 1 ) {
		
			let start = (text.length / 2 * -1) - 1;
			let end = text.length / 2 * -1;
			let defaultPitch = this.kag.config.defaultPitch;
			let isVertical = String(this.kag.stat.vertical);

			//字間設定されていた場合
			if ( parseFloat(defaultPitch) != 0 ){
				let spacing = (text.length - 1) * defaultPitch / 2;
				text = text.slice( 0, -1 ) + "<ruby style='letter-spacing: 0px;'>" + text.slice( -1 ) + "</ruby>"
				start = "calc(" + start + "em - " + spacing + "px)";
				end = "calc(" + end + "em - " + spacing + "px)";
			} else {
				start = start + "em";
				end = end + "em";
			}
			
			let str = "";

			if ( isVertical != "true" ) {
				//字間設定があった場合は補正する
				ruby_x = parseFloat(parseFloat(ruby_x) - parseFloat(defaultPitch));
				
				str = "</rt></ruby><ruby style='position: relative;'><ruby class='custom_ruby' style='position: absolute; transform: translate(" + ruby_x + "px," + ruby_y + "px) scale(" + ruby_scale + "); left:" + start + "; right:" + end + ";'>" +  text + "</ruby></ruby><ruby style='display: none;'><rt>";
			} else {
				//縦書き時
				ruby_y = parseFloat(parseFloat(ruby_y) - parseFloat(defaultPitch));
				str = "</rt></ruby><ruby style='position: relative ; writing-mode: vertical-lr; -webkit-writing-mode: vertical-lr; width: 1em; height: 0; display: inline-block;'><ruby class='custom_ruby_rl' style='position: absolute; transform: translate(" + ruby_x + "px," + ruby_y + "px) scale(" + ruby_scale + "); top:" + start + "; bottom:" + end + ";'>" +  text + "</ruby></ruby><ruby style='display: none;'><rt>";
			}

		    //ここに文字が入っている場合、ルビを設定してから、テキスト表示する
		    this.kag.stat.ruby_str = str;
		}

	    this.kag.ftag.nextOrder();

	}


})();
