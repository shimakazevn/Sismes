/**
 * Sismes - Ex Plugins Localization Script
 * Translates ex.js, osawari_parameter.js, osawari_main.js, osawari.js, vrm_override.js
 */
const fs = require('fs');
const path = require('path');

const pluginDir = path.join(__dirname, '../data/others/plugin/ex');

// ==========================================
// 1. ex.js: Config / Settings modal
// ==========================================
console.log('--- Processing ex.js ---');
let exPath = path.join(pluginDir, 'ex.js');
let exContent = fs.readFileSync(exPath, 'utf8');

// Replace Japanese config labels
exContent = exContent.replace(
    '\\u884C\\u70BA\\u97F3\\u3000',
    '\\u00C2m thanh\\u3000' // Âm thanh
);
exContent = exContent.replace(
    "<span class='monospaceChar'>\\u30DC</span><span class='monospaceChar'>\\u30A4</span><span class='monospaceChar'>\\u30B9</span>\\u3000",
    "Gi\\u1ECDng n\\u00F3i\\u3000" // Giọng nói
);
exContent = exContent.replace(
    '\\u6587\\u3000\\u7AE0\\u3000',
    'T\\u1ED1c \\u0111\\u1ED9\\u3000' // Tốc độ chữ
);
exContent = exContent.replace(
    '\\u5144\\u900F\\u904E\\u3000',
    '\\u0110\\u1ED9 m\\u1EDD NV\\u3000' // Độ mờ NV
);
exContent = exContent.replace(
    '\\u753B\\u3000\\u8CEA\\u3000',
    '\\u0110\\u1ED3 h\\u1ECD\\u0061\\u3000' // Đồ họa
);
exContent = exContent.replace(
    "class='config_graphic btn_black'>\\u3000\\u4F4E\\u3000</span>",
    "class='config_graphic btn_black'> Th\\u1EA5p </span>" // Thấp
);
exContent = exContent.replace(
    "class='config_graphic btn_black'>\\u3000\\u4E2D\\u3000</span>",
    "class='config_graphic btn_black'> V\\u1EEBa </span>" // Vừa
);
exContent = exContent.replace(
    "class='config_graphic btn_black'>\\u3000\\u9AD8\\u3000</span>",
    "class='config_graphic btn_black'> Cao </span>" // Cao
);
exContent = exContent.replace(
    '\\u65AD\\u9762\\u56F3\\u3000',
    'M\\u1EB7t c\\u1EAFt\\u3000' // Mặt cắt
);
exContent = exContent.replace(
    "class='config_danmen btn_black'>\\u3000\\u30AA\\u30D5\\u3000</span>",
    "class='config_danmen btn_black'> T\\u1EAFt </span>" // Tắt
);
exContent = exContent.replace(
    "class='config_danmen btn_black'>\\u3000\\u30AA\\u30F3\\u3000</span>",
    "class='config_danmen btn_black'> B\\u1EADt </span>" // Bật
);
exContent = exContent.replace(
    "id='sismes_config_default' class='btn_black'>\\u30C7\\u30D5\\u30A9\\u30EB\\u30C8</div>",
    "id='sismes_config_default' class='btn_black'>M\\u1EB7c \\u0111\\u1ECBnh</div>" // Mặc định
);
exContent = exContent.replace(
    "id='sismes_config_full' class='btn_black'>\\u30D5\\u30EB\\u30B9\\u30AF\\u30EA\\u30FC\\u30F3</div>",
    "id='sismes_config_full' class='btn_black'>To\\u00E0n m\\u00E0n h\\u00ECnh</div>" // Toàn màn hình
);
exContent = exContent.replace(
    "id='sismes_config_title' class='btn_black'>\\u30BF\\u30A4\\u30C8\\u30EB</div>",
    "id='sismes_config_title' class='btn_black'>V\\u1EC1 Ti\\u00EAu \\u0111\\u1EC1</div>" // Về Tiêu đề
);
exContent = exContent.replace(
    "id='sismes_config_fps_text'>FPS\\u8A08\\u6E2C\\u5024\\uFF1A</div>",
    "id='sismes_config_fps_text'>FPS:</div>"
);
exContent = exContent.replace(
    '\\u30C7\\u30D5\\u30A9\\u30EB\\u30C8\\u8A2D\\u5B9A\\u306B\\u623B\\u3057\\u307E\\u3059\\u304B\\uFF1F',
    'Kh\\u00F4i ph\\u1EE5c c\\u00E0i \\u0111\\u1EB7t m\\u1EB7c \\u0111\\u1ECBnh?' // Khôi phục cài đặt mặc định?
);
exContent = exContent.replace(
    '\\u30BF\\u30A4\\u30C8\\u30EB\\u753B\\u9762\\u306B\\u623B\\u308A\\u307E\\u3059\\u304B\\uFF1F',
    'Tr\\u1EDF v\\u1EC1 m\\u00E0n h\\u00ECnh ti\\u00EAu \\u0111\\u1EC1?' // Trở về màn hình tiêu đề?
);

