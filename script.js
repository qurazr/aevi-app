const tg = window.Telegram.WebApp;
tg.expand();

const LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2'];

// ПРОСТАЯ ВЕРСИЯ ДЛЯ ТЕСТА
const DB = {
    'A0': [
        {
            id: 'A0_L1',
            title: 'Урок 1: Глагол to be',
            theory: ['Теория шаг 1', 'Теория шаг 2', 'Теория шаг 3'],
            questions: Array.from({length: 20}, (_, i) => ({
                q: `Вопрос ${i+1}`,
                a: ['A', 'B', 'C', 'D'],
                c: 0
            }))
        },
        {
            id: 'A0_L2',
            title: 'Урок 2: Местоимения',
            theory: ['Теория 1', 'Теория 2', 'Теория 3'],
            questions: Array.from({length: 20}, (_, i) => ({
                q: `Вопрос ${i+1}`,
                a: ['A', 'B', 'C', 'D'],
                c: 1
            }))
        },
        {
            id: 'A0_L3',
            title: 'Урок 3: Артикли',
            theory: ['Теория 1', 'Теория 2', 'Теория 3'],
            questions: Array.from({length: 20}, (_, i) => ({
                q: `Вопрос ${i+1}`,
                a: ['A', 'B', 'C', 'D'],
                c: 2
            }))
        },
        {
            id: 'A0_L4',
            title: 'Урок 4: Вопросы',
            theory: ['Теория 1', 'Теория 2', 'Теория 3'],
            questions: Array.from({length: 20}, (_, i) => ({
                q: `Вопрос ${i+1}`,
                a: ['A', 'B', 'C', 'D'],
                c: 3
            }))
        }
    ],
    'A1': [
        { id: 'A1_L1', title: 'Урок 1: Present Simple', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 0 })) },
        { id: 'A1_L2', title: 'Урок 2: Continuous', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 1 })) },
        { id: 'A1_L3', title: 'Урок 3: Past Simple', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 0 })) },
        { id: 'A1_L4', title: 'Урок 4: Предлоги', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 2 })) }
    ],
    'A2': [
        { id: 'A2_L1', title: 'Урок 1: Perfect', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 1 })) },
        { id: 'A2_L2', title: 'Урок 2: Future', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 0 })) },
        { id: 'A2_L3', title: 'Урок 3: Модальные', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 2 })) },
        { id: 'A2_L4', title: 'Урок 4: Степени', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 1 })) }
    ],
    'B1': [
        { id: 'B1_L1', title: 'Урок 1: Conditionals', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 0 })) },
        { id: 'B1_L2', title: 'Урок 2: Past Cont.', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 1 })) },
        { id: 'B1_L3', title: 'Урок 3: Reported', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 2 })) },
        { id: 'B1_L4', title: 'Урок 4: Passive', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 0 })) }
    ],
    'B2': [
        { id: 'B2_L1', title: 'Урок 1: 2nd Conditional', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 2 })) },
        { id: 'B2_L2', title: 'Урок 2: 3rd Conditional', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 1 })) },
        { id: 'B2_L3', title: 'Урок 3: Mixed', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 0 })) },
        { id: 'B2_L4', title: 'Урок 4: Phrasal verbs', theory: ['1','2','3'], questions: Array.from({length: 20}, (_, i) => ({ q: `Q${i+1}`, a: ['A','B','C','D'], c: 3 })) }
    ]
};

let state = {
    points: 0,
    currentLevel: 'A0',
    isPremium: false,
    lessons: {}
};

function loadState() {
    const saved = localStorage.getItem('aevi_progress');
    if (saved) state = JSON.parse(saved);
}

function saveState() {
    localStorage.setItem('aevi_progress', JSON.stringify(state));
    updateUI();
}

function updateUI() {
    document.getElementById('points-display').textContent = state.points;
    document.getElementById('premium-btn').style.display = state.isPremium ? 'none' : 'block';
    renderLevels();
    renderLessons();
}

function renderLevels() {
    const container = document.getElementById('levels-container');
    container.innerHTML = '';
    LEVELS.forEach(l => {
        if (l === 'B2' && !state.isPremium) return;
        const btn = document.createElement('button');
        btn.className = `level-chip ${state.currentLevel === l ? 'active' : ''}`;
        btn.textContent = l;
        btn.onclick = () => {
            state.currentLevel = l;
            saveState();
        };
        container.appendChild(btn);
    });
}

