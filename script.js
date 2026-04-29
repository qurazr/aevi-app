// ------------------- FAKE AI GENERATOR (имитация DeepSeek API) -------------------
// на основе уровня и языка генерирует урок (теория, словарь, 20 заданий разных типов)
function generateLesson(level, language) {
  const levels = { beginner: 'A1', intermediate: 'B1', advanced: 'C1' };
  const lvl = levels[level] || 'B1';

  const commonVocab = {
    beginner: [{ word: 'hello', translation: 'hola' }, { word: 'goodbye', translation: 'adiós' }, { word: 'please', translation: 'por favor' }, { word: 'thanks', translation: 'gracias' }, { word: 'yes', translation: 'sí' }, { word: 'no', translation: 'no' }],
    intermediate: [{ word: 'therefore', translation: 'por lo tanto' }, { word: 'although', translation: 'aunque' }, { word: 'develop', translation: 'desarrollar' }, { word: 'achieve', translation: 'lograr' }, { word: 'significant', translation: 'significativo' }, { word: 'nevertheless', translation: 'sin embargo' }],
    advanced: [{ word: 'ubiquitous', translation: 'ubicuo' }, { word: 'mitigate', translation: 'mitigar' }, { word: 'cogent', translation: 'convincente' }, { word: 'dichotomy', translation: 'dicotomía' }, { word: 'pedagogy', translation: 'pedagogía' }, { word: 'ephemeral', translation: 'efímero' }]
  };

  let vocab = commonVocab[level] || commonVocab.intermediate;
  // адаптируем под выбранный язык (демо: заменяем перевод в духе языка)
  const langMap = { Spanish: 'es', French: 'fr', German: 'de' };
  const langCode = langMap[language] || 'es';
  if (language !== 'Spanish') {
    vocab = vocab.map(v => ({ word: v.word, translation: `[${language}] ${v.word}` }));
  }

  const teorias = {
    beginner: `В ${language} базовый порядок слов — SVO (Подлежащее-Сказуемое-Дополнение). Например: "I learn ${language}". Артикли важны.`,
    intermediate: `В ${language} среднего уровня изучим времена группы Perfect и условные предложения. Пример: "If I had studied, I would have passed".`,
    advanced: `Сослагательное наклонение, сложные союзы и стилистические инверсии в ${language}. Пример: "Never have I seen such a beautiful sunset".`
  };

  const theory = teorias[level] + ` Уровень: ${lvl.toUpperCase()}. Фокус на практике.`;

  // Генерация 20 заданий разных типов (выбор, перевод ввод, правда/ложь)
  const tasks = [];
  for (let i = 0; i < 20; i++) {
    let type = (i % 3 === 0) ? 'choice' : (i % 2 === 0) ? 'translate' : 'complete';
    if (i < 5) type = 'choice';
    if (i >= 5 && i < 12) type = 'translate';
    if (i >= 12) type = 'complete';

    if (type === 'choice') {
      tasks.push({
        type: 'choice',
        question: `Выберите правильный перевод слова "${vocab[i % vocab.length].word}":`,
        options: [vocab[i % vocab.length].translation, `[неверно] ${vocab[(i+1)%vocab.length].word}`, `[неверно] ${vocab[(i+2)%vocab.length].word}`],
        correct: vocab[i % vocab.length].translation
      });
    } else if (type === 'translate') {
      tasks.push({
        type: 'translate',
        question: `Переведите на ${language}: "${vocab[i % vocab.length].word}"`,
        correct: vocab[i % vocab.length].translation.toLowerCase()
      });
    } else {
      tasks.push({
        type: 'complete',
        question: `Завершите фразу: "I ___ to learn ${language} yesterday." (started/start)`,
        correct: 'started'
      });
    }
  }
  // перемешаем немного для натуральности, но порядок фикс
  return { theory, vocabulary: vocab, practice: tasks };
}

// ------------------- STATE -------------------
let currentScreen = 'levelTest'; // levelTest, languageSelect, lesson, practice
let userLevel = null; // beginner/intermediate/advanced
let currentLang = 'Spanish';
let levelAnswers = [];
let currentLesson = null;
let practiceAnswers = new Array(20).fill(null); // храним ответы пользователя
let practiceResults = new Array(20).fill(false);
let currentPracticeIndex = 0;

// вопросы для определения уровня (5 шт)
const levelQuestions = [
  { text: 'Выбери правильную форму: "She ___ to school every day."', options: ['go', 'goes', 'going', 'went'], correct: 'goes' },
  { text: 'Синоним слова "быстрый"?', options: ['медленный', 'скорый', 'тихий', 'глубокий'], correct: 'скорый' },
  { text: 'Как будет "собака" на английском?', options: ['cat', 'dog', 'bird', 'fish'], correct: 'dog' },
  { text: 'Какое время используется в: "I have seen that movie"?', options: ['Present Simple', 'Past Simple', 'Present Perfect', 'Future'], correct: 'Present Perfect' },
  { text: 'Выберите правильный предлог: "I am interested ___ learning languages."', options: ['in', 'on', 'at', 'for'], correct: 'in' }
];