// Fullscreen web support fallback
exContent = exContent.replace(
    'try{studio_api.ipcRenderer.invoke("toggle-fullscreen")}catch{}',
    'try{if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});}else{document.documentElement.requestFullscreen().catch(()=>{});}}catch(e){}'
);

fs.writeFileSync(exPath, exContent, 'utf8');
console.log('✅ ex.js updated');

// ==========================================
// 2. osawari_parameter.js: body part names
// ==========================================
console.log('--- Processing osawari_parameter.js ---');
let paramPath = path.join(pluginDir, 'osawari_parameter.js');
let paramContent = fs.readFileSync(paramPath, 'utf8');

// kaihatsuName: {kuchi:"くち",mune:"胸",chikubi:"乳首",cli:"クリ",manko:"おまんこ",oshiri:"お尻",anal:"アナル"}
paramContent = paramContent.replace(
    'kuchi:"\\u304F\\u3061",mune:"\\u80F8",chikubi:"\\u4E73\\u9996",cli:"\\u30AF\\u30EA",manko:"\\u304A\\u307E\\u3093\\u3053",oshiri:"\\u304A\\u5C3B",anal:"\\u30A2\\u30CA\\u30EB"',
    'kuchi:"Mi\\u1EC7ng",mune:"Ng\\u1EF1c",chikubi:"\\u0110\\u1EA7u ti",cli:"\\u00C2m v\\u1EADt",manko:"\\u00C2m \\u0111\\u1EA1o",oshiri:"M\\u00F4ng",anal:"H\\u1EADu m\\u00F4n"'
);

fs.writeFileSync(paramPath, paramContent, 'utf8');
console.log('✅ osawari_parameter.js updated');

// ==========================================
// 3. osawari_main.js: eroStatus & evaluation
// ==========================================
console.log('--- Processing osawari_main.js ---');
let mainPath = path.join(pluginDir, 'osawari_main.js');
let mainContent = fs.readFileSync(mainPath, 'utf8');

// Sensitivities s:
const sStart = mainContent.indexOf('eroStatus:function(){const s={');
if (sStart !== -1) {
    const sEnd = mainContent.indexOf('},e=this.savedata.kaihatsu', sStart);
    if (sEnd !== -1) {
        const fullOldS = mainContent.slice(sStart, sEnd + 1);
        const newS = 'eroStatus:function(){const s={20:"Nh\\u1ED9t",40:"B\\u1EE9t r\\u1EE9t",60:"N\\u00F4n nao l\\u1EA1 l\\u00F9ng\\u2026",80:"Th\\u00EDch qu\\u00E1<span style=\\"font-size: 12px;\\"> \\u2665</span>",100:"L\\u00E2ng l\\u00E2ng b\\u1ED3ng b\\u1EC1nh<span style=\\"font-size: 12px;\\"> \\u2665</span>",200:"S\\u1EAFp ra m\\u1EA5t r\\u1ED3i\\u2026<span style=\\"font-size: 12px;\\"> \\u2665</span>"}';
        mainContent = mainContent.replace(fullOldS, newS);
        console.log('  - Replaced sensitivity strings via index');
    }
}

