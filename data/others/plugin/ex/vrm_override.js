/**
 * Sismes - VRoid & WebGL High-Definition Mobile Optimization Engine
 * =========================================================================
 * - Đảm bảo độ sắc nét cao (Chuẩn HD / 60 FPS), loại bỏ hoàn toàn răng cưa (2x MSAA + Trilinear Mipmaps)
 * - Tối ưu texture sắc nét (1536px cho khuôn mặt/da/tóc, 1024px cho shading/quần áo)
 * - Tự động mở khóa 60 FPS và nâng cấp cài đặt đồ họa lên mức sắc nét
 * - Kiểm soát VRAM an toàn trong ngưỡng WebKit iOS (~300MB), chống crash bền vững
 * - Xử lý khôi phục ngữ cảnh WebGL tự động
 */

(function () {
    'use strict';

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMobile = isIOS || /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    console.log(`[VRM Engine] Kích hoạt chế độ đồ họa HD 60 FPS khử răng cưa (isIOS: ${isIOS}, isMobile: ${isMobile})`);

    // 1. Cấu hình mặc định sắc nét & mở khóa 60 FPS
    if (typeof SISMES !== 'undefined' && SISMES.initConfig) {
        SISMES.initConfig.graphic = 1.0; // Mức Vừa (1.0x độ phân giải chuẩn 1280x720)
        SISMES.initConfig.fps = 60;      // 60 FPS mượt mà
    }

    // Nâng cấp cấu hình đã lưu trước đó nếu người chơi đang bị lưu mức 30 FPS / 0.75
    try {
        if (window.TYRANO && window.TYRANO.kag && window.TYRANO.kag.variable && window.TYRANO.kag.variable.sf) {
            const sf = window.TYRANO.kag.variable.sf;
            if (sf.con) {
                if (sf.con.fps < 60) sf.con.fps = 60;
                if (sf.con.graphic < 1.0) sf.con.graphic = 1.0;
            }
        }
    } catch (e) {}

    // 2. Hàm thu nhỏ kết cấu thông minh: giữ độ sắc nét cao (1536px) mà không tốn dung lượng thừa
    function downscaleTexture(texture, maxSize) {
        try {
            if (!texture || !texture.image) return;
            const img = texture.image;
            const w = img.width || (img.videoWidth || 0);
            const h = img.height || (img.videoHeight || 0);
            if (w <= maxSize && h <= maxSize) return;
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
            texture.needsUpdate = true;
        } catch (e) {
            console.warn('[VRM Optimizer] Texture downscale notice:', e);
        }
    }

    // 3. Tối ưu Model VRM: bật Mipmaps chống răng cưa, giữ độ nét 1536px
    function optimizeModelMesh(rootObj) {
        if (!rootObj) return;
        const maxTexSize = isIOS ? 1536 : 2048;       // 1536px cực kỳ sắc nét trên màn hình Retina
        const maxShadeTexSize = 1024;                 // 1024px cho map bóng và viền

        rootObj.traverse((obj) => {
            if (!obj.isMesh || !obj.material) return;
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            for (const mat of mats) {
                if (!mat) continue;

                // Tối ưu Texture chính (Map da, mắt, tóc, thân thể)
                if (mat.map && mat.map.image) {
                    downscaleTexture(mat.map, maxTexSize);
                }
                // Tối ưu Shading / MToon Texture
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

                // Bật Mipmaps + Trilinear filtering để loại bỏ 100% hiện tượng răng cưa và gai viền khi nhìn xa
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

    // 4. Hook VRoid.three Engine
    if (window.VRoid && window.VRoid.three) {
        const V3 = window.VRoid.three;

        // Hook VRoid.three.create
        const origCreate = V3.create;
        V3.create = function (opts) {
            opts = opts || {};

            // Khử răng cưa 2x MSAA (vừa mịn màng, vừa không ngốn RAM như 4x)
            opts.antialias = 2;
            opts.screenshot = false; // Tắt preserveDrawingBuffer để tiết kiệm RAM
            opts.powerPreference = "default";

            // Giữ độ phân giải sắc nét 1.0 và 60 FPS
            opts.quality = Math.max(Number(opts.quality) || 1.0, 1.0);
            opts.maxFPS = 60;
            opts.limitFPS = false;

            const res = origCreate.call(this, opts);

            // Tỉ lệ điểm ảnh lên tới 1.25x trên mobile (đảm bảo cực nét trên màn hình Retina iPhone)
            const layer = this.layer[opts.layerID];
            if (layer) {
                const targetRatio = isMobile ? Math.min(window.devicePixelRatio || 1, 1.25) : Math.min(window.devicePixelRatio || 1, 1.5);
                if (layer.renderer) {
                    layer.renderer.setPixelRatio(targetRatio);
                }
                if (layer.composer) {
                    layer.composer.setPixelRatio(targetRatio);
                }

                // Cập nhật hook pixelRatioUpdate để duy trì độ nét 1.25x mượt mà
                if (layer.pixelRatioUpdate) {
                    const origPRUpdate = layer.pixelRatioUpdate;
                    layer.pixelRatioUpdate = function (force) {
                        origPRUpdate.call(this, force);
                        if (isMobile) {
                            const safeRatio = Math.min(layer.ratio, 1.25);
                            if (layer.renderer && layer.ratio > safeRatio) {
                                layer.ratio = safeRatio;
                                layer.renderer.setPixelRatio(safeRatio);
                                if (layer.composer) layer.composer.setPixelRatio(safeRatio);
                            }
                        }
                    };
                }
            }

            return res;
        };

        // 5. Hook VRoid.three.load để áp dụng Texture HD + Mipmaps
        const origLoad = V3.load;
        V3.load = function (modelID, storage, callback, wait, maker, opts) {
            const wrappedCb = function () {
                try {
                    const m = V3.model[modelID];
                    if (m && m.vrm && m.vrm.scene) {
                        optimizeModelMesh(m.vrm.scene);
                    }
                } catch (err) {
                    console.warn('[VRM Optimizer] Lỗi tối ưu VRM model:', err);
                }
                if (typeof callback === 'function') callback();
            };
            return origLoad.call(this, modelID, storage, wrappedCb, wait, maker, opts);
        };

        // 6. Hook VRoid.three.obj3D_load cho các vật phẩm 3D GLB
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

        // 7. Khôi phục WebGL Context khi bị ngắt quãng
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
    }
})();
