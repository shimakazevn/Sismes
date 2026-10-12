[nowait]
データの読み込み中...

[layopt layer=0 visible=true]
[layopt layer=1 visible=true]

[plugin name=ReloadHide]
[plugin name=vrm displayLoading="false"]
[plugin name=custom_ruby]

[plugin name=ex]

[iscript]
	$("#tyrano_base").append("<div id='fps_tmp' class='ui-draggable'></div>")

	//セーブページ保存
	if (sf.savepage === undefined) sf.savepage = 1

	//セーブスロット作成（0と101はオートセーブ用。朝、夜。　1～100まで通常セーブスロット）
	if (sf.save === undefined) sf.save = new Array(100)

	//コンフィグデータの復元
	sf.con = $.extend(true, {}, SISMES.initConfig, sf.con);

	TG.config.chSpeed = String(sf.con.msg);

[endscript]

;ゲームSE　今回は使ってないけど値だけ残す
[seopt buf=0 volume="&sf.con.se"]

;射精
[seopt buf=1 volume="&sf.con.koui"]

;口
[seopt buf=3 volume="&sf.con.koui"]

;おまんこ
[seopt buf=4 volume="&sf.con.koui"]

;あなる
[seopt buf=5 volume="&sf.con.koui"]

;潮吹き
[seopt buf=6 volume="&sf.con.koui"]

;ボイス
[seopt buf=2 volume="&sf.con.koe"]



;ポーズのインポート
[VRoid_import_pose storage="osawari_C_mnk2.json, osawari_C_mnk1.json, osawari_C_mnk1_2.json, osawari_C_cli.json, osawari_R_muneL_1.json, osawari_R_muneL_2.json, osawari_L_muneR_1.json, osawari_L_muneR_2.json, osawari_L_muneR2_1.json, osawari_L_muneR2_2.json, osawari_R_muneL2_1.json, osawari_R_muneL2_2.json, osawari_L_muneR_sync1.json, osawari_L_muneR_sync2.json, osawari_R_muneL_sync1.json, osawari_R_muneL_sync2.json"]
[VRoid_import_pose storage="osawari_bero_1.json, osawari_bero_2.json, osawari_bero_3.json, osawari_C_mouth.json"]


[VRoid_import_pose storage="n/pose_00.json,n/pose_01.json,n/pose_02.json,n/pose_03.json,n/pose_04.json,n/pose_05.json,n/pose_06.json,n/pose_09.json"]
[VRoid_import_emotion storage="n/emo_pose_00_A.json,n/emo_pose_00_B.json,n/emo_pose_01_A.json,n/emo_pose_01_B.json,n/emo_pose_02_A.json,n/emo_pose_02_B.json,n/emo_pose_03_A.json,n/emo_pose_03_B.json,n/emo_pose_03_C.json,n/emo_pose_04_A.json,n/emo_pose_04_B.json,n/emo_pose_05_A.json,n/emo_pose_06_A.json,n/emo_pose_07_A.json,n/emo_pose_09_A.json,n/emo_pose_99_A.json"]
[VRoid_import_emotion storage="n/emo_Cheek_050.json,n/emo_Cheek_075.json,n/emo_Cheek_100.json,n/emo_Sekimen_050.json,n/emo_Sekimen_075.json,n/emo_Sekimen_100.json,n/emo_tears_090.json,n/emo_tears_100.json,n/emo_Highlight_Hide.json,n/emo_072_A.json,n/emo_072_B.json,n/emo_072_C.json"]


;ambient & 60FPS制限
;[VRoid_light_new layerID="VRoid" lightID="light1" type=ambient]
;[VRoid_light_new layerID="VRoid" lightID="light1" type=point]
[VRoid_light_new layerID="VRoid" lightID="light1"]
[VRoid_camera_new cameraID="camera1" far=10 z=-10]
;[VRoid_layer_new layerID="VRoid" lightID="light1" cameraID="camera1" layer=1 visible=false width=640 height=720 left=320 top=0 mosaic=true quality="&sf.con.graphic" maxFPS="&sf.con.fps" screenshot=false]
[VRoid_layer_new layerID="VRoid" lightID="light1" cameraID="camera1" layer=1 visible=true width=1280 height=720 left=0 top=0 mosaic=true quality="&sf.con.graphic" maxFPS="&sf.con.fps" screenshot=false]

