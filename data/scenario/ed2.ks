*start

[wait time=1000]

#
[layopt layer="message" visible=true]

…………[p]

[layopt layer="message" visible=false]

[wait time=1000]

[layopt layer="message" visible=true]

…………？　遠くから何か聴こえる気がする[p]
[layopt layer="message" visible=false]


[bg storage="rouka.png" time=500 position="center"]

[wait time=500]

#
[layopt layer="message" visible=true]

…………妹の部屋に鍵が掛かっていないようだ[p]

[layopt layer="message" visible=false]


[mask time=1000]

[bg storage="kuro.png" time=10]


[wait time=1000]

*ed_test

[VRoid_import_animation storage="072.vrma"]

[VRoid_pose modelID="model1" pose="n/pose_09" emo="n/emo_072_B"]
[VRoid_model_move modelID="model1" x=0.0532940792365601 y=0.6006618371926071 z=0.29454848906203823 rotX=-3.017338072868928 rotY=-3.6459536991289356 rotZ=-3.0594057827438004]
[VRoid_camera_move layerID=VRoid x=-0.2359372 y=0.6512402 z=1.3016674 rotX=-0.1753484 rotY=-0.1925549 rotZ=0.4]
[VRoid_background_visible layerID="VRoid" background=true]
[VRoid_obj3D_show objID="objID1"]
[VRoid_layer_show layerID="VRoid" time=10 wait=true]
[VRoid_material modelID=model1 materialName="N00_004_01_Tops_01_CLOTH (Instance)" visible=false]
[VRoid_material modelID=model1 materialName="N00_010_01_Onepiece_00_CLOTH (Instance)" visible=false]

[VRoid_animation modelID="model1" name="072" loop=true keep=true rate=2]

[clearfix]

[iscript]
	$("#sismes_time_display").css("display", "none")
	$("#sismes_status_display").css("display", "none")


	SISMES.lip_config({modelID: "model1", isSync: "true", buf: "2", micVolume:"4", aa: "0", Fcl_MTH_A: "0.6", Fcl_MTH_I: "0.4", Fcl_MTH_Sorrow: "0.5", Fcl_HA_Under_Short: "0.3", Fcl_EYE_Close: "0.08", browDownLeft: "0.2", browDownRight: "0.2"})

[endscript]

[VRoid_camera_move layerID=VRoid x=-0.2359372 y=1.1012402 z=1.3016674 rotX=-0.1753484 rotY=-0.1925549 rotZ=0.4 wait=false time=10000 easing="easeInOutSine"]

[free name="chara_name_area" layer="message0" ]
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=70 y=260]
[position layer="message0" width=500 height=136 top=230 left=40 margint=10 marginl=70 marginr=60 marginb=60 opacity=204 page="fore"]
[glyph line="nextpage.png" folder="data/image" fix=true left=480 top=306 ]



#妹
[layopt layer="message" visible=true]
んっ……うんっ……あぁっ……[r]
ぅんっ……ふぅっ……っ！

[fadeinse storage="koui/koui_b_1.wav" buf=4 loop=true time=10000]
[fadeinse storage="h/aegi_mouth0_level1.wav" buf=2 loop=true time=10000]

[mask_off time=9000]
[wait time=2000]
[p]

[playse storage="koui/koui_b_2.wav" buf=4 loop=true]
[playse storage="h/aegi_mouth0_level2.wav" buf=2 loop=true]

[VRoid_emo modelID="model1" emo="n/emo_072_C" time=1200 easing="ease" wait=false]
[VRoid_animation modelID="model1" name="072" loop=true keep=true rate=3 fadeIn=300 resetHips=false]
おにいちゃん……？　あっ……やだっ……ぅぁっ……んっ……
[p]

[playse storage="koui/koui_b_3.wav" buf=4 loop=true]
[playse storage="h/aegi_mouth0_level3.wav" buf=2 loop=true]

[VRoid_animation modelID="model1" name="072" loop=true keep=true rate=4 fadeIn=300 resetHips=false]
みないで……ぅんっ……はぁっ……いやっ……イっ……っ！
[p]

[playse storage="h/iki_A_1.wav" buf=2 loop=false]

いやっ……イっちゃう……あぁぁぁぁぁぁぁぁぁ…………っ！！
[VRoid_emo modelID="model1" emo="n/emo_072_A" time=400 easing="ease" wait=false]
[iscript]
	splash(4)
	TYRANO.kag.ftag.startTag("playbgm", {storage: "koui/shio1.wav", buf: "6", stop: "true", target: "se", loop: "false"});

	function splash(maxCount) {
		return new Promise(resolve => {

			let count = 0;
			const interval = 200;
			
			let opt

			const currentStyle = SISMES.data.currentStyle
			
			opt = {posX: 0, posY: -0.06, posZ: -0.038, rotX: -1, rotY: -0.5, rotZ: 1.5, speed:0.4, spread:0.02, gravity:1.5, viscosity:0.8, postSpread:0.5}

			VROID.shio(opt);
			count++;

			const intervalID = setInterval(() => {

				VROID.shio(opt);

				count++;

				if (count >= maxCount) {
					clearInterval(intervalID);
					resolve();
				}

			}, interval);

		});
	}