// i.val labels loop:
// let v="";for(const o in i.val)v+='<span class="sysmes_eroStatus_imouto_left">'+o+'\uFF1A</span><span class="sysmes_eroStatus_imouto_right">'+i.val[o]+"\u56DE\u3000&nbsp&nbsp;</span><br>";
const oldValLoop = 'let v="";for(const o in i.val)v+=\\\'<span class="sysmes_eroStatus_imouto_left">\'+o+\'\\uFF1A</span><span class="sysmes_eroStatus_imouto_right">\'+i.val[o]+"\\u56DE\\u3000&nbsp&nbsp;</span><br>";';
const newValLoop = `const valMap={'\\u30A4\\u3063\\u305F\\u56DE\\u6570':'S\\u1ED1 l\\u1EA7n l\\u00EAn \\u0111\\u1EC9nh','\\u4E00\\u7DD2\\u306B\\u30A4\\u3063\\u305F\\u56DE\\u6570':'C\\u00F9ng l\\u00EAn \\u0111\\u1EC9nh','\\u6F6E\\u5439\\u304D\\u3057\\u305F\\u56DE\\u6570':'S\\u1ED1 l\\u1EA7n xu\\u1EA5t ti\\u1EBFt','\\u304A\\u304F\\u3061\\u306B\\u51FA\\u3055\\u308C\\u305F\\u56DE\\u6570':'Xu\\u1EA5t tinh v\\u00E0o mi\\u1EC7ng','\\u5916\\u3060\\u3057\\u3055\\u308C\\u305F\\u56DE\\u6570':'Xu\\u1EA5t tinh b\\u00EAn ngo\\u00E0i','\\u4E2D\\u3060\\u3057\\u3055\\u308C\\u305F\\u56DE\\u6570':'Xu\\u1EA5t tinh v\\u00E0o trong','\\u30A2\\u30CA\\u30EB\\u306B\\u51FA\\u3055\\u308C\\u305F\\u56DE\\u6570':'Xu\\u1EA5t tinh v\\u00E0o h\\u1EADu m\\u00F4n'};let v="";for(const o in i.val)v+='<span class="sysmes_eroStatus_imouto_left">'+(valMap[o]||o)+': </span><span class="sysmes_eroStatus_imouto_right">'+i.val[o]+" l\\u1EA7n\\u3000&nbsp;&nbsp;</span><br>";`;

// Note: in minified code quotes might be single:
const searchValLoop = 'let v="";for(const o in i.val)v+=\'<span class="sysmes_eroStatus_imouto_left">\'+o+\'\\uFF1A</span><span class="sysmes_eroStatus_imouto_right">\'+i.val[o]+"\\u56DE\\u3000&nbsp&nbsp;</span><br>";';
if (mainContent.includes(searchValLoop)) {
    mainContent = mainContent.replace(searchValLoop, newValLoop);
    console.log('  - Replaced val loop');
}

// Virginity & pregnancy status:
// let f="\u51E6\u5973",r="\u672A\u7D4C\u9A13";i.syojyo===!1&&(f="\u7D4C\u9A13\u6E08\u307F",r="\u304A\u306B\u3044\u3061\u3083\u3093"),i.jyusei===!0&&(f="\u598A\u5A20\u4E2D");
const oldStatus = 'let f="\\u51E6\\u5973",r="\\u672A\\u7D4C\\u9A13";i.syojyo===!1&&(f="\\u7D4C\\u9A13\\u6E08\\u307F",r="\\u304A\\u306B\\u3044\\u3061\\u3083\\u3093"),i.jyusei===!0&&(f="\\u598A\\u5A20\\u4E2D");';
const newStatus = 'let f="Trinh nguy\\u00EAn",r="Ch\\u01B0a c\\u00F3";i.syojyo===!1&&(f="\\u0110\\u00E3 quan h\\u1EC7",r="Anh hai"),i.jyusei===!0&&(f="\\u0110ang mang thai");';
if (mainContent.includes(oldStatus)) {
    mainContent = mainContent.replace(oldStatus, newStatus);
    console.log('  - Replaced virginity status flags');
}