;ライトの位置
[VRoid_light_move lightID="light1" x=0 y=3 z=2]


[VRoid_load modelID="model1" storage="yui.vrm"]
[VRoid_add layerID="VRoid" modelID="model1" lookingCamera=false visible=true]

[VRoid_load modelID="bero" storage="beroMan.vrm" helper=false renderOrder=500 alphaToCoverage=false]
[VRoid_load modelID="chin" storage="ChinMan.vrm" helper=false renderOrder=500 alphaToCoverage=false]
[VRoid_load modelID="L" storage="handMan_L.vrm" helper=false renderOrder=500 alphaToCoverage=false]
[VRoid_load modelID="R" storage="handMan_R.vrm" helper=false renderOrder=500 alphaToCoverage=false]

[VRoid_load modelID="danmen" storage="danmen.vrm" helper=true alphaToCoverage=false]



[VRoid_add layerID="VRoid" visible=true modelID="bero" lookingCamera=false waitingAnimation=false pose=pose9001]
[VRoid_add layerID="VRoid" visible=true modelID="chin" lookingCamera=false waitingAnimation=false pose=pose9001]
[VRoid_add layerID="VRoid" visible=true modelID="L"    lookingCamera=false waitingAnimation=false pose=pose9001]
[VRoid_add layerID="VRoid" visible=true modelID="R"    lookingCamera=false waitingAnimation=false pose=pose9001]
[VRoid_add layerID="VRoid" visible=true modelID="danmen"    lookingCamera=false waitingAnimation=false pose=pose9001]

[VRoid_blink_config enable=false modelID="bero"]
[VRoid_blink_config enable=false modelID="chin"]
[VRoid_blink_config enable=false modelID="L"   ]
[VRoid_blink_config enable=false modelID="R"   ]
[VRoid_blink_config enable=false modelID="danmen"   ]


[VRoid_import_blinkSetting storage="VRoid.json" modelID="model1"]


[VRoid_img_add layerID="VRoid" imgID="jyusei_anim" visible=false storage="./data/others/img/jyusei_trim.png" x=0.036 y=1.5 z=1000.025 rotX=-1.5592443 rotY=3.101328453589793 rotZ=-1.8 scaleX=0 scaleY=0 scaleZ=0 side="BackSide"]

[VRoid_material modelID="model1" materialName="M_Uerus"  mosaic=true]
[VRoid_material modelID="model1" materialName="M_Pussy"  mosaic=true]
[VRoid_material modelID="model1" materialName="M_Rectum"  mosaic=true]

[VRoid_mosaicLayer_config layerID="VRoid" pixelSize=128 ratio=0.2 autoAdjust=true]

;near=0.01だとまんぐり時にシャツがチラつく カメラ切り替え時に再設定している
[VRoid_camera_new cameraID="camera2" far=2 near=0.01]
[VRoid_viewport_new layerID="VRoid" viewportID="viewport1" cameraID="camera2" width=400 height=225 left=10 top=60 visible=false]

;エフェクト
;[VRoid_effect layerID="VRoid" name="UnrealBloom" strength=0.05 radius=0.5]
;[VRoid_effect layerID="VRoid" viewportID="viewport1" name="UnrealBloom" strength=0.05 radius=0.5]

[VRoid_layer_hide layerID="VRoid"]

[VRoid_hide modelID="bero"]
[VRoid_hide modelID="chin"]
[VRoid_hide modelID="L"   ]
[VRoid_hide modelID="R"   ]
;[VRoid_hide modelID="danmen"   ]

;断面制御
[VRoid_model_move modelID="danmen" z=1000]
[loadjs storage="danmen.js"]

[loadjs storage="chin.js"]
[loadjs storage="shio.js"]

