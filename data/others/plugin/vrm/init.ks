[iscript]
	//V5系はimportMap非対応
	if (!document.querySelector('script[type="importmap"]')) {
		const importMap = {
			imports: {
				"three": "./data/others/plugin/vrm/js/module/three/three.module.min.js",
				"three/addons/": "./data/others/plugin/vrm/js/module/three/addons/",
				"@pixiv/three-vrm": "./data/others/plugin/vrm/js/module/three-vrm/three-vrm.module.min.js",
			}
		};

		const script = document.createElement('script');
		script.type = 'importmap';
		script.textContent = JSON.stringify(importMap);
		document.head.appendChild(script);
	}
[endscript]

[loadcss file="./data/others/plugin/vrm/js/loading.css"]

[loadjs storage="./plugin/vrm/js/vroid_tag.js"]
;[loadjs storage="./plugin/vrm/js/vroid_tag.min.js"]
[VRoid_module storage="./plugin/vrm/js/vroid.js"]
;[VRoid_module storage="./plugin/vrm/js/vroid.min.js"]
[loadjs storage="./plugin/vrm/js/vroid_maker.js"]

[loadjs storage="./plugin/vrm/js/ex_tyrano.js"]
[loadjs storage="./plugin/vrm/js/easing.js"]
[loadjs storage="./plugin/vrm/js/pose.js"]
[loadjs storage="./plugin/vrm/js/emotion.js"]

[return]
[s]
;==================================================================
;ティラノスクリプト向けVRoidプラグイン V3
;
;   制作 （猫）milkcat
;     HP  https://milkcat.jp/
;Twitter  https://twitter.com/nekomilkcat
;==================================================================
