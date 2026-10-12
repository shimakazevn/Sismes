*mode
[iscript]
	SISMES.selectMode("main_event.ks", "select")
[endscript]
[s][s][s][s][s]


*save
[iscript]
	SISMES.displaySave("main_event.ks", "select")
[endscript]
[s][s][s][s][s]

*load
[iscript]
	SISMES.displayLoad("main_event.ks", "select")
[endscript]
[s][s][s][s][s]


;おはようイベント
*ohayou
[mask_off time=1000 cond="sf.savedata.time.date > 1"]


;初日は固定
[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_00_B" cond="sf.savedata.time.date == 1"]
[VRoid_pose modelID="model1" pose="&['n/pose_00', 'n/pose_01', 'n/pose_05'][Math.floor(Math.random() * 3)]" emo="n/emo_pose_00_B" cond="sf.savedata.time.date != 1"]


[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
[VRoid_camera_move cameraID="camera1" x=0 y=1.35 z=1.7  rotX=-0.2 rotY=0 rotZ=0]
[VRoid_background_visible layerID="VRoid" background=false]

[iscript]
	//初日は実行しない　前日の就寝時間から回復量を計算して反映する
	if (sf.savedata.time.date > 1) SISMES.hpRecovery(tf.hour, tf.minute)
	
	VROID.model.model1.vrm.springBoneManager.reset()
[endscript]


[bg storage="living.png" time=500 position="center"]

[mask_off time=1000]

[wait time=500]


;信頼が0未満のとき
[jump target="minus" cond="SISMES.savedata.status.shinrai < 0"]

;前日目が覚めて、続けたとき
[jump target="wakeupEventState2" cond="SISMES.sis.wakeupEventState === 2"]



[if exp="SISMES.sis.wakeupEventState <= 0 && SISMES.savedata.status.shinrai >= 10"]

	[VRoid_layer_show layerID="VRoid" time=600 wait=true]
	[layopt layer="message" visible=true]
	#妹
	おはよう、おにいちゃん[p]


[else]

	;[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_C"]
	[VRoid_pose modelID="model1" pose="&['n/pose_00', 'n/pose_03'][Math.floor(Math.random() * 2)]" emo="n/emo_pose_03_C"]
	[VRoid_springBone_reset modelID="model1"]

	[VRoid_layer_show layerID="VRoid" time=600 wait=true]


	[layopt layer="message" visible=true]
	#妹
	……おにいちゃん、おはよう[p]

[endif]



;条件イベント後、ここに戻ってくる。一度に複数達成した場合、上から順番に実行
*return_ohayou_event

;各条件達成時にイベント発生
;初日イベント
[jump target="firstDay" cond="SISMES.savedata.time.date === 1 && !SISMES.savedata.event.firstDay"]


;初めて感じた（ゲージ1/3以上）
[jump target="hatsuKaikan" cond="SISMES.savedata.ohaEvent.hatsuKaikan === 1"]

;初めて濡れた（ゲージ2/3以上）
[jump target="hatsuNure" cond="SISMES.savedata.ohaEvent.hatsuNure === 1"]

;初めてイった
[jump target="hatsuIki" cond="SISMES.savedata.ohaEvent.hatsuIki === 1"]

;初めて5回以上イった
[jump target="hatsuRenzokuIki" cond="SISMES.savedata.ohaEvent.hatsuRenzokuIki === 1"]

;初めて潮吹きした
[jump target="hatsuShiohuki" cond="SISMES.savedata.ohaEvent.hatsuShiohuki === 1"]

;処女失った
[jump target="haka" cond="SISMES.savedata.ohaEvent.haka === 1"]

;初めて外に射精された
[jump target="hatsuSotodasi" cond="SISMES.savedata.ohaEvent.hatsuSotodasi === 1"]

;初めて口に射精された
[jump target="hatsuKuchiNakadashi" cond="SISMES.savedata.ohaEvent.hatsuKuchiNakadashi === 1"]

;初めてアナルに射精された
[jump target="hatsuAnalNakadashi" cond="SISMES.savedata.ohaEvent.hatsuAnalNakadashi === 1"]

;初めて中出しされた
[jump target="hatsuNakadashi" cond="SISMES.savedata.ohaEvent.hatsuNakadashi === 1"]

;初めて受精した
[jump target="hatsuNinshin" cond="SISMES.savedata.ohaEvent.hatsuNinshin === 1"]


;前日目が覚めて、やめたとき
[jump target="wakeupEventState1" cond="SISMES.sis.wakeupEventState === 1"]


*end_ohayou_event

[layopt layer="message" visible=false]
#
[VRoid_layer_hide layerID="VRoid" time=600 wait=true]


[wait time=500]

[iscript]
	//イベントフラグが1のものは0に戻す
	for (const key in SISMES.savedata.ohaEvent) {
		if (SISMES.savedata.ohaEvent[key] === 1) SISMES.savedata.ohaEvent[key] = 0
	}
[endscript]

[bg storage="heya.png" time=500 position="center"]
[jump storage="main.ks" target="return_ohayou"]

[s][s][s][s][s]




;おやすみイベント
*oyasumi

;信頼10以上ないとおやすみを言ってくれない
[if exp="SISMES.savedata.status.shinrai >= 10"]

	[if exp="SISMES.savedata.event.shinrai_60  && SISMES.savedata.status.shinrai >= 60"]
		;マッサージあり

		[VRoid_pose modelID="model1" pose="&['n/pose_02', 'n/pose_04'][Math.floor(Math.random() * 2)]" emo="n/emo_pose_01_A"]
		[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
		[VRoid_camera_move cameraID="camera1" x=0 y=1.35 z=1.7  rotX=-0.2 rotY=0 rotZ=0]
		[VRoid_background_visible layerID="VRoid" background=false]

		[VRoid_layer_show layerID="VRoid" time=600 wait=true]
		[layopt layer="message" visible=true]
		#妹

		んっ……と。はい！　マッサージおしまいっ[r]
		今日もおつかれさまです[p]


		[iscript]
			SISMES.addStatus("hp", 20);
			SISMES.updateStatusDisplay()
		[endscript]


		[VRoid_pose modelID="model1" pose="&['n/pose_00', 'n/pose_01'][Math.floor(Math.random() * 2)]" emo="&['n/emo_pose_01_A, n/emo_Cheek_100', 'n/emo_pose_01_B, n/emo_Cheek_100'][Math.floor(Math.random() * 2)]" time=600 easing="ease" wait=false]


	[else]
		;マッサージがない場合は表示処理の初期化をここで行う

		[VRoid_pose modelID="model1" pose="&['n/pose_00', 'n/pose_01'][Math.floor(Math.random() * 2)]" emo="&['n/emo_pose_01_A, n/emo_Cheek_100', 'n/emo_pose_01_B, n/emo_Cheek_100'][Math.floor(Math.random() * 2)]"]

		[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
		[VRoid_camera_move cameraID="camera1" x=0 y=1.35 z=1.7  rotX=-0.2 rotY=0 rotZ=0]
		[VRoid_background_visible layerID="VRoid" background=false]

		[VRoid_springBone_reset modelID="model1"]

		[VRoid_layer_show layerID="VRoid" time=600 wait=true]
		[layopt layer="message" visible=true]
		#妹

	[endif]


おやすみー、おにいちゃん[p]
[layopt layer="message" visible=false]
#
[VRoid_layer_hide layerID="VRoid" time=600 wait=true]

[endif]



[wait time=500]

[iscript]
	//必ず23時になる
	SISMES.savedata.time.hour = 23
	SISMES.updateTimeDisplay()

	//オートセーブ夜
	SISMES.saveRun(101)

[endscript]

;夜選択肢
*select
[cm]
[mask_off time=1000]

[glink_config show_time=300]

[glink color="btn_black commu_1"           size=24 width="200" x=840 y=310 target="osawari" text="妹の部屋へ行く"  cond="SISMES.savedata.status.hp >= 20]
[glink color="btn_black commu_1 disableUI" size=24 width="200" x=840 y=210 target="select"  text="妹の部屋へ行く"   cond="SISMES.savedata.status.hp < 20"]

[glink color="btn_black commu_3" size=24 width="200" x=840 y=410 target="neru" text="寝る"]


[button width=50 x=980  y=10 name="sismes_main_button" graphic="save.png"  target="save"]
[button width=50 x=1060 y=10 name="sismes_main_button" graphic="load.png"  target="load"]

[button width=50 x=1140  y=10 name="sismes_main_button" graphic="mode_easy.png"    target="mode"  cond="SISMES.savedata.mode===SISMES.modeRate[0]"]
[button width=50 x=1140  y=10 name="sismes_main_button" graphic="mode_normal.png"  target="mode"  cond="SISMES.savedata.mode===SISMES.modeRate[1]"]
[button width=50 x=1140  y=10 name="sismes_main_button" graphic="mode_hard.png"    target="mode"  cond="SISMES.savedata.mode===SISMES.modeRate[2]"]

[glink_config show_time=0]

[iscript]
	document.querySelector(".commu_1")?.insertAdjacentHTML("beforeend", "<div class='selectHP'>体力：20</div>");
[endscript]

[s][s][s][s][s]

*osawari

;信頼がマイナスかつピッキングなし
[jump target="not_osawari" cond="SISMES.savedata.status.shinrai < 0 && !SISMES.savedata.item['困った時のピッキング術']"]

[iscript]
	SISMES.addStatus("hp", -20);
	SISMES.updateStatusDisplay()
	tf.hasOnceItemDelete = true
	SISMES.savedata.goRoom++
[endscript]

[jump storage="osawari.ks" target="start"]

[s][s][s][s][s]

*not_osawari

[bg storage="rouka.png" time=500 position="center"]

#
[layopt layer="message" visible=true]

……妹の部屋には鍵がかかっている[p]

明日通販で何か使えるものがないか探してみるか[p]

[layopt layer="message" visible=false]

[jump target="neru"]

[s][s][s][s][s]

*neru

[iscript]
	SISMES.sis.wakeupEventState = 0
	tf.hasOnceItemDelete = false
[endscript]

[jump storage="main.ks" target="start"]

[s][s][s][s][s]




初日イベント
*firstDay

[VRoid_pose modelID="model1" pose="n/pose_05" emo="n/emo_pose_00_A, n/emo_Cheek_100" time=600 easing="ease" wait=false]

あ、そうだっ、おにいちゃん[r]
ちょっとあとで相談があるんだけど……

[glink text="なに？" target="firstDay2" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*firstDay2

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_A" time=600 easing="ease" wait=false]

おにいちゃんの都合のいい時で大丈夫だから！[r]
あとでちょっとお話させて？[p]



[iscript]
	SISMES.savedata.event.firstDay = true;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]



;前日目が覚めて、やめたとき
*wakeupEventState1

;[VRoid_emo modelID="model1" emoID="Sekimen1" emoval=0 diff=true time=600 easing="ease" wait=false]
;[VRoid_emo modelID="model1" emoID="Cheek" emoval=0 diff=true time=600 easing="ease" wait=false]

[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_B" time=600 wait=false]

（…………そういえば昨日の夜……）[p]

（おにいちゃん、わたしになにしてたの……？）[p]


[jump target="end_ohayou_event"]
[s][s][s][s][s]



;前日目が覚めて、続けたとき
*wakeupEventState2

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_A"]
[VRoid_springBone_reset modelID="model1"]

[VRoid_layer_show layerID="VRoid" time=600 wait=true]

[layopt layer="message" visible=true]
#妹
……おはよう[p]

[VRoid_emo modelID="model1" emo=""n/emo_pose_03_B" time=600 easing="ease" wait=false]

えっと……わたしは忘れるから[r]
昨日みたいなのはもうやめて欲しいな[p]

[jump target="end_ohayou_event"]
[s][s][s][s][s]


;信頼がマイナス
*minus

[layopt layer="message" visible=true]
……妹が部屋から出てこない[r]
鍵をかけて閉じこもっているようだ[p]

[jump target="end_ohayou_event"]
[s][s][s][s][s]



;初めて感じた（ゲージ1/3以上）
*hatsuKaikan
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_03_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]


（……なんか体がむずむずする……？）[p]

（なんだろう……？　熱あるのかな……？）[p]


[iscript]
	SISMES.savedata.ohaEvent.hatsuKaikan = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]


;初めて濡れた（ゲージ2/3以上）
*hatsuNure
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_03_A" time=600 easing="ease" wait=false]

（……？）[p]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_A, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

（やだっ……！　おパンツ濡れちゃってる……）[p]

[VRoid_emo modelID="model1" emo="n/emo_pose_03_B, n/emo_Sekimen_075" diff=true time=600 easing="ease" wait=false]

（お漏らしじゃ……ないよね？）[p]


[iscript]
	SISMES.savedata.ohaEvent.hatsuNure = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]



;初めてイった
*hatsuIki
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_A, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

（……気のせいかな。あたまがふわふわする……）[p]

（……寝汗でからだがベトベト……シャワー浴びよ……）[p]


[iscript]
	SISMES.savedata.ohaEvent.hatsuIki = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]

;初めて5回以上イった
*hatsuRenzokuIki
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_07_A, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

（……えっ！？[r]
なんでこんなにおパンツ濡れてるの……？？）[p]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_03_A, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

（うそ……お洗濯しなきゃ……）[p]

[iscript]
	SISMES.savedata.ohaEvent.hatsuRenzokuIki = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]

;初めて潮吹きした
*hatsuShiohuki
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_03_A, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

（……お布団凄く濡れちゃってた……）[p]

（どうしよう……おにいちゃんにバレないよね……？）[p]

[iscript]
	SISMES.savedata.ohaEvent.hatsuShiohuki = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]

;処女失った
*haka
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_B" time=600 easing="ease" wait=false]

（……いたっ！？）[p]

[VRoid_emo modelID="model1" emo="n/emo_pose_03_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

（……お腹の奥が痛い……？）[p]


（……うーん……生理そろそろだっけ？）[p]


[iscript]
	SISMES.savedata.ohaEvent.haka = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]

;初めて外に射精された
*hatsuSotodasi
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_03_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

（……あれっ？……わたしなにか臭う？）[p]


（……昨日ちゃんとお風呂入ったよね……？）[p]



[iscript]
	SISMES.savedata.ohaEvent.hatsuSotodasi = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]



;初めて口に射精された
*hatsuKuchiNakadashi
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_03_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

（……んっ、なにか喉に絡みつくような……）[p]


（……風邪かなぁ。うがいしよう……）[p]



[iscript]
	SISMES.savedata.ohaEvent.hatsuKuchiNakadashi = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]

