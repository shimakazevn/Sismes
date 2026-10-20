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
――Cốc cốc[p]


#Em gái
Anh hai ơi, em vào được không?

[glink text="Cứ vào đi" target="ed1_1" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*ed1_1

[layopt layer="message" visible=false]
[VRoid_layer_show layerID="VRoid" time=600 wait=true]

[layopt layer="message" visible=true]
Em xin phép vào nha……

[glink text="Có chuyện gì thế em?" target="ed1_2" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*ed1_2

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_04_A" time=600 easing="ease" wait=false]

A, vâng[r]
Em có điều này muốn nói với anh hai……[p]


[VRoid_pose modelID="model1" pose="n/pose_02" time=600 easing="ease" wait=false]

Ừm thì...[p]

[VRoid_emo modelID="model1" emo="n/emo_pose_04_B, n/emo_Cheek_050" time=600 easing="ease" wait=false]

Thật ra thì trò chơi online đó,[r]
Em đã bắt đầu chơi từ trước khi hỏi ý anh hai rồi.

[glink text="Vậy à..." target="ed1_3" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*ed1_3

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_04_A, n/emo_Cheek_050" time=600 easing="ease" wait=false]

Vì đang trong thời gian chơi thử không tốn tiền,[r]
Nên em đã không nói trước với anh……[p]

[VRoid_emo modelID="model1" emo="n/emo_pose_03_A, n/emo_Cheek_050" time=600 easing="ease" wait=false]

Em biết rõ là mình không nên lông bông chơi game như thế,[r]
Nhưng bước ra ngoài xã hội đối với em vẫn thật đáng sợ……[p]

[VRoid_emo modelID="model1" emo="n/emo_pose_03_C, n/emo_Cheek_050" time=600 easing="ease" wait=false]

Em từng nghĩ nếu ở trong game, có lẽ mình có thể trò chuyện được với ai đó……[r]
Rồi từ đó sẽ quen dần với mọi người, và không còn sợ ra ngoài nữa[p]

[VRoid_pose modelID="model1" pose="n/pose_03" emo="n/emo_pose_03_B" time=600 easing="ease" wait=false]

Thế nhưng, mọi chuyện đâu có dễ dàng như vậy nhỉ[r]
Rốt cuộc em lại càng thêm bối rối và sợ hãi hơn[p]

[VRoid_pose modelID="model1" pose="n/pose_04" emo="n/emo_pose_04_A, n/emo_Cheek_050" time=600 easing="ease" wait=false]

Nhưng mà, em cũng muốn được giống như anh hai,[r]
Có thể làm việc tại nhà, nên em sẽ cố gắng chăm chỉ học hành……[p]

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_04_B, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

Nếu anh hai có thể luôn ở bên cạnh nâng đỡ em thì em sẽ vui lắm……

[glink text="Cứ tin ở anh" target="ed1_4" color="btn_black" size=24 width="300" x=840 y=350 ]
[s][s][s][s][s]

*ed1_4

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_B, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

Dạ vâng...![p]

[VRoid_pose modelID="model1" pose="n/pose_06" emo="n/emo_pose_01_A, n/emo_Sekimen_050" time=600 easing="easeOutQuint" wait=false]

Dù em là đứa em gái còn nhiều vụng về,[r]
Nhưng từ nay về sau mong anh hãy tiếp tục chiếu cố cho em nhé……![p]

[VRoid_pose modelID="model1" pose="n/pose_00" emo="n/emo_pose_04_A, n/emo_Sekimen_050" time=600 easing="ease" wait=false]

...Em cảm ơn anh nhiều lắm, anh trai.[p]

[VRoid_pose modelID="model1" pose="n/pose_05" emo="n/emo_pose_04_B, n/emo_Sekimen_075" time=600 easing="ease" wait=false]

Đó là điều em muốn nói với anh nhất đấy[r]
A haha…… Tự nhiên nói trang trọng thế này ngượng ghê[p]

[VRoid_pose modelID="model1" pose="n/pose_01" emo="n/emo_pose_01_A, n/emo_Cheek_075" time=600 easing="ease" wait=false]

Vậy thì, em xin phép về lại phòng mình nhé?[r]
Trong công việc nếu có gì em giúp được thì anh cứ bảo em bất cứ lúc nào nha?[p]
[layopt layer="message" visible=false]
#
[VRoid_layer_hide layerID="VRoid" time=600 wait=true]


[wait time=2000]

[layopt layer="message" visible=true]
…………[p]

――Ừ... anh cũng nhờ em chiếu cố nhé.[p]
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

――Cho đến khi mối quan hệ [ruby text="anh" y=8]này[ruby text="em" y=8] méo mó này sụp đổ……[r]
Mãi mãi………… mãi mãi…………[l]

[mask time=5000]
[layopt layer="message" visible=false]
[cm]

[wait time=3000]

[jump storage="ed.ks" target="end_ed"]
[s][s][s][s][s][s]
