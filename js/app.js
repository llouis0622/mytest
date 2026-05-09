// ═══════════════════════════════════════════════════════
//  app.js  ·  AI Lab 앱 로직 (라우팅 · 공부 · 퀴즈)
// ═══════════════════════════════════════════════════════

// ── 상태 ──────────────────────────────────────────────
let currentChapter = null;
let currentMode    = 'study';   // 'study' | 'quiz'
let quizState = {
  questions: [],
  current:   0,
  answers:   {},
  score:     0,
  filter:    'all',
  answered:  false,
};
const completed = new Set(
  JSON.parse(localStorage.getItem('ailab-done') || '[]')
);

// ── 초기화 ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  updateProgress();
});

// ══════════════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════════════
function buildNav() {
  const nav = document.getElementById('nav-list');
  nav.innerHTML = '';

  CHAPTER_GROUPS.forEach(g => {
    const chapters = CHAPTERS.filter(c => c.group === g.id);
    if (!chapters.length) return;

    const lbl = document.createElement('div');
    lbl.className = 'nav-group-label';
    lbl.textContent = g.label;
    nav.appendChild(lbl);

    chapters.forEach(ch => {
      const item = document.createElement('div');
      item.className = 'nav-item' + (currentChapter?.id === ch.id ? ' active' : '');
      item.dataset.id = ch.id;
      const done = completed.has(ch.id);
      item.innerHTML = `
        <span class="ni-icon">${ch.icon}</span>
        <span class="ni-title">${ch.title}</span>
        ${done ? '<span class="ni-done">✓</span>' : ''}
      `;
      item.addEventListener('click', () => goToChapter(ch.id));
      nav.appendChild(item);
    });
  });
}

function filterNav(q) {
  const val = q.toLowerCase().trim();
  document.querySelectorAll('.nav-item').forEach(el => {
    el.style.display = (!val || el.textContent.toLowerCase().includes(val)) ? '' : 'none';
  });
  document.querySelectorAll('.nav-group-label').forEach(el => {
    el.style.display = val ? 'none' : '';
  });
}

function updateProgress() {
  const total = CHAPTERS.length;
  const done  = CHAPTERS.filter(c => completed.has(c.id)).length;
  const pct   = Math.round((done / total) * 100);
  document.getElementById('prog-fill').style.width  = pct + '%';
  document.getElementById('prog-label').textContent = pct + '%';
}

// ── 사이드바 ─────────────────────────────────────────
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
document.addEventListener('click', e => {
  const sb = document.getElementById('sidebar');
  const hb = document.querySelector('.hamburger');
  if (window.innerWidth <= 768 && !sb.contains(e.target) && e.target !== hb) {
    sb.classList.remove('open');
  }
});

// ── 시작 화면 ─────────────────────────────────────────
function startLearning() {
  const first = CHAPTERS[0];
  goToChapter(first.id);
}

// ══════════════════════════════════════════════════════
//  MODE SWITCH
// ══════════════════════════════════════════════════════
function setMode(mode) {
  currentMode = mode;
  document.getElementById('btn-study').classList.toggle('active', mode === 'study');
  document.getElementById('btn-quiz').classList.toggle('active', mode === 'quiz');

  if (mode === 'study') {
    if (currentChapter) goToChapter(currentChapter.id);
    else showHero();
  } else {
    showQuizPicker();
  }
}

// ══════════════════════════════════════════════════════
//  SCREENS
// ══════════════════════════════════════════════════════
function showScreen(name) {
  ['hero-screen','study-screen','quiz-screen','result-screen'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.toggle('hidden', id !== name);
  });
  // quiz-picker는 quiz-screen 내부에 표시
}

function showHero() {
  showScreen('hero-screen');
}

// ══════════════════════════════════════════════════════
//  STUDY MODE
// ══════════════════════════════════════════════════════
function goToChapter(id) {
  const ch = CHAPTERS.find(c => c.id === id);
  if (!ch) return;
  currentChapter = ch;
  setMode('study');  // 모드 전환 없이 study 유지

  // 네비 활성화
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === id);
  });
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }

  showScreen('study-screen');
  renderStudy(ch);
  document.getElementById('main').scrollTo(0, 0);
}