function renderLessons() {
    const container = document.getElementById('lessons-container');
    container.innerHTML = '';
    const lessons = DB[state.currentLevel] || [];
    
    console.log('Rendering lessons for', state.currentLevel, ':', lessons.length);
    
    lessons.forEach((lesson) => {
        const prog = state.lessons[lesson.id] || { completed: false, theoryViewed: false, score: 0 };
        const card = document.createElement('div');
        card.className = `lesson-card ${prog.completed ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="theory-icon" onclick="event.stopPropagation(); openTheory('${lesson.id}')">?</div>
            <div class="title">${lesson.title}</div>
            <div class="status">${prog.completed ? '✅ Пройден' : (prog.theoryViewed ? '▶️ Доступен' : '📚 Теория')}</div>
        `;
        card.onclick = () => startLesson(lesson.id);
        container.appendChild(card);
    });
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goHome() {
    showScreen('home-screen');
    updateUI();
}

document.getElementById('premium-btn').onclick = () => {
    state.isPremium = true;
    tg.showPopup({ title: ' Premium!', message: 'B2 разблокирован!', buttons: [{ type: 'ok' }] });
    saveState();
};

let currentTheoryLessonId = null;
let theoryStep = 0;

function openTheory(lessonId) {
    currentTheoryLessonId = lessonId;
    const lesson = findLesson(lessonId);
    document.getElementById('theory-title').textContent = lesson.title;
    theoryStep = 0;
    renderTheoryStep();
    showScreen('theory-screen');
}

function renderTheoryStep() {
    const lesson = findLesson(currentTheoryLessonId);
    document.getElementById('theory-content').innerHTML = lesson.theory[theoryStep];
    document.getElementById('theory-next-btn').textContent = theoryStep < lesson.theory.length - 1 ? 'Далее →' : 'К тесту ';
}

document.getElementById('theory-next-btn').onclick = () => {
    const lesson = findLesson(currentTheoryLessonId);
    if (theoryStep < lesson.theory.length - 1) {
        theoryStep++;
        renderTheoryStep();
    } else {
        if (!state.lessons[lesson.id]) state.lessons[lesson.id] = { completed: false, theoryViewed: false, score: 0 };
        state.lessons[lesson.id].theoryViewed = true;
        saveState();
        startQuiz(lesson.id);
    }
};

let currentQuizLessonId = null;
let quizIndex = 0;
let quizScore = 0;

function startLesson(lessonId) {
    const prog = state.lessons[lessonId];
    if (!prog || !prog.theoryViewed) openTheory(lessonId);
    else startQuiz(lessonId);
}

function startQuiz(lessonId) {
    currentQuizLessonId = lessonId;
    quizIndex = 0; quizScore = 0;
    showScreen('quiz-screen');
    loadQuestion();
}

function findLesson(id) {
    for (const l of LEVELS) {
        const found = DB[l]?.find(x => x.id === id);
        if (found) return found;
    }
    return null;
}

function loadQuestion() {
    const lesson = findLesson(currentQuizLessonId);
    const q = lesson.questions[quizIndex];
    document.getElementById('quiz-step').textContent = quizIndex + 1;
    document.getElementById('quiz-fill').style.width = `${((quizIndex + 1) / lesson.questions.length) * 100}%`;
    document.getElementById('quiz-question').textContent = q.q;
    const opts = document.getElementById('quiz-options');
    opts.innerHTML = '';
    q.a.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = ans;
        btn.onclick = () => handleAnswer(i, q.c, btn, lesson.questions.length);
        opts.appendChild(btn);
    });
}

function handleAnswer(selected, correct, btn, total) {
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    if (selected === correct) {
        btn.classList.add('correct'); quizScore++;
    } else {
        btn.classList.add('wrong');
        document.querySelectorAll('.option-btn')[correct].classList.add('correct');
    }
    setTimeout(() => {
        quizIndex++;
        if (quizIndex < total) loadQuestion();
        else finishQuiz();
    }, 800);
}

function finishQuiz() {
    const lesson = findLesson(currentQuizLessonId);
    const pointsEarned = quizScore * 10;
    state.points += pointsEarned;
    state.lessons[lesson.id] = { completed: true, theoryViewed: true, score: quizScore };
    saveState();
    document.getElementById('result-correct').textContent = quizScore;
    document.getElementById('result-points').textContent = pointsEarned;
    showScreen('result-screen');
}

// Запуск
loadState();
updateUI();

setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    splash.classList.remove('show');
    splash.style.display = 'none';
    showScreen('home-screen');
}, 5000);
