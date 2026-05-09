// ═══════════════════════════════════════════
//  app.js  —  AI Lab (완전 재작성)
// ═══════════════════════════════════════════

// ── 전역 상태
var currentChapterId = null;
var currentMode = 'study';
var quizState = { qs:[], idx:0, answers:{}, score:0 };
var done = new Set(JSON.parse(localStorage.getItem('ailab-v2') || '[]'));
var pickerPart = 'all';
var pickerType = 'all_type';

// ── 초기화
window.addEventListener('DOMContentLoaded', function() {
  buildNav();
  syncProgress();
});

// ════════════════════════════════════════════
//  NAV
// ════════════════════════════════════════════
function buildNav() {
  var nav = document.getElementById('nav-list');
  nav.innerHTML = '';
  CHAPTER_GROUPS.forEach(function(g) {
    var chs = CHAPTERS.filter(function(c){ return c.group === g.id; });
    if (!chs.length) return;
    var lbl = document.createElement('div');
    lbl.className = 'nav-group-label';
    lbl.textContent = g.label;
    nav.appendChild(lbl);
    chs.forEach(function(ch) {
      var item = document.createElement('div');
      item.className = 'nav-item' + (currentChapterId === ch.id ? ' active' : '');
      item.setAttribute('data-id', ch.id);
      var icon = document.createElement('span');
      icon.className = 'ni-icon';
      icon.textContent = ch.icon;
      var title = document.createElement('span');
      title.className = 'ni-title';
      title.textContent = ch.title;
      item.appendChild(icon);
      item.appendChild(title);
      if (done.has(ch.id)) {
        var tick = document.createElement('span');
        tick.className = 'ni-done';
        tick.textContent = '✓';
        item.appendChild(tick);
      }
      item.addEventListener('click', function() { goChapter(ch.id); });
      nav.appendChild(item);
    });
  });
}

function filterNav(q) {
  var val = q.toLowerCase().trim();
  document.querySelectorAll('.nav-item').forEach(function(el) {
    el.style.display = (!val || el.textContent.toLowerCase().includes(val)) ? '' : 'none';
  });
  document.querySelectorAll('.nav-group-label').forEach(function(el) {
    el.style.display = val ? 'none' : '';
  });
}

function syncProgress() {
  var total = CHAPTERS.length;
  var n = CHAPTERS.filter(function(c){ return done.has(c.id); }).length;
  var pct = Math.round(n / total * 100);
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-label').textContent = pct + '%';
}

function setNavActive(id) {
  document.querySelectorAll('.nav-item').forEach(function(el) {
    el.classList.toggle('active', el.getAttribute('data-id') === id);
  });
}

// ════════════════════════════════════════════
//  SIDEBAR
// ════════════════════════════════════════════
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
document.addEventListener('click', function(e) {
  var sb = document.getElementById('sidebar');
  var hb = document.querySelector('.hamburger');
  if (window.innerWidth <= 768 && !sb.contains(e.target) && e.target !== hb) {
    sb.classList.remove('open');
  }
});

// ════════════════════════════════════════════
//  SCREEN MANAGER
// ════════════════════════════════════════════
var SCREENS = ['hero-screen','study-screen','quiz-screen','result-screen'];
function showOnly(name) {
  SCREENS.forEach(function(id) {
    var el = document.getElementById(id);
    if (id === name) el.classList.remove('hidden');
    else el.classList.add('hidden');
  });
}

// ════════════════════════════════════════════
//  MODE BUTTONS
// ════════════════════════════════════════════
function setMode(mode) {
  currentMode = mode;
  document.getElementById('btn-study').classList.toggle('active', mode === 'study');
  document.getElementById('btn-quiz').classList.toggle('active', mode === 'quiz');
  if (mode === 'study') {
    if (currentChapterId) goChapter(currentChapterId);
    else showOnly('hero-screen');
  } else {
    openQuizPicker();
  }
}

// ════════════════════════════════════════════
//  HERO
// ════════════════════════════════════════════
function startLearning() {
  goChapter(CHAPTERS[0].id);
}

