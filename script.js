// ------------------- UTILITY -------------------
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ------------------- AI GENERATOR -------------------
function generateLesson(level, language) {
  const levels = { beginner: 'A1', intermediate: 'B1', advanced: 'C1' };
  const lvl = levels[level] || 'B1';

  const translations = {
    hello: { English: 'hello', Spanish: 'hola', French: 'bonjour', German: 'hallo' },
    goodbye: { English: 'goodbye', Spanish: 'adiós', French: 'au revoir', German: 'auf wiedersehen' },
    please: { English: 'please', Spanish: 'por favor', French: 's\'il vous plaît', German: 'bitte' },
    thanks: { English: 'thanks', Spanish: 'gracias', French: 'merci', German: 'danke' },
    yes: { English: 'yes', Spanish: 'sí', French: 'oui', German: 'ja' },
    no: { English: 'no', Spanish: 'no', French: 'non', German: 'nein' }
  };

  const words = ['hello', 'goodbye', 'please', 'thanks', 'yes', 'no'];
  let vocab = words.map(w => ({ word: w, translation: translations[w][language] || w }));

  const theoryByLevel = {
    beginner: `📘 <strong>Основы ${language}</strong><br><br>В ${language} базовый порядок слов — SVO.<br>Пример: "I learn ${language}"<br><br>✅ Артикли важны<br>✅ Глаголы спрягаются`,
    intermediate: `📙 <strong>${language} для среднего уровня</strong><br><br>Времена Perfect и условные предложения.<br>📌 Пример: "If I had studied, I would have passed"`,
    advanced: `📕 <strong>Продвинутый ${language}</strong><br><br>Сослагательное наклонение, инверсии.<br>✨ Пример: "Never have I seen such a sunset"`
  };

  const theory = theoryByLevel[level] + `<br><br>🎯 <strong>Уровень: ${lvl.toUpperCase()}</strong>`;

  const tasks = [];
  for (let i = 0; i < 20; i++) {
    const wordObj = vocab[i % vocab.length];
    if (i < 10) {
      let options = [wordObj.translation, '❌ ошибка1', '❌ ошибка2'];
      options = shuffleArray([...options]);
      tasks.push({
        type: 'choice',
        question: `📝 Перевод слова "${wordObj.word}":`,
        options: options,
        correct: wordObj.translation
      });
    } else {
      tasks.push({
        type: 'translate',
        question: `✍️ Переведите на ${language}: "${wordObj.word}"`,
        correct: wordObj.translation.toLowerCase()
      });
    }
  }

  return { theory, vocabulary: vocab, practice: tasks };
}

// ------------------- СОХРАНЕНИЕ -------------------
function saveProgress() {
  const progress = {
    currentScreen, userLevel, currentLang, levelAnswers,
    currentLesson, practiceAnswers, practiceResults, currentPracticeIndex
  };
  localStorage.setItem('aevi_progress', JSON.stringify(progress));
}

function loadProgress() {
  const saved = localStorage.getItem('aevi_progress');
  if (!saved) return false;
  try {
    const data = JSON.parse(saved);
    currentScreen = data.currentScreen;
    userLevel = data.userLevel;
    currentLang = data.currentLang;
    levelAnswers = data.levelAnswers || [];
    currentLesson = data.currentLesson;
    practiceAnswers = data.practiceAnswers || new Array(20).fill(null);
    practiceResults = data.practiceResults || new Array(20).fill(false);
    currentPracticeIndex = data.currentPracticeIndex || 0;
    return true;
  } catch(e) { return false; }
}

function resetProgress() {
  localStorage.removeItem('aevi_progress');
  currentScreen = 'levelTest';
  userLevel = null;
  currentLang = 'English';
  levelAnswers = [];
  currentLesson = null;
  practiceAnswers = new Array(20).fill(null);
  practiceResults = new Array(20).fill(false);
  currentPracticeIndex = 0;
  render();
}

// ------------------- STATE -------------------
let currentScreen = 'levelTest';
let userLevel = null;
let currentLang = 'English';
let levelAnswers = [];
let currentLesson = null;
let practiceAnswers = new Array(20).fill(null);
let practiceResults = new Array(20).fill(false);
let currentPracticeIndex = 0;

const levelQuestions = [
  { text: 'She ___ to school every day.', options: ['go', 'goes', 'going', 'went'], correct: 'goes' },
  { text: 'Синоним "быстрый"?', options: ['медленный', 'скорый', 'тихий', 'глубокий'], correct: 'скорый' },
  { text: 'Как "собака" по-английски?', options: ['cat', 'dog', 'bird', 'fish'], correct: 'dog' },
  { text: 'Время в "I have seen"?', options: ['Present Simple', 'Past Simple', 'Present Perfect', 'Future'], correct: 'Present Perfect' },
  { text: 'I am interested ___ learning.', options: ['in', 'on', 'at', 'for'], correct: 'in' }
];

