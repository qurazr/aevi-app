const tg = window.Telegram.WebApp;
tg.expand();

// ===== КОНФИГУРАЦИЯ =====
const LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2'];
const CHUNK_SIZE = 30; // Сколько уроков загружать за раз (для плавности)
const TOTAL_LESSONS_PER_LEVEL = 1000; // Ожидается 1000 уроков на уровень из JSON

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let LESSONS_DB = {}; // Сюда загрузится JSON
let isDBLoaded = false;

// Состояние пользователя
let state = {
    points: 0,
    currentLevel: 'A0',
    isPremium: false,
    lessons: {}, // Прогресс: { 'A0_L1': { completed: true, theoryViewed: true, score: 20 } }
    loadedChunks: { A0: 0, A1: 0, A2: 0, B1: 0, B2: 0 } // Для пагинации
};

// ===== ЗАГРУЗКА ДАННЫХ =====

// 1. Загрузка состояния пользователя из LocalStorage
function loadState() {
    try {
        const saved = localStorage.getItem('aevi_progress');
        if (saved) state = JSON.parse(saved);
    } catch (e) {
        console.error('Ошибка загрузки состояния:', e);
    }
}

// 2. Сохранение состояния
function saveState() {
    localStorage.setItem('aevi_progress', JSON.stringify(state));
    updateUI();
}

// 3. Асинхронная загрузка базы уроков (lessons.json)
async function loadLessonsDB() {
    try {
        console.log('Loading lessons.json...');
        const response = await fetch('lessons.json');
        if (!response.ok) throw new Error('File not found');
        
        LESSONS_DB = await response.json();
        isDBLoaded = true;
        console.log('✅ Lessons loaded successfully.');
        
        // Если база загрузилась, обновляем UI (на случай если уровни уже выбраны)
        if (document.getElementById('home-screen').classList.contains('active')) {
            renderLessons(true);
        }
    } catch (error) {
        console.error('❌ Failed to load lessons.json:', error);
        alert('Ошибка: Файл lessons.json не найден или поврежден. Проверьте GitHub репозиторий.');
    }
}

// 4. Получение конкретного урока
function getLesson(level, index) {
    // index начинается с 0, но ID уроков обычно L1, L2...
    // В JSON массиве элементы идут по порядку [0] -> L1, [1] -> L2
    if (LESSONS_DB[level] && LESSONS_DB[level][index]) {
        return LESSONS_DB[level][index];
    }
    
    // Заглушка, если урок еще не сгенерирован (на всякий случай)
    return {
        id: `${level}_L${index + 1}`,
        title: `Урок ${index + 1}: Загрузка...`,
        theory: ['Загрузка контента...', 'Пожалуйста, подождите.', 'Или проверьте интернет.'],
        questions: Array.from({length: 20}, (_, i) => ({ q: `Вопрос ${i+1}?`, a: ['A','B','C','D'], c: 0 }))
    };
}

// ===== ИНТЕРФЕЙС (UI) =====

function updateUI() {
    document.getElementById('points-display').textContent = state.points;
    
    // Кнопка подписки (скрываем, если премиум)
    const premBtn = document.getElementById('premium-btn');
    if (premBtn) premBtn.style.display = state.isPremium ? 'none' : 'block';
    
    renderLevels();
    // Не перерисовываем уроки каждый раз при обновлении очков, чтобы не сбивать скролл
    // renderLessons вызывается отдельно при смене уровня или загрузке
}

function renderLevels() {
    const container = document.getElementById('levels-container');
    if (!container) return;
    container.innerHTML = '';
    
    LEVELS.forEach(l => {
        // B2 скрыт, если нет подписки
        if (l === 'B2' && !state.isPremium) return;
        
        const btn = document.createElement('button');
        btn.className = 'level-chip' + (state.currentLevel === l ? ' active' : '');
        btn.textContent = l;
        btn.onclick = () => {
            state.currentLevel = l;
            saveState(); // Сохраняем выбор уровня и скролл
        };
        container.appendChild(btn);
    });
}

// ===== ЛЕНТА УРОКОВ (ПАГИНАЦИЯ + СКРОЛЛ) =====

