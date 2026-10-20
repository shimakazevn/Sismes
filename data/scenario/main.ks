*mode
[iscript]
	SISMES.selectMode("main.ks", "select")
[endscript]
[s][s][s][s][s]

*save
[iscript]
	SISMES.displaySave("main.ks", "select")
[endscript]
[s][s][s][s][s]

*load
[iscript]
	SISMES.displayLoad("main.ks", "select")
[endscript]
[s][s][s][s][s]

;ロード直後はここにジャンプ
*loading

[mask time=10]

;状態の初期化
[VRoid_layer_hide layerID="VRoid"]
[VRoid_viewport_hide layerID="VRoid" viewportID="viewport1"]
[VRoid_obj3D_hide objID="objID1"]
[clearfix]
[freeimage layer="0"]
[button name="sismes_config" width=50 x=1220 y=10 graphic="config.png" exp="sismes.config()" role="dummy"]
[model_reset]

[bg storage="heya.png" time=10 position="center"]

[free name="chara_name_area" layer="message0" ]
[ptext name="chara_name_area" layer="message0" color="white" size=19 bold=true x=180 y=466]
[chara_config ptext="chara_name_area"]
[position layer="message0" width=960 height=155 top=510 left=160 margint=20 marginl=35 marginr=45 marginb=20 opacity=215 page="fore"]
[glyph line="nextpage.png" folder="data/image" fix=true left=1075 top=620 ]

[iscript]
	if (document.getElementById("sysmes_save_outer")) document.getElementById("sysmes_save_outer").remove()
	SISMES.createStatusDisplay()
	SISMES.createTimeDisplay()
[endscript]

;23時かどうかで分岐する
[jump storage="main_event.ks" target="select" cond="sf.savedata.time.hour >= 23"]
[jump                         target="select" cond="sf.savedata.time.hour <  23"]
[s][s][s][s][s]


*memo
[iscript]
	SISMES.mainMemo()
[endscript]
[s][s][s][s][s]

*flag
[iscript]
	SISMES.mainFlag()
[endscript]
[s][s][s][s][s]

*eroStatus
[iscript]
	SISMES.eroStatus()
[endscript]
[s][s][s][s][s]

;スキル
*skill

[iscript]
	SISMES.getSkill()
[endscript]
[s][s][s][s][s]


*camera
;カメラ
[iscript]
	SISMES.roomCamera()
[endscript]
[s][s][s][s][s]

*tsuhan
;通販
[iscript]
	SISMES.shop()
[endscript]
[s][s][s][s][s]

*quality
[call storage="quality.ks"]
[jump target="select"]
[s][s][s][s][s]

*restart
[iscript]
	SISMES.restart()
[endscript]
[s][s][s][s][s]



*start
;メイン画面 一日のスタートはここから
[mask time=1000]
[cm]

;状態の初期化
[model_reset]
[clearfix]
[freeimage layer="0"]
[button name="sismes_config" width=50 x=1220 y=10 graphic="config.png" exp="sismes.config()" role="dummy"]


[bg storage="heya.png" time=10 position="center"]
[stopse buf=0][stopse buf=1][stopse buf=2][stopse buf=3][stopse buf=4][stopse buf=5]

[wait time=1000]

[iscript]
	sf.savedata.time.date++
	//MAX999日
	if (sf.savedata.time.date >= 1000) sf.savedata.time.date = 999

	//前日の就寝時間を退避
	tf.hour = sf.savedata.time.hour
	tf.minute = sf.savedata.time.minute


	sf.savedata.time.hour = 7
	sf.savedata.time.minute = 0
	
	SISMES.createStatusDisplay()
	SISMES.createTimeDisplay()

	SISMES.calcRisei()
	
	//onceアイテムを削除
	//前日寝ていた場合は処理をスキップ
	if (tf.hasOnceItemDelete) SISMES.onceItemDelete()
[endscript]



;ここでおはようイベントへ
[jump storage="main_event.ks" target="ohayou"]
[s][s][s][s][s]

;おはようイベント後に部屋に戻る
*return_ohayou


;EDテスト
;[jump storage="ed2.ks" target="start" cond="!SISMES.savedata.clear"]


;31日のみED処理
[jump storage="ed.ks" target="start" cond="sf.savedata.time.date == 31 && !SISMES.savedata.clear"]


