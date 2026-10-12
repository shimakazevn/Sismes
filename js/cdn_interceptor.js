/**
 * Sismes - CDN & Web Audio Interceptor Plugin
 * ============================================
 * Hook toàn diện TyranoScript v6 Tag Engine:
 * - playbgm / stopbgm
 * - playse / stopse / fadeinse / fadeoutse / seopt / bgmopt
 * Kết nối liền mạch với Web Audio & Steganography PNG Engine
 */

(function () {
    'use strict';

    // Bảng ánh xạ CDN: Local Path -> Blogger Image URL (hoặc link ảnh stego PNG audio)
    const EMBEDDED_MANIFEST = window.SISMES_AUDIO_MANIFEST || {};
    window.SISMES_CDN_MANIFEST = EMBEDDED_MANIFEST;

    function normalizePath(p) {
        if (!p || typeof p !== 'string') return '';
        let s = p.replace(/\\/g, '/').trim();
        while (s.startsWith('./')) s = s.substring(2);
        while (s.startsWith('/')) s = s.substring(1);
        return s;
    }

    const normalizedMap = new Map();
    function refreshManifest() {
        const manifest = Object.assign({}, window.SISMES_AUDIO_MANIFEST || {}, EMBEDDED_MANIFEST);
        for (const [k, v] of Object.entries(manifest)) {
            normalizedMap.set(normalizePath(k), v);
        }
    }
    refreshManifest();

    window.resolveCDNUrl = function (filePath) {
        if (!filePath || typeof filePath !== 'string') return filePath;
        if (filePath.startsWith('http://') || filePath.startsWith('https://') || filePath.startsWith('data:') || filePath.startsWith('blob:')) {
            return filePath;
        }

        const norm = normalizePath(filePath);
        let url = normalizedMap.get(norm);
        if (!url) {
            if (!norm.startsWith('data/')) {
                url = normalizedMap.get('data/' + norm) ||
                      normalizedMap.get('data/sound/' + norm) ||
                      normalizedMap.get('data/bgimage/' + norm) ||
                      normalizedMap.get('data/image/' + norm);
            }
        }
        return url || filePath;
    };

    // ─── Hook $.parseStorage của TyranoScript ───
    function hookParseStorage() {
        if (!window.$ || !window.$.parseStorage) return;
        if (window.$.__sismesCDNHooked) return;
        window.$.__sismesCDNHooked = true;

        const origParseStorage = window.$.parseStorage;
        window.$.parseStorage = function (storage, folder) {
            let res = origParseStorage.call(this, storage, folder);
            if (res && typeof res === 'string') {
                return window.resolveCDNUrl(res);
            }
            return res;
        };
    }

    // ─── Hook TyranoScript Audio Tags ─────────────────────────────────────────
    function installTyranoAudioHooks() {
        if (!window.TYRANO || !window.TYRANO.kag) {
            setTimeout(installTyranoAudioHooks, 50);
            return;
        }

        const kag = window.TYRANO.kag;

        function overrideTag(tagName, startFn) {
            if (kag.tag && kag.tag[tagName]) {
                kag.tag[tagName].start = startFn;
            }
            if (kag.ftag && kag.ftag.master_tag && kag.ftag.master_tag[tagName]) {
                kag.ftag.master_tag[tagName].start = startFn;
            }
        }

        // 1. Hook playbgm
        if (kag.tag.playbgm) {
            overrideTag('playbgm', function (pm) {
                try {
                    if (pm && pm.storage) {
                        const target = pm.target || 'bgm';
                        const folder = target === 'se' ? 'sound' : 'sound';
                        const rawStorage = pm.storage;
                        const fullPath = rawStorage.includes('/') ? rawStorage : `data/${folder}/${rawStorage}`;
                        const cdnUrl = window.resolveCDNUrl(fullPath);

                        if (cdnUrl && cdnUrl.startsWith('http')) {
                            const isSe = (target === 'se' || target === 'sound');
                            if (isSe) {
                                if (window.HOME_AudioEngine && window.HOME_AudioEngine.playSE) {
                                    window.HOME_AudioEngine.playSE(cdnUrl, pm.volume, pm.buf || '0');
                                }
                            } else {
                                if (window.HOME_AudioEngine && window.HOME_AudioEngine.playBGM) {
                                    window.HOME_AudioEngine.playBGM(cdnUrl, pm.loop !== 'false', pm.volume, pm.buf || '0');
                                }
                            }
                            if (kag.layer) kag.layer.showEventLayer();
                            if (pm.stop !== 'true' && kag.ftag) kag.ftag.nextOrder();
                            return;
                        }
                    }
                } catch (e) {
                    console.warn('[CDN Interceptor] playbgm error:', e);
                }
                if (kag.layer) kag.layer.showEventLayer();
                if (pm && pm.stop !== 'true' && kag.ftag) kag.ftag.nextOrder();
            });
        }

        // 2. Hook stopbgm
        if (kag.tag.stopbgm) {
            const origStopbgm = kag.tag.stopbgm.start;
            overrideTag('stopbgm', function (pm) {
                try {
                    const target = pm?.target || 'bgm';
                    if (target === 'se') {
                        if (window.HOME_AudioEngine && window.HOME_AudioEngine.stopSE) {
                            window.HOME_AudioEngine.stopSE(pm?.buf || '0');
                        }
                    } else {
                        if (window.HOME_AudioEngine && window.HOME_AudioEngine.stopBGM) {
                            window.HOME_AudioEngine.stopBGM(parseInt(pm?.time || 300));
                        }
                    }
                } catch (e) {}
                if (origStopbgm) {
                    return origStopbgm.apply(this, arguments);
                } else if (kag.ftag) {
                    kag.ftag.nextOrder();
                }
            });
        }

        // 3. Hook playse
        if (kag.tag.playse) {
            overrideTag('playse', function (pm) {
                try {
                    if (pm && pm.storage) {
                        const rawStorage = pm.storage;
                        const fullPath = rawStorage.includes('/') ? rawStorage : `data/sound/${rawStorage}`;
                        const cdnUrl = window.resolveCDNUrl(fullPath);

                        if (cdnUrl && cdnUrl.startsWith('http')) {
                            if (window.HOME_AudioEngine && window.HOME_AudioEngine.playSE) {
                                window.HOME_AudioEngine.playSE(cdnUrl, pm.volume, pm.buf || '0');
                            }
                            if (kag.layer) kag.layer.showEventLayer();
                            if (pm.stop !== 'true' && kag.ftag) kag.ftag.nextOrder();
                            return;
                        }
                    }
                } catch (e) {
                    console.warn('[CDN Interceptor] playse error:', e);
                }
                if (kag.layer) kag.layer.showEventLayer();
                if (pm && pm.stop !== 'true' && kag.ftag) kag.ftag.nextOrder();
            });
        }

        // 4. Hook stopse
        if (kag.tag.stopse) {
            overrideTag('stopse', function (pm) {
                try {
                    const buf = (pm && pm.buf) ? pm.buf : '0';
                    if (window.HOME_AudioEngine && window.HOME_AudioEngine.stopSE) {
                        window.HOME_AudioEngine.stopSE(buf);
                    }
                } catch (e) {}
                if (kag.ftag) kag.ftag.nextOrder();
            });
        }

        console.log('[CDN Interceptor] ✅ Đã gắn thành công TyranoScript Audio Tag Hooks.');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            hookParseStorage();
            installTyranoAudioHooks();
        });
    } else {
        hookParseStorage();
        installTyranoAudioHooks();
    }
    setTimeout(() => {
        hookParseStorage();
        installTyranoAudioHooks();
    }, 500);
})();