function renderStudy(ch) {
  const chIdx = CHAPTERS.findIndex(c => c.id === ch.id);
  const prev  = CHAPTERS[chIdx - 1];
  const next  = CHAPTERS[chIdx + 1];
  const isDone = completed.has(ch.id);
  const relatedQ = QUIZ_DATA.filter(q =>
    q.part === ch.group || q.chapter === ch.title
  ).length;

  document.getElementById('study-content').innerHTML = `
    <div class="chapter-header page-enter">
      <div class="ch-tag">${ch.group}파트 · ${ch.icon}</div>
      <h2 class="ch-title">${ch.title}</h2>
      <p class="ch-desc">${ch.desc}</p>
      ${relatedQ > 0 ? `<div style="margin-top:10px;font-size:12px;color:var(--text-dim);font-family:var(--font-mono)">관련 퀴즈 ${relatedQ}문항</div>` : ''}
    </div>

    ${ch.html}

    <div class="ch-done-btn ${isDone ? 'done' : ''}" onclick="toggleDone('${ch.id}',this)">
      <input type="checkbox" id="done-cb-${ch.id}" ${isDone ? 'checked' : ''} onchange="toggleDone('${ch.id}',this.closest('.ch-done-btn'))">
      <label for="done-cb-${ch.id}">${isDone ? '✅ 학습 완료!' : '이 챕터를 완료로 표시하기'}</label>
    </div>

    <div class="ch-nav">
      ${prev ? `<button class="ch-nav-btn" onclick="goToChapter('${prev.id}')">
        ← <div><span class="cnb-sub">이전</span><span class="cnb-title">${prev.icon} ${prev.title}</span></div>
      </button>` : '<div></div>'}
      ${next ? `<button class="ch-nav-btn right" onclick="goToChapter('${next.id}')">
        <div style="text-align:right"><span class="cnb-sub">다음</span><span class="cnb-title">${next.icon} ${next.title}</span></div> →
      </button>` : '<div></div>'}
    </div>
  `;

  // code-copy 이벤트
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.onclick = () => copyCode(btn);
  });
}

function toggleDone(id, el) {
  const cb = el.querySelector('input[type=checkbox]') || document.getElementById('done-cb-' + id);
  if (completed.has(id)) {
    completed.delete(id);
    if (cb) cb.checked = false;
    el.classList.remove('done');
    el.querySelector('label').textContent = '이 챕터를 완료로 표시하기';
  } else {
    completed.add(id);
    if (cb) cb.checked = true;
    el.classList.add('done');
    el.querySelector('label').textContent = '✅ 학습 완료!';
  }
  localStorage.setItem('ailab-done', JSON.stringify([...completed]));
  updateProgress();
  buildNav();
}

// ══════════════════════════════════════════════════════
//  QUIZ PICKER
// ══════════════════════════════════════════════════════
function showQuizPicker() {
  showScreen('quiz-screen');
  const groups = [
    { id:'all',  label:'전체',        icon:'🎯', desc:`${QUIZ_DATA.length}문항` },
    { id:'A',    label:'Python/NumPy/Pandas', icon:'🧮', desc:'' },
    { id:'B',    label:'AI 수학',     icon:'📐', desc:'' },
    { id:'C',    label:'ML 기초',     icon:'🧠', desc:'' },
    { id:'D',    label:'딥러닝',      icon:'🔥', desc:'' },
    { id:'F',    label:'Transformer', icon:'⚡', desc:'' },
    { id:'G',    label:'LLM',         icon:'🤖', desc:'' },
    { id:'H',    label:'RAG',         icon:'🔍', desc:'' },
    { id:'I',    label:'에이전틱 AI', icon:'🚀', desc:'' },
  ];
  groups.forEach(g => {
    if (g.id !== 'all') {
      const cnt = QUIZ_DATA.filter(q => q.part === g.id).length;
      g.desc = `${cnt}문항`;
    }
  });

  const typeGroups = [
    { id:'all_type', label:'전체 유형', icon:'📋' },
    { id:'mcq',   label:'선택형',   icon:'🔘' },
    { id:'short', label:'단답형',   icon:'✏️' },
    { id:'code',  label:'코드 작성', icon:'💻' },
    { id:'output',label:'결과 예측', icon:'📤' },
  ];

  document.getElementById('quiz-content').innerHTML = `
    <div id="quiz-picker" class="page-enter">
      <div class="qp-title">📝 퀴즈 선택</div>
      <p class="qp-desc">파트와 유형을 선택하고 퀴즈를 시작하세요.</p>

      <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin-bottom:10px">파트 선택</div>
      <div class="qp-grid" id="part-grid">
        ${groups.map(g => `
          <div class="qp-card ${g.id==='all'?'selected':''}" data-part="${g.id}" onclick="selectPart(this,'${g.id}')">
            <div class="qp-icon">${g.icon}</div>
            <div class="qp-name">${g.label}</div>
            <div class="qp-count">${g.desc}</div>
          </div>
        `).join('')}
      </div>

      <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin:20px 0 10px">유형 선택</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px" id="type-grid">
        ${typeGroups.map(t => `
          <div class="filter-chip ${t.id==='all_type'?'active':''}" data-type="${t.id}" onclick="selectType(this,'${t.id}')">
            ${t.icon} ${t.label}
          </div>
        `).join('')}
      </div>

      <button class="start-quiz-btn" onclick="startQuiz()">퀴즈 시작 →</button>
      <span id="quiz-count-preview" style="margin-left:16px;font-family:var(--font-mono);font-size:12px;color:var(--text-muted)"></span>
    </div>
  `;
  document.getElementById('quiz-header').style.display = 'none';
  document.getElementById('quiz-nav-btns').style.display = 'none';
  updatePickerCount();
}