;オートセーブはおはようイベント後
*autosave
[iscript]
	SISMES.saveRun(0)
[endscript]

;日常選択肢
*select
[cm]
[mask_off time=1000]

[glink_config show_time=300]

[glink color="btn_black"           size=24 width="200" x=840 y=260 target="commu"  text="Trò chuyện" cond="SISMES.savedata.status.shinrai >= 0"]
[glink color="btn_black disableUI" size=24 width="200" x=840 y=260 target="select" text="Trò chuyện" cond="SISMES.savedata.status.shinrai < 0"]

[glink color="btn_black" size=24 width="200" x=840 y=360 target="work" text="Làm việc" cond="SISMES.savedata.event.shinrai_11"]
[glink color="btn_black" size=24 width="200" x=840 y=460 target="kyuukei" text="Nghỉ ngơi" cond="SISMES.savedata.event.shinrai_11"]

[glink color="btn_black disableUI" size=24 width="200" x=840 y=360 target="select" text="Làm việc" cond="!SISMES.savedata.event.shinrai_11"]
[glink color="btn_black disableUI" size=24 width="200" x=840 y=460 target="select" text="Nghỉ ngơi" cond="!SISMES.savedata.event.shinrai_11"]


[glink color="btn_black" size=24 width="200" x=240 y=260 target="tsuhan" text="Cửa hàng"]
[glink color="btn_black" size=24 width="200" x=240 y=360 target="skill" text="Kỹ năng"]
[glink color="btn_black" size=24 width="200" x=240 y=460 target="eroStatus" text="Xem em gái"]

;ぬいぐるみ実装した場合のレイアウト
;実装したらothers/img/mainMemo.pngも変更すること
/*
[glink color="btn_black" size=24 width="200" x=240 y=210 target="tsuhan" text="Cửa hàng"]

[glink color="btn_black" size=24 width="200" x=240 y=310 target="skill" text="Kỹ năng"]

[glink color="btn_black" size=24 width="200" x=240 y=410 target="camera" text="Camera" cond="SISMES.savedata.item['ぬいぐるみ']"]

[glink color="btn_black" size=24 width="200" x=240 y=510 target="eroStatus" text="Xem em gái"]
*/


[button width=50 x=740 y=10 name="sismes_main_button" graphic="restart.png"  target="restart" cond="sf.globalClear"]

[button width=50 x=820 y=10 name="sismes_main_button" graphic="flag.png"  target="flag" cond="SISMES.savedata.event.shinrai_11"]

[button width=50 x=900 y=10 name="sismes_main_button" graphic="memo.png"  target="memo"]

[button width=50 x=980  y=10 name="sismes_main_button" graphic="save.png"  target="save"]
[button width=50 x=1060 y=10 name="sismes_main_button" graphic="load.png"  target="load"]

[button width=50 x=1140  y=10 name="sismes_main_button" graphic="mode_easy.png"    target="mode"  cond="SISMES.savedata.mode===SISMES.modeRate[0]"]
[button width=50 x=1140  y=10 name="sismes_main_button" graphic="mode_normal.png"  target="mode"  cond="SISMES.savedata.mode===SISMES.modeRate[1]"]
[button width=50 x=1140  y=10 name="sismes_main_button" graphic="mode_hard.png"    target="mode"  cond="SISMES.savedata.mode===SISMES.modeRate[2]"]


[glink_config show_time=0]

[iscript]
	if (!sf.savedata.firstMainMemo) {
		sf.savedata.firstMainMemo = true
		SISMES.mainMemo(false)
 	} else if (!sf.savedata.firstMainMemo2 && sf.savedata.event.shinrai_11) {
		sf.savedata.firstMainMemo2 = true
		SISMES.mainMemo2(false)
	} else if (sf.globalClear && !sf.restartExp) {
		sf.restartExp = true
		TYRANO.kag.saveSystemVariable(true);
		SISMES.restartExp(false)
	}
[endscript]

[s][s][s][s][s]

;時間を進める
*next_time

[iscript]
	//基本5時間進める　7→12→17→22時
	SISMES.savedata.time.hour += 5
	SISMES.updateTimeDisplay()
[endscript]


;条件イベント後、ここに戻ってくる。一度に複数達成した場合、上から順番に実行
*return_event

