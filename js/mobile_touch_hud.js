/**
 * Sismes - Mobile Touch HUD & Responsive Layout Controller
 * =======================================================
 * - Tự động co giãn toàn màn hình (Scale 16:9) chống vỡ layout
 * - Menu nổi trên di động: Fullscreen, Xuất Save PC (.sav), Nhập Save (.sav)
 */

(function () {
    'use strict';

    function createMobileHUD() {
        if (document.getElementById('mobile_hud_container')) return;

        const hud = document.createElement('div');
        hud.id = 'mobile_hud_container';
        hud.innerHTML = `
            <style>
                #mobile_hud_container {
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    z-index: 999999;
                    display: flex;
                    gap: 8px;
                    font-family: sans-serif;
                    opacity: 0.85;
                    transition: opacity 0.2s;
                }
                #mobile_hud_container:hover {
                    opacity: 1;
                }
                .mobile_hud_btn {
                    background: rgba(20, 20, 25, 0.75);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 6px;
                    padding: 6px 12px;
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    user-select: none;
                }
                .mobile_hud_btn:active {
                    background: rgba(255, 105, 180, 0.8);
                }
            </style>
            <button class="mobile_hud_btn" id="btn_toggle_fs" title="Toàn màn hình">⛶ Fullscreen</button>
            <button class="mobile_hud_btn" id="btn_export_save" title="Xuất Save cho PC (.sav)">💾 Xuất Save</button>
            <button class="mobile_hud_btn" id="btn_import_save" title="Nhập Save từ PC (.sav)">📂 Nhập Save</button>
        `;
        document.body.appendChild(hud);

        document.getElementById('btn_toggle_fs').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen().catch(() => {});
            }
        });

        document.getElementById('btn_export_save').addEventListener('click', () => {
            if (window.exportPCSaveFile) window.exportPCSaveFile();
        });

        document.getElementById('btn_import_save').addEventListener('click', () => {
            if (window.importPCSaveFile) window.importPCSaveFile();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMobileHUD);
    } else {
        createMobileHUD();
    }
})();