// Header & Labels in eroStatus:
// <span style="font-size: 30px;">\u59B9 \uFF08'+f+'\uFF09</span><br><br><span class="sysmes_eroStatus_imouto_left">\u306F\u3058\u3081\u3066\u306E\u76F8\u624B\uFF1A</span><span class="sysmes_eroStatus_imouto_right" style="text-align: left">'+r+'</span><br><span class="sysmes_eroStatus_imouto_left">\u958B\u767A\u7387\uFF1A</span><span class="sysmes_eroStatus_imouto_right">'+t+"\uFF05\u3000&nbsp&nbsp;</span><br>"+v+"</div>"
const oldHeader = '<span style="font-size: 30px;">\\u59B9 \\uFF08\'+f+\'\\uFF09</span><br><br><span class="sysmes_eroStatus_imouto_left">\\u306F\\u3058\\u3081\\u3066\\u306E\\u76F8\\u624B\\uFF1A</span><span class="sysmes_eroStatus_imouto_right" style="text-align: left">\'+r+\'</span><br><span class="sysmes_eroStatus_imouto_left">\\u958B\\u767A\\u7387\\uFF1A</span><span class="sysmes_eroStatus_imouto_right">\'+t+"\\uFF05\\u3000&nbsp&nbsp;</span><br>"+v+"</div>"';
const newHeader = '<span style="font-size: 30px;">Em g\\u00E1i ( \'+f+\' )</span><br><br><span class="sysmes_eroStatus_imouto_left">L\\u1EA7n \\u0111\\u1EA7u ti\\u00EAn: </span><span class="sysmes_eroStatus_imouto_right" style="text-align: left">\'+r+\'</span><br><span class="sysmes_eroStatus_imouto_left">Ti\\u1EBFn \\u0111\\u1ED9 khai ph\\u00E1: </span><span class="sysmes_eroStatus_imouto_right">\'+t+"%\\u3000&nbsp;&nbsp;</span><br>"+v+"</div>"';
if (mainContent.includes(oldHeader)) {
    mainContent = mainContent.replace(oldHeader, newHeader);
    console.log('  - Replaced header and labels');
}