;各条件達成時にイベント発生
[jump storage="main_scenario.ks" target="shinrai_11"  cond="!SISMES.savedata.event.shinrai_11  && SISMES.savedata.status.shinrai >= 11"]
[jump storage="main_scenario.ks" target="shinrai_20"  cond="!SISMES.savedata.event.shinrai_20  && SISMES.savedata.status.shinrai >= 20"]
[jump storage="main_scenario.ks" target="shinrai_40"  cond="!SISMES.savedata.event.shinrai_40  && SISMES.savedata.status.shinrai >= 40"]
[jump storage="main_scenario.ks" target="shinrai_60"  cond="!SISMES.savedata.event.shinrai_60  && SISMES.savedata.status.shinrai >= 60  && SISMES.savedata.status.risei <= 50"]
[jump storage="main_scenario.ks" target="shinrai_80"  cond="!SISMES.savedata.event.shinrai_80  && SISMES.savedata.status.shinrai >= 80  && SISMES.savedata.status.risei <= 25"]
[jump storage="main_scenario.ks" target="shinrai_100" cond="!SISMES.savedata.event.shinrai_100 && SISMES.savedata.status.shinrai >= 100 && SISMES.savedata.status.risei <= 0"]



;22時になったらおやすみイベントへ
[jump storage="main_event.ks" target="oyasumi" cond="SISMES.savedata.time.hour >= 22"]

;それ以外は通常選択
[jump target="select" cond="SISMES.savedata.time.hour < 22"]
[s][s][s][s][s]

;===================================
;  コミュニケーション
;===================================
*commu

[cm]

[glink_config show_time=300]

[glink color="btn_black commu_1" size=24 width="200" x=840 y=210 target="commu1" text="Nói chuyện"    cond="SISMES.savedata.status.hp >= 20"]
[glink color="btn_black commu_2" size=24 width="200" x=840 y=310 target="commu2" text="Kèm học"  cond="SISMES.savedata.event.shinrai_20 && SISMES.savedata.status.hp >= 30 && SISMES.savedata.status.shinrai >= 20"]
[glink color="btn_black commu_3" size=24 width="200" x=840 y=410 target="commu3" text="Chơi game"  cond="SISMES.savedata.event.shinrai_40 && SISMES.savedata.status.hp >= 40 && SISMES.savedata.status.shinrai >= 40"]
[glink color="btn_black" size=24 width="200" x=840 y=510 target="select" text="Quay lại"]


[glink color="btn_black commu_1 disableUI" size=24 width="200" x=840 y=210 target="commu" text="Nói chuyện"    cond="SISMES.savedata.status.hp < 20"]
[glink color="btn_black commu_2 disableUI" size=24 width="200" x=840 y=310 target="commu" text="Kèm học"  cond="!SISMES.savedata.event.shinrai_20 || SISMES.savedata.status.hp < 30 || SISMES.savedata.status.shinrai < 20"]
[glink color="btn_black commu_3 disableUI" size=24 width="200" x=840 y=410 target="commu" text="Chơi game"  cond="!SISMES.savedata.event.shinrai_40 || SISMES.savedata.status.hp < 40 || SISMES.savedata.status.shinrai < 40"]

[glink_config show_time=0]

[iscript]
	document.querySelector(".commu_1")?.insertAdjacentHTML("beforeend", "<div class='selectHP'>Thể lực: 20</div>");
	document.querySelector(".commu_2")?.insertAdjacentHTML("beforeend", "<div class='selectHP'>Thể lực: 30</div>");
	document.querySelector(".commu_3")?.insertAdjacentHTML("beforeend", "<div class='selectHP'>Thể lực: 40</div>");

	if (SISMES.savedata.status.shinrai < 40) {
		document.querySelector(".commu_3")?.insertAdjacentHTML("beforeend", "<div class='selectInfo'>※Mở khóa khi Tin cậy >= 40</div>");

		if (SISMES.savedata.status.shinrai < 20) {
			document.querySelector(".commu_2")?.insertAdjacentHTML("beforeend", "<div class='selectInfo'>※Mở khóa khi Tin cậy >= 20</div>");
		}
	}
[endscript]

[s][s][s][s][s]

;会話
*commu1
[iscript]
	tf.commu = 1
[endscript]

[call target=commu_anim]

[iscript]
	SISMES.addStatus("hp", -20);
	SISMES.addStatus("shinrai", 1);
	SISMES.updateStatusDisplay()
[endscript]

[jump target="next_time"]

[s][s][s][s][s]

