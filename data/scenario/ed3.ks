*start

[wait time=1000]

#
[layopt layer="message" visible=true]

…………[p]

[layopt layer="message" visible=false]

[wait time=1000]

[layopt layer="message" visible=true]

…………なんだかいつも以上に静けさを感じる[p]
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


[VRoid_pose modelID="model1" pose="n/pose_09" emo="n/emo_pose_09_A"]
[VRoid_model_move modelID="model1" x=-0.6434112096409412 y=0.6185181811939491 z=0.29454848906203823 rotX=0 rotY=-1.7688262019916707 rotZ=0]
[VRoid_camera_move layerID=VRoid x=-1.4458278 y=0.4889945 z=1.2309261 rotX=-0.4467336 rotY=-0.6409917 rotZ=-0.2789862]
[VRoid_background_visible layerID="VRoid" background=true]
[VRoid_obj3D_show objID="objID1"]
[VRoid_layer_show layerID="VRoid" time=10 wait=true]

[clearfix]

[iscript]
	$("#sismes_time_display").css("display", "none")
	$("#sismes_status_display").css("display", "none")
[endscript]

[VRoid_camera_move layerID=VRoid x=-1.4458278 y=0.9889945 z=1.2309261 rotX=-0.4467336 rotY=-0.6409917 rotZ=-0.2789862 wait=false time=10000 easing="easeInOutSine"]

[mask_off time=9000]
[wait time=2000]


[p]

[mask time=3000]

[wait time=2000]
[VRoid_layer_hide layerID="VRoid"]

[iscript]
	tf.edType = 3
[endscript]

[jump storage="ed.ks" target="end_ed"]
[s][s][s][s][s][s]