[endscript]
[VRoid_animation modelID="model1" name="072" loop=3 keep=true rate=2 resetHips=false fadeLoop=100 fadeIn=100 startTime=1 endTime=2]
[VRoid_animation modelID="model1" name="072" loop=false keep=true rate=1 resetHips=false fadeLoop=100 fadeIn=100 startTime=1 endTime=1.5]
[fadeoutse buf="4" time=1000]
[wait time=400]
[playse storage="h/iki_A_2.wav" buf=2 loop=false]
[wait time=100]
[VRoid_animation modelID="model1" name="072" loop=false keep=true rate=1 resetHips=false startTime=1.5]
[VRoid_animation modelID="model1" name="072" loop=false keep=true rate=1 resetHips=false endTime=0.5]

[iscript]
	splash(6)
	TYRANO.kag.ftag.startTag("playbgm", {storage: "koui/shio3.wav", buf: "6", stop: "true", target: "se", loop: "false"});

	function splash(maxCount) {
		return new Promise(resolve => {

			let count = 0;
			const interval = 200;
			
			let opt

			const currentStyle = SISMES.data.currentStyle
			
			opt = {posX: 0, posY: -0.06, posZ: -0.038, rotX: -1, rotY: -0.5, rotZ: 1.5, speed:0.4, spread:0.02, gravity:1.5, viscosity:0.8, postSpread:0.5}

			VROID.shio(opt);
			count++;

			const intervalID = setInterval(() => {

				VROID.shio(opt);

				count++;

				if (count >= maxCount) {
					clearInterval(intervalID);
					resolve();
				}

			}, interval);

		});
	}
[endscript]
[playse storage="koui/koui_b_2.wav" buf=4 loop=true]
[VRoid_animation modelID="model1" name="072" loop=2 keep=true rate=2 resetHips=false fadeLoop=100 fadeIn=100 startTime=1 endTime=2]
[VRoid_animation modelID="model1" name="072" loop=false keep=true rate=0.5 resetHips=false fadeLoop=100 fadeIn=100 startTime=1 endTime=1.5]
[fadeoutse buf="4" time=1000]
[wait time=1000]
[VRoid_animation modelID="model1" name="072" loop=false keep=true rate=0.5 resetHips=false startTime=1.5]
[VRoid_animation modelID="model1" name="072" loop=false keep=true rate=0.5 resetHips=false endTime=0.5]

[iscript]
	splash(12)
	TYRANO.kag.ftag.startTag("playbgm", {storage: "koui/shio2.wav", buf: "6", stop: "true", target: "se", loop: "false"});

	function splash(maxCount) {
		return new Promise(resolve => {

			let count = 0;
			const interval = 200;
			
			let opt

			const currentStyle = SISMES.data.currentStyle
			
			opt = {posX: 0, posY: -0.06, posZ: -0.038, rotX: -1, rotY: -0.5, rotZ: 1.5, speed:0.4, spread:0.02, gravity:1.5, viscosity:0.8, postSpread:0.5}

			VROID.shio(opt);
			count++;

			const intervalID = setInterval(() => {

				VROID.shio(opt);

				count++;

				if (count >= maxCount) {
					clearInterval(intervalID);
					resolve();
				}

			}, interval);

		});
	}
	
		SISMES.lip_config({modelID: "model1", isSync: "true", buf: "2", micVolume:"4", aa: "0", Fcl_MTH_A: "0.2", Fcl_MTH_I: "0.2", Fcl_MTH_Sorrow: "0.2", Fcl_HA_Under_Short: "0.3", Fcl_EYE_Close: "0.04", browDownLeft: "0.1", browDownRight: "0.1"})

[endscript]
[playse storage="koui/koui_b_2.wav" buf=4 loop=true]
[VRoid_animation modelID="model1" name="072" loop=false keep=true rate=2 resetHips=false fadeLoop=100 fadeIn=100 startTime=1 endTime=1.5]
[fadeoutse buf="4" time=1000]
[wait time=2000]
[VRoid_animation modelID="model1" name="072" loop=false keep=true rate=0.5 resetHips=false startTime=1.5]
[VRoid_animation modelID="model1" name="072" loop=false keep=true rate=0.5 resetHips=false endTime=0.5 wait=false]

[playse storage="h/neiki_mouth0_level3.wav" buf=2 loop=true]

[p]
[layopt layer="message" visible=false]

[VRoid_emo modelID="model1" emo="n/emo_072_B" time=3000 easing="ease" wait=false]

[wait time=1000]

[layopt layer="message" visible=true]
あぁぁ……ぃゃ……いやぁ……[r]
おにいちゃん……なんでぇ……っ

[wait time=1000]

[fadeoutse buf="2" time=6000]
[mask time=5000]

[wait time=3000]
[VRoid_layer_hide layerID="VRoid"]
[VRoid_stop_animation modelID="model1"]
[layopt layer="message" visible=false]
[cm]
[iscript]
	tf.edType = 2
[endscript]

[stopse buf="2"]
[stopse buf="4"]


[jump storage="ed.ks" target="end_ed"]
[s][s][s][s][s][s]