// ------------------- RENDER -------------------
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  if (currentScreen === 'levelTest') renderLevelTest(app);
  else if (currentScreen === 'languageSelect') renderLanguageSelect(app);
  else if (currentScreen === 'theory') renderTheory(app);
  else if (currentScreen === 'practice') renderPractice(app);

  saveProgress();
}

function renderLevelTest(container) {
  const answeredCount = levelAnswers.length;
  const currentQ = levelQuestions[answeredCount];

  if (!currentQ) {
    let correct = levelAnswers.filter((a, i) => a === levelQuestions[i].correct).length;
    userLevel = correct <= 2 ? 'beginner' : correct <= 4 ? 'intermediate' : 'advanced';
    currentScreen = 'languageSelect';
    render();
    return;
  }

  const selectedValue = levelAnswers[answeredCount] || '';
  container.innerHTML = `
    <div class="card">
      <h2>🌙 Оценка уровня</h2>
      <div class="sub">Вопрос ${answeredCount+1} из ${levelQuestions.length}</div>
      <div class="options">
        ${currentQ.options.map(opt => `<div class="option ${selectedValue === opt ? 'selected' : ''}" data-value="${opt}">${opt}</div>`).join('')}
      </div>
      <button class="btn" id="nextLevelBtn">${answeredCount+1 === levelQuestions.length ? 'Завершить' : 'Далее'}</button>
      <div class="progress"><div class="progress-fill" style="width:${(answeredCount/levelQuestions.length)*100}%"></div></div>
      <button class="btn-small" id="resetAllBtn" style="margin-top: 1rem; background: #ff5e7c20; color:#ff9eae;">🔄 Сбросить всё</button>
    </div>
  `;

  document.querySelectorAll('.option').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
      levelAnswers[answeredCount] = el.dataset.value;
    });
  });

  document.getElementById('nextLevelBtn')?.addEventListener('click', () => {
    if (levelAnswers[answeredCount]) render();
  });

  document.getElementById('resetAllBtn')?.addEventListener('click', () => {
    if (confirm('Сбросить весь прогресс?')) resetProgress();
  });
}

function renderLanguageSelect(container) {
  const levelNames = { beginner: '🌱 Начинающий', intermediate: '🌟 Средний', advanced: '🚀 Продвинутый' };
  container.innerHTML = `
    <div class="card">
      <h2>✨ Выбери язык</h2>
      <div class="sub">Твой уровень: ${levelNames[userLevel]}</div>
      <select id="langSelect" class="lang-select">
        <option value="English" ${currentLang === 'English' ? 'selected' : ''}>🇬🇧 Английский</option>
        <option value="Spanish" ${currentLang === 'Spanish' ? 'selected' : ''}>🇪🇸 Испанский</option>
        <option value="French" ${currentLang === 'French' ? 'selected' : ''}>🇫🇷 Французский</option>
        <option value="German" ${currentLang === 'German' ? 'selected' : ''}>🇩🇪 Немецкий</option>
      </select>
      <button class="btn" id="generateLessonBtn">🚀 Сгенерировать урок</button>
      <button class="btn-small" id="resetAllBtn2" style="margin-top: 1rem; background: #ff5e7c20; color:#ff9eae;">🔄 Сбросить всё</button>
    </div>
  `;

  document.getElementById('langSelect')?.addEventListener('change', (e) => { currentLang = e.target.value; saveProgress(); });
  document.getElementById('generateLessonBtn')?.addEventListener('click', () => {
    currentLesson = generateLesson(userLevel, currentLang);
    practiceAnswers = new Array(20).fill(null);
    practiceResults = new Array(20).fill(false);
    currentPracticeIndex = 0;
    currentScreen = 'theory';
    render();
  });
  document.getElementById('resetAllBtn2')?.addEventListener('click', () => {
    if (confirm('Сбросить весь прогресс?')) resetProgress();
  });
}

