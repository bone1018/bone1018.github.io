document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const audio = document.getElementById('music');
    const popups = document.querySelectorAll('.popup');

    const showPopup = (id) => {
        document.getElementById(id).style.display = 'block';
        overlay.style.display = 'block';
    };

    const hidePopups = () => {
        popups.forEach(popup => popup.style.display = 'none');
        overlay.style.display = 'none';
    };

    document.body.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('popupBtn')) {
            const popupId = target.id.replace('Btn', '');
            showPopup(popupId);
        }
    });

    overlay.addEventListener('click', hidePopups);

    document.getElementById('playBtn').addEventListener('click', () => {
        audio.paused ? audio.play() : audio.pause();
    });
});