// Function p(o, u, _):
// Replace whole function p with Vietnamese text
const oldPStart = 'function p(o,u,_){let a=\'<div id="sysmes_eroStatus_sintyoku">\';return o<3&&u==="\\u51E6\\u5973"';
const oldPEnd = 'a+="</div>",a}';
const pIdx1 = mainContent.indexOf(oldPStart);
if (pIdx1 !== -1) {
    const pIdx2 = mainContent.indexOf(oldPEnd, pIdx1);
    if (pIdx2 !== -1) {
        const fullOldP = mainContent.slice(pIdx1, pIdx2 + oldPEnd.length);
        const newP = `function p(o,u,_){let a='<div id="sysmes_eroStatus_sintyoku">';return o<3&&u==="Trinh nguy\\u00EAn"?a+="M\\u1ED9t c\\u01A1 th\\u1EC3 ng\\u00E2y th\\u01A1 thu\\u1EA7n khi\\u1EBFt, ch\\u01B0a t\\u1EEBng v\\u01B0\\u1EDBng b\\u1EE5i tr\\u1EA7n v\\u00E0 th\\u1EADm ch\\u00ED c\\u00F2n ch\\u01B0a nh\\u1EADn th\\u1EE9c \\u0111\\u01B0\\u1EE3c thi\\u00EAn t\\u00EDnh c\\u1EE7a b\\u1EA3n th\\u00E2n.":o<3&&u!=="Trinh nguy\\u00EAn"?a+="C\\u01A1 th\\u1EC3 nh\\u1ECF nh\\u1EAFn th\\u1EADm ch\\u00ED c\\u00F2n ch\\u01B0a nh\\u1EADn th\\u1EE9c \\u0111\\u01B0\\u1EE3c thi\\u00EAn t\\u00EDnh c\\u1EE7a m\\u00ECnh, nh\\u01B0ng \\u0111\\u00E3 b\\u1ECB ng\\u01B0\\u1EDDi anh l\\u00E0m v\\u1EA5y b\\u1EA9n.":o<10?a+="M\\u1ED9t c\\u01A1 th\\u1EC3 ng\\u00E2y th\\u01A1 non n\\u1EDBt, v\\u1EABn ch\\u01B0a th\\u1EC3 hi\\u1EC3u r\\u00F5 \\u0111\\u01B0\\u1EE3c nh\\u1EEFng c\\u1EA3m gi\\u00E1c \\u1EA5y r\\u1ED1t cu\\u1ED9c l\\u00E0 g\\u00EC.":o<20?a+="M\\u1ED9t c\\u01A1 th\\u1EC3 ch\\u01B0a tr\\u01B0\\u1EDFng th\\u00E0nh, b\\u1EAFt \\u0111\\u1EA7u c\\u1EA3m nh\\u1EADn \\u0111\\u01B0\\u1EE3c nh\\u1EEFng xung \\u0111\\u1ED9ng b\\u1EA3n n\\u0103ng \\u0111ang r\\u00E2m ran tr\\u1ED7i d\\u1EADy.":o<30?a+="M\\u1ED9t c\\u01A1 th\\u1EC3 ngoan ngo\\u00E3n thu\\u1EA7n ph\\u1EE5c, b\\u1EAFt \\u0111\\u1EA7u \\u0111\\u1EAFm ch\\u00ECm trong nh\\u1EEFng x\\u00FAc c\\u1EA3m nguy\\u00EAn th\\u1EE7y cu\\u1ED9n tr\\u00E0o t\\u1EEB n\\u01A1i s\\u00E2u th\\u1EB3m.":o<40?a+="M\\u1ED9t c\\u01A1 th\\u1EC3 non n\\u1EDBt kh\\u00F4ng th\\u1EC3 kh\\u00E1ng c\\u1EF1, v\\u1EEBa c\\u1EA3m th\\u1EA5y t\\u1ED9i l\\u1ED7i, v\\u1EEBa ch\\u00ECm \\u0111\\u1EAFm trong c\\u1EA3m gi\\u00E1c \\u0111\\u1EA7u \\u00F3c ho\\u00E0n to\\u00E0n tr\\u1EAFng x\\u00F3a.":o<50?a+="C\\u01A1 th\\u1EC3 c\\u1EE7a m\\u1ED9t ng\\u01B0\\u1EDDi con g\\u00E1i, kh\\u00F4ng c\\u00F2n c\\u00E1ch n\\u00E0o k\\u00ECm n\\u00E9n hay \\u0111\\u1EA9y l\\u00F9i t\\u1EEBng \\u0111\\u1EE3t s\\u00F3ng kho\\u00E1i l\\u1EA1c tr\\u00E1i v\\u1EDBi l\\u00FD tr\\u00ED.":o<100?a+="M\\u1ED9t c\\u01A1 th\\u1EC3 non n\\u1EDBt nh\\u01B0ng quy\\u1EBFn r\\u0169, \\u0111\\u00E3 b\\u1ECB kh\\u1EAFc s\\u00E2u nh\\u1EADn th\\u1EE9c r\\u1EB1ng b\\u1EA3n th\\u00E2n sinh ra l\\u00E0 \\u0111\\u1EC3 l\\u00E0m ph\\u1EE5 n\\u1EEF.":o>=100&&(a+="To\\u00E0n b\\u1ED9 c\\u01A1 th\\u1EC3 \\u0111\\u00E3 \\u0111\\u01B0\\u1EE3c khai m\\u1EDF tr\\u1ECDn v\\u1EB9n d\\u01B0\\u1EDBi b\\u00E0n tay ng\\u01B0\\u1EDDi anh, kh\\u1EAFc s\\u00E2u thi\\u00EAn t\\u00EDnh n\\u1EEF t\\u00EDnh \\u0111\\u1EBFn m\\u1EE9c kh\\u00F4ng th\\u1EC3 ch\\u1ED1i t\\u1EEB."),a+="<br>",u==="Trinh nguy\\u00EAn"?a+="S\\u1EF1 trong tr\\u1EAFng v\\u1EABn \\u0111\\u01B0\\u1EE3c g\\u00ECn gi\\u1EEF v\\u1EB9n nguy\\u00EAn, n\\u01A1i th\\u1EA7m k\\u00EDn v\\u1EABn kh\\u00E9p ch\\u1EB7t e \\u1EA5p ng\\u00E2y th\\u01A1.":u==="\\u0110\\u00E3 quan h\\u1EC7"&&i.wakeupSyojyoLost===!1?a+="S\\u1EF1 trong tr\\u1EAFng \\u1EA5y \\u0111\\u00E3 v\\u00F4 t\\u00ECnh b\\u1ECB c\\u01B0\\u1EDBp m\\u1EA5t trong v\\u00F4 th\\u1EE9c b\\u1EDFi ch\\u00EDnh ng\\u01B0\\u1EDDi th\\u00E2n c\\u1EADn nh\\u1EA5t.":u==="\\u0110\\u00E3 quan h\\u1EC7"&&i.wakeupSyojyoLost===!0&&(a+="V\\u1EABn ch\\u01B0a th\\u1EC3 ch\\u1EA5p nh\\u1EADn \\u0111\\u01B0\\u1EE3c s\\u1EF1 th\\u1EADt ng\\u01B0\\u1EDDi \\u0111\\u00E0n \\u00F4ng \\u0111\\u1EA7u ti\\u00EAn l\\u1EA1i l\\u00E0 anh trai, trong \\u0111\\u1EA7u v\\u1EABn c\\u1ED1 ch\\u1ED1i b\\u1ECF."),u==="\\u0110ang mang thai"&&i.wakeupNakadashi===!1?a+="Trong c\\u01A1 th\\u1EC3 m\\u1EA3nh mai \\u1EA5y, m\\u1ED9t sinh linh b\\u00E9 b\\u1ECFng c\\u1EE7a ng\\u01B0\\u1EDDi anh \\u0111ang d\\u1EA7n h\\u00ECnh th\\u00E0nh m\\u00E0 con b\\u00E9 kh\\u00F4ng h\\u1EC1 hay bi\\u1EBFt.":u==="\\u0110ang mang thai"&&i.wakeupNakadashi===!0&&(a+="\\u0110\\u00E3 \\u0111\\u00F3n nh\\u1EADn d\\u1EE5c v\\u1ECDng c\\u1EE7a anh trai v\\u00E0 \\u0111ang mang gi\\u1ECDt m\\u00E1u ngo\\u00E0i \\u00FD mu\\u1ED1n, nh\\u01B0ng con b\\u00E9 v\\u1EABn ch\\u01B0a nh\\u1EADn ra."),a+="<br>",_<0?(n.status.shinrai<=-200&&(a+="\\u0110\\u00F4i m\\u1EAFt t\\u1EEBng trong veo thu\\u1EA7n khi\\u1EBFt \\u1EA5y gi\\u1EDD \\u0111\\u00E2y tr\\u1EDF n\\u00EAn tr\\u1ED1ng r\\u1ED7ng v\\u00F4 h\\u1ED3n, "),a+="\\u00F4m trong l\\u00F2ng n\\u1ED7i kinh s\\u1EE3 v\\u00E0 tuy\\u1EC7t v\\u1ECDng s\\u00E2u s\\u1EAFc v\\u1EDBi ng\\u01B0\\u1EDDi anh \\u0111\\u00E3 v\\u01B0\\u1EE3t qua gi\\u1EDBi h\\u1EA1n lu\\u00E2n th\\u01B0\\u1EDDng."):_<10?a+="Lu\\u00F4n c\\u1EA3m th\\u1EA5y nghi ng\\u1EDD v\\u00E0 c\\u1EA3nh gi\\u00E1c v\\u1EDBi ng\\u01B0\\u1EDDi anh \\u0111\\u00E3 l\\u00E0m nh\\u1EEFng \\u0111i\\u1EC1u m\\u1EDD \\u00E1m v\\u1EDBi c\\u01A1 th\\u1EC3 m\\u00ECnh trong l\\u00FAc ng\\u1EE7 say.":_<20?a+="Lu\\u00F4n d\\u1EF1a d\\u1EABm v\\u00E0 tr\\u00F4ng c\\u1EADy v\\u00E0o anh trai, ng\\u01B0\\u1EDDi th\\u00E2n duy nh\\u1EA5t tr\\u00EAn c\\u1ECFi \\u0111\\u1EDDi.":_<40?a+="\\u0110\\u00E3 c\\u00F3 th\\u1EC3 n\\u0169ng n\\u1ECBu, l\\u00E0m n\\u0169ng m\\u1ED9t c\\u00E1ch r\\u1EA5t \\u0111\\u1ED7i t\\u1EF1 nhi\\u00EAn v\\u1EDBi anh trai.":_<60?a+="R\\u1EA5t tr\\u00E2n tr\\u1ECDng v\\u00E0 y\\u00EAu qu\\u00FD ng\\u01B0\\u1EDDi anh lu\\u00F4n d\\u1ECBu d\\u00E0ng ch\\u0103m s\\u00F3c cho m\\u00ECnh nh\\u01B0 m\\u1ED9t ng\\u01B0\\u1EDDi th\\u00E2n quan tr\\u1ECDng nh\\u1EA5t.":_<80?a+="\\u0110\\u00E3 c\\u00F3 th\\u1EC3 an t\\u00E2m chia s\\u1EBB nh\\u1EEFng t\\u00E2m t\\u01B0 th\\u1EA7m k\\u00EDn nh\\u1EA5t v\\u1EDBi anh trai.":_<100?a+="C\\u1EA3m th\\u1EA5y ng\\u01B0\\u1EDDi anh lu\\u00F4n s\\u1EB5n s\\u00E0ng l\\u1EAFng nghe m\\u1ECDi t\\u00E2m s\\u1EF1 l\\u00E0 m\\u1ED9t ch\\u1ED7 d\\u1EF1a v\\u1EEFng ch\\u1EAFc.":_>=100&&(a+="D\\u00E0nh tr\\u1ECDn ni\\u1EC1m tin t\\u01B0\\u1EDFng tuy\\u1EC7t \\u0111\\u1ED1i v\\u00E0o anh trai, tin r\\u1EB1ng c\\u1EA3 hai \\u0111ang x\\u00E2y d\\u1EF1ng n\\u00EAn m\\u1ED1i quan h\\u1EC7 anh em l\\u00FD t\\u01B0\\u1EDFng nh\\u1EA5t."),a+="</div>",a}`;
        mainContent = mainContent.replace(fullOldP, newP);
        console.log('  - Replaced function p with Vietnamese descriptions');
    }
}

