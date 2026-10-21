const sismes={};(function(){sismes.config=function(){
    // Chống mở lặp
    if (document.getElementById("sismes_config")) return;
    $(".sismes_config").css("pointer-events","none");

    // Lấy FPS an toàn tuyệt đối (tránh crash undefined trên iOS Safari)
    const statsObj = window.VRoid?.three?.layer?.VRoid?.stats;
    const initialFPS = (statsObj && typeof statsObj.fps === "number" && !isNaN(statsObj.fps)) ? Math.round(statsObj.fps) : 60;

    // Tạo Backdrop phủ toàn màn hình để chạm bất kỳ đâu bên ngoài đều đóng được
    $("#sismes_config_backdrop").remove();
    $("#sismes_config").remove();
    $("body").append("<div id='sismes_config_backdrop' style='position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:299999998; background:rgba(0,0,0,0.5); -webkit-tap-highlight-color:transparent;'></div>");

    let v = "<div id='sismes_config' class='fixlayer'>" +
        "<div id='sismes_config_close' class='btn_black' style='cursor:pointer; touch-action:manipulation;'>×</div>" +
        "<div id='sismes_config_inner'>" +
            "<div id='sismes_config_koui'>Âm thanh　<span id='config_koui_0' class='config_koui'>□</span> <span id='config_koui_20' class='config_koui'>□</span> <span id='config_koui_40' class='config_koui'>□</span> <span id='config_koui_60' class='config_koui'>□</span> <span id='config_koui_80' class='config_koui'>□</span> <span id='config_koui_100' class='config_koui'>□</span></div>" +
            "<div id='sismes_config_koe'>Giọng nói　<span id='config_koe_0' class='config_koe'>□</span> <span id='config_koe_20' class='config_koe'>□</span> <span id='config_koe_40' class='config_koe'>□</span> <span id='config_koe_60' class='config_koe'>□</span> <span id='config_koe_80' class='config_koe'>□</span> <span id='config_koe_100' class='config_koe'>□</span></div>" +
            "<div id='sismes_config_msg'>Tốc độ　<span id='config_msg_50' class='config_msg'>□</span> <span id='config_msg_40' class='config_msg'>□</span> <span id='config_msg_30' class='config_msg'>□</span> <span id='config_msg_20' class='config_msg'>□</span> <span id='config_msg_10' class='config_msg'>□</span> <span id='config_msg_0' class='config_msg'>□</span></div>" +
            "<div id='sismes_config_opa'>Ẩn công cụ　<span id='config_opa_10' class='config_opa'>□</span> <span id='config_opa_8' class='config_opa'>□</span> <span id='config_opa_6' class='config_opa'>□</span> <span id='config_opa_4' class='config_opa'>□</span> <span id='config_opa_2' class='config_opa'>□</span> <span id='config_opa_0' class='config_opa'>□</span></div>" +
            "<div id='sismes_config_graphic'>Đồ họa　<span id='config_graphic_low' class='config_graphic btn_black'> Thấp </span> <span id='config_graphic_normal' class='config_graphic btn_black'> Vừa </span> <span id='config_graphic_high' class='config_graphic btn_black'> Cao </span> </div>" +
            "<div id='sismes_config_fps'><span class='monospaceChar'>F</span><span class='monospaceChar'>P</span><span class='monospaceChar'>S</span>　<span id='config_fps_30' class='config_fps btn_black'>　30　</span> <span id='config_fps_60' class='config_fps btn_black'>　60　</span> <span id='config_fps_0' class='config_fps btn_black'>　max　</span> </div>" +
            "<div id='sismes_config_danmen'>Mặt cắt　<span id='config_danmen_false' class='config_danmen btn_black'> Tắt </span> <span id='config_danmen_true' class='config_danmen btn_black'> Bật </span> </div>" +
            "<div id='sismes_config_default' class='btn_black'>Mặc định</div>" +
            "<div id='sismes_config_full' class='btn_black'>Toàn màn hình</div>" +
            "<div id='sismes_config_title' class='btn_black'>Về Tiêu đề</div>" +
            "<div id='sismes_config_pwa' class='btn_black'>📱 Cài đặt App / Toàn màn hình</div>" +
            "<div id='sismes_config_fps_text'>FPS:</div>" +
            "<div id='sismes_config_fps_val'>" + initialFPS + "</div>" +
            "<div id='sismes_config_close_btn' class='btn_black' style='position:absolute; top:425px; left:40px; width:320px; height:34px; line-height:34px; text-align:center; font-size:15px; cursor:pointer; touch-action:manipulation;'>✕ Đóng Cài đặt</div>" +
        "</div>" +
    "</div>";

    $("#tyrano_base").append(v);
    const t = document.getElementById("sismes_config"),
          n = TYRANO.kag,
          a = n.variable.sf.con,
          o = VRoid.three;

    let l = "high";
    a.graphic == 1 ? l = "normal" : a.graphic == .75 && (l = "low");
    $("#config_se_" + a.se).text("■");
    $("#config_koui_" + a.koui).text("■");
    $("#config_koe_" + a.koe).text("■");
    $("#config_msg_" + a.msg).text("■");
    $("#config_opa_" + Math.round(a.opa * 10)).text("■");
    $("#config_graphic_" + l).removeClass("btn_black").addClass("btn_white");
    $("#config_fps_" + a.fps).removeClass("btn_black").addClass("btn_white");
    $("#config_danmen_" + String(a.danmen)).removeClass("btn_black").addClass("btn_white");

    // Hàm đóng Cài đặt an toàn 100%, bảo đảm không crash ở bất kỳ màn nào
    const closeConfig = function (e) {
        if (e) {
            try { e.preventDefault(); e.stopPropagation(); } catch (err) {}
        }
        clearInterval(k);
        $("#sismes_config").remove();
        $("#sismes_config_backdrop").remove();
        $(".sismes_config").css("pointer-events", "");

        if (window.VRoid && window.VRoid.three) {
            window.VRoid.three.disableOsawari = false;
        }

        if (typeof SISMES !== "undefined") {
            SISMES.isEventGuard = false;
            // CHỈ gọi enableOsawari nếu đang thực sự ở chế độ sờ mó ban đêm (osawari)
            if (SISMES.layerFreeStyle && typeof SISMES.enableOsawari === "function") {
                try {
                    SISMES.enableOsawari(true);
                } catch (err) {
                    console.warn('[Config] enableOsawari error handled:', err);
                }
            }
        }

        const lf = document.getElementById("layer_free");
        if (lf) lf.style.pointerEvents = "";
        const tb = document.getElementById("tyrano_base");
        if (tb) tb.style.pointerEvents = "";
    };

    // Đóng bằng nút X, nút Đóng dưới đáy, hoặc chạm vào Backdrop nền mờ
    $("#sismes_config_close").on("click touchend", closeConfig);
    $("#sismes_config_close_btn").on("click touchend", closeConfig);
    $("#sismes_config_backdrop").on("click touchend", closeConfig);

    const f = $(".config_se");
    f.on("click touchend", function(i) {
        const s = i.currentTarget.id.replace("config_se_", "");
        f.text("□"); $(this).text("■");
        n.ftag.startTag("seopt", { volume: s, buf: "0", next: "false" });
        a.se = Number(s); n.saveSystemVariable(!0);
    });

    const g = $(".config_koui");
    g.on("click touchend", function(i) {
        const s = i.currentTarget.id.replace("config_koui_", "");
        g.text("□"); $(this).text("■");
        n.ftag.startTag("seopt", { volume: s, buf: "1", next: "false" });
        n.ftag.startTag("seopt", { volume: s, buf: "3", next: "false" });
        n.ftag.startTag("seopt", { volume: s, buf: "4", next: "false" });
        n.ftag.startTag("seopt", { volume: s, buf: "5", next: "false" });
        n.ftag.startTag("seopt", { volume: s, buf: "6", next: "false" });
        a.koui = Number(s); n.saveSystemVariable(!0);
    });

    const p = $(".config_koe");
    p.on("click touchend", function(i) {
        const s = i.currentTarget.id.replace("config_koe_", "");
        p.text("□"); $(this).text("■");
        n.ftag.startTag("seopt", { volume: s, buf: "2", next: "false" });
        a.koe = Number(s); n.saveSystemVariable(!0);
    });

    const r = $(".config_msg");
    r.on("click touchend", function(i) {
        const s = Number(i.currentTarget.id.replace("config_msg_", ""));
        r.text("□"); $(this).text("■");
        n.config.chSpeed = String(s);
        a.msg = s; n.saveSystemVariable(!0);
    });

    const d = $(".config_opa");
    d.on("click touchend", function(i) {
        const s = Number(i.currentTarget.id.replace("config_opa_", "")) * .1;
        d.text("□"); $(this).text("■");
        if (o && typeof o.emotion === "function") {
            o.emotion("L", null, 0, null, null, null, null, !0, "LeftHandHide", s);
            o.emotion("R", null, 0, null, null, null, null, !0, "RightHandHide", s);
            o.emotion("bero", null, 0, null, null, null, null, !0, "BeroHide", s);
            o.emotion("chin", null, 0, null, null, null, null, !0, "ChinHide", s);
        }
        a.opa = s; n.saveSystemVariable(!0);
    });

    const u = $(".config_graphic");
    u.on("click touchend", function(i) {
        const s = i.currentTarget.id.replace("config_graphic_", "");
        u.removeClass("btn_white").addClass("btn_black");
        $(this).removeClass("btn_black").addClass("btn_white");
        let e = 1.25;
        s == "normal" ? e = 1 : s == "low" && (e = .75);
        if (o && typeof o.layer_config === "function") {
            o.layer_config({ layerID: "VRoid", quality: e });
        }
        a.graphic = e; n.saveSystemVariable(!0);
    });

    const m = $(".config_fps");
    m.on("click touchend", function(i) {
        const s = i.currentTarget.id.replace("config_fps_", "");
        m.removeClass("btn_white").addClass("btn_black");
        $(this).removeClass("btn_black").addClass("btn_white");
        if (o && typeof o.layer_config === "function") {
            o.layer_config({ layerID: "VRoid", maxFPS: Number(s) });
        }
        a.fps = Number(s); n.saveSystemVariable(!0);
    });

    const b = $(".config_danmen");
    b.on("click touchend", function(i) {
        const s = i.currentTarget.id.replace("config_danmen_", "");
        b.removeClass("btn_white").addClass("btn_black");
        $(this).removeClass("btn_black").addClass("btn_white");
        a.danmen = s === "true";
        n.saveSystemVariable(!0);
        a.danmen ? $(".viewportCamera_d").removeClass("disableUI") : $(".viewportCamera_d").addClass("disableUI");
    });

    $("#sismes_config_default").on("click touchend", function(i) {
        SISMES.showConfirm("Khôi phục cài đặt mặc định?", function(s) {
            if (s) {
                const e = n.variable.sf;
                e.con = $.extend(!0, {}, SISMES.initConfig);
                closeConfig();
                $(".sismes_config").click();
                n.saveSystemVariable(!0);
                const c = n.ftag;
                c.startTag("seopt", { volume: e.con.se, buf: 0, next: "false" });
                c.startTag("seopt", { volume: e.con.koui, buf: "1", next: "false" });
                c.startTag("seopt", { volume: e.con.koui, buf: "3", next: "false" });
                c.startTag("seopt", { volume: e.con.koui, buf: "4", next: "false" });
                c.startTag("seopt", { volume: e.con.koui, buf: "5", next: "false" });
                c.startTag("seopt", { volume: e.con.koui, buf: "6", next: "false" });
                c.startTag("seopt", { volume: e.con.koe, buf: "2", next: "false" });
                n.config.chSpeed = String(e.con.msg);
                if (o && typeof o.layer_config === "function") {
                    o.layer_config({ layerID: "VRoid", quality: e.con.graphic });
                    o.layer_config({ layerID: "VRoid", maxFPS: Number(e.con.fps) });
                }
            }
        });
    });

    $("#sismes_config_full").on("click touchend", function(i) {
        if (document.fullscreenElement) {
            document.exitFullscreen?.();
        } else {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            }
        }
    });

    $("#sismes_config_pwa").on("click touchend", function(i) {
        if (window.promptPWAInstall) window.promptPWAInstall();
    });

    $("#sismes_config_title").on("click touchend", function(i) {
        SISMES.showConfirm("Trở về màn hình tiêu đề?", function(s) {
            if (s) {
                closeConfig();
                n.ftag.startTag("jump", { storage: "title.ks", target: "return_title" });
            }
        }, void 0, void 0, !1);
    });

    const k = setInterval(() => {
        const fpsEl = document.getElementById("sismes_config_fps_val");
        if (!fpsEl) { clearInterval(k); return; }
        const currentStats = window.VRoid?.three?.layer?.VRoid?.stats;
        if (currentStats && typeof currentStats.fps === "number" && !isNaN(currentStats.fps)) {
            fpsEl.textContent = Math.round(currentStats.fps);
        }
    }, 500);
}})();

(function() {
    function checkNameBadge() {
        const el = document.querySelector('.chara_name_area');
        if (!el) return;
        const txt = el.textContent ? el.textContent.trim() : '';
        if (!txt) {
            el.style.setProperty('display', 'none', 'important');
        } else {
            el.style.removeProperty('display');
        }
    }
    const observer = new MutationObserver(checkNameBadge);
    function initObserver() {
        const target = document.getElementById('tyrano_base') || document.body;
        if (target) {
            observer.observe(target, { childList: true, subtree: true, characterData: true });
        }
        checkNameBadge();
    }
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', initObserver);
    } else {
        initObserver();
    }
})();
