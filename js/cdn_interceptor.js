/**
 * Sismes - CDN Interceptor Plugin
 * ==============================
 * Chuyển hướng âm thanh, hình ảnh, model sang Blogger CDN (lh3.googleusercontent.com)
 * Đồng thời hỗ trợ phát âm thanh qua Steganography PNG decoder
 */

(function () {
    'use strict';

    // Bảng ánh xạ CDN: Local Path -> Blogger Image URL (hoặc link ảnh stego PNG audio)
    const EMBEDDED_MANIFEST = {};

    window.SISMES_CDN_MANIFEST = EMBEDDED_MANIFEST;

    function normalizePath(p) {
        if (!p || typeof p !== 'string') return '';
        let s = p.replace(/\\/g, '/').trim();
        while (s.startsWith('./')) s = s.substring(2);
        while (s.startsWith('/')) s = s.substring(1);
        return s;
    }

    const normalizedMap = new Map();
    for (const [k, v] of Object.entries(EMBEDDED_MANIFEST)) {
        normalizedMap.set(normalizePath(k), v);
    }

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hookParseStorage);
    } else {
        hookParseStorage();
    }
    setTimeout(hookParseStorage, 500);
})();
