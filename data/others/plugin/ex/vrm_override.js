/**
 * Sismes - VRoid & WebGL Memory Optimization Engine for Mobile & iOS WebKit
 * =========================================================================
 * - Ngăn chặn crash WebProcess ("A problem repeatedly occurred") trên iPhone Safari
 * - Tự động thu nhỏ Texture lớn (2048px -> 1024px/512px) tiết kiệm đến 75% GPU VRAM
 * - Tắt MSAA 4x đa mẫu và preserveDrawingBuffer trên trình duyệt di động
 * - Khống chế devicePixelRatio ở mức 1.0x (1280x720 sắc nét, không nhân 3x màn hình Retina)
 * - Tự động kích hoạt cấu hình Đồ họa Thấp / 30 FPS an toàn cho iOS
 * - Bộ xử lý khôi phục ngữ cảnh WebGL mượt mà không bị treo trang
 */

(function () {
    'use strict';

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMobile = isIOS || /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    console.log(`[VRM Engine] Khởi chạy bộ tối ưu hóa bộ nhớ 3D di động (isIOS: ${isIOS}, isMobile: ${isMobile})`);

    // 1. Cấu hình mặc định an toàn cho Mobile / iOS khi khởi chạy
    if (typeof SISMES !== 'undefined' && SISMES.initConfig) {
        if (isIOS) {
            SISMES.initConfig.graphic = 0.75; // Đồ họa Thấp để vừa vặn ngưỡng RAM WebKit 300MB
            SISMES.initConfig.fps = 30;       // 30 FPS chống quá nhiệt và sụt pin trên Safari
        } else if (isMobile) {
            SISMES.initConfig.graphic = 1.0;  // Android mượt mà ở mức Vừa
            SISMES.initConfig.fps = 60;
        }
    }

    // 2. Hàm thu nhỏ kết cấu (Texture Downscaling) tránh tràn VRAM WebKit
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
            console.warn('[VRM Optimizer] Lỗi thu nhỏ texture:', e);
        }
    }

    // 3. Hàm tối ưu hóa toàn diện cho Model VRM / GLTF
    function optimizeModelMesh(rootObj) {
        if (!rootObj) return;
        const maxTexSize = isIOS ? 1024 : 1536;
        const maxShadeTexSize = isIOS ? 512 : 1024;

        rootObj.traverse((obj) => {
            if (!obj.isMesh || !obj.material) return;
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            for (const mat of mats) {
                if (!mat) continue;

                // Tối ưu Texture chính
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

                // Trên iOS: Tắt tạo Mipmaps cho các texture để tiết kiệm thêm 33% VRAM
                if (isIOS) {
                    [mat.map, mat.shadeMultiplyTexture, mat.normalMap, mat.rimMultiplyTexture].forEach(tex => {
                        if (tex) {
                            tex.generateMipmaps = false;
                            if (window.THREE && window.THREE.LinearFilter) {
                                tex.minFilter = window.THREE.LinearFilter;
                            }
                        }
                    });
                }
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
            if (isIOS || isMobile) {
                // Tắt hoàn toàn MSAA (antialias = 0) để không tạo thêm 4 buffer MSAA
                opts.antialias = 0;
                // Tắt preserveDrawingBuffer để WebKit giải phóng front-buffer sau mỗi frame
                opts.screenshot = false;
                opts.powerPreference = "default";

                if (isIOS) {
                    // Mức chất lượng an toàn tuyệt đối cho iPhone
                    opts.quality = Math.min(Number(opts.quality) || 0.75, 0.75);
                    opts.limitFPS = true;
                    opts.maxFPS = 30;
                }
            }

            const res = origCreate.call(this, opts);

            // Giới hạn tỉ lệ điểm ảnh (Pixel Ratio) trên di động
            const layer = this.layer[opts.layerID];
            if (layer) {
                if (layer.renderer && isMobile) {
                    layer.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.0));
                }
                if (layer.composer && isMobile) {
                    layer.composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.0));
                }

                // Hook pixelRatioUpdate của layer để không vượt quá 1.0 trên mobile
                if (layer.pixelRatioUpdate) {
                    const origPRUpdate = layer.pixelRatioUpdate;
                    layer.pixelRatioUpdate = function (force) {
                        origPRUpdate.call(this, force);
                        if (isMobile) {
                            const safeRatio = Math.min(layer.ratio, 1.0);
                            if (layer.renderer && layer.ratio > 1.0) {
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

        // 5. Hook VRoid.three.load để tối ưu texture ngay khi tải model VRM
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

        // 6. Hook VRoid.three.obj3D_load cho các vật phẩm 3D GLB (bed, pants)
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

        // 7. Khôi phục / Phục hồi khi WebGL Context bị gián đoạn (Crash Handler)
        V3.restore = function () {
            console.warn('[VRoid WebGL] WebGL context bị gián đoạn do bộ nhớ hoặc chuyển ứng dụng.');
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
                    "Bộ nhớ đồ họa 3D bị gián đoạn.<br>Bấm OK để tải lại trò chơi.<br><span style='font-size: 18px; line-height: 28px;'>* Mẹo: Vào Cài đặt (nút góc trên bên phải) chọn Đồ họa Thấp và 30 FPS để chơi mượt mà và không bị crash trên iPhone.</span>",
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