;勉強
*commu2
[iscript]
	tf.commu = 2
[endscript]

[call target=commu_anim]

[iscript]
	SISMES.addStatus("hp", -30);
	SISMES.addStatus("shinrai", 2);
	SISMES.updateStatusDisplay()
[endscript]

[jump target="next_time"]

[s][s][s][s][s]

;ゲーム
*commu3
[iscript]
	tf.commu = 3
[endscript]

[call target=commu_anim]

[iscript]
	SISMES.addStatus("hp", -40);
	SISMES.addStatus("shinrai", 4);
	SISMES.updateStatusDisplay()
[endscript]

[jump target="next_time"]

[s][s][s][s][s]

*commu_anim

[iscript]
	tf.id1 = "communication" + tf.commu
	
	//初回だけ確定演出
	if (SISMES.savedata.event.shinrai_11) {
		tf.id2 = "communication" + tf.commu + "_" + (Math.floor(Math.random() * 8) + 1)
	} else {
		tf.id2 = "communication" + tf.commu + "_6"
	}

	document.getElementById(tf.id1)?.remove()
	document.getElementById(tf.id2)?.remove()
	
	tf.tyrano_base = $("#tyrano_base")
	tf.tyrano_base.append("<div id='" + tf.id1 + "' class='main_communication'></div>")
[endscript]
[wait time=600]
[iscript]
	tf.tyrano_base.append("<div id='" + tf.id2 + "' class='main_communication'></div>")
	$("#" + tf.id1).css("animation-name", "fadeOut")
[endscript]
[wait time=600]
[iscript]
	document.getElementById(tf.id1)?.remove()
	document.getElementById(tf.id2)?.remove()
	
	delete tf.id1
	delete tf.id2
	delete tf.tyrano_base
[endscript]
[return]
[s][s][s][s][s]

;===================================
;  仕事
;===================================
*work

[cm]

[glink_config show_time=300]

[if exp="SISMES.savedata.status.shinrai < 80"]
	;信頼80未満のとき
	[glink color="btn_black work_1" size=24 width="200" x=840 y=210 target="work1" text="Bình thường"    cond="SISMES.savedata.status.hp >= 25"]
	[glink color="btn_black work_2" size=24 width="200" x=840 y=310 target="work2" text="Nghiêm túc"      cond="SISMES.savedata.status.hp >= 50 && SISMES.savedata.status.risei <= 80"]
	[glink color="btn_black work_3" size=24 width="200" x=840 y=410 target="work3" text="Hết sức"      cond="SISMES.savedata.status.hp >= 100 && SISMES.savedata.status.risei <= 60"]

	[glink color="btn_black work_1 disableUI" size=24 width="200" x=840 y=210 target="work" text="Bình thường"  cond="SISMES.savedata.status.hp < 25"]
	[glink color="btn_black work_2 disableUI" size=24 width="200" x=840 y=310 target="work" text="Nghiêm túc"    cond="SISMES.savedata.status.hp < 50  || SISMES.savedata.status.risei > 80"]
	[glink color="btn_black work_3 disableUI" size=24 width="200" x=840 y=410 target="work" text="Hết sức"    cond="SISMES.savedata.status.hp < 100 || SISMES.savedata.status.risei > 60"]
[else]
	;信頼80以上のとき
	[glink color="btn_black work_1" size=24 width="200" x=840 y=210 target="work1" text="Bình thường"    cond="SISMES.savedata.status.hp >= 20"]
	[glink color="btn_black work_2" size=24 width="200" x=840 y=310 target="work2" text="Nghiêm túc"      cond="SISMES.savedata.status.hp >= 40 && SISMES.savedata.status.risei <= 80"]
	[glink color="btn_black work_3" size=24 width="200" x=840 y=410 target="work3" text="Hết sức"      cond="SISMES.savedata.status.hp >= 80 && SISMES.savedata.status.risei <= 60"]

	[glink color="btn_black work_1 disableUI" size=24 width="200" x=840 y=210 target="work" text="Bình thường"  cond="SISMES.savedata.status.hp < 20"]
	[glink color="btn_black work_2 disableUI" size=24 width="200" x=840 y=310 target="work" text="Nghiêm túc"    cond="SISMES.savedata.status.hp < 40 || SISMES.savedata.status.risei > 80"]
	[glink color="btn_black work_3 disableUI" size=24 width="200" x=840 y=410 target="work" text="Hết sức"    cond="SISMES.savedata.status.hp < 80 || SISMES.savedata.status.risei > 60"]