// ════════════════════════════════════════════
//  STUDY
// ════════════════════════════════════════════
function goChapter(id) {
  var ch = CHAPTERS.find(function(c){ return c.id === id; });
  if (!ch) return;
  currentChapterId = id;
  currentMode = 'study';
  document.getElementById('btn-study').classList.add('active');
  document.getElementById('btn-quiz').classList.remove('active');
  setNavActive(id);
  if (window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('open');
  showOnly('study-screen');
  document.getElementById('quiz-header').style.display = 'none';
  document.getElementById('quiz-nav-btns').style.display = 'none';
  renderStudy(ch);
  document.getElementById('main').scrollTo(0, 0);
}

function renderStudy(ch) {
  var chIdx = CHAPTERS.findIndex(function(c){ return c.id === ch.id; });
  var prev = CHAPTERS[chIdx - 1];
  var next = CHAPTERS[chIdx + 1];
  var isDone = done.has(ch.id);
  var container = document.getElementById('study-content');
  container.innerHTML = '';

  // 헤더
  var header = document.createElement('div');
  header.className = 'chapter-header page-enter';
  var tag = document.createElement('div');
  tag.className = 'ch-tag';
  tag.textContent = ch.group + '파트 · ' + ch.icon;
  var h2 = document.createElement('h2');
  h2.className = 'ch-title';
  h2.textContent = ch.title;
  var desc = document.createElement('p');
  desc.className = 'ch-desc';
  desc.textContent = ch.desc;
  header.appendChild(tag);
  header.appendChild(h2);
  header.appendChild(desc);
  container.appendChild(header);

  // 본문 (챕터 HTML 직접 삽입)
  var body = document.createElement('div');
  body.className = 'study-body';
  body.innerHTML = ch.html;
  container.appendChild(body);

  // code-copy 재바인딩
  body.querySelectorAll('.code-copy').forEach(function(btn) {
    btn.onclick = function() { copyCode(btn); };
  });

  // 완료 버튼
  var doneBtn = document.createElement('div');
  doneBtn.className = 'ch-done-btn' + (isDone ? ' done' : '');
  var cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.checked = isDone;
  var lbl = document.createElement('label');
  lbl.textContent = isDone ? '완료! 다음 챕터로 이동하세요' : '이 챕터를 완료로 표시하기';
  doneBtn.appendChild(cb);
  doneBtn.appendChild(lbl);
  doneBtn.addEventListener('click', function(e) {
    if (e.target === cb) return; // checkbox 자체 클릭은 아래서 처리
    toggleDone(ch.id, doneBtn, lbl, cb);
  });
  cb.addEventListener('change', function() {
    toggleDone(ch.id, doneBtn, lbl, cb);
  });
  container.appendChild(doneBtn);

  // 이전/다음 네비
  var nav = document.createElement('div');
  nav.className = 'ch-nav';
  if (prev) {
    var prevBtn = document.createElement('button');
    prevBtn.className = 'ch-nav-btn';
    var pDiv = document.createElement('div');
    var pSub = document.createElement('span');
    pSub.className = 'cnb-sub';
    pSub.textContent = '이전';
    var pTitle = document.createElement('span');
    pTitle.className = 'cnb-title';
    pTitle.textContent = prev.icon + ' ' + prev.title;
    pDiv.appendChild(pSub);
    pDiv.appendChild(pTitle);
    prevBtn.appendChild(document.createTextNode('← '));
    prevBtn.appendChild(pDiv);
    prevBtn.addEventListener('click', function() { goChapter(prev.id); });
    nav.appendChild(prevBtn);
  } else {
    nav.appendChild(document.createElement('div'));
  }
  if (next) {
    var nextBtn = document.createElement('button');
    nextBtn.className = 'ch-nav-btn right';
    var nDiv = document.createElement('div');
    nDiv.style.textAlign = 'right';
    var nSub = document.createElement('span');
    nSub.className = 'cnb-sub';
    nSub.textContent = '다음';
    var nTitle = document.createElement('span');
    nTitle.className = 'cnb-title';
    nTitle.textContent = next.icon + ' ' + next.title;
    nDiv.appendChild(nSub);
    nDiv.appendChild(nTitle);
    nextBtn.appendChild(nDiv);
    nextBtn.appendChild(document.createTextNode(' →'));
    nextBtn.addEventListener('click', function() { goChapter(next.id); });
    nav.appendChild(nextBtn);
  } else {
    nav.appendChild(document.createElement('div'));
  }
  container.appendChild(nav);
}

function toggleDone(id, btn, lbl, cb) {
  if (done.has(id)) {
    done.delete(id);
    cb.checked = false;
    btn.classList.remove('done');
    lbl.textContent = '이 챕터를 완료로 표시하기';
  } else {
    done.add(id);
    cb.checked = true;
    btn.classList.add('done');
    lbl.textContent = '완료! 다음 챕터로 이동하세요';
  }
  localStorage.setItem('ailab-v2', JSON.stringify(Array.from(done)));
  syncProgress();
  buildNav();
}

// ════════════════════════════════════════════
//  QUIZ PICKER
// ════════════════════════════════════════════
function openQuizPicker() {
  showOnly('quiz-screen');
  document.getElementById('quiz-header').style.display = 'none';
  document.getElementById('quiz-nav-btns').style.display = 'none';

  var parts = [
    { id:'all', label:'전체',               icon:'🎯' },
    { id:'A',   label:'Python / NumPy',      icon:'🧮' },
    { id:'B',   label:'AI 수학',             icon:'📐' },
    { id:'C',   label:'ML 기초',             icon:'🧠' },
    { id:'D',   label:'딥러닝',              icon:'🔥' },
    { id:'F',   label:'Transformer',         icon:'⚡' },
    { id:'G',   label:'LLM',                icon:'🤖' },
    { id:'H',   label:'RAG',                icon:'🔍' },
    { id:'I',   label:'에이전틱 AI',         icon:'🚀' },
  ];
  var types = [
    { id:'all_type', label:'전체 유형',  icon:'📋' },
    { id:'mcq',      label:'선택형',    icon:'🔘' },
    { id:'short',    label:'단답형',    icon:'✏️' },
    { id:'code',     label:'코드 작성', icon:'💻' },
    { id:'output',   label:'결과 예측', icon:'📤' },
  ];

  var qc = document.getElementById('quiz-content');
  qc.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.id = 'quiz-picker';
  wrap.className = 'page-enter';

  var h = document.createElement('div');
  h.className = 'qp-title';
  h.textContent = '📝 퀴즈 선택';
  wrap.appendChild(h);

  var p = document.createElement('p');
  p.className = 'qp-desc';
  p.textContent = '파트와 유형을 선택하고 퀴즈를 시작하세요.';
  wrap.appendChild(p);

  // 파트 그리드
  var pl = document.createElement('div');
  pl.style.cssText = 'font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin-bottom:10px';
  pl.textContent = '파트 선택';
  wrap.appendChild(pl);

  var pgrid = document.createElement('div');
  pgrid.className = 'qp-grid';

  var preview = document.createElement('span');

  parts.forEach(function(pt) {
    var cnt = pt.id === 'all'
      ? QUIZ_DATA.length
      : QUIZ_DATA.filter(function(q){ return q.part === pt.id; }).length;
    var card = document.createElement('div');
    card.className = 'qp-card' + (pt.id === pickerPart ? ' selected' : '');
    var iconEl = document.createElement('div');
    iconEl.className = 'qp-icon';
    iconEl.textContent = pt.icon;
    var nameEl = document.createElement('div');
    nameEl.className = 'qp-name';
    nameEl.textContent = pt.label;
    var cntEl = document.createElement('div');
    cntEl.className = 'qp-count';
    cntEl.textContent = cnt + '문항';
    card.appendChild(iconEl);
    card.appendChild(nameEl);
    card.appendChild(cntEl);
    card.addEventListener('click', function() {
      pgrid.querySelectorAll('.qp-card').forEach(function(c){ c.classList.remove('selected'); });
      card.classList.add('selected');
      pickerPart = pt.id;
      updateCountPreview(preview);
    });
    pgrid.appendChild(card);
  });
  wrap.appendChild(pgrid);

  // 유형 칩
  var tl = document.createElement('div');
  tl.style.cssText = 'font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin:20px 0 10px';
  tl.textContent = '유형 선택';
  wrap.appendChild(tl);

  var tgrid = document.createElement('div');
  tgrid.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px';
  types.forEach(function(tp) {
    var chip = document.createElement('div');
    chip.className = 'filter-chip' + (tp.id === pickerType ? ' active' : '');
    chip.textContent = tp.icon + ' ' + tp.label;
    chip.addEventListener('click', function() {
      tgrid.querySelectorAll('.filter-chip').forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
      pickerType = tp.id;
      updateCountPreview(preview);
    });
    tgrid.appendChild(chip);
  });
  wrap.appendChild(tgrid);

  // 시작 버튼
  var startBtn = document.createElement('button');
  startBtn.className = 'start-quiz-btn';
  startBtn.textContent = '퀴즈 시작 →';
  startBtn.addEventListener('click', startQuiz);
  wrap.appendChild(startBtn);

  // 문항 수 미리보기
  preview.style.cssText = 'margin-left:16px;font-family:var(--font-mono);font-size:12px;color:var(--text-muted)';
  updateCountPreview(preview);
  wrap.appendChild(preview);

  qc.appendChild(wrap);
}

function updateCountPreview(el) {
  el.textContent = filterQuizList().length + '문항';
}

function filterQuizList() {
  var qs = QUIZ_DATA.slice();
  if (pickerPart !== 'all') qs = qs.filter(function(q){ return q.part === pickerPart; });
  if (pickerType !== 'all_type') qs = qs.filter(function(q){ return q.type === pickerType; });
  return qs;
}

// ════════════════════════════════════════════
//  QUIZ PLAY
// ════════════════════════════════════════════
function startQuiz() {
  var qs = filterQuizList();
  if (!qs.length) { alert('선택한 조건의 문제가 없습니다.'); return; }
  for (var i = qs.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = qs[i]; qs[i] = qs[j]; qs[j] = tmp;
  }
  quizState = { qs: qs, idx: 0, answers: {}, score: 0 };
  showOnly('quiz-screen');
  document.getElementById('quiz-header').style.display = '';
  document.getElementById('quiz-nav-btns').style.display = '';
  renderQuestion();
}

function renderQuestion() {
  var state = quizState;
  var q = state.qs[state.idx];
  var total = state.qs.length;
  var alreadyAnswered = state.answers.hasOwnProperty(q.id);

  // 헤더
  var meta = document.getElementById('quiz-meta');
  meta.innerHTML = '';
  var left = document.createElement('div');
  left.className = 'qm-left';
  left.textContent = q.part + '파트 · ' + q.chapter + ' · ' + typeLabel(q.type);
  var right = document.createElement('div');
  right.className = 'qm-score';
  right.textContent = '문제 ' + (state.idx + 1) + ' / ' + total;
  meta.appendChild(left);
  meta.appendChild(right);
  document.getElementById('quiz-prog-fill').style.width = ((state.idx + 1) / total * 100) + '%';

  // 본문
  var qc = document.getElementById('quiz-content');
  qc.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.className = 'page-enter';

  var numEl = document.createElement('div');
  numEl.className = 'quiz-num';
  numEl.textContent = 'Q' + String(state.idx + 1).padStart(3, '0') + ' · ' + q.id + '번';
  wrap.appendChild(numEl);

  var qEl = document.createElement('div');
  qEl.className = 'quiz-q';
  qEl.textContent = q.q;
  wrap.appendChild(qEl);

  // 코드 힌트 (output/code)
  if (q.code) {
    var hc = document.createElement('div');
    hc.className = 'hint-code';
    var hpre = document.createElement('pre');
    hpre.textContent = q.code;
    hc.appendChild(hpre);
    wrap.appendChild(hc);
  }

  // 힌트 텍스트 (code)
  if (q.type === 'code' && q.hint) {
    var hintEl = document.createElement('div');
    hintEl.className = 'hl hl-blue';
    hintEl.style.marginBottom = '10px';
    hintEl.textContent = '💡 힌트: ' + q.hint;
    wrap.appendChild(hintEl);
  }

  // 입력부
  if (q.type === 'mcq') {
    var list = document.createElement('div');
    list.className = 'options-list';
    q.options.forEach(function(opt, i) {
      var el = document.createElement('div');
      el.className = 'opt';
      el.id = 'opt-' + i;
      var letter = document.createElement('span');
      letter.className = 'opt-letter';
      letter.textContent = 'ABCDE'[i];
      var text = document.createElement('span');
      text.textContent = opt;
      el.appendChild(letter);
      el.appendChild(text);
      if (!alreadyAnswered) {
        el.addEventListener('click', function() { answerMCQ(i, q.answer, q.id); });
      } else {
        el.style.pointerEvents = 'none';
      }
      list.appendChild(el);
    });
    wrap.appendChild(list);

  } else if (q.type === 'output') {
    var owrap = document.createElement('div');
    owrap.className = 'output-wrap';
    var oinp = document.createElement('input');
    oinp.className = 'output-input';
    oinp.id = 'ans-input';
    oinp.type = 'text';
    oinp.placeholder = '출력 결과를 입력하세요...';
    oinp.disabled = alreadyAnswered;
    oinp.addEventListener('keydown', function(e) { if (e.key === 'Enter') submitShort(q.id); });
    owrap.appendChild(oinp);
    wrap.appendChild(owrap);
    if (!alreadyAnswered) {
      var sbtn = document.createElement('button');
      sbtn.className = 'submit-btn';
      sbtn.textContent = '제출';
      sbtn.addEventListener('click', function() { submitShort(q.id); });
      wrap.appendChild(sbtn);
    }

  } else if (q.type === 'short') {
    var sinp = document.createElement('input');
    sinp.className = 'short-input';
    sinp.id = 'ans-input';
    sinp.type = 'text';
    sinp.placeholder = '답을 입력하세요...';
    sinp.disabled = alreadyAnswered;
    sinp.addEventListener('keydown', function(e) { if (e.key === 'Enter') submitShort(q.id); });
    wrap.appendChild(sinp);
    if (!alreadyAnswered) {
      var sbtn2 = document.createElement('button');
      sbtn2.className = 'submit-btn';
      sbtn2.textContent = '제출';
      sbtn2.addEventListener('click', function() { submitShort(q.id); });
      wrap.appendChild(sbtn2);
    }

  } else if (q.type === 'code') {
    var ta = document.createElement('textarea');
    ta.className = 'code-input';
    ta.id = 'ans-input';
    ta.placeholder = '여기에 코드를 작성하세요...';
    ta.spellcheck = false;
    ta.disabled = alreadyAnswered;
    wrap.appendChild(ta);
    if (!alreadyAnswered) {
      var cbtn = document.createElement('button');
      cbtn.className = 'submit-btn';
      cbtn.textContent = '코드 확인';
      cbtn.addEventListener('click', function() { submitCode(q.id); });
      wrap.appendChild(cbtn);
    }
  }

  // 해설
  var exp = document.createElement('div');
  exp.className = 'explanation' + (alreadyAnswered ? ' show' : '');
  exp.id = 'exp-box';
  exp.textContent = '✅ ' + (q.exp || '');
  wrap.appendChild(exp);

  qc.appendChild(wrap);

  // 네비 버튼
  var nb = document.getElementById('quiz-nav-btns');
  nb.innerHTML = '';

  var prevBtn = document.createElement('button');
  prevBtn.className = 'qnav-btn';
  prevBtn.textContent = '← 이전';
  if (state.idx === 0) prevBtn.disabled = true;
  prevBtn.addEventListener('click', prevQ);
  nb.appendChild(prevBtn);

  var centerInfo = document.createElement('div');
  centerInfo.style.cssText = 'font-family:var(--font-mono);font-size:12px;color:var(--text-muted)';
  centerInfo.textContent = Object.keys(state.answers).length + ' / ' + total + ' 완료';
  nb.appendChild(centerInfo);

  if (state.idx < total - 1) {
    var nxtBtn = document.createElement('button');
    nxtBtn.className = 'qnav-btn primary';
    nxtBtn.textContent = '다음 →';
    nxtBtn.addEventListener('click', nextQ);
    nb.appendChild(nxtBtn);
  } else {
    var resBtn = document.createElement('button');
    resBtn.className = 'qnav-btn primary';
    resBtn.textContent = '결과 보기';
    resBtn.addEventListener('click', showResult);
    nb.appendChild(resBtn);
  }

  document.getElementById('main').scrollTo(0, 0);

  if (alreadyAnswered) restoreAnswer(q);
}

// ── MCQ
function answerMCQ(chosen, correct, qid) {
  if (quizState.answers.hasOwnProperty(qid)) return;
  quizState.answers[qid] = chosen;
  var isRight = chosen === correct;
  if (isRight) quizState.score++;
  document.querySelectorAll('.opt').forEach(function(el, i) {
    el.style.pointerEvents = 'none';
    if (i === correct) el.classList.add('correct');
    else if (i === chosen && !isRight) el.classList.add('wrong');
  });
  var exp = document.getElementById('exp-box');
  if (exp) exp.classList.add('show');
}

// ── 단답/결과
function submitShort(qid) {
  if (quizState.answers.hasOwnProperty(qid)) return;
  var inp = document.getElementById('ans-input');
  if (!inp || !inp.value.trim()) return;
  var val = inp.value.trim();
  quizState.answers[qid] = val;
  quizState.score++;
  inp.disabled = true;
  inp.classList.add('correct-input');
  var exp = document.getElementById('exp-box');
  if (exp) {
    var q = QUIZ_DATA.find(function(x){ return x.id === qid; });
    if (q && q.answer) {
      var ansEl = document.createElement('div');
      ansEl.className = 'exp-code';
      ansEl.style.marginTop = '10px';
      var strong = document.createElement('strong');
      strong.textContent = '정답: ';
      var code = document.createElement('code');
      code.textContent = q.answer;
      ansEl.appendChild(strong);
      ansEl.appendChild(code);
      exp.appendChild(ansEl);
    }
    exp.classList.add('show');
  }
}

// ── 코드
function submitCode(qid) {
  if (quizState.answers.hasOwnProperty(qid)) return;
  var inp = document.getElementById('ans-input');
  if (!inp || !inp.value.trim()) return;
  var code = inp.value.trim();
  quizState.answers[qid] = code;
  inp.disabled = true;
  var q = QUIZ_DATA.find(function(x){ return x.id === qid; });
  var keywords = q.keywords || [];
  var allOk = keywords.every(function(k){ return code.toLowerCase().includes(k.toLowerCase()); });
  if (allOk) quizState.score++;
  var exp = document.getElementById('exp-box');
  if (exp) {
    exp.classList.add('show');
    if (keywords.length) {
      var missing = keywords.filter(function(k){ return !code.toLowerCase().includes(k.toLowerCase()); });
      var fb = document.createElement('div');
      fb.style.marginTop = '10px';
      if (missing.length) {
        fb.className = 'hl hl-yellow';
        fb.textContent = '⚠️ 누락된 키워드: ' + missing.join(', ');
      } else {
        fb.className = 'hl hl-green';
        fb.textContent = '✅ 모든 핵심 키워드 포함!';
      }
      exp.appendChild(fb);
    }
    if (q.answer) {
      var aBox = document.createElement('div');
      aBox.className = 'hint-code';
      aBox.style.marginTop = '10px';
      var aLabel = document.createElement('div');
      aLabel.style.cssText = 'padding:8px 14px;font-size:11px;color:var(--text-dim);font-family:var(--font-mono);border-bottom:1px solid var(--border)';
      aLabel.textContent = '모범 답안';
      var aPre = document.createElement('pre');
      aPre.textContent = q.answer;
      aBox.appendChild(aLabel);
      aBox.appendChild(aPre);
      exp.appendChild(aBox);
    }
  }
}

// ── 답안 복원
function restoreAnswer(q) {
  var saved = quizState.answers[q.id];
  if (q.type === 'mcq') {
    document.querySelectorAll('.opt').forEach(function(el, i) {
      el.style.pointerEvents = 'none';
      if (i === q.answer) el.classList.add('correct');
      else if (i === saved && i !== q.answer) el.classList.add('wrong');
    });
  } else {
    var inp = document.getElementById('ans-input');
    if (inp && saved !== undefined) { inp.value = saved; inp.disabled = true; }
  }
  var exp = document.getElementById('exp-box');
  if (exp) exp.classList.add('show');
}

function prevQ() { if (quizState.idx > 0) { quizState.idx--; renderQuestion(); } }
function nextQ() { if (quizState.idx < quizState.qs.length - 1) { quizState.idx++; renderQuestion(); } }

// ════════════════════════════════════════════
//  RESULT
// ════════════════════════════════════════════
function showResult() {
  var state = quizState;
  var total = state.qs.length;
  var answered = Object.keys(state.answers).length;
  var pct = total ? Math.round(state.score / total * 100) : 0;
  var grade = pct >= 90 ? '🏆 완벽해요!' : pct >= 70 ? '👏 잘했어요!' : pct >= 50 ? '📚 조금 더!' : '😅 다시 도전!';

  showOnly('result-screen');
  document.getElementById('quiz-header').style.display = 'none';
  document.getElementById('quiz-nav-btns').style.display = 'none';

  var rc = document.getElementById('result-content');
  rc.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.className = 'page-enter';

  var scoreEl = document.createElement('div');
  scoreEl.className = 'result-score';
  scoreEl.textContent = pct + '%';
  wrap.appendChild(scoreEl);

  var gradeEl = document.createElement('div');
  gradeEl.className = 'result-label';
  gradeEl.textContent = grade;
  wrap.appendChild(gradeEl);

  var bd = document.createElement('div');
  bd.className = 'result-breakdown';
  [{n:state.score,l:'정답'},{n:total-state.score,l:'오답'},{n:total-answered,l:'미응답'}].forEach(function(item) {
    var card = document.createElement('div');
    card.className = 'rb-card';
    var num = document.createElement('div'); num.className='rb-num'; num.textContent=item.n;
    var lbl = document.createElement('div'); lbl.className='rb-label'; lbl.textContent=item.l;
    card.appendChild(num); card.appendChild(lbl);
    bd.appendChild(card);
  });
  wrap.appendChild(bd);

  ['mcq','short','code','output'].forEach(function(t) {
    var tqs = state.qs.filter(function(q){ return q.type === t; });
    if (!tqs.length) return;
    var tAns = tqs.filter(function(q){ return state.answers.hasOwnProperty(q.id); }).length;
    var pctT = Math.round(tAns / tqs.length * 100);
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px';
    var l = document.createElement('span'); l.style.color='var(--text-muted)'; l.textContent=typeLabel(t);
    var r = document.createElement('span'); r.style.cssText='font-family:var(--font-mono)'; r.textContent=tAns+'/'+tqs.length;
    row.appendChild(l); row.appendChild(r);
    wrap.appendChild(row);
    var bw = document.createElement('div');
    bw.style.cssText='height:4px;background:var(--surface3);border-radius:999px;margin-bottom:14px;overflow:hidden';
    var bar = document.createElement('div');
    bar.style.cssText='height:100%;width:'+pctT+'%;background:var(--accent2);border-radius:999px';
    bw.appendChild(bar); wrap.appendChild(bw);
  });

  var btns = document.createElement('div');
  btns.className = 'result-btns';
  var r1 = document.createElement('button'); r1.className='primary'; r1.textContent='다시 풀기'; r1.addEventListener('click', startQuiz);
  var r2 = document.createElement('button'); r2.textContent='다른 퀴즈 선택'; r2.addEventListener('click', openQuizPicker);
  var r3 = document.createElement('button'); r3.textContent='공부로 돌아가기';
  r3.addEventListener('click', function() {
    if (currentChapterId) goChapter(currentChapterId);
    else { currentMode='study'; document.getElementById('btn-study').classList.add('active'); document.getElementById('btn-quiz').classList.remove('active'); showOnly('hero-screen'); }
  });
  btns.appendChild(r1); btns.appendChild(r2); btns.appendChild(r3);
  wrap.appendChild(btns);
  rc.appendChild(wrap);
}

// ════════════════════════════════════════════
//  UTILS
// ════════════════════════════════════════════
function typeLabel(t) {
  return {mcq:'선택형',short:'단답형',code:'코드 작성',output:'결과 예측'}[t] || t;
}

function copyCode(btn) {
  var pre = btn.closest('.code-block') && btn.closest('.code-block').querySelector('pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.innerText).then(function() {
    btn.textContent = 'copied!';
    setTimeout(function(){ btn.textContent = 'copy'; }, 2000);
  });
}