[iscript]
	const VRoidThree = VRoid.three

	VRoidThree.lowPerformanceSetting(false)
	VRoidThree.danmen(true)
	
	//ツールの透過度適用
	VRoidThree.emotion("L", null, 0, null, null, null, null, true, "LeftHandHide", sf.con.opa)
	VRoidThree.emotion("R", null, 0, null, null, null, null, true, "RightHandHide", sf.con.opa)
	VRoidThree.emotion("bero", null, 0, null, null, null, null, true, "BeroHide", sf.con.opa)
	VRoidThree.emotion("chin", null, 0, null, null, null, null, true, "ChinHide", sf.con.opa)
	
[endscript]
[VRoid_emo modelID="danmen" emoID="Base_Wide" emoval=1 diff=false wait=true]
[VRoid_emo modelID="danmen" emoID="Base_Close1" emoval=0.1 diff=true wait=true]
[VRoid_emo modelID="danmen" emoID="chinpo_down" emoval=0.1 diff=true wait=true]
[VRoid_emo modelID="danmen" emoID="Eki_Hide" emoval=1 diff=true wait=true]

;H用
[VRoid_import_pose storage="h/c_base.json, h/s_base.json, h/b_base.json, h/m_base.json"]
[VRoid_import_emotion storage="h/default.json, h/level0.json, h/level1.json, h/level2.json, h/level3.json"]
[VRoid_import_emotion storage="h/wakeup0.json, h/wakeup1.json, h/wakeup2.json, h/wakeup3.json"]


;[VRoid_import_pose storage="base.json, testPose.json"]


;ベッド
[VRoid_obj3D_load storage="bed.glb" forceMaterial=toon]
[VRoid_obj3D_add layerID="VRoid" name="bed" objID="objID1" scale=0.6 visible=false]

[VRoid_obj3D_load storage="pants.glb" forceMaterial=toon]
[VRoid_obj3D_add layerID="VRoid" name="pants" objID="objID2" scale=0.8 visible=false x=0.3066528803882479 y=0.6184312563679553 z=-0.2344683864320659 rotX=0 rotY=-0.5257003844931797 rotZ=0]

[VRoid_background_load layerID="VRoid" storage="back.png"]


;======================================================================
;おさわりコライダー設定
;ここで設定したパラメーターの一部はosawari.jsで上書きされるので注意！
;======================================================================
[VRoid_osawari_add  modelID="model1" rawBoneName="J_Sec_Hair1_09" pointerLock=true onOpacity=0.5 onCursor="grab" dragCursor="none" radius=0.05 x=-0.02 y=0.02 opacity=0 dragXposX=0.001 dragYposY=0.001 followRate=10]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_09" syncBoneName="J_Sec_Hair1_07" dragXposX=0.0004 dragYposY=0.0004]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_09" syncBoneName="J_Sec_Hair1_03" dragXposX=0.001 dragYposY=0.001]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_09" syncBoneName="J_Sec_Hair1_06" dragXposX=0.0002 dragYposY=0.0002]


[VRoid_osawari_add  modelID="model1" rawBoneName="J_Sec_Hair1_08" pointerLock=true onOpacity=0.5 onCursor="grab" dragCursor="none" radius=0.05 x=0.02  y=0.02 opacity=0 dragXposX=0.001 dragYposY=0.001 followRate=10]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_08" syncBoneName="J_Sec_Hair1_07" dragXposX=0.0004 dragYposY=0.0004]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_08" syncBoneName="J_Sec_Hair1_02" dragXposX=0.001 dragYposY=0.001]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_08" syncBoneName="J_Sec_Hair1_04" dragXposX=0.0002 dragYposY=0.0002]

;後ろ髪
[VRoid_osawari_add  modelID="model1" rawBoneName="J_Sec_Hair1_06" pointerLock=true onOpacity=0.5 onCursor="grab" dragCursor="none" radius=0.05 x=0.02  y=0.02 opacity=0 dragXposX=0.001 dragYposY=0.001 followRate=10]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_06" syncBoneName="J_Sec_Hair1_03" dragXposX=0.001 dragYposY=0.001]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_06" syncBoneName="J_Sec_Hair1_05" dragXposX=0.001 dragYposY=0.001]

