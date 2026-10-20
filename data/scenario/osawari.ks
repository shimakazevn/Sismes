*styleChange

[glink color="btn_black" name="styleChangeUI okosu" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=180 target="okosu"        text="Đánh thức"      cm=false cond="!SISMES.savedata.freeMode && SISMES.savedata.status.risei <= 0 && !SISMES.sis.wakeup"]
[glink color="btn_black" name="styleChangeUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=240 target="clean_seieki"      text="Lau sạch"      cm=false cond="SISMES.checkSeishi() > 0"]
[glink color="btn_black" name="styleChangeUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=300 target="style_0"      text="Nằm ngửa"      cm=false cond="SISMES.data.currentStyle !== 0"]
[glink color="btn_black" name="styleChangeUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=360 target="style_1"      text="Nằm nghiêng"      cm=false cond="SISMES.data.currentStyle !== 1"]
[glink color="btn_black" name="styleChangeUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=420 target="style_2"      text="Nằm sấp"    cm=false cond="SISMES.data.currentStyle !== 2"]
[glink color="btn_black" name="styleChangeUI mochiageru" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=480 target="style_3"      text="Bế bổng"  cm=false cond="SISMES.data.currentStyle !== 3"]
[glink color="btn_black" name="styleChangeUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=540 target="style_cancel" text="Hủy"  cm=false]

[glink color="btn_black" name="styleChangeUI disableUI"  exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=240 target="styleChange" text="Lau sạch" cm=false cond="SISMES.checkSeishi() === 0"]
[glink color="btn_white" name="styleChangeUI nonClickUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=300 target="styleChange" text="Nằm ngửa"         cm=false cond="SISMES.data.currentStyle === 0"]
[glink color="btn_white" name="styleChangeUI nonClickUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=360 target="styleChange" text="Nằm nghiêng"         cm=false cond="SISMES.data.currentStyle === 1"]
[glink color="btn_white" name="styleChangeUI nonClickUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=420 target="styleChange" text="Nằm sấp"       cm=false cond="SISMES.data.currentStyle === 2"]
[glink color="btn_white" name="styleChangeUI nonClickUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=480 target="styleChange" text="Bế bổng"     cm=false cond="SISMES.data.currentStyle === 3"]

/*
[glink color="btn_black" name="styleChangeUI disableUI"  exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=240 target="clean_seieki"      text="Lau sạch"      cm=false cond="SISMES.checkSeishi() === 0"]
[glink color="btn_white" name="styleChangeUI nonClickUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=300 target="style_0"      text="Nằm ngửa"      cm=false cond="SISMES.data.currentStyle === 0"]
[glink color="btn_white" name="styleChangeUI nonClickUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=360 target="style_1"      text="Nằm nghiêng"      cm=false cond="SISMES.data.currentStyle === 1"]
[glink color="btn_white" name="styleChangeUI nonClickUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=420 target="style_2"      text="Nằm sấp"    cm=false cond="SISMES.data.currentStyle === 2"]
[glink color="btn_white" name="styleChangeUI nonClickUI" exp="$('.styleChangeUI').remove()" size=14 width=200 x=980  y=480 target="style_3"      text="Bế bổng"  cm=false cond="SISMES.data.currentStyle === 3"]
*/

[iscript]
	//理性40より大きい場合無効化
	if (SISMES.savedata.status.risei > 40) {
		const mochiageru = document.querySelector('div.mochiageru')
		mochiageru.classList.add("riseiNoneUI");
	}
	
	tf.mask = true;
	tf.endStyleChangeEvent = "stop_event";
	$('.styleChangeUI').appendTo('#showChangeArea');
[endscript]

[s][s][s][s][s][s][s]

;起こす
*okosu
[iscript]
	SISMES.currentGauge.suimin = 0
	SISMES.updateGauge("suimin")
[endscript]

;あとはキャンセル時と同じ処理
[jump target="style_cancel"]
[s][s][s][s][s][s][s]

;精液拭き取り
*clean_seieki

[iscript]
	SISMES.deleteSeishi(2000)
[endscript]

;あとはキャンセル時と同じ処理
[jump target="style_cancel"]
[s][s][s][s][s][s][s]


;正常位
*style_0
[mask time=300 cond="tf.mask"]

[VRoid_pose modelID="model1" pose="h/c_base"]
[VRoid_move modelID="model1" x=0 y=-0.043418583975757485 z=0.2464548865334935]

[VRoid_mesh modelID="model1" name="Body_Tops"  visible=true]
[VRoid_mesh modelID="model1" name="Body_Tops2" visible=false]

[VRoid_emo modelID="model1" emoID="Tops_Forward" emoval=0 diff=true]
[VRoid_emo modelID="model1" emoID="Tops2_Down" emoval=0 diff=true]
[VRoid_emo modelID="model1" emoID="Tops2_Forward" emoval=0 diff=true]


[iscript]
	SISMES.init(0)
[endscript]

[wait time=500 cond="tf.mask"]

[mask_off time=300 cond="tf.mask"]

[iscript]
	//マスクありの場合復帰処理
	if (tf.mask) {
		SISMES.enableOsawari(true)
	}
[endscript]

[jump target="&tf.endStyleChangeEvent"]
[s][s][s][s][s][s][s]

;背面座位
*style_1
[mask time=300 cond="tf.mask"]

[VRoid_pose modelID="model1" pose="h/s_base"]
[VRoid_move modelID="model1" x=0 y=-0.0023848481450752246 z=0.27572321685343365]

[VRoid_mesh modelID="model1" name="Body_Tops"  visible=true]
[VRoid_mesh modelID="model1" name="Body_Tops2" visible=false]

[VRoid_emo modelID="model1" emoID="Tops_Forward" emoval=0.5 diff=true]
[VRoid_emo modelID="model1" emoID="Tops2_Down" emoval=0 diff=true]
[VRoid_emo modelID="model1" emoID="Tops2_Forward" emoval=0 diff=true]


[iscript]
	SISMES.init(1)
[endscript]

[wait time=500 cond="tf.mask"]

[mask_off time=300 cond="tf.mask"]

[iscript]
	//マスクありの場合復帰処理
	if (tf.mask) {
		SISMES.enableOsawari(true)
	}
[endscript]

[jump target="&tf.endStyleChangeEvent"]
[s][s][s][s][s][s][s]

;寝バック
*style_2
[mask time=300 cond="tf.mask"]

[VRoid_pose modelID="model1" pose="h/b_base"]
[VRoid_move modelID="model1" x=0 y=-0.043418583975757485 z=0.2464548865334935]

[VRoid_mesh modelID="model1" name="Body_Tops"  visible=true]
[VRoid_mesh modelID="model1" name="Body_Tops2" visible=false]

[VRoid_emo modelID="model1" emoID="Tops_Forward" emoval=0.6 diff=true]
[VRoid_emo modelID="model1" emoID="Tops2_Down" emoval=0 diff=true]
[VRoid_emo modelID="model1" emoID="Tops2_Forward" emoval=0 diff=true]

[iscript]
	SISMES.init(2)
[endscript]

[wait time=500 cond="tf.mask"]

[mask_off time=300 cond="tf.mask"]

[iscript]
	//マスクありの場合復帰処理
	if (tf.mask) {
		SISMES.enableOsawari(true)
	}
[endscript]

[jump target="&tf.endStyleChangeEvent"]
[s][s][s][s][s][s][s]

;まんぐり
*style_3
[mask time=300 cond="tf.mask"]

[VRoid_pose modelID="model1" pose="h/m_base"]
[VRoid_move modelID="model1" x=0 y=0.09698785349760147 z=0.17322776742917206]

[VRoid_mesh modelID="model1" name="Body_Tops"  visible=false]
[VRoid_mesh modelID="model1" name="Body_Tops2" visible=true]

[VRoid_emo modelID="model1" emoID="Tops_Forward" emoval=0 diff=true]
[VRoid_emo modelID="model1" emoID="Tops2_Down" emoval=0.1 diff=true]
[VRoid_emo modelID="model1" emoID="Tops2_Forward" emoval=0.7 diff=true]

[iscript]
	SISMES.init(3)
[endscript]

[wait time=500 cond="tf.mask"]
[mask_off time=300 cond="tf.mask"]

[iscript]
	//マスクありの場合復帰処理
	if (tf.mask) {
		SISMES.enableOsawari(true)
	}
[endscript]

[jump target="&tf.endStyleChangeEvent"]
[s][s][s][s][s][s][s]

;キャンセル時
*style_cancel

[iscript]
	//復帰処理
	document.getElementById("showChangeArea")?.remove()
	SISMES.enableOsawari(true)
[endscript]

[jump target="&tf.endStyleChangeEvent"]
[s][s][s][s][s][s][s]


*start

[mask time=500]
[bg storage="kuro.png" time=10 position="center"]

[cm]
[freeimage layer="0"]

;断面初期化
[VRoid_emo modelID="danmen" emoID="Base_Wide" emoval=1 diff=false wait=true]
[VRoid_emo modelID="danmen" emoID="Base_Close1" emoval=0.1 diff=true wait=true]
[VRoid_emo modelID="danmen" emoID="chinpo_down" emoval=0.1 diff=true wait=true]
[VRoid_emo modelID="danmen" emoID="Eki_Hide" emoval=1 diff=true wait=true]


[VRoid_camera_move cameraID="camera1" y=3 z=1.5 rotX=-1]
;[VRoid_camera_move cameraID="camera2" x=0 y=1.1523452 z=0.0957486 rotX=-1 rotY=0 rotZ=0]

;まばたき速度Down
[VRoid_blink_config modelID="model1" enable=true speed=0.25]

[button width=50 x=1220 y=130 name="sismes_osawari_button camera disableOsawari" graphic="camera.png" exp="SISMES.cameraControlEnable()" role="dummy"]
[button width=50 x=1220 y=210 name="sismes_osawari_button camera_rot disableOsawari" graphic="camera_change.png" exp="SISMES.cameraControlPosChange()" role="dummy"]

[button width=50 x=1220 y=320 name="sismes_osawari_button shirt notCameraUI disableOsawari" graphic="shirt.png" exp="SISMES.dummy()" role="dummy"]
[button width=50 x=1220 y=400 name="sismes_osawari_button pants notCameraUI disableOsawari" graphic="pants.png" exp="SISMES.dummy()" role="dummy"]
[button width=50 x=1220 y=480 name="sismes_osawari_button change notCameraUI disableOsawari" graphic="change.png" exp="SISMES.dummy()" role="dummy"]

[button width=50 x=1220 y=560 name="sismes_osawari_button exit notCameraUI disableOsawari" graphic="exit.png" exp="SISMES.exit()" role="dummy"]

[button width=402 height=227 x=9 y=59 name="sismes_osawari_button viewport_frame disableOsawari" graphic="viewport_frame.png" role="dummy"]


[button width=50 x=10 y=320 name="sismes_osawari_button hand notCameraUI disableOsawari" graphic="hand.png" exp="SISMES.icon('hand')" role="dummy"]
[button width=50 x=10 y=400 name="sismes_osawari_button bero notCameraUI disableOsawari" graphic="bero.png" exp="SISMES.icon('bero')" role="dummy"]
[button width=50 x=10 y=480 name="sismes_osawari_button chin notCameraUI disableOsawari" graphic="chin.png" exp="SISMES.icon('chin')" role="dummy"]
[button width=50 x=10 y=560 name="sismes_osawari_button syasei notCameraUI disableOsawari" graphic="syasei.png" exp="SISMES.show_syasei_menu()" role="dummy"]
[button width=50 x=10 y=640 name="sismes_osawari_button reset notCameraUI disableOsawari" graphic="reset.png" exp="SISMES.reset(false)" role="dummy"]

[button width=50 x=980  y=10 name="sismes_osawari_button osawariKaihatsu notCameraUI disableOsawari" graphic="heart.png" exp="SISMES.osawariKaihatsuInfo()" role="dummy"]
[button width=50 x=1060 y=10 name="sismes_osawari_button osawariInfo     notCameraUI disableOsawari" graphic="info.png"  exp="SISMES.osawariInfo()"         role="dummy"]
[button width=50 x=1140 y=10 name="sismes_osawari_button osawariMemo     notCameraUI disableOsawari" graphic="memo.png"  exp="SISMES.osawariMemo()"         role="dummy"]

;サブ画面メニュー
[glink color="btn_black" name="viewportCamera viewportCamera_a disableOsawari"    exp="SISMES.viewportCameraChange('a')"    size=12 width=50 x=10  y=16 target="stop_event" text="A"     cm=false]
[glink color="btn_black" name="viewportCamera viewportCamera_b disableOsawari"    exp="SISMES.viewportCameraChange('b')"    size=12 width=50 x=80  y=16 target="stop_event" text="B"     cm=false]
[glink color="btn_black" name="viewportCamera viewportCamera_c disableOsawari"    exp="SISMES.viewportCameraChange('c')"    size=12 width=50 x=150 y=16 target="stop_event" text="C"     cm=false]
[glink color="btn_black" name="viewportCamera viewportCamera_d disableOsawari"    exp="SISMES.viewportCameraChange('d')"    size=12 width=50 x=220 y=16 target="stop_event" text="D"     cm=false]
[glink color="btn_black" name="viewportCamera viewportCamera_auto disableOsawari" exp="SISMES.viewportCameraChange('auto')" size=12 width=50 x=290 y=16 target="stop_event" text="auto"  cm=false]
[glink color="btn_black" name="viewportCamera viewportCamera_off disableOsawari"  exp="SISMES.viewportCameraChange('off')"  size=12 width=50 x=360 y=16 target="stop_event" text="off"   cm=false]

;発射メニュー
[glink color="btn_black" name="syasei_menu disableOsawari syasei_manual"  exp="SISMES.syasei_menu_syasei(10)"    size=16 width=90 x=100  y=520 target="stop_event" text="Sau 10s"   cm=false]
[glink color="btn_black" name="syasei_menu disableOsawari syasei_manual"  exp="SISMES.syasei_menu_syasei(5)"     size=16 width=90 x=205  y=520 target="stop_event" text="Sau 5s"    cm=false]
[glink color="btn_black" name="syasei_menu disableOsawari syasei_manual"  exp="SISMES.syasei_menu_syasei(0)"     size=16 width=90 x=310  y=520 target="stop_event" text="Về đích (Ra)"     cm=false]

[glink color="btn_black" name="syasei_menu disableOsawari syasei_auto_menu  syasei_auto_3"  exp="SISMES.syasei_menu_auto(3)"    size=16 width=90 x=100  y=570 target="stop_event" text="Tự động 10s"   cm=false]
[glink color="btn_black" name="syasei_menu disableOsawari syasei_auto_menu  syasei_auto_2"  exp="SISMES.syasei_menu_auto(2)"    size=16 width=90 x=205  y=570 target="stop_event" text="Tự động 5s"   cm=false]
[glink color="btn_black" name="syasei_menu disableOsawari syasei_auto_menu  syasei_auto_1"  exp="SISMES.syasei_menu_auto(1)"    size=16 width=90 x=310  y=570 target="stop_event" text="Tự động 0s"   cm=false]

[glink color="btn_black" name="syasei_menu disableOsawari syasei_auto_menu  syasei_auto_0"  exp="SISMES.syasei_menu_auto(0)"    size=16 width=90 x=100  y=620 target="stop_event" text="Tắt tự động"   cm=false]
[glink color="btn_black" name="syasei_menu disableOsawari syasei_auto_menu  syasei_auto_4"  exp="SISMES.syasei_menu_auto(4)"    size=16 width=90 x=205  y=620 target="stop_event" text="Cùng lên đỉnh"   cm=false cond="SISMES.savedata.item['同時イキの極意']"]
[glink color="btn_black" name="syasei_menu disableOsawari"  exp="SISMES.hide_syasei_menu()"    size=16 width=90 x=310  y=620 target="stop_event" text="＜ Đóng"   cm=false]

;できること確認ボタン
[glink color="btn_black" name="KakuninInfo_page_button KakuninInfo_page_button_kakunin disableOsawari"    exp="SISMES.osawariInfoKakunin()"         size=12 width=120 x=910 y=90 target="stop_event" text="Vị trí chạm"     cm=false]
[glink color="btn_black" name="KakuninInfo_page_button KakuninInfo_page_button_prev    disableOsawari"    exp="SISMES.osawariInfoKakunin_prev()"    size=12 width=50 x=1050 y=90 target="stop_event" text="< Trước"     cm=false]
[glink color="btn_black" name="KakuninInfo_page_button KakuninInfo_page_button_next    disableOsawari"    exp="SISMES.osawariInfoKakunin_next()"    size=12 width=50 x=1120 y=90 target="stop_event" text="Sau >"     cm=false]


;初期表情設定
[VRoid_emo modelID="model1" emo="h/default"]


[iscript]
	//イベントガードフラグ初期化
	SISMES.isEventGuard = false

	$(".viewport_frame").attr('id', 'viewport_frame')
	$(".layer_free").attr('id', 'layer_free')

	tf.mask = false;
	tf.endStyleChangeEvent = "start_osawari_event";
	
	//開始時のスタイルをここで設定
	if (!SISMES.savedata.freeMode) {
		//日によって2種類の寝相をループ
		tf.statOsawariStyle = ((SISMES.savedata.time.date || 1) - 1) % 2;
	} else {
		//フリーモードは正面開始固定
		tf.statOsawariStyle = 0;
	}
	
	//ゲージ作成処理
	SISMES.gaugeInit()

	//プログレス作成処理
	SISMES.progressInit()

	//共通データやイベントフラグの初期化
	SISMES.dataInit()

	//できること情報表示
	SISMES.createOsawariKakuninInfo()

	//開発情報表示
	SISMES.createOsawariKaihatsuInfo()

	
	//射精管理
	SISMES.set_syasei_menu()
	
	SISMES.createTimeDisplay()
	SISMES.createStatusDisplay()

[endscript]

[jump target="&'style_' + tf.statOsawariStyle"]
[s][s][s][s][s][s][s][s][s][s]

*start_osawari_event

[bg storage="kuro.png" time=100 position="center" wait=false]

;ベッド表示
[VRoid_obj3D_show objID="objID1"]

;[VRoid_move modelID="R" x=-0.020727245124245758 y=-0.0613112961365875 z=-0.09023744499324919 rotX=-0.14781568939557835 rotY=-4.337672625748033 rotZ=1.0931970157840987]
;[VRoid_move modelID="L" x=0.007602366845626625 y=-0.03259613310434448 z=-0.09022278807578282 rotX=-0.14781568939557835 rotY=4.337672625748033 rotZ=-1.0931970157840987]

;部位と手は左右対称になる
[VRoid_pose modelID="L" pose=osawari_L_muneR_1]
[VRoid_pose modelID="R" pose=osawari_R_muneL_1]
[VRoid_pose modelID="bero"]
[VRoid_pose modelID="chin"]

[VRoid_background_visible layerID="VRoid" background=true]
[VRoid_viewport_show layerID="VRoid" viewportID="viewport1"]
[VRoid_layer_show layerID="VRoid"]

[iscript]
	SISMES.cameraControlSet()

	//autoの初期表示用
	SISMES.viewportCameraChange('a')

	//最後に設定したviewportに変更する
	SISMES.viewportCameraChange(sf.savedata.currentViewport)

	//初回理性計算を実行
	SISMES.calcRisei(true)

	//初期画面表示UIの設定
	SISMES.osawariKaihatsuInfo(SISMES.savedata.osawariKaihatsuInfoVisible)
	SISMES.osawariInfo(SISMES.savedata.KakuninInfoVisible)

	//タイマー開始
	SISMES.timerEvent()

	if (!sf.savedata.firstOsawariMemo) {
		sf.savedata.firstOsawariMemo = true
		SISMES.osawariMemo()
	}
	
	if (sf.savedata.freeMode === true) {
		$("#sismes_time_display").css("display", "none")
		$("#sismes_status_display").css("display", "none")
	}
	
	//開始時にもう一度typeUpdateを強制
	SISMES.typeUpdate(SISMES.data.currentType, true)
[endscript]
[wait time=800]
[mask_off time=500]

*stop_event
[s][s][s][s][s][s][s][s][s][s]