// ------------------- RENDER -------------------
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  if (currentScreen === 'levelTest') {
    renderLevelTest(app);
  } else if (currentScreen === 'languageSelect') {
    renderLanguageSelect(app);
  } else if (currentScreen === 'lesson') {
    renderLesson(app);
  } else if (currentScreen === 'practice') {
    renderPractice(app);
  }
}

function renderLevelTest(container) {
  const answeredCount = levelAnswers.length;
  const currentQ = levelQuestions[answeredCount];
  if (!currentQ && answeredCount === levelQuestions.length) {
    // подсчёт уровня: сумма правильных
    let correct = 0;
    levelAnswers.forEach((ans, idx) => {
      if (ans === levelQuestions[idx].correct) correct++;
    });
    if (correct <= 2) userLevel = 'beginner';
    else if (correct <= 4) userLevel = 'intermediate';
    else userLevel = 'advanced';
    currentScreen = 'languageSelect';
    render();
    return;
  }

  const selectedValue = levelAnswers[answeredCount] || '';
  container.innerHTML = `
    <div class="card">
      <h2>🌙 Оценка уровня</h2>
      <div class="sub">Вопрос ${answeredCount+1} из ${levelQuestions.length}</div>
      <div class="question-box">
        <div class="question-text">${currentQ.text}</div>
        <div class="options">
          ${currentQ.options.map(opt => `<div class="option ${selectedValue === opt ? 'selected' : ''}" data-value="${opt}">${opt}</div>`).join('')}
        </div>
      </div>
      <button class="btn" id="nextLevelBtn">${answeredCount+1 === levelQuestions.length ? 'Завершить' : 'Далее'}</button>
      <div class="progress"><div class="progress-fill" style="width:${(answeredCount/levelQuestions.length)*100}%"></div></div>
    </div>
  `;
  document.querySelectorAll('.option').forEach(el => {
    el.addEventListener('click', (e) => {
      const val = el.dataset.value;
      levelAnswers[answeredCount] = val;
      render();
    });
  });
  document.getElementById('nextLevelBtn')?.addEventListener('click', () => {
    if (!levelAnswers[answeredCount]) return;
    render(); // перерисовка с переходом
  });
}

function renderLanguageSelect(container) {
  container.innerHTML = `
    <div class="card">
      <h2>✨ Выбери язык</h2>
      <div class="sub">Твой уровень: ${userLevel === 'beginner' ? 'Начинающий' : userLevel === 'intermediate' ? 'Средний' : 'Продвинутый'}</div>
      <select id="langSelect" class="lang-select">
        <option value="Spanish" ${currentLang === 'Spanish' ? 'selected' : ''}>🇪🇸 Испанский</option>
        <option value="French" ${currentLang === 'French' ? 'selected' : ''}>🇫🇷 Французский</option>
        <option value="German" ${currentLang === 'German' ? 'selected' : ''}>🇩🇪 Немецкий</option>
      </select>
      <button class="btn" id="generateLessonBtn">🚀 Сгенерировать ИИ-урок</button>
    </div>
  `;
  document.getElementById('langSelect')?.addEventListener('change', (e) => { currentLang = e.target.value; });
  document.getElementById('generateLessonBtn')?.addEventListener('click', () => {
    // генерируем урок на основе уровня и языка
    currentLesson = generateLesson(userLevel, currentLang);
    practiceAnswers = new Array(20).fill(null);
    practiceResults = new Array(20).fill(false);
    currentPracticeIndex = 0;
    currentScreen = 'lesson';
    render();
  });
}

function renderLesson(container) {
  if (!currentLesson) return;
  container.innerHTML = `
    <div class="card">
      <h2>📖 Твой ИИ-урок (${currentLang})</h2>
      <div class="sub">Уровень: ${userLevel}</div>
      <div class="theory-block">
        <strong>🧠 Теория</strong>
        <p style="margin-top: 8px;">${currentLesson.theory}</p>
      </div>
      <div style="margin: 24px 0;"><strong>📚 Словарь</strong>
        <div class="word-list">
          ${currentLesson.vocabulary.map(w => `<div class="word-item"><span>${w.word}</span><span style="color:#b0f5ff;">${w.translation}</span></div>`).join('')}
        </div>
      </div>
      <button class="btn" id="startPracticeBtn">🎯 Перейти к практике (20 заданий)</button>
    </div>
  `;
  document.getElementById('startPracticeBtn')?.addEventListener('click', () => {
    currentScreen = 'practice';
    render();
  });
}

