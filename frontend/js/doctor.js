// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Получение ID врача из URL
const urlParams = new URLSearchParams(window.location.search);
const doctorId = parseInt(urlParams.get('id')) || 1;

// Поиск врача в данных
const doctor = doctors.find(d => d.id === doctorId);

// Загрузка данных врача
if (doctor) {
    // Установка имени врача и специальности
    document.getElementById('doctorName').textContent = doctor.name;
    document.getElementById('doctorSpecialty').textContent = doctor.specialty;

    // Установка фонового изображения
    const backgroundElement = document.getElementById('doctorBackground');
    backgroundElement.style.backgroundImage = `url('${doctor.photo}')`;
}

// Анимированный переход назад
function goBack() {
    const container = document.querySelector('.app-container');
    container.classList.remove('doctor-page-enter');
    container.classList.add('doctor-page-exit');

    // Переход назад после окончания анимации
    setTimeout(() => {
        window.history.back();
    }, 200);
}

// Bottom Sheet (шторка снизу)
const bottomSheet = document.getElementById('bottomSheet');
const sheetOverlay = document.getElementById('sheetOverlay');
const sheetHeader = document.querySelector('.bottom-sheet-header');
let startY = 0;
let currentY = 0;
let isDragging = false;
let isSheetOpen = false;

// По умолчанию шторка частично открыта (показан только заголовок)
bottomSheet.classList.add('bottom-sheet-closed');

// Открытие/закрытие по клику на заголовок
sheetHeader.addEventListener('click', () => {
    toggleBottomSheet();
});

// Обработчики для свайпа
bottomSheet.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    isDragging = true;
});

bottomSheet.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    // Разрешаем тянуть вверх когда закрыто и вниз когда открыто
    if ((!isSheetOpen && deltaY < 0) || (isSheetOpen && deltaY > 0)) {
        e.preventDefault();
        const maxDelta = isSheetOpen ? 300 : 300;
        const clampedDelta = Math.max(-maxDelta, Math.min(maxDelta, deltaY));

        if (isSheetOpen) {
            bottomSheet.style.transform = `translateY(${clampedDelta}px)`;
        } else {
            bottomSheet.style.transform = `translateY(calc(100% - 270px + ${clampedDelta}px))`;
        }
    }
});

bottomSheet.addEventListener('touchend', () => {
    if (!isDragging) return;

    const deltaY = currentY - startY;

    // Определяем направление свайпа
    if (Math.abs(deltaY) > 50) {
        if (deltaY < 0 && !isSheetOpen) {
            // Свайп вверх - открываем
            openBottomSheet();
        } else if (deltaY > 0 && isSheetOpen) {
            // Свайп вниз - закрываем
            closeBottomSheet();
        } else {
            // Возвращаем на место
            resetSheetPosition();
        }
    } else {
        // Малый свайп - возвращаем на место
        resetSheetPosition();
    }

    isDragging = false;
    startY = 0;
    currentY = 0;
});

// Закрытие по клику на оверлей
sheetOverlay.addEventListener('click', () => {
    closeBottomSheet();
});

function toggleBottomSheet() {
    if (isSheetOpen) {
        closeBottomSheet();
    } else {
        openBottomSheet();
    }
}

function openBottomSheet() {
    bottomSheet.classList.remove('bottom-sheet-closed');
    bottomSheet.classList.add('bottom-sheet-open');
    bottomSheet.style.transform = '';
    sheetOverlay.classList.add('bottom-sheet-overlay-visible');
    isSheetOpen = true;
}

function closeBottomSheet() {
    bottomSheet.classList.remove('bottom-sheet-open');
    bottomSheet.classList.add('bottom-sheet-closed');
    bottomSheet.style.transform = '';
    sheetOverlay.classList.remove('bottom-sheet-overlay-visible');
    isSheetOpen = false;
}

function resetSheetPosition() {
    bottomSheet.style.transform = '';
}

// Установка цвета темы для Telegram
tg.setHeaderColor('#0A0A0A');
tg.setBackgroundColor('#0A0A0A');
