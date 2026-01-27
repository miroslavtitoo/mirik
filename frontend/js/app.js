// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;
tg.expand(); // Развернуть на весь экран
tg.enableClosingConfirmation(); // Подтверждение при закрытии

// Текущий выбранный город
let currentCity = 'spb';

// Рендер списка врачей
function renderDoctors() {
    const doctorsList = document.getElementById('doctorsList');

    // Фильтруем врачей по выбранному городу
    const filteredDoctors = doctors.filter(doctor => doctor.city === currentCity);

    if (filteredDoctors.length === 0) {
        doctorsList.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #6B7280;">
                <p style="font-size: 16px;">Скоро появятся специалисты в этом городе</p>
            </div>
        `;
        return;
    }

    doctorsList.innerHTML = filteredDoctors.map(doctor => `
        <a href="doctor.html?id=${doctor.id}" class="doctor-card">
            <img src="${doctor.photo}" alt="${doctor.name}" class="doctor-avatar"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%232A2A2A%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%236B7280%22 font-family=%22Arial%22 font-size=%2240%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${doctor.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
            <div class="doctor-info">
                <div class="doctor-name">${doctor.name}</div>
                <div class="doctor-specialty">${doctor.specialty}</div>
            </div>
            <svg class="doctor-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </a>
    `).join('');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderDoctors();

    // Обработка кликов по фильтрам (на будущее)
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            if (!chip.disabled) {
                // Переключение активного чипа
                chips.forEach(c => {
                    c.classList.remove('chip-active');
                    c.classList.add('chip-inactive');
                });
                chip.classList.remove('chip-inactive');
                chip.classList.add('chip-active');

                // Определяем выбранный город
                if (chip.textContent.includes('Москва')) {
                    currentCity = 'msk';
                } else {
                    currentCity = 'spb';
                }

                renderDoctors();
            }
        });
    });
});

// Установка цвета темы для Telegram
tg.setHeaderColor('#0A0A0A');
tg.setBackgroundColor('#0A0A0A');
