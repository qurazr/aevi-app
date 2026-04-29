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
  
  const theory = `📘 <strong>Основы ${language}</strong><br><br>Порядок слов — SVO. Пример: "I learn ${language}".<br>✅ Артикли важны.`;
  
  const tasks = [];
  for (let i = 0; i < 20; i++) {
    const wordObj = vocab[i % vocab.length];
    if (i < 10) {
      let options = [wordObj.translation, '❌ ошибка1', '❌ ошибка2'];
      options = shuffleArray(options);
      tasks.push({
        type: 'choice',
        question: `Перевод "${wordObj.word}":`,
        options: options,
        correct: wordObj.translation
      });
    } else {
      tasks.push({
        type: 'translate',
        question: `Переведите: "${wordObj.word}"`,
        correct: wordObj.translation.toLowerCase()
      });
    }
  }
  return { theory, vocabulary: vocab, practice: tasks };
}

// ------------------- СОХРАНЕНИЕ -------------------
function saveProgress() {
  localStorage.setItem('aevi_progress', JSON.stringify({
    currentScreen, userLevel, currentLang, levelAnswers,
    currentLesson, practiceAnswers, practiceResults, currentPracticeIndex
  }));
}

function loadProgress() {
  const saved = localStorage.getItem('aevi_progress');
  if (!saved) return false;
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
    let correct = levelAnswers.filter((a,i) => a === levelQuestions[i].correct).length;
    userLevel = correct <= 2 ? 'beginner' : correct <= 4 ? 'intermediate' : 'advanced';
    currentScreen = 'languageSelect';
    render();
    return;
  }
  
  container.innerHTML = `
    <div class="card">
      <h2>🌙 Оценка уровня</h2>
      <div class="sub">Вопрос ${answeredCount+1} из ${levelQuestions.length}</div>
      ${currentQ.options.map(opt => `<div class="option" data-value="${opt}">${opt}</div>`).join('')}
      <button class="btn" id="nextBtn">${answeredCount+1 === levelQuestions.length ? 'Завершить' : 'Далее'}</button>
      <div class="progress"><div class="progress-fill" style="width:${(answeredCount/levelQuestions.length)*100}%"></div></div>
    </div>
  `;
  
  document.querySelectorAll('.option').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
      levelAnswers[answeredCount] = el.dataset.value;
    });
  });
  
  document.getElementById('nextBtn')?.addEventListener('click', () => {
    if (levelAnswers[answeredCount]) render();
  });
}

function renderLanguageSelect(container) {
  const levelNames = { beginner: 'Начинающий', intermediate: 'Средний', advanced: 'Продвинутый' };
  container.innerHTML = `
    <div class="card">
      <h2>✨ Выбери язык</h2>
      <div class="sub">Твой уровень: ${levelNames[userLevel]}</div>
      <select id="langSelect" style="width:100%;padding:12px;border-radius:40px;background:#0f141c;color:white;border:1px solid #2c3a4a;margin-bottom:1rem;">
        <option value="English">🇬🇧 Английский</option>
        <option value="Spanish">🇪🇸 Испанский</option>
        <option value="French">🇫🇷 Французский</option>
        <option value="German">🇩🇪 Немецкий</option>
      </select>
      <button class="btn" id="generateBtn">🚀 Сгенерировать урок</button>
    </div>
  `;
  
  document.getElementById('langSelect').onchange = (e) => currentLang = e.target.value;
  document.getElementById('generateBtn').onclick = () => {
    currentLesson = generateLesson(userLevel, currentLang);
    practiceAnswers = new Array(20).fill(null);
    practiceResults = new Array(20).fill(false);
    currentPracticeIndex = 0;
    currentScreen = 'theory';
    render();
  };
}

function renderTheory(container) {
  container.innerHTML = `
    <div class="card">
      <h2>📖 Теория — ${currentLang}</h2>
      <div style="margin:20px 0">${currentLesson.theory}</div>
      <strong>📚 Словарь</strong>
      <div class="word-list">
        ${currentLesson.vocabulary.map(w => `<div class="word-item"><span>${w.word}</span><span>${w.translation}</span></div>`).join('')}
      </div>
      <button class="btn" id="startPractice">🎯 К практике (20 заданий)</button>
    </div>
  `;
  document.getElementById('startPractice').onclick = () => {
    currentScreen = 'practice';
    render();
  };
}