let pickerPart = 'all';
let pickerType = 'all_type';

function selectPart(el, val) {
  document.querySelectorAll('#part-grid .qp-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  pickerPart = val;
  updatePickerCount();
}

function selectType(el, val) {
  document.querySelectorAll('#type-grid .filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  pickerType = val;
  updatePickerCount();
}

function updatePickerCount() {
  let qs = QUIZ_DATA;
  if (pickerPart !== 'all') qs = qs.filter(q => q.part === pickerPart);
  if (pickerType !== 'all_type') qs = qs.filter(q => q.type === pickerType);
  const el = document.getElementById('quiz-count-preview');
  if (el) el.textContent = `${qs.length}문항`;
}

// ══════════════════════════════════════════════════════
//  QUIZ MODE
// ══════════════════════════════════════════════════════
function startQuiz() {
  let qs = [...QUIZ_DATA];
  if (pickerPart !== 'all') qs = qs.filter(q => q.part === pickerPart);
  if (pickerType !== 'all_type') qs = qs.filter(q => q.type === pickerType);
  if (!qs.length) { alert('선택한 조건의 문제가 없습니다.'); return; }

  // 셔플
  for (let i = qs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [qs[i], qs[j]] = [qs[j], qs[i]];
  }

  quizState = { questions: qs, current: 0, answers: {}, score: 0, answered: false };
  document.getElementById('quiz-header').style.display = '';
  document.getElementById('quiz-nav-btns').style.display = '';
  renderQuestion();
}

function renderQuestion() {
  const { questions, current, answers } = quizState;
  const q = questions[current];
  const total = questions.length;
  quizState.answered = answers[q.id] !== undefined;

  // 헤더 업데이트
  document.getElementById('quiz-meta').innerHTML = `
    <div class="qm-left">${q.part}파트 · ${q.chapter} · ${typeLabel(q.type)}</div>
    <div class="qm-score">문제 ${current+1} / ${total}</div>
  `;
  document.getElementById('quiz-prog-fill').style.width = ((current+1)/total*100) + '%';

  // 퀴즈 내용
  document.getElementById('quiz-content').innerHTML = `
    <div class="page-enter">
      <div class="quiz-num">Q${String(current+1).padStart(3,'0')} · ${q.id}번 문항</div>
      <div class="quiz-q">${q.q}</div>
      ${q.sub ? `<div class="quiz-sub">${q.sub}</div>` : ''}
      ${renderQuizInput(q)}
      <div class="explanation ${quizState.answered ? 'show' : ''}" id="exp-box">
        ✅ ${q.exp || ''}
        ${q.answer && typeof q.answer === 'string' ? `<div class="exp-code"><strong>정답:</strong> <code>${escHtml(q.answer)}</code></div>` : ''}
      </div>
    </div>
  `;

  // 네비 버튼
  document.getElementById('quiz-nav-btns').innerHTML = `
    <button class="qnav-btn" onclick="prevQ()" ${current === 0 ? 'disabled' : ''}>← 이전</button>
    <div style="font-family:var(--font-mono);font-size:12px;color:var(--text-muted)">
      ${Object.keys(quizState.answers).length} / ${total} 완료
    </div>
    ${current < total - 1
      ? `<button class="qnav-btn primary" onclick="nextQ()">다음 →</button>`
      : `<button class="qnav-btn primary" onclick="showResult()">결과 보기</button>`}
  `;

  document.getElementById('main').scrollTo(0,0);

  // 이미 답한 문제 복원
  if (quizState.answered) restoreAnswer(q);
}

function typeLabel(t) {
  return { mcq:'선택형', short:'단답형', code:'코드 작성', output:'결과 예측' }[t] || t;
}

function renderQuizInput(q) {
  if (q.type === 'mcq') {
    return `<div class="options-list">
      ${q.options.map((opt, i) => `
        <div class="opt" id="opt-${i}" onclick="answerMCQ(${i},${q.answer},${q.id})">
          <span class="opt-letter">${'ABCD'[i]}</span>
          <span>${escHtml(opt)}</span>
        </div>`).join('')}
    </div>`;
  }
  if (q.type === 'output') {
    return `
      ${q.code ? `<div class="hint-code"><pre>${escHtml(q.code)}</pre></div>` : ''}
      <div class="output-wrap">
        <input class="output-input" id="ans-input" type="text" placeholder="출력 결과를 입력하세요..." onkeydown="if(event.key==='Enter')submitShort(${q.id})">
      </div>
      <button class="submit-btn" onclick="submitShort(${q.id})">제출</button>`;
  }
  if (q.type === 'short') {
    return `
      <input class="short-input" id="ans-input" type="text" placeholder="답을 입력하세요..." onkeydown="if(event.key==='Enter')submitShort(${q.id})">
      <button class="submit-btn" onclick="submitShort(${q.id})">제출</button>`;
  }
  if (q.type === 'code') {
    return `
      ${q.hint ? `<div class="hl hl-blue" style="margin-bottom:10px">💡 힌트: ${escHtml(q.hint)}</div>` : ''}
      <textarea class="code-input" id="ans-input" placeholder="여기에 코드를 작성하세요..." spellcheck="false"></textarea>
      <button class="submit-btn" onclick="submitCode(${q.id})">코드 확인</button>`;
  }
  return '';
}

// ── MCQ 답변 ─────────────────────────────────────────
function answerMCQ(chosen, correct, qid) {
  if (quizState.answers[qid] !== undefined) return;
  quizState.answers[qid] = chosen;
  quizState.answered = true;

  const isRight = chosen === correct;
  if (isRight) quizState.score++;

  document.querySelectorAll('.opt').forEach((el, i) => {
    if (i === correct) el.classList.add('correct');
    else if (i === chosen && !isRight) el.classList.add('wrong');
    el.style.pointerEvents = 'none';
  });

  document.getElementById('exp-box').classList.add('show');
}

// ── 단답/결과 제출 ───────────────────────────────────
function submitShort(qid) {
  if (quizState.answers[qid] !== undefined) return;
  const inp = document.getElementById('ans-input');
  if (!inp || !inp.value.trim()) return;
  quizState.answers[qid] = inp.value.trim();
  quizState.answered = true;
  quizState.score++;   // 단답은 자가 채점
  inp.classList.add('correct-input');
  inp.disabled = true;
  document.getElementById('exp-box').classList.add('show');
}

// ── 코드 제출 ─────────────────────────────────────────
function submitCode(qid) {
  if (quizState.answers[qid] !== undefined) return;
  const inp = document.getElementById('ans-input');
  if (!inp || !inp.value.trim()) return;
  const code = inp.value.trim();
  quizState.answers[qid] = code;
  quizState.answered = true;

  const q = QUIZ_DATA.find(q => q.id === qid);
  // 키워드 기반 체크
  const keywords = q.keywords || [];
  const allPresent = keywords.every(k => code.toLowerCase().includes(k.toLowerCase()));
  if (allPresent) quizState.score++;

  inp.disabled = true;
  document.getElementById('exp-box').classList.add('show');

  // 키워드 피드백
  if (keywords.length > 0) {
    const missing = keywords.filter(k => !code.toLowerCase().includes(k.toLowerCase()));
    if (missing.length > 0) {
      const fb = document.createElement('div');
      fb.className = 'hl hl-yellow';
      fb.style.marginTop = '10px';
      fb.innerHTML = `⚠️ 누락된 키워드: <code>${missing.join(', ')}</code>`;
      document.getElementById('exp-box').appendChild(fb);
    } else {
      const fb = document.createElement('div');
      fb.className = 'hl hl-green';
      fb.style.marginTop = '10px';
      fb.textContent = '✅ 모든 핵심 키워드 포함!';
      document.getElementById('exp-box').appendChild(fb);
    }
  }
  // 모범 답안 표시
  if (q.answer) {
    const ans = document.createElement('div');
    ans.className = 'hint-code';
    ans.style.marginTop = '10px';
    ans.innerHTML = `<div style="padding:8px 14px;font-size:11px;color:var(--text-dim);font-family:var(--font-mono);border-bottom:1px solid var(--border)">모범 답안</div><pre>${escHtml(q.answer)}</pre>`;
    document.getElementById('exp-box').appendChild(ans);
  }
}

// ── 답안 복원 ─────────────────────────────────────────
function restoreAnswer(q) {
  const saved = quizState.answers[q.id];
  if (q.type === 'mcq') {
    document.querySelectorAll('.opt').forEach((el, i) => {
      if (i === q.answer) el.classList.add('correct');
      else if (i === saved && i !== q.answer) el.classList.add('wrong');
      el.style.pointerEvents = 'none';
    });
  }
  if (['short','output','code'].includes(q.type)) {
    const inp = document.getElementById('ans-input');
    if (inp) { inp.value = saved; inp.disabled = true; }
  }
}

// ── 이전/다음 ─────────────────────────────────────────
function prevQ() {
  if (quizState.current > 0) {
    quizState.current--;
    renderQuestion();
  }
}

function nextQ() {
  if (quizState.current < quizState.questions.length - 1) {
    quizState.current++;
    renderQuestion();
  }
}

// ══════════════════════════════════════════════════════
//  RESULT
// ══════════════════════════════════════════════════════
function showResult() {
  const { questions, answers, score } = quizState;
  const total = questions.length;
  const answered = Object.keys(answers).length;
  const pct = Math.round(score / total * 100);

  let grade = '😅 다시 도전!';
  if (pct >= 90) grade = '🏆 완벽해요!';
  else if (pct >= 70) grade = '👏 잘했어요!';
  else if (pct >= 50) grade = '📚 조금 더!';

  const typeBreakdown = ['mcq','short','code','output'].map(t => {
    const tqs = questions.filter(q => q.type === t);
    const tAns = tqs.filter(q => answers[q.id] !== undefined).length;
    return { type:typeLabel(t), total:tqs.length, ans:tAns };
  }).filter(t => t.total > 0);

  showScreen('result-screen');
  document.getElementById('quiz-header').style.display = 'none';
  document.getElementById('quiz-nav-btns').style.display = 'none';

  document.getElementById('result-content').innerHTML = `
    <div class="page-enter">
      <div class="result-score">${pct}%</div>
      <div class="result-label">${grade}</div>

      <div class="result-breakdown">
        <div class="rb-card">
          <div class="rb-num">${score}</div>
          <div class="rb-label">정답</div>
        </div>
        <div class="rb-card">
          <div class="rb-num">${total - score}</div>
          <div class="rb-label">오답</div>
        </div>
        <div class="rb-card">
          <div class="rb-num">${total - answered}</div>
          <div class="rb-label">미응답</div>
        </div>
      </div>

      <div style="margin:24px 0">
        ${typeBreakdown.map(t => `
          <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:13px">
            <span style="color:var(--text-muted)">${t.type}</span>
            <span style="font-family:var(--font-mono);color:var(--text)">${t.ans}/${t.total}</span>
          </div>
          <div style="height:4px;background:var(--surface3);border-radius:999px;margin-bottom:14px;overflow:hidden">
            <div style="height:100%;width:${t.total?Math.round(t.ans/t.total*100):0}%;background:var(--accent2);border-radius:999px"></div>
          </div>
        `).join('')}
      </div>

      <div class="result-btns">
        <button class="primary" onclick="startQuiz()">다시 풀기</button>
        <button onclick="showQuizPicker()">다른 퀴즈 선택</button>
        <button onclick="currentMode='study';if(currentChapter)goToChapter(currentChapter.id);else showHero()">공부로 돌아가기</button>
      </div>
    </div>
  `;
}

// ══════════════════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════════════════
function copyCode(btn) {
  const pre = btn.closest('.code-block')?.querySelector('pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = 'copied!';
    setTimeout(() => btn.textContent = 'copy', 2000);
  });
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}
