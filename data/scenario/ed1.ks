*start

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_00_A, n/emo_Cheek_050"]
[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
[VRoid_camera_move cameraID="camera1" x=0 y=1.35 z=1.7  rotX=-0.2 rotY=0 rotZ=0]
[VRoid_background_visible layerID="VRoid" background=false]


[wait time=1000]

#
[layopt layer="message" visible=true]

…………[p]

[layopt layer="message" visible=false]

[wait time=1000]

[layopt layer="message" visible=true]
――コンコンッ[p]


#妹
おにいちゃん、入ってもいい？

[glink text="いいよ" target="ed1_1" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*ed1_1

[layopt layer="message" visible=false]
[VRoid_layer_show layerID="VRoid" time=600 wait=true]

[layopt layer="message" visible=true]
お邪魔しまーす……

[glink text="どうした？" target="ed1_2" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*ed1_2

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_04_A" time=600 easing="ease" wait=false]

あ、うん[r]
おにいちゃんに伝えたいことがあって……[p]


[VRoid_pose modelID="model1" pose="n/pose_02" time=600 easing="ease" wait=false]

えっとね？[p]

[VRoid_emo modelID="model1" emo="n/emo_pose_04_B, n/emo_Cheek_050" time=600 easing="ease" wait=false]

本当はあのオンラインゲーム、[r]
おにいちゃんに相談する前から始めてたんだ

[glink text="そうなんだ" target="ed1_3" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*ed1_3

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_04_A, n/emo_Cheek_050" time=600 easing="ease" wait=false]

トライアル期間でお金もかからないから[r]
おにいちゃんには言わなかったんだけど……[p]

[VRoid_emo modelID="model1" emo="n/emo_pose_03_A, n/emo_Cheek_050" time=600 easing="ease" wait=false]

本当はゲームなんかしてる場合じゃないって[r]
わかってるんだけどね、やっぱりお外は怖くて……[p]

[VRoid_emo modelID="model1" emo="n/emo_pose_03_C, n/emo_Cheek_050" time=600 easing="ease" wait=false]

ゲームでなら誰かと話すことができるかなって……[r]
そこから少しずつ人に慣れて、お外が怖くなくなるかなって[p]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_B" time=600 easing="ease" wait=false]

でも、そんなに甘くなかったね[r]
結局余計にわからなくなって怖くなっちゃった[p]

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_04_A, n/emo_Cheek_050" time=600 easing="ease" wait=false]

だけど、わたしもおにいちゃんみたいに[r]
お家の中で働けるように、ちゃんとお勉強頑張るから……[p]

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_04_B, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

ずっと支えててくれると嬉しいな……

[glink text="まかせろ" target="ed1_4" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*ed1_4

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_B, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

うん……！[p]

[VRoid_pose modelID="model1" pose="n/pose_06" emo="n/emo_pose_01_A, n/emo_Sekimen_050" time=600 easing="easeOutQuint" wait=false]

不束な妹ですが[r]
これからもよろしくお願いします……！[p]

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_04_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

……ありがとう、おにいちゃん[p]

[VRoid_pose modelID="model1" pose="n/pose_05" emo="n/emo_pose_04_B, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

これが一番言いたかったんだ[r]
あははっ……なんか改まって言うと照れるね[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_A, n/emo_Cheek_075" time=600 easing="ease" wait=false]

それじゃあ、わたし自分のお部屋に戻るね？[r]
お仕事で手伝えることがあったらいつでも言ってね？[p]
[layopt layer="message" visible=false]
#
[VRoid_layer_hide layerID="VRoid" time=600 wait=true]


[wait time=2000]

[layopt layer="message" visible=true]
…………[p]

――ああ……こちらこそ、よろしくな[p]
[layopt layer="message" visible=false]


[wait time=1000]
[mask time=2000]

[clearfix]

[wait time=1000]

[iscript]
	$("#sismes_time_display").css("display", "none")
	$("#sismes_status_display").css("display", "none")
	tf.edType = 1
[endscript]

[bg storage="kuro.png" time=10]
[mask_off time=10]

[layopt layer="message" visible=true]

――この歪な[ruby text="兄" y=8]関[ruby text="妹" y=8]係が壊れるまで[r]
ずっと…………ずっと…………[l]

[mask time=5000]
[layopt layer="message" visible=false]
[cm]

[wait time=3000]

[jump storage="ed.ks" target="end_ed"]
[s][s][s][s][s][s]
