/**
 * Sismes - VRoid & WebGL High-Definition Mobile Optimization & Tool Rendering Engine
 * ===================================================================================
 * - Đảm bảo độ sắc nét cao (Chuẩn HD / 60 FPS), loại bỏ hoàn toàn răng cưa (2x MSAA + Trilinear Mipmaps)
 * - Tối ưu texture model chính (Yui model1) tránh tràn VRAM WebKit iOS (~300MB)
 * - ĐẢM BẢO 100% HIỂN THỊ MÔ HÌNH THAO TÁC (Bàn tay L/R, Lưỡi bero, Dương vật chin)
 * - Miễn nhiễm hoàn toàn với lỗi tàng hình do BlendShape Hide (LeftHandHide, ChinHide, BeroHide)
 * - Tự động vệ sinh và sửa lỗi cấu hình sf.con.opa (Độ mờ công cụ) từ save cũ
 * - Giữ nguyên vẹn mesh và shader gốc cho toàn bộ tool (L, R, bero, chin, danmen)
 * - Xử lý khôi phục ngữ cảnh WebGL tự động chống crash
 */

(function () {
    'use strict';

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMobile = isIOS || /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    console.log(`[VRM Engine] Khởi chạy bộ hiển thị HD 60 FPS & Fix Action Models (isIOS: ${isIOS}, isMobile: ${isMobile})`);

    // 1. Cấu hình mặc định sắc nét & mở khóa 60 FPS, độ hiển thị công cụ 100% rõ
    function sanitizeCon(con) {
        if (!con) return;
        if (con.fps < 60) con.fps = 60;
        if (con.graphic < 1.0) con.graphic = 1.0;
        // Nếu opa bị NaN, undefined hoặc >= 0.8 (bị tàng hình hoàn toàn), lập tức khôi phục về 0 (hiện 100%)
        if (isNaN(con.opa) || con.opa === undefined || con.opa === null || con.opa >= 0.8) {
            con.opa = 0;
        }
    }

    if (typeof SISMES !== 'undefined' && SISMES.initConfig) {
        SISMES.initConfig.graphic = 1.0;
        SISMES.initConfig.fps = 60;
        SISMES.initConfig.opa = 0; // 0 = Hiển thị 100% rõ ràng, không ẩn
    }

    // Vệ sinh sf.con liên tục trong giai đoạn khởi động để save cũ không làm ẩn model
    const cleanTimer = setInterval(() => {
        try {
            if (window.TYRANO && window.TYRANO.kag && window.TYRANO.kag.variable && window.TYRANO.kag.variable.sf) {
                const sf = window.TYRANO.kag.variable.sf;
                if (sf.con) sanitizeCon(sf.con);
            }
            if (window.SISMES && window.SISMES.initConfig) {
                window.SISMES.initConfig.opa = 0;
            }
        } catch (e) {}
    }, 500);
    setTimeout(() => clearInterval(cleanTimer), 15000);

    // 2. Thu nhỏ kết cấu an toàn (chỉ áp dụng cho Yui - model1)
    function downscaleTexture(texture, maxSize) {
        try {
            if (!texture || !texture.image) return;
            if (texture._downscaledTo && texture._downscaledTo <= maxSize) return;
            const img = texture.image;
            const w = img.naturalWidth || img.videoWidth || img.width || 0;
            const h = img.naturalHeight || img.videoHeight || img.height || 0;
            if (w <= maxSize && h <= maxSize) {
                texture._downscaledTo = Math.max(w, h);
                return;
            }
            if (w === 0 || h === 0) return;

            let targetW = w;
            let targetH = h;
            if (w >= h) {
                targetW = maxSize;
                targetH = Math.max(1, Math.round((h * maxSize) / w));
            } else {
                targetH = maxSize;
                targetW = Math.max(1, Math.round((w * maxSize) / h));
            }

            const canvas = document.createElement('canvas');
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext('2d', { willReadFrequently: false });
            if (!ctx) return;

            ctx.drawImage(img, 0, 0, targetW, targetH);
            texture.image = canvas;
            texture._downscaledTo = maxSize;
            texture.needsUpdate = true;
        } catch (e) {
            console.warn('[VRM Optimizer] Texture downscale notice:', e);
        }
    }

    // 3. Tối ưu mesh nhân vật chính Yui (bật Mipmaps chống răng cưa, khống chế VRAM 1024/2048px)
    function optimizeModelMesh(rootObj) {
        if (!rootObj) return;
        const maxTexSize = isIOS ? 1024 : 2048;
        // Trên iOS Safari: giảm auxiliary textures (shade, normal, rim, outline) xuống 512px để tiết kiệm 75% VRAM tránh Jetsam
        const maxShadeTexSize = isIOS ? 512 : 1024;

        rootObj.traverse((obj) => {
            if (!obj.isMesh || !obj.material) return;
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            for (const mat of mats) {
                if (!mat) continue;

                if (mat.map && mat.map.image) {
                    downscaleTexture(mat.map, maxTexSize);
                }
                if (mat.shadeMultiplyTexture && mat.shadeMultiplyTexture.image) {
                    downscaleTexture(mat.shadeMultiplyTexture, maxShadeTexSize);
                }
                if (mat.normalMap && mat.normalMap.image) {
                    downscaleTexture(mat.normalMap, maxShadeTexSize);
                }
                if (mat.rimMultiplyTexture && mat.rimMultiplyTexture.image) {
                    downscaleTexture(mat.rimMultiplyTexture, maxShadeTexSize);
                }
                if (mat.outlineWidthMultiplyTexture && mat.outlineWidthMultiplyTexture.image) {
                    downscaleTexture(mat.outlineWidthMultiplyTexture, maxShadeTexSize);
                }

                [mat.map, mat.shadeMultiplyTexture, mat.normalMap, mat.rimMultiplyTexture].forEach(tex => {
                    if (tex) {
                        tex.generateMipmaps = true;
                        tex.minFilter = (window.THREE && window.THREE.LinearMipmapLinearFilter) || 1008;
                        tex.magFilter = (window.THREE && window.THREE.LinearFilter) || 1006;
                        tex.needsUpdate = true;
                    }
                });
            }
        });
    }

    // 4. Hàm đảm bảo hiển thị tuyệt đối cho mô hình công cụ (Hand, Tongue, Penis)
    function ensureToolModelVisible(modelScene) {
        if (!modelScene) return;
        modelScene.visible = true;
        modelScene.traverse((obj) => {
            if (obj.isMesh) {
                obj.visible = true;
                const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                for (const mat of mats) {
                    if (!mat) continue;
                    mat.visible = true;
                    if (isNaN(mat.opacity) || mat.opacity < 0.2) {
                        mat.opacity = 1.0;
                    }
                    mat.depthTest = true;
                    mat.depthWrite = true;
                    mat.needsUpdate = true;
                }
            }
        });
    }

    // 5. Hook VRoid.three Engine
    if (window.VRoid && window.VRoid.three) {
        const V3 = window.VRoid.three;

        // Hook VRoid.three.create
        const origCreate = V3.create;
        V3.create = function (opts) {
            opts = opts || {};
            opts.antialias = 2; // Khử răng cưa 2x MSAA mịn màng
            opts.screenshot = false;
            opts.powerPreference = "default";
            opts.quality = Math.max(Number(opts.quality) || 1.0, 1.0);
            opts.maxFPS = 60;
            opts.limitFPS = false;

            const res = origCreate.call(this, opts);

            const layer = this.layer[opts.layerID];
            if (layer) {
                // Trên iOS Safari: clamp pixelRatio chuẩn 1.0 (chuẩn HD 720p 1:1, tiết kiệm ~40% VRAM tránh Jetsam crash)
                // Trên Android/PC: cho phép 1.25x hoặc 1.5x
                const targetRatio = isIOS ? 1.0 : (isMobile ? Math.min(window.devicePixelRatio || 1, 1.25) : Math.min(window.devicePixelRatio || 1, 1.5));
                if (layer.renderer) layer.renderer.setPixelRatio(targetRatio);
                if (layer.composer) layer.composer.setPixelRatio(targetRatio);

                if (layer.pixelRatioUpdate) {
                    const origPRUpdate = layer.pixelRatioUpdate;
                    layer.pixelRatioUpdate = function (force) {
                        origPRUpdate.call(this, force);
                        const safeRatio = isIOS ? 1.0 : (isMobile ? Math.min(layer.ratio, 1.25) : 1.5);
                        if (layer.renderer && layer.ratio > safeRatio) {
                            layer.ratio = safeRatio;
                            layer.renderer.setPixelRatio(safeRatio);
                            if (layer.composer) layer.composer.setPixelRatio(safeRatio);
                        }
                        if (layer.viewport) {
                            for (const vp of Object.values(layer.viewport)) {
                                if (vp && vp.composer) vp.composer.setPixelRatio(safeRatio);
                            }
                        }
                    };
                }
            }
            return res;
        };

        // Hook VRoid.three.load: CHỈ tối ưu model1 (Yui), BẢO VỆ NGUYÊN VẸN bero, chin, L, R, danmen!
        const origLoad = V3.load;
        V3.load = function (modelID, storage, callback, wait, maker, opts) {
            const wrappedCb = function () {
                try {
                    const m = V3.model[modelID];
                    if (modelID === 'model1' && m && m.vrm && m.vrm.scene) {
                        optimizeModelMesh(m.vrm.scene);
                    } else if (m && m.vrm && m.vrm.scene) {
                        // Đối với tool (L, R, bero, chin), đảm bảo opacity và visibility luôn sẵn sàng
                        ensureToolModelVisible(m.vrm.scene);
                    }
                } catch (err) {
                    console.warn('[VRM Optimizer] Lỗi tối ưu VRM model:', err);
                }
                if (typeof callback === 'function') callback();
            };
            return origLoad.call(this, modelID, storage, wrappedCb, wait, maker, opts);
        };

        // Hook VRoid.three.emotion: Chặn lỗi Hide khiến công cụ biến mất hoàn toàn
        const origEmotion = V3.emotion;
        V3.emotion = function (i, e, t, o, r, n, a, s, c, l) {
            if (c && (c === "LeftHandHide" || c === "RightHandHide" || c === "BeroHide" || c === "ChinHide")) {
                let num = Number(l);
                if (isNaN(num) || num === undefined || num === null) num = 0;
                // Giới hạn độ ẩn tối đa 0.4 (vẫn nhìn thấy rõ 60% thay vì tàng hình hoàn toàn)
                if (num > 0.4) num = 0.2;
                l = num;
            }
            return origEmotion.call(this, i, e, t, o, r, n, a, s, c, l);
        };

        // Hook osawariStartEvent: Khi bắt đầu hành động, đảm bảo mô hình bàn tay/lưỡi/dương vật lập tức hiện rõ
        const origStartEventHook = () => {
            if (V3.osawariStartEvent && !V3.osawariStartEvent._isHooked) {
                const origStart = V3.osawariStartEvent;
                V3.osawariStartEvent = function (t, i) {
                    const res = origStart.call(this, t, i);
                    try {
                        const toolIds = ['L', 'R', 'bero', 'chin'];
                        for (const tid of toolIds) {
                            const tm = V3.model?.[tid]?.vrm?.scene;
                            if (tm && tm.visible) {
                                ensureToolModelVisible(tm);
                            }
                        }
                    } catch (e) {}
                    return res;
                };
                V3.osawariStartEvent._isHooked = true;
            }
        };

        // Kích hoạt hook osawariStartEvent
        origStartEventHook();
        const hookCheckInterval = setInterval(() => {
            origStartEventHook();
            if (V3.osawariStartEvent?._isHooked) clearInterval(hookCheckInterval);
        }, 1000);

        // Hook VRoid.three.obj3D_load cho các vật phẩm 3D GLB
        if (V3.obj3D_load) {
            const origObj3DLoad = V3.obj3D_load;
            V3.obj3D_load = function (opts, cb) {
                const wrappedCb = function () {
                    try {
                        const name = opts?.name || opts?.storage?.replace(/\.[^/.]+$/, "");
                        if (name && V3.obj3D?.name?.[name]) {
                            optimizeModelMesh(V3.obj3D.name[name]);
                        }
                    } catch (err) {
                        console.warn('[VRM Optimizer] Lỗi tối ưu Obj3D:', err);
                    }
                    if (typeof cb === 'function') cb();
                };
                return origObj3DLoad.call(this, opts, wrappedCb);
            };
        }

        // Khôi phục WebGL Context khi bị ngắt quãng
        V3.restore = function () {
            console.warn('[VRoid WebGL] WebGL context bị gián đoạn.');
            document.getElementById("VRoid_loading_mask2")?.remove();
            $("#tyrano_base").append("<div id='VRoid_loading_mask2' style='z-index: 299999999; position: absolute; background-repeat: no-repeat; background-position: 5px 5px; background-color: rgb(0, 0, 0); width: 1300px; height: 740px; top: -10px; left: -10px; backface-visibility: hidden;'></div>");

            const reloadFn = function () {
                if (window.studio_api && window.studio_api.ipcRenderer) {
                    window.studio_api.ipcRenderer.invoke("app-relaunch");
                } else {
                    location.reload();
                }
            };

            if (typeof SISMES !== 'undefined' && SISMES.showOK) {
                SISMES.showOK(
                    "Bộ nhớ đồ họa 3D bị gián đoạn.<br>Bấm OK để tải lại trò chơi.<br><span style='font-size: 18px; line-height: 28px;'>* Mẹo: Vào Cài đặt (nút góc trên bên phải) chọn Đồ họa Thấp nếu máy bị quá tải.</span>",
                    reloadFn,
                    void 0,
                    false,
                    "top: 190px;"
                );
            } else {
                if (confirm("Bộ nhớ đồ họa 3D bị gián đoạn. Tải lại trang?")) {
                    reloadFn();
                }
            }
        };

        // 6. Safeguard cho hệ thống tương tác chạm (Touch / Click Osawari) chống kẹt cờ disableOsawari trên Mobile & sau khi mở Cài đặt
        function resetStickyOsawari() {
            if (window.VRoid && window.VRoid.three) {
                window.VRoid.three.disableOsawari = false;
            }
            if (window.SISMES) {
                window.SISMES.isEventGuard = false;
            }
        }

        document.addEventListener('touchstart', function (e) {
            const target = e.target;
            if (!target) return;
            const isUI = target.closest && (
                target.closest('.disableOsawari') || 
                target.closest('#sismes_config') || 
                target.closest('#showConfirmArea') || 
                target.closest('.remodal')
            );
            if (!isUI) {
                resetStickyOsawari();
            }
        }, { capture: true, passive: true });

        document.addEventListener('touchend', function () {
            setTimeout(resetStickyOsawari, 60);
        }, { passive: true });

        document.addEventListener('pointerup', function () {
            setTimeout(resetStickyOsawari, 60);
        }, { passive: true });
    }
})();
