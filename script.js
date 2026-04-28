// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Раскрыть на весь экран

// Данные уроков (Пример для A0)
const lessonsData = {
    'A0': [
        {
            question: "Как перевести 'Яблоко'?",
            answers: ["Apple", "Banana", "Orange", "Grape"],
            correct: 0 // Индекс правильного ответа (0 - Apple)
        },
        {
            question: "Выберите правильное местоимение: '___ am a student.'",
            answers: ["He", "She", "I", "It"],
            correct: 2 // I
        },
        {
            question: "Как сказать 'Спасибо'?",
            answers: ["Please", "Sorry", "Thank you", "Hello"],
            correct: 2
        }
    ],
    'A1': [
        {
            question: "Past Simple от глагола 'go'?",
            answers: ["goed", "went", "gone", "going"],
            correct: 1
        }
    ],
    'A2': [
        {
            question: "Choose the correct form: 'I ___ to London yesterday.'",
            answers: ["fly", "flew", "flown", "flying"],
            correct: 1
        }
    ]
};

let currentLevel = '';
let currentLessonIndex = 0;
let score = 0;
let isPremium = false; // Статус подписки

// Элементы DOM
const homeScreen = document.getElementById('home-screen');
const lessonScreen = document.getElementById('lesson-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const progressFill = document.getElementById('progress-fill');
const scoreSpan = document.getElementById('score');
const totalSpan = document.getElementById('total');
const premiumBanner = document.getElementById('premium-banner');
const buyBtn = document.getElementById('buy-subscription');

// Обработка кнопки покупки (Демо)
buyBtn.addEventListener('click', () => {
    isPremium = true;
    premiumBanner.style.display = 'block';
    buyBtn.style.display = 'none';
    tg.showPopup({
        title: 'Успешно!',
        message: 'Подписка активирована. Теперь вам доступны все уровни!',
        buttons: [{type: 'ok'}]
    });
});

function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    if (screenName === 'home') homeScreen.classList.add('active');
    if (screenName === 'lesson') lessonScreen.classList.add('active');
    if (screenName === 'result') resultScreen.classList.add('active');
}

function startLevel(level) {
    // Проверка подписки для уровней A1 и A2 (пример монетизации)
    if ((level === 'A1' || level === 'A2') && !isPremium) {
        tg.showPopup({
            title: 'Требуется подписка',
            message: 'Уровни A1 и A2 доступны только по подписке.',
            buttons: [{type: 'ok', text: 'Понятно'}]
        });
        return;
    }

    currentLevel = level;
    currentLessonIndex = 0;
    score = 0;
    
    if (!lessonsData[level] || lessonsData[level].length === 0) {
        alert('Уроки для этого уровня еще в разработке!');
        return;
    }

    showScreen('lesson');
    loadQuestion();
}

function loadQuestion() {
    const lesson = lessonsData[currentLevel][currentLessonIndex];
    
    // Обновляем прогресс бар
    const progress = ((currentLessonIndex) / lessonsData[currentLevel].length) * 100;
    progressFill.style.width = `${progress}%`;

    questionText.innerText = lesson.question;
    answersContainer.innerHTML = '';

    lesson.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerText = answer;
        btn.onclick = () => checkAnswer(index, lesson.correct, btn);
        answersContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, correctIndex, btnElement) {
    // Блокируем все кнопки, чтобы нельзя было нажать дважды
    const allBtns = document.querySelectorAll('.answer-btn');
    allBtns.forEach(b => b.disabled = true);

    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        score++;
        // Вибрация при правильном ответе (если поддерживается)
        if(tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
    } else {
        btnElement.classList.add('wrong');
        // Подсветить правильный ответ
        allBtns[correctIndex].classList.add('correct');
        if(tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('error');
    }

    // Ждем 1 секунду и переходим к следующему вопросу
    setTimeout(() => {
        currentLessonIndex++;
        if (currentLessonIndex < lessonsData[currentLevel].length) {
            loadQuestion();
        } else {
            finishLesson();
        }
    }, 1000);
}

function finishLesson() {
    showScreen('result');
    scoreSpan.innerText = score;
    totalSpan.innerText = lessonsData[currentLevel].length;
    
    // Заполняем прогресс бар до конца
    progressFill.style.width = '100%';
}

function goHome() {
    showScreen('home');
}