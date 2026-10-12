;目が覚めたとき
*wakeup

;目が覚めたときの体勢によってカメラを変更
[VRoid_camera_move cameraID="camera1" x=-0.0041669 y=1.1768155 z=-0.0320912 rotX=-1.3067736 rotY=0.0529441  rotZ=0.1933113  time=2000 wait=false cond="SISMES.data.currentStyle === 0"]
[VRoid_camera_move cameraID="camera1" x=-0.3357683 y=1.1178252 z=0.0462275  rotX=-1.0622417 rotY=-0.5016342 rotZ=-0.7117553 time=2000 wait=false cond="SISMES.data.currentStyle === 1"]
[VRoid_camera_move cameraID="camera1" x=0.438109 y=0.7917364 z=-0.3114426 rotX=-2.2729919 rotY=1.1627797 rotZ=2.3154785     time=2000 wait=false cond="SISMES.data.currentStyle === 2"]
[VRoid_camera_move cameraID="camera1" x=-0.0041669 y=1.1768155 z=-0.0320912 rotX=-1.3067736 rotY=0.0529441 rotZ=0.1933113   time=2000 wait=false cond="SISMES.data.currentStyle === 3"]

;体勢によって目線の変更
[VRoid_emo modelID="model1" emoID="lookLeft" emoval=1 time=3000 diff=true cond="SISMES.data.currentStyle === 1" wait=false]
[VRoid_emo modelID="model1" emoID="lookRight" emoval=1 time=3000 diff=true cond="SISMES.data.currentStyle === 2" wait=false]


[layopt layer="message" visible=true]

[if exp="SISMES.savedata.status.shinrai >= 0"]

	……おにいちゃん…………？[p]

	[iscript]
		tf.result = SISMES.wakeupShinraiDownEvent()
		if (tf.result === 0) {
			SISMES.sis.wakeupEventState = 1
		} else {
			SISMES.sis.wakeupEventState = 2
		}
	[endscript]

	[if exp="tf.result === 1"]

	[VRoid_emo modelID="model1" emoID="Fcl_ALL_Sorrow" emoval=0.35 time=600 easing="ease" wait=false diff=true]
	[VRoid_emo modelID="model1" emoID="lookDown" emoval=1 time=600 easing="ease" wait=false diff=true]

	うそっ……どうしてわたし、裸に……？

	[elsif exp="tf.result === 2"]

	[VRoid_emo modelID="model1" emoID="Fcl_ALL_Sorrow" emoval=0.35 time=600 easing="ease" wait=false diff=true]
	[VRoid_emo modelID="model1" emoID="lookDown" emoval=1 time=600 easing="ease" wait=false diff=true]

	……なにこれ……いやぁ……っ

	[elsif exp="tf.result === 3"]

	[VRoid_emo modelID="model1" emoID="Fcl_ALL_Sorrow" emoval=0.35 time=600 easing="ease" wait=false diff=true]
	[VRoid_emo modelID="model1" emoID="lookDown" emoval=1 time=600 easing="ease" wait=false diff=true]

	……なんでこんな格好させられてるの……？

	[elsif exp="tf.result === 4"]

	[VRoid_emo modelID="model1" emoID="Fcl_ALL_Sorrow" emoval=0.4 time=600 easing="ease" wait=false diff=true]
	[VRoid_emo modelID="model1" emoID="lookDown" emoval=1 time=600 easing="ease" wait=false diff=true]


	あっ……なんで……？[r]
	……ぁっ……ぅんっ……からだが……へんだよぉ……

	[else]

	[VRoid_emo modelID="model1" emoID="Fcl_ALL_Sorrow" emoval=0.25 time=600 easing="ease" wait=false diff=true]
	……えっ……？　なに…してる……の？

	[endif]