function renderPractice(container) {
  const total = currentLesson.practice.length;
  const q = currentLesson.practice[currentPracticeIndex];
  const userAnswer = practiceAnswers[currentPracticeIndex] || '';
  const isAnswered = practiceAnswers[currentPracticeIndex] !== null;
  
  let html = `
    <div class="card">
      <div class="flex-between"><h2>✍️ Практика</h2><div class="score">✅ ${practiceResults.filter(r=>r===true).length}/${total}</div></div>
      <div class="progress"><div class="progress-fill" style="width:${(currentPracticeIndex/total)*100}%"></div></div>
      <div class="practice-question">
        <strong>${currentPracticeIndex+1}/${total}</strong>
        <p style="margin:12px 0">${q.question}</p>
  `;
  
  if (q.type === 'choice') {
    html += `<div>${q.options.map(opt => `<div class="option" data-choice="${opt}">${opt}</div>`).join('')}</div>`;
  } else {
    html += `<input type="text" id="answerInput" class="practice-input" placeholder="Ваш ответ..." value="${userAnswer}">`;
  }
  
  if (isAnswered) {
    html += `<div class="${practiceResults[currentPracticeIndex] ? 'correct' : 'wrong'}">${practiceResults[currentPracticeIndex] ? '✓ Верно!' : '✗ Ошибка. Правильно: ' + q.correct}</div>`;
  }
  
  html += `<button class="btn" id="checkBtn">${isAnswered ? 'Изменить' : 'Проверить'}</button>`;
  if (currentPracticeIndex + 1 < total) {
    html += `<button class="btn" id="nextBtn" style="margin-top:0.5rem">Далее →</button>`;
  } else {
    html += `<button class="btn" id="finishBtn" style="margin-top:0.5rem">🏆 Завершить</button>`;
  }
  html += `<button class="btn-small" id="backBtn" style="margin-top:0.5rem">← К теории</button></div></div>`;
  
  container.innerHTML = html;
  
  if (q.type !== 'choice') {
    const input = document.getElementById('answerInput');
    if (input && !isAnswered) input.focus();
  }
  
  document.querySelectorAll('.option').forEach(opt => {
    opt.onclick = () => {
      if (isAnswered) return;
      document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    };
  });
  
  document.getElementById('checkBtn').onclick = () => {
    let answer = '';
    if (q.type === 'choice') {
      const selected = document.querySelector('.option.selected');
      if (!selected) return;
      answer = selected.dataset.choice;
    } else {
      answer = document.getElementById('answerInput')?.value.trim().toLowerCase() || '';
    }
    practiceAnswers[currentPracticeIndex] = answer;
    practiceResults[currentPracticeIndex] = (answer === q.correct.toLowerCase());
    render();
  };
  
  document.getElementById('nextBtn')?.addEventListener('click', () => {
    if (practiceAnswers[currentPracticeIndex] !== null) {
      currentPracticeIndex++;
      render();
    }
  });
  
  document.getElementById('finishBtn')?.addEventListener('click', () => {
    alert(`✨ Результат: ${practiceResults.filter(r=>r===true).length}/20`);
    currentScreen = 'theory';
    render();
  });
  
  document.getElementById('backBtn').onclick = () => {
    currentScreen = 'theory';
    render();
  };
}

// ------------------- СПЛЕШ НА 5 СЕКУНД -------------------
function showSplash() {
  const splash = document.createElement('div');
  splash.className = 'splash-screen';
  splash.innerHTML = `
    <div class="splash-content">
      <div class="splash-logo">Aevi</div>
      <div class="splash-glow"></div>
      <div class="splash-timer" id="splashTimer">5</div>
    </div>
  `;
  document.body.appendChild(splash);
  
  let seconds = 5;
  const timerEl = splash.querySelector('#splashTimer');
  
  const interval = setInterval(() => {
    seconds--;
    if (timerEl) timerEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.remove();
        loadProgress();
        render();
      }, 1000);
    }
  }, 1000);
}

// ЗАПУСК
showSplash();