;初めてアナルに射精された
*hatsuAnalNakadashi
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_07_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

（……！？　お尻からなにか垂れてるような……？）[p]

[VRoid_emo modelID="model1" emo="n/emo_pose_03_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

（……病気……？　とかじゃないよね？）[p]


[iscript]
	SISMES.savedata.ohaEvent.hatsuAnalNakadashi = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]

;初めて中出しされた
*hatsuNakadashi
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_07_A, n/emo_Sekimen_075" time=600 easing="ease" wait=false]


（……！！）[p]

[VRoid_emo modelID="model1" emo="n/emo_pose_03_A, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

（……どうしよう……[r]
おまたからなにか出てきた気がする）[p]

（……おりもの……？　にしては多い気がするけど……）[p]


[iscript]
	SISMES.savedata.ohaEvent.hatsuNakadashi = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]

;初めて受精した
*hatsuNinshin
[layopt layer="message" visible=false]
[wait time=1000]
[layopt layer="message" visible=true]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_00_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

（…………？）[p]

（……なにか変な感じがする……？）[p]

（お腹の中からあったかくなるような不思議な感じ……）[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_04_A, n/emo_Cheek_100" time=600 easing="ease" wait=false]

（……今日はなにかいいことがあるのかも？）[p]

[iscript]
	SISMES.savedata.ohaEvent.hatsuNinshin = 2;
[endscript]
[jump target="return_ohayou_event"]
[s][s][s][s][s]