function renderPractice(container) {
  if (!currentLesson) return;
  const total = currentLesson.practice.length;
  const q = currentLesson.practice[currentPracticeIndex];
  const userAnswer = practiceAnswers[currentPracticeIndex] || '';
  const isAnswered = practiceAnswers[currentPracticeIndex] !== null;
  const resultClass = practiceResults[currentPracticeIndex] ? 'correct' : (isAnswered ? 'wrong' : '');

  let innerHtml = `
    <div class="card">
      <div class="flex-between"><h2>✍️ Практика</h2><div class="score">${practiceResults.filter(r=>r===true).length}/${total}</div></div>
      <div class="progress"><div class="progress-fill" style="width:${((currentPracticeIndex)/total)*100}%"></div></div>
      <div class="practice-question">
        <strong>Задание ${currentPracticeIndex+1}/${total}</strong>
        <p style="margin: 12px 0;">${q.question}</p>
  `;

  if (q.type === 'choice') {
    innerHtml += `<div class="options" id="practiceOptions">
      ${q.options.map(opt => `<div class="option ${userAnswer === opt ? 'selected' : ''}" data-choice="${opt}">${opt}</div>`).join('')}
    </div>`;
  } else if (q.type === 'translate') {
    innerHtml += `<input type="text" id="practiceInput" class="practice-input" placeholder="Ваш перевод..." value="${userAnswer||''}">`;
  } else {
    innerHtml += `<input type="text" id="practiceInput" class="practice-input" placeholder="Вставьте слово..." value="${userAnswer||''}">`;
  }

  if (isAnswered) {
    innerHtml += `<div class="result-badge ${resultClass}">${practiceResults[currentPracticeIndex] ? '✓ Верно!' : '✗ Ошибка. Правильно: '+q.correct}</div>`;
  }

  innerHtml += `<div style="display:flex; gap:1rem; margin-top:1rem;">
    <button class="btn" id="checkAnswerBtn" style="flex:1;">${isAnswered ? 'Изменить' : 'Проверить'}</button>
    ${currentPracticeIndex + 1 < total ? '<button class="btn" id="nextPracticeBtn" style="flex:1;">Далее →</button>' : '<button class="btn" id="finishPracticeBtn" style="flex:1;">🏆 Завершить</button>'}
  </div></div></div>`;

  container.innerHTML = innerHtml;

  if (q.type !== 'choice') {
    const inp = document.getElementById('practiceInput');
    if (inp && !isAnswered) inp.focus();
  }

  const checkBtn = document.getElementById('checkAnswerBtn');
  checkBtn?.addEventListener('click', () => {
    let answer = '';
    if (q.type === 'choice') {
      const selected = document.querySelector('#practiceOptions .option.selected');
      if (!selected) return;
      answer = selected.dataset.choice;
    } else {
      const inputVal = document.getElementById('practiceInput')?.value.trim().toLowerCase() || '';
      answer = inputVal;
    }
    const isCorrect = (answer.toLowerCase() === q.correct.toLowerCase());
    practiceAnswers[currentPracticeIndex] = answer;
    practiceResults[currentPracticeIndex] = isCorrect;
    render();
  });

  if (!checkBtn && !isAnswered) {
    // авто-обработка enter для инпутов
    const inp = document.getElementById('practiceInput');
    if (inp) inp.addEventListener('keypress', (e) => { if (e.key === 'Enter') document.getElementById('checkAnswerBtn')?.click(); });
  }

  const nextBtn = document.getElementById('nextPracticeBtn');
  nextBtn?.addEventListener('click', () => {
    if (practiceAnswers[currentPracticeIndex] === null) return;
    if (currentPracticeIndex + 1 < total) {
      currentPracticeIndex++;
      render();
    }
  });

  const finishBtn = document.getElementById('finishPracticeBtn');
  finishBtn?.addEventListener('click', () => {
    let finalScore = practiceResults.filter(r=>r===true).length;
    alert(`✨ Урок завершён! Твой результат: ${finalScore} / 20. Молодец! 💫`);
    // можно начать заново или предложить сброс
    if (confirm('Хочешь начать сначала? (с тестом уровня)')) {
      resetApp();
    } else {
      currentScreen = 'lesson';
      render();
    }
  });

  if (q.type === 'choice') {
    document.querySelectorAll('#practiceOptions .option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        if (practiceAnswers[currentPracticeIndex] !== null) return;
        document.querySelectorAll('#practiceOptions .option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });
  }
}

function resetApp() {
  userLevel = null;
  levelAnswers = [];
  currentLesson = null;
  practiceAnswers = new Array(20).fill(null);
  practiceResults = new Array(20).fill(false);
  currentPracticeIndex = 0;
  currentScreen = 'levelTest';
  render();
}

// инициализация
render();