function renderLessons(reset = false) {
    const container = document.getElementById('lessons-container');
    const loadBtn = document.getElementById('load-more-btn');
    
    if (!container) return;

    // Если сброс (смена уровня), очищаем и сбрасываем чанк
    if (reset) {
        container.innerHTML = '';
        state.loadedChunks[state.currentLevel] = 0;
        window.scrollTo(0, 0);
    }

    const chunkIdx = state.loadedChunks[state.currentLevel];
    const start = chunkIdx * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, TOTAL_LESSONS_PER_LEVEL);
    
    // Если уроков больше нет
    if (start >= TOTAL_LESSONS_PER_LEVEL) {
        if (loadBtn) loadBtn.style.display = 'none';
        return;
    }

    // Генерируем DOM элементы для текущего чанка
    for (let i = start; i < end; i++) {
        const lesson = getLesson(state.currentLevel, i);
        const prog = state.lessons[lesson.id] || { completed: false, theoryViewed: false, score: 0 };
        
        const card = document.createElement('div');
        card.className = 'lesson-card' + (prog.completed ? ' completed' : '');
        
        // HTML карточки
        card.innerHTML = `
            <div class="theory-icon" onclick="event.stopPropagation(); openTheory('${lesson.id}')">?</div>
            <div class="title">${lesson.title}</div>
            <div class="status">${prog.completed ? '✅ Пройден' : (prog.theoryViewed ? '▶️ Доступен' : '📚 Теория')}</div>
        `;
        
        // Клик по карточке открывает урок
        card.onclick = () => startLesson(lesson.id);
        container.appendChild(card);
    }

    // Обновляем индекс загруженного чанка
    state.loadedChunks[state.currentLevel] = chunkIdx + 1;
    
    // Показываем/скрываем кнопку "Загрузить ещё"
    if (loadBtn) {
        loadBtn.style.display = (state.loadedChunks[state.currentLevel] * CHUNK_SIZE < TOTAL_LESSONS_PER_LEVEL) ? 'block' : 'none';
    }
    
    // Восстанавливаем позицию скролла после рендера
    restoreScroll();
}

// Сохранение позиции скролла
function saveScroll() {
    localStorage.setItem('aevi_scroll_' + state.currentLevel, window.scrollY);
}

// Восстановление позиции скролла
function restoreScroll() {
    const saved = localStorage.getItem('aevi_scroll_' + state.currentLevel);
    if (saved) {
        setTimeout(() => window.scrollTo(0, parseInt(saved)), 50);
    }
}

// Слушатель скролла
window.addEventListener('scroll', saveScroll, { passive: true });

// Кнопка "Загрузить ещё"
const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.onclick = () => renderLessons(false);
}

// ===== НАВИГАЦИЯ ПО ЭКРАНАМ =====

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(id);
    if (screen) screen.classList.add('active');
}

function goHome() {
    showScreen('home-screen');
    updateUI();
}

// Обработка кнопки Premium
const premBtn = document.getElementById('premium-btn');
if (premBtn) {
    premBtn.onclick = () => {
        state.isPremium = true;
        if (tg.showPopup) {
            tg.showPopup({ 
                title: '🎉 Premium Activated!', 
                message: 'Уровень B2 разблокирован! Теперь доступны все 5 уровней.', 
                buttons: [{ type: 'ok' }] 
            });
        } else {
            alert('Premium Activated! Level B2 unlocked.');
        }
        saveState();
    };
}

// ===== ТЕОРИЯ =====

let currentTheoryId = null;
let theoryStep = 0;

function openTheory(id) {
    currentTheoryId = id;
    
    // Находим индекс урока по ID (формат: A0_L1 -> индекс 0)
    const parts = id.split('_L');
    const level = parts[0];
    const index = parseInt(parts[1]) - 1;
    
    const lesson = getLesson(level, index);
    
    document.getElementById('theory-title').textContent = lesson.title;
    theoryStep = 0;
    renderTheoryStep(lesson);
    showScreen('theory-screen');
}

function renderTheoryStep(lesson) {
    const contentEl = document.getElementById('theory-content');
    const nextBtn = document.getElementById('theory-next-btn');
    
    if (contentEl && nextBtn) {
        // Заменяем переносы строк на <br> для HTML
        contentEl.innerHTML = lesson.theory[theoryStep].replace(/\n/g, '<br>');
        nextBtn.textContent = (theoryStep < lesson.theory.length - 1) ? 'Далее →' : 'К тесту 🚀';
    }
}

