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
[ptext name="chara_name_area" layer="message0" color="white" size=19 bold=true x=180 y=466]
[chara_config ptext="chara_name_area"]

[position layer="message0" width=960 height=155 top=510 left=160 margint=20 marginl=35 marginr=45 marginb=20 opacity=215 page="fore"]
[glyph line="nextpage.png" folder="data/image" fix=true left=1075 top=620 ]

[bg storage="heya.png" time=10 position="center"]

[mask_off time=1000]



[jump storage="main.ks" target="return_ohayou"]
[s][s][s][s][s][s]