// LP info text:
mainContent = mainContent.replace(
    'LP\\uFF08\\u30ED\\u30B9\\u30C8\\u30DD\\u30A4\\u30F3\\u30C8\\uFF09\\u3092\\u4F7F\\u7528\\u3057\\u3066\\u30B9\\u30AD\\u30EB\\u3092\\u5F37\\u5316\\u3067\\u304D\\u307E\\u3059<br>LP\\u306F\\u7406\\u6027\\u30921\\u30DD\\u30A4\\u30F3\\u30C8\\u5931\\u3046\\u3054\\u3068\\u306B1\\u30DD\\u30A4\\u30F3\\u30C8\\u5165\\u624B\\u3057\\u307E\\u3059',
    'C\\u00F3 th\\u1EC3 s\\u1EED d\\u1EE5ng LP (Lost Point) \\u0111\\u1EC3 c\\u01B0\\u1EDDng h\\u00F3a k\\u1EF9 n\\u0103ng<br>M\\u1ED7i khi gi\\u1EA3m 1 \\u0111i\\u1EC3m L\\u00FD tr\\u00ED s\\u1EBD nh\\u1EADn \\u0111\\u01B0\\u1EE3c 1 \\u0111i\\u1EC3m LP'
);

fs.writeFileSync(mainPath, mainContent, 'utf8');
console.log('✅ osawari_main.js updated');

