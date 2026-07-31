document.addEventListener('DOMContentLoaded', () => {
    // ===== 1. 彈出視窗控制 =====
    const overlay = document.getElementById('overlay');
    const popups = document.querySelectorAll('.popup');

    const showPopup = (id) => {
        const popup = document.getElementById(id);
        if (!popup) return;
        popup.style.display = 'block';
        overlay.style.display = 'block';
    };

    const hidePopups = () => {
        popups.forEach(popup => (popup.style.display = 'none'));
        overlay.style.display = 'none';
    };

    // 事件委派：點擊觸發彈窗按鈕 (僅針對帶有 .popupBtn 的按鈕)
    document.body.addEventListener('click', (event) => {
        const target = event.target;

        // 開啟對應彈窗 (例如點擊 popup1Btn 開啟 popup1)
        if (target.classList.contains('popupBtn') && target.id) {
            const popupId = target.id.replace('Btn', '');
            showPopup(popupId);
        }

        // 關閉按鈕
        if (target.classList.contains('closePopupBtn')) {
            hidePopups();
        }
    });

    // 點擊黑色遮罩關閉
    if (overlay) {
        overlay.addEventListener('click', hidePopups);
    }

    // 按下 Esc 鍵關閉
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') hidePopups();
    });

    // ===== 2. 音樂控制（自動播放處理、播放/暫停、音量） =====
    const audio = document.getElementById('music');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    if (audio && playPauseBtn && volumeSlider) {
        // 設定初始音量
        audio.volume = Number(volumeSlider.value) / 100;

        const updateIcon = () => {
            playPauseBtn.textContent = audio.paused ? '▶' : '⏸';
        };

        // 嘗試播放音樂 (若自動播放被瀏覽器政策阻擋，轉為首次點擊/按鍵時觸發)
        const tryAutoplay = () => {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    const resumeOnInteract = () => {
                        audio.play();
                        updateIcon();
                    };
                    document.addEventListener('click', resumeOnInteract, { once: true });
                    document.addEventListener('keydown', resumeOnInteract, { once: true });
                });
            }
            updateIcon();
        };

        tryAutoplay();

        // 播放 / 暫停按鈕切換
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            updateIcon();
        });

        // 音量滑桿控制
        volumeSlider.addEventListener('input', () => {
            audio.volume = Number(volumeSlider.value) / 100;
        });

        // 監聽原生播放狀態改變圖示
        audio.addEventListener('play', updateIcon);
        audio.addEventListener('pause', updateIcon);
    }
});
