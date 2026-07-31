document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const audio = document.getElementById('music');
    const popups = document.querySelectorAll('.popup');
    const playBtn = document.getElementById('playBtn');

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

    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.textContent = 'PAUSE';
            } else {
                audio.pause();
                playBtn.textContent = 'MUSIC';
            }
        });
    }
});
