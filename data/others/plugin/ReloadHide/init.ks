[iscript]
	$(".ui-draggable").on("click",function(e){
		if ($(this).css("opacity") == 0.8) {
			$(this).css("opacity", 0)
			$(".ui-draggable > button").css("visibility", "hidden");
		} else {
			$(".ui-draggable > button").css("visibility", "");
			$(this).css("opacity", 0.8)
		}
	});
[endscript]

[return]
;リロードボタンをクリックで隠したり表示させたりできるだけのプラグイン
