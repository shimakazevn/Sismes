*shinrai_11


[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_00_A, n/emo_Cheek_050"]
[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
[VRoid_camera_move cameraID="camera1" x=0 y=1.35 z=1.7  rotX=-0.2 rotY=0 rotZ=0]
[VRoid_background_visible layerID="VRoid" background=false]

[wait time=500]
[bg storage="living.png" time=500 position="center"]

[VRoid_layer_show layerID="VRoid" time=600 wait=true]

[layopt layer="message" visible=true]
#妹

Em muốn hỏi ý kiến anh một chút... Em chơi thử tựa game này có được không anh...?[p]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_01_A, n/emo_Cheek_050" time=600 easing="ease" wait=false]

えっと……月額制だし、オンラインのゲームだから[r]
一応おにいちゃんに確認しておいた方がいいかなって……[p]


#
妹のいっているゲームはその昔[r]
俺がハマったことのあるＭＭＯだった[p]

月額制ではあるけど、ガチャみたいな課金要素もないし[r]
お小遣いの範囲だろうから問題ないと伝える[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_B, n/emo_Cheek_100" time=600 easing="ease" wait=false]

#妹
やった！[r]
ありがとう、おにいちゃん！

[glink text="Nhưng không được làm xáo trộn<br>giờ giấc sinh hoạt đâu đấy!" target="shinrai_11_2" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_11_2


[VRoid_pose modelID="model1" pose="n/pose_06" emo="n/emo_pose_06_A, n/emo_Cheek_100" time=600 easing="easeOutQuint" wait=false]

Vâng ạ![p]


#
Đã bao lâu kể từ ngày em gái bắt đầu tự nhốt mình trong phòng rồi nhỉ...[p]

いつでも社会復帰できるように[r]
生活時間を守り、それなりの勉強をすると約束している[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_A, n/emo_Cheek_050" time=600 easing="ease" wait=false]


#妹
ちゃんと今まで通りお勉強はするし[r]
１０時にはお布団に入るよ[p]

[layopt layer="message" visible=false]
#
[VRoid_layer_hide layerID="VRoid" time=600 wait=true]
[bg storage="heya.png" time=500 position="center"]


[iscript]
	SISMES.savedata.event.shinrai_11 = true
[endscript]
[jump storage="main.ks" target="return_event"]
[s][s][s][s][s]



*shinrai_20

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_00_B"]
[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
[VRoid_camera_move cameraID="camera1" x=0 y=1.35 z=1.7  rotX=-0.2 rotY=0 rotZ=0]
[VRoid_background_visible layerID="VRoid" background=false]

[wait time=500]
[bg storage="living.png" time=500 position="center"]

[VRoid_layer_show layerID="VRoid" time=600 wait=true]


[glink text="Nhắc mới nhớ..." target="shinrai_20_1" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_20_1

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_07_A" time=600 easing="ease" wait=false]

[layopt layer="message" visible=true]
#妹

Dạ? Việc học ạ...?[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_A" time=600 easing="ease" wait=false]

うん、ちゃんとしてるよ[r]
約束は守ってるよ[p]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_C" time=600 easing="ease" wait=false]

でも……[r]
実は結構わからないところがあって……[p]

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_04_B, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

おにいちゃん、お仕事の邪魔じゃなかったら[r]
たまにお勉強教えてほしいな……

[glink text="Lúc nào cũng được cả" target="shinrai_20_2" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_20_2

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_A, n/emo_Cheek_050" time=600 easing="ease" wait=false]

Thật ạ? Tuyệt quá đi mất![p]

[VRoid_pose modelID="model1" pose="n/pose_05" emo="n/emo_pose_00_B" time=600 easing="ease" wait=false]

さすがにゲームで知り合った人に[r]
お勉強教えてもらうわけにはいかないしねー



[glink text="Em kết bạn được rồi à?" target="shinrai_20_3" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_20_3

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_03_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

Dạ? À, ừm thì... chỉ có một người thôi ạ...?[p]

[VRoid_pose modelID="model1" pose="n/pose_01" time=600 easing="ease" wait=false]

でもやっぱり他の人はちょっと怖いから……[r]
その人以外とは全然話してないかな[p]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_01_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

Không hiểu sao... em thấy người ấy rất dễ nói chuyện...[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_B, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

そ、そんなことよりお勉強……！[r]
優しく教えてね、おにいちゃん！[p]

[layopt layer="message" visible=false]
#

[VRoid_layer_hide layerID="VRoid" time=600 wait=true]

[wait time=1000]
[layopt layer="message" visible=true]
※以降、妹の信頼が２０以上ある状態で[r]
コミュニケーションから「勉強」が選べるようになります[p]

[layopt layer="message" visible=false]
[bg storage="heya.png" time=500 position="center"]


[iscript]
	SISMES.savedata.event.shinrai_20 = true
[endscript]
[jump storage="main.ks" target="return_event"]
[s][s][s][s][s]




*shinrai_40

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_A"]
[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
[VRoid_camera_move cameraID="camera1" x=0 y=1.35 z=1.7  rotX=-0.2 rotY=0 rotZ=0]
[VRoid_background_visible layerID="VRoid" background=false]

[wait time=500]
[bg storage="living.png" time=500 position="center"]

[VRoid_layer_show layerID="VRoid" time=600 wait=true]

[layopt layer="message" visible=true]
#妹
おにいちゃんってもうオンラインゲームしないの？


[glink text="Anh không có thời gian cày đâu" target="shinrai_40_1" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_40_1

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_01_B" time=600 easing="ease" wait=false]

そっか[r]
おにいちゃんも一回ハマると抜け出せないタイプだもんね[p]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_00_A" time=600 easing="ease" wait=false]

でもお仕事ばっかりだし、[r]
お勉強も見て貰ってるし……[p]

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_01_B, n/emo_Cheek_050" time=600 easing="ease" wait=false]

たまには息抜きで一緒に[r]
オンラインじゃないゲームしようよ[p]

[VRoid_pose modelID="model1" pose="n/pose_05" emo="n/emo_pose_01_A, n/emo_Cheek_050" time=600 easing="ease" wait=false]

あ、でもおにいちゃん強いから[r]
協力系のゲームがいいな

[glink text="Được rồi" target="shinrai_40_2" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_40_2

[VRoid_pose modelID="model1" pose="n/pose_06" emo="n/emo_pose_01_B, n/emo_Cheek_100" time=600 easing="easeOutQuint" wait=false]

うん！[r]
おにいちゃんとのゲーム久しぶりだから楽しみ！[p]


[layopt layer="message" visible=false]
#

[VRoid_layer_hide layerID="VRoid" time=600 wait=true]

[wait time=1000]
[layopt layer="message" visible=true]
※以降、妹の信頼が４０以上ある状態で[r]
コミュニケーションから「ゲーム」が選べるようになります[p]

[layopt layer="message" visible=false]
[bg storage="heya.png" time=500 position="center"]


[iscript]
	SISMES.savedata.event.shinrai_40 = true
[endscript]
[jump storage="main.ks" target="return_event"]
[s][s][s][s][s]



*shinrai_60

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_03_C"]
[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
[VRoid_camera_move cameraID="camera1" x=0 y=1.35 z=1.7  rotX=-0.2 rotY=0 rotZ=0]
[VRoid_background_visible layerID="VRoid" background=false]

[wait time=500]
[bg storage="living.png" time=500 position="center"]

[VRoid_layer_show layerID="VRoid" time=600 wait=true]

[layopt layer="message" visible=true]
#妹

おにいちゃん最近ちゃんと寝れてる？

[glink text="Anh ngủ đủ giấc mà" target="shinrai_60_1" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_60_1

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_A" time=600 easing="ease" wait=false]

本当？　前よりもお仕事頑張ってるみたいだし[r]
朝すごい眠そうなときあるからちょっと心配だよ


[glink text="Còn em thì sao,<br>có chơi game quá đà không đấy?" target="shinrai_60_2" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_60_2

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_00_B" time=600 easing="ease" wait=false]

えっ？　大丈夫だよ[r]
ほら、ちゃんと１０時にはお布団入ってるでしょ？[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_04_A, n/emo_Cheek_075" time=600 easing="ease" wait=false]

いつも一緒にゲームしてる人もね[r]
朝が早いとかで１０時には落ちちゃうんだ[p]

[VRoid_pose modelID="model1" pose="n/pose_05" emo="n/emo_pose_04_B, n/emo_Cheek_075" time=600 easing="ease" wait=false]

おにいちゃんみたいに[r]
本当はお仕事忙しい人なのかな？[p]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_B, n/emo_Cheek_075" time=600 easing="ease" wait=false]

あんまり自分のこと話さないから[r]
よくわからないんだよね[p]

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_03_A, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

……そう言えばわたしって[r]
逆に色々話しすぎちゃってる気がしてきた……

[glink text="Phải cẩn thận thông tin cá nhân đấy" target="shinrai_60_3" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_60_3

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_00_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

う、うん[r]
その辺は多分……だいじょう……ぶ？[p]


[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_02_A" time=600 easing="ease" wait=false]

M-Mà chuyện đó tính sau, lo cho anh trai trước đã![p]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_B" time=600 easing="ease" wait=false]

ほら、おにいちゃんに倒れられたら[r]
わたし何にもできないから……[p]

[VRoid_pose modelID="model1" pose="n/pose_05" emo="n/emo_pose_01_A, n/emo_Cheek_100" time=600 easing="ease" wait=false]

そうだっ！　これからは寝る前に[r]
おにいちゃんにマッサージしてあげる！

[glink text="Mát-xa á?" target="shinrai_60_4" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_60_4


[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_01_B, n/emo_Cheek_100" time=600 easing="ease" wait=false]

うん！[r]
日頃のお礼にそれくらいさせてよ[p]



[layopt layer="message" visible=false]
#

[VRoid_layer_hide layerID="VRoid" time=600 wait=true]

[wait time=1000]
[layopt layer="message" visible=true]
※以降、妹の信頼が６０以上ある状態で[r]
２２時を迎えると体力が少し回復します[p]

[layopt layer="message" visible=false]
[bg storage="heya.png" time=500 position="center"]

[iscript]
	SISMES.savedata.event.shinrai_60 = true
[endscript]
[jump storage="main.ks" target="return_event"]
[s][s][s][s][s]



*shinrai_80

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_B, n/emo_Cheek_050"]
[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
[VRoid_camera_move cameraID="camera1" x=0 y=1.35 z=1.7  rotX=-0.2 rotY=0 rotZ=0]
[VRoid_background_visible layerID="VRoid" background=false]

[wait time=500]
[bg storage="living.png" time=500 position="center"]

[VRoid_layer_show layerID="VRoid" time=600 wait=true]

[layopt layer="message" visible=true]
#妹
おにいちゃ～ん！

[glink text="Có chuyện gì thế em?" target="shinrai_80_1" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_80_1

[VRoid_pose modelID="model1" pose="n/pose_05" emo="n/emo_pose_01_A, n/emo_Cheek_075" time=600 easing="ease" wait=false]

うんっ！[r]
呼んでみただけ！

[glink text="Dạo này tâm trạng em tốt ghê nhỉ" target="shinrai_80_2" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_80_2

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_00_B, n/emo_Cheek_050" time=600 easing="ease" wait=false]

Em thấy mình bắt đầu chơi tựa game đó là quyết định đúng đắn thật đấy.[p]

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_04_B, n/emo_Cheek_075" time=600 easing="ease" wait=false]

なんかね、毎日が楽しくって……[r]
時間が経つのも、早く感じてね……！


[glink text="Thế thì tốt quá rồi" target="shinrai_80_3" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_80_3

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_B, n/emo_Cheek_075" time=600 easing="ease" wait=false]

うん！　おにいちゃんがプレイしていいよって[r]
言ってくれたおかげだよ、ありがと[p]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_04_A, n/emo_Cheek_075" time=600 easing="ease" wait=false]

Cũng không hẳn là để báo đáp đâu nhưng mà...[p]

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_01_B, n/emo_Cheek_075" time=600 easing="ease" wait=false]

おにいちゃんのお仕事で[r]
手伝えることがあったらなんでも言ってね[p]

[VRoid_pose modelID="model1" pose="n/pose_06" emo="n/emo_pose_01_A, n/emo_Cheek_075" time=600 easing="easeOutQuint" wait=false]

Chỉ cần em có thể góp sức giúp ích được cho anh, em sẽ cố gắng hết mình luôn![p]


[layopt layer="message" visible=false]
#

[VRoid_layer_hide layerID="VRoid" time=600 wait=true]

[wait time=1000]
[layopt layer="message" visible=true]
※以降、妹の信頼が８０以上ある状態で[r]
仕事を行うと、体力の消費が少し抑えられます[p]

[layopt layer="message" visible=false]
[bg storage="heya.png" time=500 position="center"]

[iscript]
	SISMES.savedata.event.shinrai_80 = true
[endscript]
[jump storage="main.ks" target="return_event"]
[s][s][s][s][s]



*shinrai_100

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_B"]
[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
[VRoid_camera_move cameraID="camera1" x=0 y=1.35 z=1.7  rotX=-0.2 rotY=0 rotZ=0]
[VRoid_background_visible layerID="VRoid" background=false]

[wait time=500]
[bg storage="living.png" time=500 position="center"]

[VRoid_layer_show layerID="VRoid" time=600 wait=true]

[layopt layer="message" visible=true]
#妹
……

[glink text="Trông em có vẻ không được vui nhỉ?" target="shinrai_100_1" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_100_1

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_03_A" time=600 easing="ease" wait=false]

うん、仲の良かった人が[r]
突然アカウント削除しちゃったみたいで……[p]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_03_B" time=600 easing="ease" wait=false]

その人、昨日まで何も言ってなかったのに突然だったから[r]
すごいショックなんだよ……[p]

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_03_A, n/emo_tears_100" time=600 easing="ease" wait=false]

もしかして、わたししつこかった……？[r]
実は迷惑かけてたのかなぁ……

[glink text="Hai đứa thân thiết đến thế cơ à?" target="shinrai_100_2" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_100_2

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_B, n/emo_tears_100" time=600 easing="ease" wait=false]

Ít nhất thì... em luôn cảm thấy người ấy rất tốt với mình mà...[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_03_A, n/emo_tears_090" time=600 easing="ease" wait=false]

でね、ゲームのメールボックスに[r]
一通だけメッセージが残ってたの[p]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_03_C, n/emo_tears_090" time=600 easing="ease" wait=false]

『この世界で君だけが鮮やかに感じられた[r]
_　君の色で、君の声で、いつか終わりがくるまで……』って[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_02_A, n/emo_tears_090, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

なにこれ？　謎解き……？？[r]
もー、意味わかんないよぉ……[p]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_B, n/emo_tears_100, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

やっぱり男のひとってよくわかんないなぁ……


[glink text="Không lẽ... em thích người ta rồi à?" target="shinrai_100_3" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_100_3

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_07_A, n/emo_tears_090, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

えっ！？　ええっ！！？[r]
す、好きとか……っ！　そういうのじゃ……！[p]

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_03_A, n/emo_tears_090, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

Ch-Chắc là... không có đâu ạ...[p]

ゲーム、凄い上手な人だったから[r]
かっこいいなーとは思ったけど……っ[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_03_B, n/emo_Sekimen_100" time=600 easing="ease" wait=false]

V-Với lại em cũng chẳng hiểu mấy chuyện yêu đương đó đâu...[p]

男の子とか……女の子とか……？[r]
そういうの全然わかんないから……[p]

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_03_C, n/emo_Sekimen_100" time=600 easing="ease" wait=false]

ねぇ？　おにいちゃん[r]
わたしって男の人から見たらどう見えるの……？


[glink text="Dù sao thì anh vẫn là anh trai của em mà" target="shinrai_100_4" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_100_4

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_A, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

そうだよね、おにいちゃんから見たわたしは[r]
妹でしかないよね……ごめん、変なこと言って[p]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_03_C, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

あーあ！[r]
なんか本当にあのゲームやる気なくなっちゃったな……[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_00_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

ちょっと気持ちが整理できるまで[r]
一回あのゲームから離れようと思う！[p]

[VRoid_pose modelID="model1" pose="n/pose_05" emo="n/emo_pose_00_B, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

これからはその空いた時間で[r]
おにいちゃんのお仕事もっと手伝ってもいい？[p]

[VRoid_pose modelID="model1" pose="n/pose_02" emo="n/emo_pose_02_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

なんか悲しい気持ち通り越して[r]
ちょっとムカムカしてきたっ！[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_02_B, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

ひとりでいるとまた考え込みそうだから[r]
おにいちゃんのお仕事で気を紛らわせたい！

[glink text="Anh sẽ bắt em làm việc<br>như trâu như ngựa luôn đấy nhé" target="shinrai_100_5" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*shinrai_100_5

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_04_B, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

Trời ạ, anh trai thật là...[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_B, n/emo_Cheek_075" time=600 easing="ease" wait=false]

やっぱりおにいちゃんと[r]
話しているときが一番気楽でいいね[p]


[layopt layer="message" visible=false]
#

[VRoid_layer_hide layerID="VRoid" time=600 wait=true]

[wait time=1000]
[layopt layer="message" visible=true]

※以降、妹の信頼が１００ある状態で[r]
仕事を行うと、お金が稼ぎやすくなります。[p]

[layopt layer="message" visible=false]
[bg storage="heya.png" time=500 position="center"]

[iscript]
	SISMES.savedata.event.shinrai_100 = true
[endscript]
[jump storage="main.ks" target="return_event"]
[s][s][s][s][s]



