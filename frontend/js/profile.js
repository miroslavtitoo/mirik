// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#0A0A0A');
tg.setBackgroundColor('#0A0A0A');

// Переключение табов
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.profile-tab');
    const reportsContent = document.getElementById('reportsContent');
    const appointmentsContent = document.getElementById('appointmentsContent');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabType = tab.getAttribute('data-tab');

            // Снимаем активность со всех табов
            tabs.forEach(t => t.classList.remove('profile-tab-active'));

            // Активируем текущий таб
            tab.classList.add('profile-tab-active');

            // Показываем нужный контент
            if (tabType === 'reports') {
                reportsContent.style.display = 'block';
                appointmentsContent.style.display = 'none';
            } else if (tabType === 'appointments') {
                reportsContent.style.display = 'none';
                appointmentsContent.style.display = 'block';
            }
        });
    });
});
