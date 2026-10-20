/**
 * Sismes PWA Installer & Mobile Fullscreen Helper
 * Provides seamless "Add to Home Screen" / PWA installation for iOS Safari and Android Chrome.
 */

(function () {
  'use strict';

  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.log('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // Check if running in standalone / fullscreen mode
  function isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')
    );
  }

  // Detect iOS
  function isIOS() {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  }

  // Detect Android
  function isAndroid() {
    return /Android/i.test(navigator.userAgent);
  }

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('[PWA] beforeinstallprompt captured');
    renderFloatingButton();
  });

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App successfully installed');
    deferredPrompt = null;
    const btn = document.getElementById('sismes-pwa-install-btn');
    if (btn) btn.remove();
    const modal = document.getElementById('sismes-pwa-modal');
    if (modal) modal.remove();
  });

  // Global installation prompt trigger
  window.promptPWAInstall = function () {
    if (isStandalone()) {
      if (typeof SISMES !== 'undefined' && SISMES.showMsg) {
        SISMES.showMsg('Bạn đang chơi ở chế độ App toàn màn hình!');
      } else {
        alert('Bạn đang chơi ở chế độ App toàn màn hình!');
      }
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] User accepted install prompt');
          const btn = document.getElementById('sismes-pwa-install-btn');
          if (btn) btn.remove();
        }
        deferredPrompt = null;
      });
      return;
    }

    // If on iOS Safari
    if (isIOS()) {
      showIOSGuide();
      return;
    }

    // Default Android / Desktop fallback guide
    showAndroidGuide();
  };

  // iOS Safari Installation Guide Modal
  function showIOSGuide() {
    document.getElementById('sismes-pwa-modal')?.remove();

    const html = `
      <div id="sismes-pwa-modal" class="pwa-modal-overlay">
        <div class="pwa-modal-box">
          <div class="pwa-modal-header">
            <span class="pwa-modal-title">📲 Cài đặt App trên iPhone / iPad</span>
            <button class="pwa-modal-close" onclick="document.getElementById('sismes-pwa-modal').remove()">×</button>
          </div>
          <div class="pwa-modal-content">
            <p>Để chơi game <strong>Toàn Màn Hình</strong> không bị che bởi thanh công cụ Safari:</p>
            <div class="pwa-step-item">
              <span class="pwa-step-num">1</span>
              <span>Chạm vào nút <strong>Chia sẻ (Share)</strong> <svg style="display:inline-block; vertical-align:middle; width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> ở cạnh dưới của Safari.</span>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-num">2</span>
              <span>Cuộn xuống danh sách tác vụ và chọn <strong>"Thêm vào Màn hình chính" (Add to Home Screen)</strong>.</span>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-num">3</span>
              <span>Nhấn nút <strong>"Thêm" (Add)</strong> ở góc trên bên phải.</span>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-num">4</span>
              <span>Trở về màn hình chính điện thoại và mở biểu tượng <strong>Sismes</strong> vừa tạo để chơi toàn màn hình!</span>
            </div>
          </div>
          <div class="pwa-modal-footer">
            <button class="btn_black pwa-btn-ok" onclick="document.getElementById('sismes-pwa-modal').remove()">Đã hiểu</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
  }

  // Android Chrome Fallback Guide
  function showAndroidGuide() {
    document.getElementById('sismes-pwa-modal')?.remove();

    const html = `
      <div id="sismes-pwa-modal" class="pwa-modal-overlay">
        <div class="pwa-modal-box">
          <div class="pwa-modal-header">
            <span class="pwa-modal-title">📲 Cài đặt App trên Android</span>
            <button class="pwa-modal-close" onclick="document.getElementById('sismes-pwa-modal').remove()">×</button>
          </div>
          <div class="pwa-modal-content">
            <p>Để thêm game vào màn hình chính chơi toàn màn hình:</p>
            <div class="pwa-step-item">
              <span class="pwa-step-num">1</span>
              <span>Chạm vào nút <strong>Menu ba chấm (⋮)</strong> ở góc trên bên phải Chrome.</span>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-num">2</span>
              <span>Chọn <strong>"Cài đặt ứng dụng" (Install app)</strong> hoặc <strong>"Thêm vào Màn hình chính" (Add to Home screen)</strong>.</span>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-num">3</span>
              <span>Xác nhận <strong>Cài đặt</strong> để đưa biểu tượng game ra màn hình chính.</span>
            </div>
          </div>
          <div class="pwa-modal-footer">
            <button class="btn_black pwa-btn-ok" onclick="document.getElementById('sismes-pwa-modal').remove()">Đã hiểu</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
  }

  // Render unobtrusive floating button if not installed
  function renderFloatingButton() {
    if (isStandalone()) return;
    if (document.getElementById('sismes-pwa-install-btn')) return;
    if (sessionStorage.getItem('sismes_pwa_dismissed') === 'true') return;

    const btn = document.createElement('div');
    btn.id = 'sismes-pwa-install-btn';
    btn.className = 'pwa-floating-btn';
    btn.innerHTML = `
      <span class="pwa-btn-icon">📲</span>
      <span class="pwa-btn-text">Cài đặt App</span>
      <span class="pwa-btn-dismiss" title="Ẩn">×</span>
    `;

    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('pwa-btn-dismiss')) {
        e.stopPropagation();
        btn.remove();
        sessionStorage.setItem('sismes_pwa_dismissed', 'true');
        return;
      }
      window.promptPWAInstall();
    });

    document.body.appendChild(btn);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
      if (!isStandalone()) {
        setTimeout(renderFloatingButton, 1500);
      }
    });
  } else {
    if (!isStandalone()) {
      setTimeout(renderFloatingButton, 1500);
    }
  }

  // Keep link clicks inside standalone webview on iOS
  if (isIOS() && isStandalone()) {
    document.addEventListener(
      'click',
      function (e) {
        let node = e.target;
        while (node && node.nodeName !== 'A') {
          node = node.parentNode;
        }
        if (node && node.href && node.getAttribute('target') !== '_blank') {
          if (node.href.indexOf(location.host) !== -1) {
            e.preventDefault();
            location.href = node.href;
          }
        }
      },
      false
    );
  }
})();
