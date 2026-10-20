/**
 * Sismes - Mobile Floating Utility HUD
 * =======================================================
 * - Cung cấp 3 nút tiện ích: Toàn màn hình (Fullscreen), Xuất Save PC (.sav), Nhập Save (.sav)
 * - Bố trí dọc gọn gàng ở cạnh bên (Trái hoặc Phải), KHÔNG che các nút UI trên góc màn hình game.
 * - Hỗ trợ thu gọn (Collapse / Expand) và đổi bên (Trái <-> Phải) với lưu cấu hình tự động.
 */

(function () {
    'use strict';

    function initMobileHUD() {
        if (document.getElementById('mobile_hud_dock')) return;

        // Đọc cài đặt vị trí đã lưu
        let currentSide = localStorage.getItem('sismes_hud_side') || 'right';
        let isExpanded = localStorage.getItem('sismes_hud_expanded') !== 'false';

        const dock = document.createElement('div');
        dock.id = 'mobile_hud_dock';
        dock.className = `mobile-hud-${currentSide} ${isExpanded ? 'is-expanded' : 'is-collapsed'}`;

        dock.innerHTML = `
            <style>
                #mobile_hud_dock {
                    position: fixed;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 9999999;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    transition: transform 0.25s ease, opacity 0.25s ease, left 0.25s ease, right 0.25s ease;
                    user-select: none;
                    -webkit-user-select: none;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
                }

                #mobile_hud_dock.mobile-hud-right {
                    right: 8px;
                    left: auto;
                    align-items: flex-end;
                }

                #mobile_hud_dock.mobile-hud-left {
                    left: 8px;
                    right: auto;
                    align-items: flex-start;
                }

                /* Nút Toggle mở/thu gọn */
                .hud-toggle-btn {
                    background: rgba(22, 24, 35, 0.82);
                    color: #fff;
                    border: 1px solid rgba(255, 140, 180, 0.5);
                    border-radius: 20px;
                    padding: 5px 10px;
                    font-size: 11px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    margin-bottom: 6px;
                    transition: background 0.2s, transform 0.15s;
                }

                .hud-toggle-btn:active {
                    transform: scale(0.95);
                    background: rgba(255, 105, 180, 0.85);
                }

                /* Cụm menu các nút chức năng xếp dọc */
                .hud-button-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    transition: opacity 0.2s ease, transform 0.2s ease, max-height 0.25s ease;
                    max-height: 250px;
                    opacity: 1;
                    transform: scale(1);
                    transform-origin: top right;
                }

                #mobile_hud_dock.mobile-hud-left .hud-button-group {
                    transform-origin: top left;
                }

                #mobile_hud_dock.is-collapsed .hud-button-group {
                    max-height: 0;
                    opacity: 0;
                    pointer-events: none;
                    overflow: hidden;
                    transform: scale(0.9);
                }

                .mobile-hud-item-btn {
                    background: rgba(18, 20, 30, 0.88);
                    color: #ffffff;
                    border: 1px solid rgba(255, 255, 255, 0.28);
                    border-radius: 8px;
                    padding: 7px 12px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.2px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    white-space: nowrap;
                    transition: all 0.15s ease;
                }

                .mobile-hud-item-btn:hover {
                    border-color: rgba(255, 140, 180, 0.8);
                    background: rgba(35, 30, 48, 0.95);
                }

                .mobile-hud-item-btn:active {
                    transform: scale(0.96);
                    background: rgba(255, 105, 180, 0.85);
                }

                .hud-side-switch {
                    font-size: 10px;
                    padding: 4px 8px;
                    color: rgba(255, 255, 255, 0.65);
                    border-color: rgba(255, 255, 255, 0.18);
                    justify-content: center;
                }
            </style>

            <button class="hud-toggle-btn" id="hud_toggle_collapse" title="Thu gọn / Mở rộng menu">
                <span id="hud_toggle_icon">${isExpanded ? '⚙ Menu' : '⚙'}</span>
            </button>

            <div class="hud-button-group" id="hud_button_group">
                <button class="mobile-hud-item-btn" id="btn_hud_fullscreen" title="Bật/Tắt Toàn Màn Hình">
                    <span>⛶</span> Toàn màn hình
                </button>
                <button class="mobile-hud-item-btn" id="btn_hud_export_save" title="Xuất file save dùng cho bản PC (.sav)">
                    <span>💾</span> Xuất Save
                </button>
                <button class="mobile-hud-item-btn" id="btn_hud_import_save" title="Nhập file save từ bản PC (.sav)">
                    <span>📂</span> Nhập Save
                </button>
                <button class="mobile-hud-item-btn hud-side-switch" id="btn_hud_switch_side" title="Chuyển sang cạnh đối diện">
                    <span id="hud_switch_text">${currentSide === 'right' ? '⮂ Sang Trái' : 'Sang Phải ⮂'}</span>
                </button>
            </div>
        `;

        document.body.appendChild(dock);

        // Sự kiện Toggle Thu gọn / Mở rộng
        const toggleBtn = document.getElementById('hud_toggle_collapse');
        const toggleIcon = document.getElementById('hud_toggle_icon');
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isExpanded = !isExpanded;
            if (isExpanded) {
                dock.classList.remove('is-collapsed');
                dock.classList.add('is-expanded');
                toggleIcon.textContent = '⚙ Menu';
            } else {
                dock.classList.remove('is-expanded');
                dock.classList.add('is-collapsed');
                toggleIcon.textContent = '⚙';
            }
            localStorage.setItem('sismes_hud_expanded', isExpanded ? 'true' : 'false');
        });

        // Sự kiện Đổi bên Trái / Phải
        const switchSideBtn = document.getElementById('btn_hud_switch_side');
        const switchText = document.getElementById('hud_switch_text');
        switchSideBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSide = currentSide === 'right' ? 'left' : 'right';
            dock.className = `mobile-hud-${currentSide} ${isExpanded ? 'is-expanded' : 'is-collapsed'}`;
            switchText.textContent = currentSide === 'right' ? '⮂ Sang Trái' : 'Sang Phải ⮂';
            localStorage.setItem('sismes_hud_side', currentSide);
        });

        // Sự kiện Fullscreen
        document.getElementById('btn_hud_fullscreen').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen().catch(() => {});
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        });

        // Sự kiện Xuất / Nhập Save PC
        document.getElementById('btn_hud_export_save').addEventListener('click', () => {
            if (window.exportPCSaveFile) {
                window.exportPCSaveFile();
            } else {
                alert('Chức năng Xuất Save đang khởi động, vui lòng thử lại sau vài giây.');
            }
        });

        document.getElementById('btn_hud_import_save').addEventListener('click', () => {
            if (window.importPCSaveFile) {
                window.importPCSaveFile();
            } else {
                alert('Chức năng Nhập Save đang khởi động, vui lòng thử lại sau vài giây.');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileHUD);
    } else {
        initMobileHUD();
    }
})();