[else]

	………………[p]

	[iscript]
		tf.result = SISMES.wakeupShinraiDownEvent()
	[endscript]

	[VRoid_emo modelID="model1" emoID="Fcl_ALL_Sorrow" emoval=0.3 time=600 easing="ease" wait=false diff=true]
	
	[if exp="tf.result === 1"]
	……どうして……？　おにいちゃん……[r]
	こんなの……やだぉ……

	[elsif exp="tf.result === 2"]
	……おねがい……もうやめてよぉ……
	兄妹で……ダメだよ……っ

	[elsif exp="tf.result === 3"]
	……なんで……なんで……？[r]
	やだ……おにいちゃん……やだよぉ……


	[elsif exp="tf.result === 4"]
	……いやだっ……いやだよぉ……[r]
	もうこんなの……いやぁ……っ

	[else]
	……うそだよね？[r]
	おにいちゃん……なんで……？

	[endif]

[endif]

[iscript]
	//これをしないとglinkが押せない
	SISMES.layerFreeStyle.pointerEvents = ""
	$(".selectEvent").remove()
[endscript]

*select_button

[glink color="btn_black" name="selectEvent selectTudukeru"             size=24 width=300 x=890 y=240 target="tudukeru"      text="続ける" exp="SISMES.layerFreeStyle.pointerEvents = 'none'" cond="SISMES.savedata.status.risei <= 50" cm=false]
[glink color="btn_black" name="selectEvent selectTudukeru riseiNoneUI" size=24 width=300 x=890 y=240 target="select_button" text="続ける"                                                    cond="SISMES.savedata.status.risei >  50" cm=false]

[glink color="btn_black" name="selectEvent" size=24 width=300 x=890 y=380 target="yameru" text="やめる" exp="SISMES.layerFreeStyle.pointerEvents = 'none'" cm=false]

[iscript]
	if (SISMES.savedata.status.risei > 50) $(".selectTudukeru").append("<div class='selectInfo'>※要：理性50以下</div>")
[endscript]

[s][s][s][s][s][s][s][s][s][s]


*tudukeru
[iscript]
	SISMES.sis.wakeupEventState = 2
	SISMES.sis.wakeupSonyuFlg = 2
	$(".selectEvent").remove()
[endscript]

[layopt layer="message" visible=false]
[er]

[VRoid_emo modelID="model1" emoID="lookLeft" emoval=0 time=3000 diff=true cond="SISMES.data.currentStyle === 1" wait=false]
[VRoid_emo modelID="model1" emoID="lookRight" emoval=0 time=3000 diff=true cond="SISMES.data.currentStyle === 2" wait=false]
[VRoid_emo modelID="model1" emoID="Fcl_ALL_Sorrow" emoval=0 time=3000 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="Fcl_BRW_Surprised" emoval=0 time=3000 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="Fcl_EYE_Surprised" emoval=0 time=3000 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="lookDown" emoval=0 time=3000 easing="ease" wait=false diff=true]

[iscript]
	SISMES.timer.isEndEvent = true

	//変更したカメラによってコントロールを更新しておく
	const target = [
		{x: -0.0588394249326119, y: 0.18088481025178582, z: -0.30132467380014266},
		{x: 0.17449904552243767, y: 0.30514987792525744, z: -0.40680864655053506},
		{x: -0.4459137959111083, y: 0.4999999999999999, z: -0.06461944760263541},
		{x: -0.0588394249326119, y: 0.18088481025178582, z: -0.30132467380014266},
	]

	SISMES.controls.target.copy(target[SISMES.data.currentStyle])
[endscript]
[jump storage="osawari.ks" target="stop_event"]
[s][s][s][s][s][s][s][s][s][s]



*yameru
[iscript]
	//SISMES.sis.wakeupEventState = 1
	SISMES.sis.wakeupSonyuFlg = 1
	$(".selectEvent").remove()
[endscript]

[layopt layer="message" visible=false]
[er]
;次の日へ行く処理を追加
[jump target="endEvent"]
[s][s][s][s][s][s][s][s][s][s]




*timeup

[layopt layer="message" visible=true]

……そろそろ寝ないと。[p]

[layopt layer="message" visible=false]

[jump target="endEvent"]

[s][s][s][s][s][s][s][s][s][s]




;目が覚めている時の挿入時
*wakeup_sounyu