[VRoid_osawari_add  modelID="model1" rawBoneName="J_Sec_Hair1_04" pointerLock=true onOpacity=0.5 onCursor="grab" dragCursor="none" radius=0.05 x=0.02  y=0.02 opacity=0 dragXposX=0.001 dragYposY=0.001 followRate=10]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_04" syncBoneName="J_Sec_Hair1_02" dragXposX=0.001 dragYposY=0.001]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_04" syncBoneName="J_Sec_Hair1_05" dragXposX=0.001 dragYposY=0.001]

[VRoid_osawari_add  modelID="model1" rawBoneName="J_Sec_Hair1_05" pointerLock=true onOpacity=0.5 onCursor="grab" dragCursor="none" radius=0.05 x=0.02  y=0.02 opacity=0 dragXposX=0.001 dragYposY=0.001 followRate=10]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_05" syncBoneName="J_Sec_Hair1_04" dragXposX=0.001 dragYposY=0.001]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Hair1_05" syncBoneName="J_Sec_Hair1_06" dragXposX=0.001 dragYposY=0.001]




[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_L_Bust1" pointerLock=true onOpacity=0.5 onCursor="grab"  dragCursor="none" radius=0.05 opacity=0 dragXposX=0.01 dragYposY=0.01]
[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_R_Bust1" pointerLock=true onOpacity=0.5 onCursor="grab"  dragCursor="none" radius=0.05 opacity=0 dragXposX=0.01 dragYposY=0.01]

[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_L_Bust2" pointerLock=true onOpacity=0.5 onCursor="grabbing"  dragCursor="none" radius=0.025 opacity=0 dragXposX=0.05 dragYposY=0.01 dragYposZ=0.08 followRate=0.15]
[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_R_Bust2" pointerLock=true onOpacity=0.5 onCursor="grabbing"  dragCursor="none" radius=0.025 opacity=0 dragXposX=0.05 dragYposY=0.01 dragYposZ=0.08 followRate=0.15]


;ナイズリ用
[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_C_UpperChest_Center" pointerLock=true onOpacity=0.5 onCursor="grabbing"  dragCursor="none" z=-0.05 rotX=0.2 radius=0.04 opacity=0 type="capsule"]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_UpperChest_Center" syncBoneName="J_Bip_C_UpperChest" dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_UpperChest_Center" syncBoneName="J_Sec_L_Bust1"      dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_UpperChest_Center" syncBoneName="J_Sec_R_Bust1"      dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_UpperChest_Center" syncBoneName="J_Bip_C_UpperChest" dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_UpperChest_Center" syncBoneName="J_Bip_C_Neck"       dragXposX=0 dragYposY=0]

;パンツずらし
[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_Shorts_Slide_Point" pointerLock=true onOpacity=0.5 onCursor="grabbing"  dragCursor="none" x=-0.03 radius=0.04 height=0.08 opacity=0 type="capsule" rotX=1.57 keep=true priority=11]


;Tシャツめくり
[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_Shirt_Slide_Point" pointerLock=true onOpacity=0.5 onCursor="grabbing"  dragCursor="none" radius=0.03 height=0.05 opacity=0 type="capsule" rotZ=1.57 scaleX=1.8 scaleY=1.8 dragXposX=0 keep=true priority=11]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Shirt_Slide_Point" syncBoneName="J_Sec_R_TopsUpperLegFront_01" dragXposX=0 dragYposY=0.05 dragYposZ=0.01 thresholdMinY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Shirt_Slide_Point" syncBoneName="J_Sec_L_TopsUpperLegFront_01" dragXposX=0 dragYposY=0.05 dragYposZ=0.01 thresholdMinY=0]

[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Shirt_Slide_Point" syncBoneName="J_Sec_R_TopsUpperLegSide_01" dragXposX=0 dragYposY=0.05 thresholdMinY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Shirt_Slide_Point" syncBoneName="J_Sec_L_TopsUpperLegSide_01" dragXposX=0 dragYposY=0.05 thresholdMinY=0]

[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Shirt_Slide_Point" syncBoneName="J_Sec_R_TopsUpperLegBack_01" dragXposX=0 dragYposY=0.05 dragYposZ=0.01 thresholdMinY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_Shirt_Slide_Point" syncBoneName="J_Sec_L_TopsUpperLegBack_01" dragXposX=0 dragYposY=0.05 dragYposZ=0.01 thresholdMinY=0]



;[VRoid_osawari_add modelID="model1" rawBoneName="J_Bip_C_Hips" pointerLock=true g=0.5 b=0.5 keep=false followRate=0  dragXposX=0.1 dragYposY=0.2 dragYposZ=0.1 onOpacity=0.8]


[VRoid_osawari_add modelID="model1" rawBoneName="J_Bip_C_Mouth" pointerLock=true onOpacity=0.5 followRate=0 opacity=0 radius=0.025]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Bip_C_Mouth" syncBoneName="J_Bip_C_UpperChest" dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Bip_C_Mouth" syncBoneName="J_Bip_C_Neck"       dragXposX=0 dragYposY=0]



[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_C_Cli" pointerLock=true onOpacity=0.5 followRate=0 opacity=0 radius=0.025]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_Cli" syncBoneName="J_Bip_C_Hips"       dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_Cli" syncBoneName="J_Bip_C_UpperChest" dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_Cli" syncBoneName="J_Bip_C_Neck"       dragXposX=0 dragYposY=0]

[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_C_Mnk" pointerLock=true onOpacity=0.5 followRate=0  opacity=0 radius=0.025]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_Mnk" syncBoneName="J_Bip_C_Hips"       dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_Mnk" syncBoneName="J_Bip_C_UpperChest" dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_Mnk" syncBoneName="J_Bip_C_Neck"       dragXposX=0 dragYposY=0]

[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_C_Anal" pointerLock=true onOpacity=0.5 followRate=0 opacity=0 radius=0.025]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_Anal" syncBoneName="J_Bip_C_Hips"       dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_Anal" syncBoneName="J_Bip_C_UpperChest" dragXposX=0 dragYposY=0]
[VRoid_osawari_sync modelID="model1" rawBoneName="J_Sec_C_Anal" syncBoneName="J_Bip_C_Neck"       dragXposX=0 dragYposY=0]


[VRoid_osawari_add  modelID="model1" rawBoneName="J_Bip_L_UpperLeg" pointerLock=true onOpacity=0.5 followRate=1 opacity=0 dragXposX=0 dragYposY=0 type=capsule radius=0.05 y=-0.12 keep=true]
[VRoid_osawari_add  modelID="model1" rawBoneName="J_Bip_R_UpperLeg" pointerLock=true onOpacity=0.5 followRate=1 opacity=0 dragXposX=0 dragYposY=0 type=capsule radius=0.05 y=-0.12 keep=true]


[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_L_Hips" pointerLock=true onOpacity=0.5 onCursor="grab"  dragCursor="none" radius=0.0425 opacity=0 dragXposX=0.02 dragYposY=0.02]
[VRoid_osawari_add modelID="model1" rawBoneName="J_Sec_R_Hips" pointerLock=true onOpacity=0.5 onCursor="grab"  dragCursor="none" radius=0.0425 opacity=0 dragXposX=0.02 dragYposY=0.02]


;全てのデータを取り込んでからおさわりデータを読み込む
[loadjs storage="plugin/ex/osawariData_0.js"]
[loadjs storage="plugin/ex/osawariData_1.js"]
[loadjs storage="plugin/ex/osawariData_2.js"]
[loadjs storage="plugin/ex/osawariData_3.js"]


;tops2制御 Tops2_Showは常に有効にし、本編はマテリアルの表示、非表示で制御する
[VRoid_emo modelID="model1" emoID="Tops2_Show" emoval=1]
[VRoid_exclude_emo modelID="model1" emoID="Tops2_Show"]

[call storage=macro.ks]


[iscript]
	SISMES.dataInit(true)
[endscript]

[ex_preload]

[mask time=10]

[cm]
[endnowait]

[layopt layer="message" visible=false]


;タイトル画面へ移動
[jump storage="title.ks"]
[s][s][s]
