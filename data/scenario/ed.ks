;おはようイベント後から飛んでくる

*start
[iscript]
	sf.globalClear = true
	TYRANO.kag.saveSystemVariable(true);
[endscript]


;100フラグ＆信頼80以上
[jump storage="ed1.ks" target="start" cond="SISMES.savedata.event.shinrai_100 && SISMES.savedata.status.shinrai >= 80"]

;100フラグ＆信頼マイナス
[jump storage="ed2.ks" target="start" cond="SISMES.savedata.event.shinrai_100 && SISMES.savedata.status.shinrai < 0"]

;信頼マイナス
[jump storage="ed3.ks" target="start" cond="SISMES.savedata.status.shinrai < 0"]

;その他
[jump storage="ed4.ks" target="start"]
[s][s][s][s][s][s]



;各ED後にマスクした状態でここにくる
;処理後、共通処理を経ておはようイベント後に戻る
*end_ed

[iscript]
	SISMES.result()
[endscript]

[bg storage="kuro.png" time=10]

[mask_off time=1000]
[s][s][s][s][s][s]


*result_end

[mask time=1000]

[wait time=500]

[iscript]
	document.getElementById("showResultArea")?.remove()
	SISMES.savedata.clear = true

	SISMES.createStatusDisplay()
	SISMES.createTimeDisplay()

[endscript]

[model_reset]
[clearfix]
[freeimage layer="0"]
[button name="sismes_config" width=50 x=1220 y=10 graphic="config.png" exp="sismes.config()" role="dummy"]

[free name="chara_name_area" layer="message0" ]
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=270 y=560]
[chara_config ptext="chara_name_area"]

[position layer="message0" width=800 height=136 top=530 left=240 margint=10 marginl=70 marginr=70 marginb=60 opacity=204 page="fore"]

[bg storage="heya.png" time=10 position="center"]

[mask_off time=1000]



[jump storage="main.ks" target="return_ohayou"]
[s][s][s][s][s][s]
