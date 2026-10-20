*start
;マスクが掛かっている前提でくる

[resetfont]
[free name="chara_name_area" layer="message0" ]
[ptext name="chara_name_area" layer="message0" color="white" size=19 bold=true x=180 y=466]
[chara_config ptext="chara_name_area"]

[position layer="message0" width=960 height=155 top=510 left=160 margint=20 marginl=35 marginr=45 marginb=20 opacity=215 page="fore"]
[layopt layer="message" visible=false]
#
[glyph line="nextpage.png" folder="data/image" fix=true left=1075 top=620 ]

[freeimage layer="0"]

[image layer=0 width=640 height=360 x=80 y=40 storage="logo1280.png"]
[bg storage="heya.png" position="center" time=10]

[iscript]

	$(".layer layer_free").append("<div id='cien_link'>Ci-en</div>")

	SISMES.disableAllCollider()
	SISMES.sis.wakeupEventState = 0

	document.getElementById("KaihatsuInfo")?.remove()
	document.getElementById("sismes_status_display")?.remove()
	document.getElementById("sismes_time_display")?.remove()

	document.getElementById("sysmes_save_outer")?.remove()
	document.getElementById("sysmes_mainMemo")?.remove()

	document.getElementById("showMsgArea")?.remove()
	document.getElementById("showConfirmArea")?.remove()
	document.getElementById("showChangeArea")?.remove()

	//初期データ(sf.savedataがカレントデータ)
	sf.savedata = $.extend(true,{}, SISMES.initData);
	
	//参照を保存
	SISMES.savedata = sf.savedata
	
	tf.hasOnceItemDelete = false
	
	$("#VRoid").css("filter", "").removeClass("fadeColor")

[endscript]

[clearfix]
[cm]
[clearstack]

;状態の初期化
[model_reset]

[stopse buf=0][stopse buf=1][stopse buf=2][stopse buf=3][stopse buf=4][stopse buf=5]

*select

[glink color="btn_black" size=24 width="300" x=840 y=260 target="mode_select" text="Bắt đầu mới" ]
[glink color="btn_black" size=24 width="300" x=840 y=360 target="load" text="Tiếp tục" ]
[glink color="btn_black" size=24 width="300" x=840 y=460 target="free_mode" text="Chế độ Tự do" ]
[glink color="btn_black" size=24 width="300" x=840 y=560 target="close" text="Thoát"]


[glink color="btn_black" size=24 width="300" x=240 y=560 storage="zenjitsu.ks" target="start" text="Tiền truyện" cond="sf.globalClear"]

[button name="sismes_config" width=50 x=1220 y=10 graphic="config.png" exp="sismes.config()" role="dummy"]

[iscript]
	$(".layer_free").append("<div id='version'>Ver 1.01</div><div id='cien_link' class='btn_white'>Ci-en</div><div id='pwa_title_btn' class='btn_white'>📲 Cài đặt App</div>")
	$("#pwa_title_btn").on("click", function(e){ if (window.promptPWAInstall) window.promptPWAInstall(); });
	
	let locked = false
	$("#cien_link").on("click", function(e){
		if (locked) return
		
		locked = true
		window.studio_api.shell.openExternal("https://ci-en.dlsite.com/creator/11286");

		setTimeout(() => {
			locked = false;
		}, 500);
	});
[endscript]

[mask_off time=300]
[s][s][s][s][s]

*mode_select
[iscript]
	SISMES.selectMode("title.ks", "return_mode_select", "select")
[endscript]
[s][s][s][s][s]

*return_mode_select
[jump storage="main.ks" target="start"]
[s][s][s][s][s]


*load
[iscript]
	SISMES.displayLoad("title.ks", "select")
[endscript]
[s][s][s][s][s]

*close
[mask time=300]
[close ask=false]
[s][s][s][s][s]

*free_mode
[iscript]
	sf.savedata = $.extend(true,{}, SISMES.initData, SISMES.freeModeData);
	SISMES.savedata = sf.savedata;
[endscript]

[jump storage="osawari.ks" target="start" ]
[s][s][s][s][s]


*return_title
[mask time=300]

[wait time=300]
[fadeoutse time=500]
[wait time=500]
[iscript]
	SISMES.timerOsawariEnd()
[endscript]
[stopse]
[jump target=start]
[s][s][s][s][s]