const theoryNextBtn = document.getElementById('theory-next-btn');
if (theoryNextBtn) {
    theoryNextBtn.onclick = () => {
        const parts = currentTheoryId.split('_L');
        const level = parts[0];
        const index = parseInt(parts[1]) - 1;
        const lesson = getLesson(level, index);
        
        if (theoryStep < lesson.theory.length - 1) {
            theoryStep++;
            renderTheoryStep(lesson);
        } else {
            // Теория пройдена
            if (!state.lessons[lesson.id]) {
                state.lessons[lesson.id] = { completed: false, theoryViewed: false, score: 0 };
            }
            state.lessons[lesson.id].theoryViewed = true;
            saveState();
            startQuiz(lesson.id);
        }
    };
}

// ===== ТЕСТ (QUIZ) =====

let currentQuizId = null;
let quizIndex = 0;
let quizScore = 0;

function startLesson(id) {
    const prog = state.lessons[id];
    // Если теория не просмотрена, идем в теорию. Иначе сразу в тест.
    if (!prog || !prog.theoryViewed) {
        openTheory(id);
    } else {
        startQuiz(id);
    }
}

function startQuiz(id) {
    currentQuizId = id;
    quizIndex = 0;
    quizScore = 0;
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    const parts = currentQuizId.split('_L');
    const level = parts[0];
    const index = parseInt(parts[1]) - 1;
    const lesson = getLesson(level, index);
    
    const q = lesson.questions[quizIndex];
    
    // Обновляем UI теста
    const stepEl = document.getElementById('quiz-step');
    const fillEl = document.getElementById('quiz-fill');
    const qTextEl = document.getElementById('quiz-question');
    const optsEl = document.getElementById('quiz-options');
    
    if (stepEl) stepEl.textContent = quizIndex + 1;
    if (fillEl) fillEl.style.width = ((quizIndex + 1) / 20 * 100) + '%';
    if (qTextEl) qTextEl.textContent = q.q;
    
    if (optsEl) {
        optsEl.innerHTML = '';
        q.a.forEach((ans, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = ans;
            btn.onclick = () => handleAnswer(i, q.c, btn);
            optsEl.appendChild(btn);
        });
    }
}

function handleAnswer(selectedIndex, correctIndex, btnElement) {
    // Блокируем все кнопки
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    
    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        quizScore++;
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
    } else {
        btnElement.classList.add('wrong');
        // Подсвечиваем правильный ответ
        const allOpts = document.querySelectorAll('.option-btn');
        if (allOpts[correctIndex]) allOpts[correctIndex].classList.add('correct');
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('error');
    }
    
    // Задержка перед следующим вопросом
    setTimeout(() => {
        quizIndex++;
        if (quizIndex < 20) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }, 800);
}

function finishQuiz() {
    const parts = currentQuizId.split('_L');
    const level = parts[0];
    const index = parseInt(parts[1]) - 1;
    const lesson = getLesson(level, index);
    
    const pointsEarned = quizScore * 10; // 10 баллов за правильный ответ
    
    // Обновляем состояние
    state.points += pointsEarned;
    state.lessons[lesson.id] = { 
        completed: true, 
        theoryViewed: true, 
        score: quizScore 
    };
    saveState();
    
    // Показываем результаты
    const resCorrect = document.getElementById('result-correct');
    const resPoints = document.getElementById('result-points');
    
    if (resCorrect) resCorrect.textContent = quizScore;
    if (resPoints) resPoints.textContent = pointsEarned;
    
    showScreen('result-screen');
}

// ===== ЗАПУСК ПРИЛОЖЕНИЯ =====

window.addEventListener('load', () => {
    // 1. Загружаем сохраненный прогресс
    loadState();
    
    // 2. Запускаем загрузку базы уроков (асинхронно)
    loadLessonsDB();
    
    // 3. Отрисовываем начальный экран
    updateUI();
    
    // 4. Таймер заставки (Splash Screen)
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.remove('show');
            splash.style.display = 'none';
        }
        showScreen('home-screen');
    }, 5000); // 5 секунд заставки
});
