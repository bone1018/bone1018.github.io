document.addEventListener('DOMContentLoaded', () => {
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

    document.body.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('popupBtn') && target.id) {
            const popupId = target.id.replace('Btn', '');
            if (document.getElementById(popupId)) {
                showPopup(popupId);
            }
        }

        if (target.classList.contains('closePopupBtn')) {
            hidePopups();
        }
    });

    overlay.addEventListener('click', hidePopups);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') hidePopups();
    });

    // ===== 音樂:自動播放、暫停、音量 =====
    const audio = document.getElementById('music');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    if (audio && playPauseBtn && volumeSlider) {
        audio.volume = Number(volumeSlider.value) / 100;

        const updateIcon = () => {
            playPauseBtn.textContent = audio.paused ? '▶' : '⏸';
        };

        // 嘗試自動播放;若被瀏覽器政策擋下,改成使用者第一次互動時播放
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

        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            updateIcon();
        });

        volumeSlider.addEventListener('input', () => {
            audio.volume = Number(volumeSlider.value) / 100;
        });

        audio.addEventListener('play', () => photoPiece.classList.remove('paused'));
        audio.addEventListener('pause', () => photoPiece.classList.add('paused'));

        audio.addEventListener('play', updateIcon);
        audio.addEventListener('pause', updateIcon);
    }
});
