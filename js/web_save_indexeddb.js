/**
 * Sismes - Web Save Engine (IndexedDB Unlimited Storage & 2-Way PC Save Converter)
 * ===============================================================================
 * - Lưu trữ vô hạn qua IndexedDB, chống QuotaExceededError trên Mobile
 * - Tương thích 2 chiều hoàn hảo với bản PC gốc (LZString Uint8Array format)
 * - Tự động nén Thumbnail Save nhỏ gọn (<3KB/slot)
 */

(function () {
    'use strict';

    const DB_NAME = 'Sismes_Game_SaveDB';
    const DB_VERSION = 1;
    const STORE_NAME = 'save_slots';
    const PROJECT_ID = 'Sismes';
    const memoryStorageCache = new Map();

    function openSaveDB() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'key' });
                }
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function dbSet(key, value) {
        memoryStorageCache.set(key, value);
        try {
            const db = await openSaveDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                const req = store.put({ key, value, updatedAt: Date.now() });
                req.onsuccess = () => resolve();
                req.onerror = () => reject(req.error);
            });
        } catch (e) {
            console.warn('[Web Save] IndexedDB set error:', e);
        }
    }

    async function dbGet(key) {
        if (memoryStorageCache.has(key)) return memoryStorageCache.get(key);
        try {
            const db = await openSaveDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const req = store.get(key);
                req.onsuccess = () => {
                    const res = req.result ? req.result.value : null;
                    if (res) memoryStorageCache.set(key, res);
                    resolve(res);
                };
                req.onerror = () => reject(req.error);
            });
        } catch (e) {
            console.warn('[Web Save] IndexedDB get error:', e);
            return null;
        }
    }

    async function dbGetAll() {
        try {
            const db = await openSaveDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const req = store.getAll();
                req.onsuccess = () => resolve(req.result || []);
                req.onerror = () => reject(req.error);
            });
        } catch (e) {
            return [];
        }
    }

    // ─── Đồng bộ ngược từ IndexedDB lên localStorage khi khởi động ───
    async function restoreFromIndexedDB() {
        try {
            const records = await dbGetAll();
            for (const r of records) {
                if (r.key && r.value) {
                    memoryStorageCache.set(r.key, r.value);
                    try {
                        localStorage.setItem(r.key, r.value);
                    } catch (e) {}
                }
            }
        } catch (e) {}
    }
    restoreFromIndexedDB();

    // ─── Gắn Hook vào TyranoScript Storage Engine ───
    function hookTyranoStorage() {
        if (!window.$ || !window.$.setStorageWeb) return;
        if (window.$.__sismesSaveHooked) return;
        window.$.__sismesSaveHooked = true;

        const origSetStorageCompress = window.$.setStorageCompress;
        window.$.setStorageCompress = function (key, val) {
            if (typeof val !== 'string') {
                val = JSON.stringify(val);
            }
            if (window.LZString) {
                const comp = LZString.compressToBase64(val);
                dbSet(key, comp);
                try {
                    localStorage.setItem(key, comp);
                } catch (e) {}
            }
            if (origSetStorageCompress) {
                try { origSetStorageCompress.call(this, key, val); } catch (e) {}
            }
        };

        const origGetStorageCompress = window.$.getStorageCompress;
        window.$.getStorageCompress = function (key) {
            let data = memoryStorageCache.get(key) || localStorage.getItem(key);
            if (data && window.LZString) {
                let gv = LZString.decompressFromBase64(data);
                if (gv === null) gv = unescape(data);
                if (gv && gv !== 'null') return gv;
            }
            if (origGetStorageCompress) {
                return origGetStorageCompress.call(this, key);
            }
            return null;
        };

        // Thumbnail save siêu nhẹ
        if (window.html2canvas) {
            const origGetCanvas = window.html2canvas;
            window.html2canvas = async function (el, options) {
                const canvas = await origGetCanvas(el, options);
                try {
                    const smallCanvas = document.createElement('canvas');
                    smallCanvas.width = 160;
                    smallCanvas.height = 90;
                    const ctx = smallCanvas.getContext('2d');
                    ctx.drawImage(canvas, 0, 0, 160, 90);
                    return smallCanvas;
                } catch (e) {
                    return canvas;
                }
            };
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hookTyranoStorage);
    } else {
        hookTyranoStorage();
    }
    setTimeout(hookTyranoStorage, 500);

    // ─── Export / Import tương thích 100% với file .sav của Game PC Gốc ───
    window.exportPCSaveFile = async function () {
        try {
            if (!window.LZString) {
                alert('Chưa tải xong LZString thư viện!');
                return;
            }

            const rawSaveData = window.$.getStorage(PROJECT_ID + '_tyrano_data', 'webstorage') ||
                                window.localStorage.getItem(PROJECT_ID + '_tyrano_data');
            const rawSf = window.$.getStorage(PROJECT_ID + '_sf', 'webstorage') ||
                          window.localStorage.getItem(PROJECT_ID + '_sf');

            if (!rawSaveData && !rawSf) {
                alert('Chưa có dữ liệu lưu nào trong game! Vui lòng lưu game trước khi xuất.');
                return;
            }

            function downloadBinarySav(filename, jsonString) {
                if (!jsonString) return;
                const uint8 = LZString.compressToUint8Array(jsonString);
                const blob = new Blob([uint8], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }

            if (rawSaveData) {
                downloadBinarySav(`${PROJECT_ID}_tyrano_data.sav`, rawSaveData);
            }
            if (rawSf) {
                setTimeout(() => {
                    downloadBinarySav(`${PROJECT_ID}_sf.sav`, rawSf);
                }, 300);
            }
        } catch (err) {
            alert(`Lỗi xuất save: ${err.message}`);
        }
    };

    window.importPCSaveFile = function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.sav,.json';
        input.multiple = true;
        input.onchange = async (e) => {
            const files = Array.from(e.target.files);
            if (!files.length) return;

            let successCount = 0;
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const uint8 = new Uint8Array(arrayBuffer);

                let jsonText = null;
                if (window.LZString) {
                    // Thử giải nén dạng Uint8Array nhị phân chuẩn PC gốc
                    jsonText = LZString.decompressFromUint8Array(uint8);
                }

                if (!jsonText) {
                    // Thử đọc dạng chuỗi (text/Base64/UTF-8)
                    const text = new TextDecoder('utf-8').decode(uint8);
                    if (window.LZString) {
                        jsonText = LZString.decompressFromBase64(text);
                    }
                    if (!jsonText) {
                        try {
                            JSON.parse(text);
                            jsonText = text;
                        } catch (err) {}
                    }
                }

                if (jsonText) {
                    let targetKey = `${PROJECT_ID}_tyrano_data`;
                    if (file.name.includes('_sf')) {
                        targetKey = `${PROJECT_ID}_sf`;
                    }
                    window.$.setStorage(targetKey, jsonText, 'webstorage');
                    successCount++;
                }
            }

            if (successCount > 0) {
                alert(`Nhập thành công ${successCount} file save! Game sẽ tải lại dữ liệu.`);
                location.reload();
            } else {
                alert('Không thể đọc dữ liệu từ file save đã chọn!');
            }
        };
        input.click();
    };
})();