function renderTheory(container) {
  if (!currentLesson) return;
  container.innerHTML = `
    <div class="card">
      <h2>📖 Теория — ${currentLang}</h2>
      <div class="sub">Уровень: ${userLevel}</div>
      <div style="margin: 20px 0; line-height: 1.6;">
        ${currentLesson.theory}
      </div>
      <div style="margin: 24px 0;">
        <strong>📚 Словарь (${currentLesson.vocabulary.length} слов)</strong>
        <div class="word-list">
          ${currentLesson.vocabulary.map(w => `<div class="word-item"><span>${w.word}</span><span style="color:#b0f5ff;">${w.translation}</span></div>`).join('')}
        </div>
      </div>
      <div class="button-group">
        <button class="btn-small" id="backToLangBtn">← Назад</button>
        <button class="btn" id="startPracticeBtn">🎯 К практике (20 заданий)</button>
      </div>
      <button class="btn-small" id="resetAllBtn3" style="margin-top: 1rem; background: #ff5e7c20; color:#ff9eae;">🔄 Сбросить всё</button>
    </div>
  `;

  document.getElementById('backToLangBtn')?.addEventListener('click', () => {
    currentScreen = 'languageSelect';
    render();
  });
  document.getElementById('startPracticeBtn')?.addEventListener('click', () => {
    currentScreen = 'practice';
    render();
  });
  document.getElementById('resetAllBtn3')?.addEventListener('click', () => {
    if (confirm('Сбросить весь прогресс?')) resetProgress();
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
      <div class="flex-between"><h2>✍️ Практика</h2><div class="score">✅ ${practiceResults.filter(r=>r===true).length}/${total}</div></div>
      <div class="progress"><div class="progress-fill" style="width:${((currentPracticeIndex)/total)*100}%"></div></div>
      <div class="practice-question">
        <strong>Задание ${currentPracticeIndex+1}/${total}</strong>
        <p style="margin: 12px 0;">${q.question}</p>
  `;

  if (q.type === 'choice') {
    innerHtml += `<div class="options" id="practiceOptions">
      ${q.options.map(opt => `<div class="option ${userAnswer === opt ? 'selected' : ''}" data-choice="${opt}">${opt}</div>`).join('')}
    </div>`;
  } else {
    innerHtml += `<input type="text" id="practiceInput" class="practice-input" placeholder="Ваш ответ..." value="${userAnswer || ''}">`;
  }

  if (isAnswered) {
    innerHtml += `<div class="result-badge ${resultClass}">${practiceResults[currentPracticeIndex] ? '✓ Верно!' : '✗ Ошибка. Правильно: ' + q.correct}</div>`;
  }

  innerHtml += `<div style="display:flex; gap:1rem; margin-top:1rem;">
    <button class="btn" id="checkAnswerBtn" style="flex:1;">${isAnswered ? 'Изменить' : 'Проверить'}</button>
    ${currentPracticeIndex + 1 < total ? '<button class="btn" id="nextPracticeBtn" style="flex:1;">Далее →</button>' : '<button class="btn" id="finishPracticeBtn" style="flex:1;">🏆 Завершить</button>'}
  </div>
  <div style="display:flex; gap:1rem; margin-top: 10px;">
    <button class="btn-small" id="backToTheoryBtn" style="flex:1;">← К теории</button>
    <button class="btn-small" id="exitPracticeBtn" style="flex:1; background: #ff5e7c20; color:#ff9eae;">⚠️ Выйти</button>
  </div>
  <button class="btn-small" id="resetAllBtn4" style="margin-top: 10px; background: #ff5e7c20; color:#ff9eae;">🔄 Сбросить всё</button>
  </div></div>`;

  container.innerHTML = innerHtml;

  if (q.type !== 'choice') {
    const inp = document.getElementById('practiceInput');
    if (inp && !isAnswered) inp.focus();
    if (inp) inp.addEventListener('keypress', (e) => { if (e.key === 'Enter') document.getElementById('checkAnswerBtn')?.click(); });
  }

  document.getElementById('checkAnswerBtn')?.addEventListener('click', () => {
    let answer = '';
    if (q.type === 'choice') {
      const selected = document.querySelector('#practiceOptions .option.selected');
      if (!selected) return;
      answer = selected.dataset.choice;
    } else {
      answer = document.getElementById('practiceInput')?.value.trim().toLowerCase() || '';
    }
    const isCorrect = (answer.toLowerCase() === q.correct.toLowerCase());
    practiceAnswers[currentPracticeIndex] = answer;
    practiceResults[currentPracticeIndex] = isCorrect;
    render();
  });

  document.getElementById('nextPracticeBtn')?.addEventListener('click', () => {
    if (practiceAnswers[currentPracticeIndex] === null) return;
    if (currentPracticeIndex + 1 < total) {
      currentPracticeIndex++;
      render();
    }
  });

  document.getElementById('finishPracticeBtn')?.addEventListener('click', () => {
    const finalScore = practiceResults.filter(r=>r===true).length;
    alert(`✨ Результат: ${finalScore} / 20`);
    if (confirm('Начать сначала?')) {
      resetProgress();
    } else {
      currentScreen = 'theory';
      render();
    }
  });

  document.getElementById('backToTheoryBtn')?.addEventListener('click', () => {
    currentScreen = 'theory';
    render();
  });

  document.getElementById('exitPracticeBtn')?.addEventListener('click', () => {
    if (confirm('⚠️ Выйти? Прогресс этого урока будет потерян.')) {
      practiceAnswers = new Array(20).fill(null);
      practiceResults = new Array(20).fill(false);
      currentPracticeIndex = 0;
      currentScreen = 'theory';
      render();
    }
  });

  document.getElementById('resetAllBtn4')?.addEventListener('click', () => {
    if (confirm('Сбросить всё?')) resetProgress();
  });

  if (q.type === 'choice') {
    document.querySelectorAll('#practiceOptions .option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (practiceAnswers[currentPracticeIndex] !== null) return;
        document.querySelectorAll('#practiceOptions .option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });
  }
}

// ------------------- ЗАПУСК -------------------
document.addEventListener('DOMContentLoaded', function() {
  loadProgress();
  render();
});