[endif]

[glink color="btn_black" size=24 width="200" x=840 y=510 target="select" text="Quay lại"]


[glink_config show_time=0]

[iscript]
	if (SISMES.savedata.status.shinrai < 80) {
		document.querySelector(".work_1")?.insertAdjacentHTML("beforeend", "<div class='selectHP'>Thể lực: 25</div>");
		document.querySelector(".work_2")?.insertAdjacentHTML("beforeend", "<div class='selectHP'>Thể lực: 50</div>");
		document.querySelector(".work_3")?.insertAdjacentHTML("beforeend", "<div class='selectHP'>Thể lực: 100</div>");
	} else {
		document.querySelector(".work_1")?.insertAdjacentHTML("beforeend", "<div class='selectHP'>Thể lực: 20</div>");
		document.querySelector(".work_2")?.insertAdjacentHTML("beforeend", "<div class='selectHP'>Thể lực: 40</div>");
		document.querySelector(".work_3")?.insertAdjacentHTML("beforeend", "<div class='selectHP'>Thể lực: 80</div>");
	}

	if (SISMES.savedata.status.risei > 60) {
		document.querySelector(".work_3")?.insertAdjacentHTML("beforeend", "<div class='selectInfo'>※Mở khóa khi Lý trí <= 60</div>");

		if (SISMES.savedata.status.risei > 80) {
			document.querySelector(".work_2")?.insertAdjacentHTML("beforeend", "<div class='selectInfo'>※Mở khóa khi Lý trí <= 80</div>");
		}
	}
[endscript]



[s][s][s][s][s]

;手抜き
*work1

[call target=work_anim]

[iscript]
	if (SISMES.savedata.status.shinrai < 80) {
		SISMES.addStatus("hp", -25);
	} else {
		SISMES.addStatus("hp", -20);
	}
	
	if (SISMES.savedata.status.shinrai < 100) {
		SISMES.addStatus("okane", 2000);
	} else {
		SISMES.addStatus("okane", 2000 * 1.4);
	}
	SISMES.updateStatusDisplay()
[endscript]

[jump target="next_time"]

[s][s][s][s][s]

;普通
*work2

[call target=work_anim]

[iscript]
	if (SISMES.savedata.status.shinrai < 80) {
		SISMES.addStatus("hp", -50);
	} else {
		SISMES.addStatus("hp", -40);
	}
	
	if (SISMES.savedata.status.shinrai < 100) {
		SISMES.addStatus("okane", 5000);
	} else {
		SISMES.addStatus("okane", 5000 * 1.4);
	}
	SISMES.updateStatusDisplay()
[endscript]

[jump target="next_time"]

[s][s][s][s][s]

;全力
*work3

[call target=work_anim]

[iscript]
	if (SISMES.savedata.status.shinrai < 80) {
		SISMES.addStatus("hp", -100);
	} else {
		SISMES.addStatus("hp", -80);
	}
	
	if (SISMES.savedata.status.shinrai < 100) {
		SISMES.addStatus("okane", 15000);
	} else {
		SISMES.addStatus("okane", 15000 * 1.4);
	}
	SISMES.updateStatusDisplay()
[endscript]

[jump target="next_time"]

[s][s][s][s][s]

*work_anim
[iscript]
	$("#tyrano_base").append("<div id='main_work' class='main_communication'></div>")
[endscript]
[wait time=1000]
[iscript]
	document.getElementById('main_work')?.remove()
	delete tf.tyrano_base
[endscript]
[return]
[s][s][s][s][s]

;===================================
;  休憩
;===================================
*kyuukei

[iscript]
	$("#tyrano_base").append("<div id='main_kyuukei' class='main_communication'></div>")
[endscript]
[wait time=1000]
[iscript]
	document.getElementById('main_kyuukei')?.remove()

	//睡眠は30分で回復力分回復
	//休憩は60分で回復力分回復

	//回復力　＝　基礎回復力5　＋　スキル回復力0～5
	const recovery = 5 + SISMES.savedata.skill.hp

	//5時間分休憩
	SISMES.addStatus("hp", 5 * recovery);

	SISMES.updateStatusDisplay()
[endscript]

[jump target="next_time"]

[s][s][s][s][s]