[VRoid_emo modelID="model1" emoID="Fcl_BRW_Surprised" emoval=0.5 time=600 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="Fcl_EYE_Surprised" emoval=0.5 time=600 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="lookDown" emoval=1 time=600 easing="ease" wait=false diff=true]


[layopt layer="message" visible=true]

……だっ……だめぇ……っ！[p]

[VRoid_emo modelID="model1" emoID="Fcl_BRW_Surprised" emoval=0.35 time=600 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="Fcl_EYE_Surprised" emoval=0.35 time=600 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="Fcl_ALL_Sorrow" emoval=0.5 time=600 easing="ease" wait=false diff=true]



……これ以上は……兄妹に戻れなくなっちゃうよ……。

*select_button2
[iscript]
	//これをしないとglinkが押せない
	SISMES.layerFreeStyle.pointerEvents = ""
	$(".selectEvent").remove()
[endscript]

[glink color="btn_black" name="selectEvent selectTudukeru"             size=24 width=300 x=890 y=240 target="tudukeru2"      text="…………" exp="SISMES.layerFreeStyle.pointerEvents = 'none'" cond="SISMES.savedata.status.risei <= 0" cm=false]
[glink color="btn_black" name="selectEvent selectTudukeru riseiNoneUI" size=24 width=300 x=890 y=240 target="select_button2" text="…………"                                                    cond="SISMES.savedata.status.risei >  0" cm=false]

[glink color="btn_black" name="selectEvent" size=24 width=300 x=890 y=380 target="yameru2" text="やめる" exp="SISMES.layerFreeStyle.pointerEvents = 'none'" cm=false]

[iscript]
	if (SISMES.savedata.status.risei > 0) $(".selectTudukeru").append("<div class='selectInfo'>※要：理性0</div>")
[endscript]
[s][s][s][s][s][s][s][s][s][s]


*tudukeru2
[layopt layer="message" visible=false]
[er]
[VRoid_emo modelID="model1" emoID="Fcl_BRW_Surprised" emoval=0 time=2000 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="Fcl_EYE_Surprised" emoval=0 time=2000 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="lookDown" emoval=0 time=2000 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="Fcl_ALL_Sorrow" emoval=0 time=2000 easing="ease" wait=false diff=true]

[iscript]
	$(".selectEvent").remove()
	SISMES.sis.wakeupSonyuFlg = 3
	SISMES.timer.isEndEvent = true
[endscript]
[jump storage="osawari.ks" target="stop_event"]
[s][s][s][s][s][s][s][s][s][s]


*yameru2
[layopt layer="message" visible=false]
[er]
[VRoid_emo modelID="model1" emoID="Fcl_BRW_Surprised" emoval=0 time=2000 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="Fcl_EYE_Surprised" emoval=0 time=2000 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="lookDown" emoval=0 time=2000 easing="ease" wait=false diff=true]
[VRoid_emo modelID="model1" emoID="sad" emoval=0 time=2000 easing="ease" wait=false diff=true]

[iscript]
	$(".selectEvent").remove()
	SISMES.timer.isEndEvent = true
[endscript]
[jump storage="osawari.ks" target="stop_event"]
[s][s][s][s][s][s][s][s][s][s]



;終了処理
*endEvent
[wait time=500]
[mask time=1000]

[fadeoutse buf=1 time=1000]
[fadeoutse buf=2 time=1000]
[fadeoutse buf=3 time=1000]
[fadeoutse buf=4 time=1000]
[fadeoutse buf=5 time=1000]
[fadeoutse buf=6 time=1000]

[wait time=500]

[cm]
[stopse buf=1]
[stopse buf=2]
[stopse buf=3]
[stopse buf=4]
[stopse buf=5]
[stopse buf=6]


[iscript]
	SISMES.timer.isEndEvent = true
	SISMES.timerOsawariEnd()
[endscript]

;フリーモード時はタイトルへ
[jump storage="title.ks" target="start" cond="sf.savedata.freeMode"]


;次の日へ
[jump storage="main.ks" target="start"]
[s][s][s][s][s][s][s][s][s][s]