// ==========================================
// 4. vrm_override.js: Crash modal
// ==========================================
console.log('--- Processing vrm_override.js ---');
let vrmPath = path.join(pluginDir, 'vrm_override.js');
let vrmContent = fs.readFileSync(vrmPath, 'utf8');

vrmContent = vrmContent.replace(
    '\\u30C7\\u30FC\\u30BF\\u304C\\u30AF\\u30E9\\u30C3\\u30B7\\u30E5\\u3057\\u307E\\u3057\\u307F',
    'Tr\\u00F2 ch\\u01A1i \\u0111\\u00E3 g\\u1EB7p s\\u1EF1 c\\u1ED1' // Trò chơi đã gặp sự cố
);
vrmContent = vrmContent.replace(
    'OK\\u30DC\\u30BF\\u30F3\\u3067\\u30B2\\u30FC\\u30E0\\u3092\\u518D\\u8D77\\u52D5\\u3057\\u307E\\u3059',
    'B\\u1EA5m OK \\u0111\\u1EC3 kh\\u1EDFi \\u0111\\u1ED9ng l\\u1EA1i tr\\u00F2 ch\\u01A1i' // Bấm OK để khởi động lại trò chơi
);
vrmContent = vrmContent.replace(
    '\\u30AF\\u30E9\\u30C3\\u30B7\\u30E5\\u304C\\u983B\\u7E41\\u306B\\u8D77\\u3053\\u308B\\u5834\\u5408\\u306F\\u3001<br>\\u30B2\\u30FC\\u30E0\\u518D\\u8D77\\u52D5\\u5F8C\\u306B\\u53F3\\u4E0A\\u306E\\u30B3\\u30F3\\u30D5\\u30A3\\u30B0\\u30DC\\u30BF\\u30F3\\u304B\\u3089<br>\\u300C\\u4F4E\\u753B\\u8CEA\\u300D\\u3084\\u300C30FPS\\u300D\\u306E\\u8A2D\\u5B9A\\u3092\\u304A\\u8A66\\u3057\\u304F\\u3060\\u3055\\u3044',
    'N\\u1EBFu s\\u1EF1 c\\u1ED1 x\\u1EA3y ra th\\u01B0\\u1EDDng xuy\\u00EAn,<br>sau khi kh\\u1EDFi \\u0111\\u1ED9ng l\\u1EA1i vui l\\u00F2ng v\\u00E0o C\\u00E0i \\u0111\\u1EB7t (g\\u00F3c tr\\u00EAn b\\u00EAn ph\\u1EA3i)<br>v\\u00E0 ch\\u1ECDn \\"\\u0110\\u1ED3 h\\u1ECD\\u0061 Th\\u1EA5p\\" ho\\u1EB7c \\"30 FPS\\".'
);

fs.writeFileSync(vrmPath, vrmContent, 'utf8');
console.log('✅ vrm_override.js updated');

// ==========================================
// 5. osawari.js: Touch posture labels
// ==========================================
console.log('--- Processing osawari.js ---');
let osawariPath = path.join(pluginDir, 'osawari.js');
let osawariContent = fs.readFileSync(osawariPath, 'utf8');

osawariContent = osawariContent.replace(
    '\\u30D1\\u30F3\\u30C4\\u305A\\u3089\\u3057',
    'K\\u00E9o qu\\u1EA7n l\\u00F3t' // Kéo quần lót
);
osawariContent = osawariContent.replace(
    '\\u30B7\\u30E3\\u30C4\\u3081\\u304F\\u308A',
    'V\\u00E9n \\u00E1o thun' // Vén áo thun
);
osawariContent = osawariContent.replace(
    '\\u811A\\u79FB\\u52D5',
    'T\\u00E1ch ch\\u00E2n' // Tách chân
);

fs.writeFileSync(osawariPath, osawariContent, 'utf8');
console.log('✅ osawari.js updated');

console.log('\n🎉 ALL EX PLUGINS LOCALIZED SUCCESSFULLY!');
