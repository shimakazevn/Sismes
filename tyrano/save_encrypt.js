(function(){

	//キャッシュ用
	const storageCache = Object.create(null);

	//セーブデータ強制暗号化
	$.setStorage = function (key, val, type) {

		if (typeof val !== "string") {
			val = JSON.stringify(val);
		}
		
		storageCache[key] = val;

		if (type == "file" || window.studio_api) {
			$.setStorageFile(key, val);
		} else {
			$.setStorageCompress(key, val);
		}
	};

	$.getStorage = function (key, type) {

		//キャッシュがある場合はキャッシュを返す
		if (key in storageCache) {
			return storageCache[key];
		}

		let gv = "null";

		if (type == "file" || window.studio_api) {
			gv = $.getStorageFile(key);
		} else {
			gv = $.getStorageCompress(key);
		}

		if (gv !== null) {
			storageCache[key] = gv;
		}

		return gv;
	};


	$.setStorageCompress = function (key, val) {
		localStorage.setItem(key, LZString.compressToBase64(val));
	};

	$.getStorageCompress = function (key) {
		let gv = "null";

		try {
			
			const data = localStorage.getItem(key);

			if (data) {
				gv = LZString.decompressFromBase64(data);
				//非圧縮時の処理
				if (gv === null) gv = unescape(data);
			}
			if (gv == "null") return null;
		} catch (e) {
			console.log("==============");
			console.log(e);
			alert($.lang("save_does_not_work"));
			$.confirmSaveClear();
		}

		return gv;
	};
	
	$.setStorageFile = function (key, val) {

		let fs
		if (window.studio_api) {
			fs = window.studio_api.fs
		} else {
			fs = require("fs");
		}

		let out_path = $.getExePath();

		//mac os Sierra 対応
		if (process.execPath.indexOf("var/folders") != -1) {
			out_path = process.env.HOME + "/_TyranoGameData";
			if (!fs.existsSync(out_path)) {
				fs.mkdirSync(out_path);
			}
		} else {
			out_path = $.getExePath();
		}

		out_path = out_path + "/savedata"
		if (!fs.existsSync(out_path)) fs.mkdirSync(out_path)

		//fs.writeFileSync(out_path + "/" + key + ".sav", LZString.compressToBase64(val));
		const data = LZString.compressToUint8Array(val);

		fs.writeFileSync(
			out_path + "/" + key + ".sav",
			data
		);

	};

	$.getStorageFile = function (key) {
		let gv = "null";

		try {
			let fs
			if (window.studio_api) {
				fs = window.studio_api.fs
			} else {
				fs = require("fs");
			}
			let out_path = $.getExePath();

			out_path = out_path + "/savedata"
			if (!fs.existsSync(out_path)) fs.mkdirSync(out_path)

			if (process.execPath.indexOf("var/folders") != -1) {
				out_path = process.env.HOME + "/_TyranoGameData";
				if (!fs.existsSync(out_path)) {
					fs.mkdirSync(out_path);
				}
			} else {
				out_path = $.getExePath();
			}

			out_path = out_path + "/savedata"

			if (fs.existsSync(out_path + "/" + key + ".sav")) {

				const buffer = fs.readFileSync(out_path + "/" + key + ".sav");

				// 新形式（Uint8Array）
				gv = LZString.decompressFromUint8Array(new Uint8Array(buffer));

				// Base64を処理してから非圧縮を処理
				if (gv === null) {

					const str = buffer.toString("utf8");

					gv = LZString.decompressFromBase64(str);

					// 非圧縮時の処理
					if (gv === null) {
						gv = unescape(str);
					}
				}
			}

			if (gv == "null") {
				return null;
			}
		} catch (e) {
			console.log(e);
			alert($.lang("save_does_not_work"));
			$.confirmSaveClear();
		}

		return gv;
	};

	//システム変数に変更があった場合のみ実行するように変更
	//saveSystemVariableを完全に書き換えてstringifyしたsfを渡すように変更
	tyrano.plugin.kag.saveSystemVariable = function () {

		const key = this.kag.config.projectID + "_sf";
		const sf = JSON.stringify(this.variable.sf)

		if (storageCache[key] === sf) return

		$.setStorage(key, sf, this.kag.config.configSave);

		// ティラノイベント"storage-sf"を発火
		this.kag.trigger("storage-sf");

	}

})();
