// ═══════════════════════════════════════════════════════
//  data-chapters.js  ·  전체 학습 챕터 데이터
// ═══════════════════════════════════════════════════════

const CHAPTER_GROUPS = [
  { id: 'A', label: 'Python & 라이브러리' },
  { id: 'B', label: 'AI 수학' },
  { id: 'C', label: 'ML 기초' },
  { id: 'D', label: '딥러닝 핵심' },
  { id: 'E', label: '주요 아키텍처' },
  { id: 'F', label: 'Transformer & Attention' },
  { id: 'G', label: 'LLM & Fine-tuning' },
  { id: 'H', label: 'RAG & 벡터 DB' },
  { id: 'I', label: '에이전틱 AI & 트렌드' },
];

const CHAPTERS = [

// ══════════════════════════════════════════════════════════
//  PART A  ─  Python & 라이브러리
// ══════════════════════════════════════════════════════════
{
  id:'A1', group:'A', icon:'🧮', color:'#4f8ef7',
  title:'NumPy 기초',
  desc:'AI/ML의 핵심 연산 라이브러리. 배열 생성부터 브로드캐스팅까지.',
  html:`
<div class="study-section">
  <div class="section-title">NumPy란?</div>
  <p class="study-text">NumPy(Numerical Python)는 고성능 수치 연산을 위한 파이썬 라이브러리입니다. <strong>ndarray</strong>라는 N차원 배열 객체를 핵심으로 하며, 벡터화 연산을 통해 순수 파이썬보다 수십~수백 배 빠릅니다. ML 모델의 가중치, 데이터 행렬, 그래디언트 모두 ndarray로 표현됩니다.</p>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · NumPy</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> numpy <span class="k">as</span> np

<span class="c"># ── 배열 생성 ────────────────────────────────</span>
a = np.array([<span class="n">1</span>, <span class="n">2</span>, <span class="n">3</span>, <span class="n">4</span>, <span class="n">5</span>])          <span class="c"># 1D</span>
b = np.array([[<span class="n">1</span>,<span class="n">2</span>,<span class="n">3</span>],[<span class="n">4</span>,<span class="n">5</span>,<span class="n">6</span>]])         <span class="c"># 2D (2×3)</span>
z = np.zeros((<span class="n">3</span>, <span class="n">4</span>))                  <span class="c"># 0으로 채운 3×4</span>
o = np.ones((<span class="n">2</span>, <span class="n">2</span>))                   <span class="c"># 1로 채운 2×2</span>
r = np.random.randn(<span class="n">100</span>, <span class="n">10</span>)          <span class="c"># 정규분포 샘플</span>
I = np.eye(<span class="n">4</span>)                          <span class="c"># 4×4 단위행렬</span>
li = np.linspace(<span class="n">0</span>, <span class="n">1</span>, <span class="n">50</span>)            <span class="c"># 0~1 균등 50개</span>
ar = np.arange(<span class="n">0</span>, <span class="n">10</span>, <span class="n">2</span>)              <span class="c"># [0,2,4,6,8]</span>

<span class="c"># ── 속성 ─────────────────────────────────────</span>
<span class="f">print</span>(b.shape)    <span class="c"># (2, 3)</span>
<span class="f">print</span>(b.dtype)    <span class="c"># int64</span>
<span class="f">print</span>(b.ndim)     <span class="c"># 2</span>
<span class="f">print</span>(b.size)     <span class="c"># 6</span></pre>
  </div>
</div>

<div class="study-section">
  <div class="section-title">인덱싱 & 슬라이싱</div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · NumPy</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre>A = np.arange(<span class="n">12</span>).reshape(<span class="n">3</span>, <span class="n">4</span>)
<span class="c"># [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]</span>

A[<span class="n">1</span>, <span class="n">2</span>]       <span class="c"># 6  (row=1, col=2)</span>
A[<span class="n">0</span>, :]       <span class="c"># [0 1 2 3]  (첫 행 전체)</span>
A[:, <span class="n">1</span>]       <span class="c"># [1 5 9]    (두 번째 열)</span>
A[<span class="n">1</span>:, <span class="n">2</span>:]     <span class="c"># [[6 7],[10 11]]</span>
A[A > <span class="n">5</span>]      <span class="c"># [6 7 8 9 10 11]  (불리언 인덱싱)</span>
A[[<span class="n">0</span>,<span class="n">2</span>], :]   <span class="c"># 0,2번 행 선택 (팬시 인덱싱)</span></pre>
  </div>
</div>

<div class="study-section">
  <div class="section-title">브로드캐스팅 <span class="ibadge">면접 필수</span></div>
  <p class="study-text">형태(shape)가 다른 배열 간 연산을 자동으로 확장하는 규칙. <strong>차원이 맞지 않으면 크기 1인 방향으로 복사</strong>됩니다.</p>
  <div class="formula">
규칙: 오른쪽 차원부터 비교, 같거나 하나가 1이면 호환
(3,4) + (4,)  → (3,4) [행마다 더함]
(3,1) + (1,4) → (3,4) [격자 연산]
  </div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · Broadcasting</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre>A = np.ones((<span class="n">3</span>, <span class="n">4</span>))
b = np.array([<span class="n">1</span>, <span class="n">2</span>, <span class="n">3</span>, <span class="n">4</span>])    <span class="c"># shape (4,)</span>
<span class="f">print</span>((A + b).shape)            <span class="c"># (3, 4) — b가 3행으로 복사</span>

X = np.random.randn(<span class="n">100</span>, <span class="n">5</span>)
mean = X.mean(axis=<span class="n">0</span>)          <span class="c"># shape (5,)</span>
std  = X.std(axis=<span class="n">0</span>)
X_norm = (X - mean) / std       <span class="c"># Z-score 정규화 (브로드캐스팅)</span></pre>
  </div>
</div>

<div class="study-section">
  <div class="section-title">핵심 수학 연산</div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · NumPy 수학 연산</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="c"># 행렬 곱</span>
A = np.random.randn(<span class="n">3</span>, <span class="n">4</span>)
B = np.random.randn(<span class="n">4</span>, <span class="n">5</span>)
C = A @ B          <span class="c"># 또는 np.dot(A, B)  → shape (3,5)</span>

<span class="c"># 전치, 역행렬, 행렬식</span>
A_T   = A.T
A_sq  = np.random.randn(<span class="n">4</span>, <span class="n">4</span>)
A_inv = np.linalg.inv(A_sq)
det   = np.linalg.det(A_sq)

<span class="c"># 고유값 분해 (PCA 기반)</span>
eigval, eigvec = np.linalg.eig(A_sq)

<span class="c"># SVD (차원 축소)</span>
U, S, Vt = np.linalg.svd(A, full_matrices=<span class="k">False</span>)

<span class="c"># 통계</span>
X = np.random.randn(<span class="n">1000</span>)
<span class="f">print</span>(X.mean(), X.std(), np.median(X))
<span class="f">print</span>(np.percentile(X, [<span class="n">25</span>, <span class="n">50</span>, <span class="n">75</span>]))

<span class="c"># 집계</span>
M = np.random.rand(<span class="n">5</span>, <span class="n">3</span>)
M.sum(axis=<span class="n">0</span>)   <span class="c"># 열 합계  shape (3,)</span>
M.max(axis=<span class="n">1</span>)   <span class="c"># 행 최댓값 shape (5,)</span>
np.argmax(M, axis=<span class="n">1</span>)  <span class="c"># 행별 최댓값 인덱스</span></pre>
  </div>
  <div class="hl hl-blue">💡 <strong>axis 이해:</strong> axis=0은 행 방향(↓), axis=1은 열 방향(→). mean(axis=0)이면 각 열의 평균 → shape가 열 개수만 남음.</div>
</div>
`},

{
  id:'A2', group:'A', icon:'🐼', color:'#4f8ef7',
  title:'Pandas 기초',
  desc:'데이터 전처리와 EDA의 핵심. DataFrame 조작, 결측치, 집계.',
  html:`
<div class="study-section">
  <div class="section-title">DataFrame 생성 & 기본 조작</div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · Pandas</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> pandas <span class="k">as</span> pd
<span class="k">import</span> numpy <span class="k">as</span> np

<span class="c"># ── 생성 ─────────────────────────────────────</span>
df = pd.DataFrame({
    <span class="s">'name'</span>: [<span class="s">'Alice'</span>, <span class="s">'Bob'</span>, <span class="s">'Carol'</span>, <span class="s">'Dave'</span>],
    <span class="s">'age'</span>:  [<span class="n">25</span>, <span class="n">30</span>, <span class="n">35</span>, np.nan],
    <span class="s">'score'</span>:[<span class="n">88.5</span>, <span class="n">72.0</span>, <span class="n">95.3</span>, <span class="n">61.0</span>]
})

<span class="c"># ── 탐색 ─────────────────────────────────────</span>
df.head(<span class="n">3</span>)          <span class="c"># 처음 3행</span>
df.info()           <span class="c"># 컬럼 타입·결측치</span>
df.describe()       <span class="c"># 기술통계</span>
df.shape            <span class="c"># (4, 3)</span>
df.dtypes           <span class="c"># 각 컬럼 dtype</span>
df.isnull().sum()   <span class="c"># 결측치 개수</span>

<span class="c"># ── 선택 ─────────────────────────────────────</span>
df[<span class="s">'score'</span>]         <span class="c"># Series 선택</span>
df[[<span class="s">'name'</span>, <span class="s">'score'</span>]] <span class="c"># 여러 열</span>
df.iloc[<span class="n">1</span>:<span class="n">3</span>]         <span class="c"># 인덱스 기반 슬라이싱</span>
df.loc[df[<span class="s">'age'</span>] > <span class="n">25</span>]  <span class="c"># 조건 필터</span></pre>
  </div>
</div>

<div class="study-section">
  <div class="section-title">전처리 — 결측치, 인코딩, 정규화</div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · 전처리 파이프라인</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="c"># ── 결측치 처리 ──────────────────────────────</span>
df[<span class="s">'age'</span>].fillna(df[<span class="s">'age'</span>].median(), inplace=<span class="k">True</span>)
df.dropna(subset=[<span class="s">'score'</span>], inplace=<span class="k">True</span>)
df.fillna(method=<span class="s">'ffill'</span>)   <span class="c"># 앞 값으로 채우기 (시계열)</span>

<span class="c"># ── 범주형 인코딩 ─────────────────────────────</span>
df[<span class="s">'grade'</span>] = [<span class="s">'A'</span>,<span class="s">'B'</span>,<span class="s">'A'</span>,<span class="s">'C'</span>]
pd.get_dummies(df, columns=[<span class="s">'grade'</span>])   <span class="c"># 원-핫 인코딩</span>
df[<span class="s">'grade_code'</span>] = df[<span class="s">'grade'</span>].map({<span class="s">'A'</span>:<span class="n">2</span>,<span class="s">'B'</span>:<span class="n">1</span>,<span class="s">'C'</span>:<span class="n">0</span>})  <span class="c"># 순서형</span>

<span class="c"># ── 스케일링 ──────────────────────────────────</span>
<span class="k">from</span> sklearn.preprocessing <span class="k">import</span> StandardScaler, MinMaxScaler
scaler = StandardScaler()
df[[<span class="s">'age'</span>, <span class="s">'score'</span>]] = scaler.fit_transform(df[[<span class="s">'age'</span>, <span class="s">'score'</span>]])

<span class="c"># ── 집계 & 그룹 ───────────────────────────────</span>
df.groupby(<span class="s">'grade'</span>)[<span class="s">'score'</span>].agg([<span class="s">'mean'</span>,<span class="s">'std'</span>,<span class="s">'count'</span>])
df.pivot_table(values=<span class="s">'score'</span>, index=<span class="s">'grade'</span>, aggfunc=<span class="s">'mean'</span>)

<span class="c"># ── 병합 ──────────────────────────────────────</span>
df1 = pd.DataFrame({<span class="s">'id'</span>:[<span class="n">1</span>,<span class="n">2</span>,<span class="n">3</span>], <span class="s">'val'</span>:[<span class="n">10</span>,<span class="n">20</span>,<span class="n">30</span>]})
df2 = pd.DataFrame({<span class="s">'id'</span>:[<span class="n">2</span>,<span class="n">3</span>,<span class="n">4</span>], <span class="s">'label'</span>:[<span class="s">'A'</span>,<span class="s">'B'</span>,<span class="s">'C'</span>]})
pd.merge(df1, df2, on=<span class="s">'id'</span>, how=<span class="s">'left'</span>)   <span class="c"># SQL JOIN</span></pre>
  </div>
  <div class="hl hl-yellow">⚠️ <strong>fit vs transform:</strong> fit_transform()은 훈련 데이터에만. 테스트 데이터에는 반드시 transform()만 사용해야 데이터 누수(Data Leakage)를 방지할 수 있습니다.</div>
</div>
`},

{
  id:'A3', group:'A', icon:'📊', color:'#4f8ef7',
  title:'Matplotlib & Seaborn',
  desc:'데이터 시각화. EDA와 모델 결과 분석에 필수.',
  html:`
<div class="study-section">
  <div class="section-title">Matplotlib 기본</div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · Matplotlib</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> matplotlib.pyplot <span class="k">as</span> plt
<span class="k">import</span> numpy <span class="k">as</span> np

<span class="c"># ── 기본 플롯 ────────────────────────────────</span>
x = np.linspace(<span class="n">0</span>, <span class="n">2</span>*np.pi, <span class="n">100</span>)
fig, axes = plt.subplots(<span class="n">1</span>, <span class="n">3</span>, figsize=(<span class="n">14</span>, <span class="n">4</span>))

axes[<span class="n">0</span>].plot(x, np.sin(x), label=<span class="s">'sin'</span>, color=<span class="s">'#4f8ef7'</span>)
axes[<span class="n">0</span>].plot(x, np.cos(x), label=<span class="s">'cos'</span>, color=<span class="s">'#f77f4f'</span>)
axes[<span class="n">0</span>].set_title(<span class="s">'Line Plot'</span>); axes[<span class="n">0</span>].legend()

data = np.random.randn(<span class="n">500</span>)
axes[<span class="n">1</span>].hist(data, bins=<span class="n">30</span>, color=<span class="s">'#10b981'</span>, edgecolor=<span class="s">'white'</span>)
axes[<span class="n">1</span>].set_title(<span class="s">'Histogram'</span>)

axes[<span class="n">2</span>].scatter(np.random.randn(<span class="n">100</span>), np.random.randn(<span class="n">100</span>),
               alpha=<span class="n">0.6</span>, c=<span class="s">'#7c3aed'</span>)
axes[<span class="n">2</span>].set_title(<span class="s">'Scatter'</span>)

plt.tight_layout()
plt.savefig(<span class="s">'plot.png'</span>, dpi=<span class="n">150</span>, bbox_inches=<span class="s">'tight'</span>)
plt.show()</pre>
  </div>
</div>

<div class="study-section">
  <div class="section-title">학습 곡선 & 혼동 행렬 시각화</div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · ML 시각화</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> seaborn <span class="k">as</span> sns
<span class="k">from</span> sklearn.metrics <span class="k">import</span> confusion_matrix

<span class="c"># 학습 곡선</span>
train_loss = [<span class="n">0.9</span>, <span class="n">0.7</span>, <span class="n">0.5</span>, <span class="n">0.35</span>, <span class="n">0.25</span>]
val_loss   = [<span class="n">0.95</span>, <span class="n">0.75</span>, <span class="n">0.6</span>, <span class="n">0.55</span>, <span class="n">0.52</span>]
epochs = <span class="f">range</span>(<span class="n">1</span>, <span class="n">6</span>)
plt.plot(epochs, train_loss, label=<span class="s">'Train'</span>)
plt.plot(epochs, val_loss, label=<span class="s">'Val'</span>, linestyle=<span class="s">'--'</span>)
plt.xlabel(<span class="s">'Epoch'</span>); plt.ylabel(<span class="s">'Loss'</span>)
plt.legend(); plt.title(<span class="s">'Learning Curve'</span>)

<span class="c"># 혼동 행렬</span>
y_true = [<span class="n">0</span>,<span class="n">1</span>,<span class="n">0</span>,<span class="n">1</span>,<span class="n">1</span>,<span class="n">0</span>]
y_pred = [<span class="n">0</span>,<span class="n">1</span>,<span class="n">1</span>,<span class="n">1</span>,<span class="n">0</span>,<span class="n">0</span>]
cm = confusion_matrix(y_true, y_pred)
sns.heatmap(cm, annot=<span class="k">True</span>, fmt=<span class="s">'d'</span>, cmap=<span class="s">'Blues'</span>)
plt.xlabel(<span class="s">'Predicted'</span>); plt.ylabel(<span class="s">'Actual'</span>)

<span class="c"># 상관관계 히트맵</span>
<span class="k">import</span> pandas <span class="k">as</span> pd
df = pd.DataFrame(np.random.randn(<span class="n">100</span>, <span class="n">5</span>),
                  columns=[<span class="s">'A'</span>,<span class="s">'B'</span>,<span class="s">'C'</span>,<span class="s">'D'</span>,<span class="s">'E'</span>])
sns.heatmap(df.corr(), annot=<span class="k">True</span>, cmap=<span class="s">'coolwarm'</span>, center=<span class="n">0</span>)</pre>
  </div>
</div>
`},

// ══════════════════════════════════════════════════════════
//  PART B  ─  AI 수학
// ══════════════════════════════════════════════════════════
{
  id:'B1', group:'B', icon:'📐', color:'#a78bfa',
  title:'선형대수',
  desc:'벡터·행렬·고유값 분해. 신경망과 차원 축소의 수학적 기반.',
  html:`
<div class="study-section">
  <div class="section-title">벡터와 행렬 연산</div>
  <p class="study-text">신경망의 모든 연산은 행렬 곱으로 표현됩니다. <strong>y = Wx + b</strong>가 선형 레이어의 전부입니다.</p>
  <div class="concept-grid">
    <div class="concept-card"><div class="cc-icon">➕</div><div class="cc-title">내적 (Dot Product)</div><div class="cc-body">a·b = Σaᵢbᵢ = ‖a‖‖b‖cosθ<br>Attention 유사도 계산에 사용</div></div>
    <div class="concept-card"><div class="cc-icon">✖️</div><div class="cc-title">행렬 곱 (MatMul)</div><div class="cc-body">(m×k)×(k×n) = (m×n)<br>선형 레이어, Transformer 핵심</div></div>
    <div class="concept-card"><div class="cc-icon">🔄</div><div class="cc-title">전치 (Transpose)</div><div class="cc-body">(Aᵀ)ᵢⱼ = Aⱼᵢ<br>역전파 그래디언트 계산</div></div>
    <div class="concept-card"><div class="cc-icon">📏</div><div class="cc-title">노름 (Norm)</div><div class="cc-body">L1: Σ|xᵢ|, L2: √(Σxᵢ²)<br>규제(Regularization)에 사용</div></div>
  </div>
  <div class="formula">
L1 Norm: ‖x‖₁ = Σ|xᵢ|           → Lasso 규제 (희소성)
L2 Norm: ‖x‖₂ = √(Σxᵢ²)         → Ridge 규제 (고르게 감소)
코사인 유사도: sim(a,b) = a·b / (‖a‖‖b‖)  → Attention, 벡터 검색
  </div>
</div>

<div class="study-section">
  <div class="section-title">고유값 분해 & SVD <span class="ibadge">면접 필수</span></div>
  <p class="study-text">고유값 분해(Eigendecomposition)는 <strong>PCA의 수학적 기반</strong>입니다. SVD는 직사각형 행렬에도 적용 가능한 일반화된 분해입니다.</p>
  <div class="formula">
고유값 분해: A = QΛQ⁻¹
  Q: 고유벡터 행렬 (주성분 방향)
  Λ: 고유값 대각 행렬 (각 방향의 분산량)

SVD: A = UΣVᵀ
  U: 좌 특이 벡터 (m×m)
  Σ: 특이값 대각 행렬 (분산의 크기)
  V: 우 특이 벡터 (n×n)
  </div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · 고유값 & SVD</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> numpy <span class="k">as</span> np

<span class="c"># PCA 직접 구현</span>
<span class="k">def</span> <span class="f">pca_numpy</span>(X, k):
    X -= X.mean(axis=<span class="n">0</span>)                    <span class="c"># 평균 제거</span>
    cov = X.T @ X / (len(X) - <span class="n">1</span>)          <span class="c"># 공분산 행렬</span>
    eigval, eigvec = np.linalg.eigh(cov)    <span class="c"># 고유값 분해</span>
    idx = np.argsort(eigval)[::-<span class="n">1</span>]         <span class="c"># 내림차순</span>
    return X @ eigvec[:, idx[:k]]           <span class="c"># 상위 k 주성분으로 투영</span>

X = np.random.randn(<span class="n">200</span>, <span class="n">10</span>)
X_2d = pca_numpy(X, k=<span class="n">2</span>)
<span class="f">print</span>(X_2d.shape)  <span class="c"># (200, 2)</span>

<span class="c"># SVD로 이미지 압축 (저랭크 근사)</span>
U, S, Vt = np.linalg.svd(X, full_matrices=<span class="k">False</span>)
k = <span class="n">5</span>
X_approx = U[:, :k] @ np.diag(S[:k]) @ Vt[:k, :]
<span class="f">print</span>(<span class="s">f"원본: {X.shape}, 압축: {X_approx.shape}"</span>)</pre>
  </div>
</div>
`},

{
  id:'B2', group:'B', icon:'📉', color:'#a78bfa',
  title:'미적분 & 최적화',
  desc:'역전파와 경사하강법의 수학적 기반. Chain Rule 완전 이해.',
  html:`
<div class="study-section">
  <div class="section-title">Chain Rule (연쇄 법칙) <span class="ibadge">면접 필수</span></div>
  <p class="study-text">역전파(Backpropagation)의 수학적 토대입니다. 합성 함수의 미분은 각 함수의 미분을 곱한 것입니다.</p>
  <div class="formula">
f(g(x))의 미분: df/dx = df/dg · dg/dx

신경망 적용:
  L = loss(ŷ),  ŷ = σ(z),  z = Wx + b

  ∂L/∂W = ∂L/∂ŷ · ∂ŷ/∂z · ∂z/∂W
         = loss'(ŷ) · σ'(z) · x
  </div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · 수동 역전파</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> numpy <span class="k">as</span> np

<span class="k">def</span> <span class="f">sigmoid</span>(x): <span class="k">return</span> <span class="n">1</span> / (<span class="n">1</span> + np.exp(-x))
<span class="k">def</span> <span class="f">sigmoid_grad</span>(x): s = sigmoid(x); <span class="k">return</span> s * (<span class="n">1</span> - s)

np.random.seed(<span class="n">42</span>)
X = np.random.randn(<span class="n">100</span>, <span class="n">3</span>)
y = (np.random.rand(<span class="n">100</span>) > <span class="n">0.5</span>).astype(float)
W = np.zeros((<span class="n">3</span>, <span class="n">1</span>)); b = <span class="n">0.0</span>
lr = <span class="n">0.1</span>

<span class="k">for</span> i <span class="k">in</span> <span class="f">range</span>(<span class="n">200</span>):
    <span class="c"># Forward</span>
    z   = X @ W + b             <span class="c"># (100,1)</span>
    yhat = sigmoid(z.ravel())   <span class="c"># (100,)</span>
    loss = -np.mean(y*np.log(yhat+<span class="n">1e-9</span>) + (<span class="n">1</span>-y)*np.log(<span class="n">1</span>-yhat+<span class="n">1e-9</span>))

    <span class="c"># Backward (Chain Rule)</span>
    dL_dyhat = -(y/yhat - (<span class="n">1</span>-y)/(<span class="n">1</span>-yhat)) / len(y)
    dyhat_dz = sigmoid_grad(z.ravel())
    delta = dL_dyhat * dyhat_dz   <span class="c"># (100,)</span>

    dW = X.T @ delta.reshape(-<span class="n">1</span>,<span class="n">1</span>)
    db = delta.sum()

    <span class="c"># Update</span>
    W -= lr * dW
    b -= lr * db

<span class="f">print</span>(<span class="s">f"Final loss: {loss:.4f}"</span>)</pre>
  </div>
</div>

<div class="study-section">
  <div class="section-title">옵티마이저 비교</div>
  <table class="data-table">
    <thead><tr><th>옵티마이저</th><th>업데이트 식</th><th>특징</th><th>적합 상황</th></tr></thead>
    <tbody>
      <tr><td>SGD</td><td>θ ← θ - η·∇L</td><td>단순, 노이즈 많음</td><td>이미지 분류 (모멘텀 추가)</td></tr>
      <tr><td>Momentum</td><td>v = βv + (1-β)∇L<br>θ ← θ - ηv</td><td>관성, 평탄 구간 돌파</td><td>일반적 DL</td></tr>
      <tr><td>RMSProp</td><td>적응적 LR (v² 추적)</td><td>LR 자동 조절</td><td>RNN, 비정상 문제</td></tr>
      <tr><td>Adam</td><td>1차+2차 모멘트 결합</td><td>대부분 잘 작동</td><td>범용 (LLM 표준)</td></tr>
      <tr><td>AdamW</td><td>Adam + Weight Decay 분리</td><td>일반화 성능↑</td><td>Transformer 표준</td></tr>
    </tbody>
  </table>
  <div class="formula">
Adam:
  m ← β₁m + (1-β₁)g          (1차 모멘트, 방향)
  v ← β₂v + (1-β₂)g²         (2차 모멘트, 크기)
  m̂ = m/(1-β₁ᵗ)              (편향 보정)
  θ ← θ - η · m̂ / (√v̂ + ε)
  </div>
</div>
`},

{
  id:'B3', group:'B', icon:'🎲', color:'#a78bfa',
  title:'확률통계 & 정보이론',
  desc:'베이즈 정리, 분포, Cross-Entropy, KL Divergence.',
  html:`
<div class="study-section">
  <div class="section-title">핵심 분포와 베이즈 정리</div>
  <div class="concept-grid">
    <div class="concept-card"><div class="cc-icon">🔔</div><div class="cc-title">정규분포 N(μ,σ²)</div><div class="cc-body">가중치 초기화, 데이터 가정. 중심극한정리로 많은 분포가 수렴</div></div>
    <div class="concept-card"><div class="cc-icon">🎯</div><div class="cc-title">베르누이 & 이항</div><div class="cc-body">이진 분류 출력. sigmoid → p ∈ (0,1)</div></div>
    <div class="concept-card"><div class="cc-icon">🎰</div><div class="cc-title">카테고리컬</div><div class="cc-body">다중 분류. softmax → 확률 분포</div></div>
    <div class="concept-card"><div class="cc-icon">📊</div><div class="cc-title">베이즈 정리</div><div class="cc-body">P(A|B) = P(B|A)P(A)/P(B)<br>MAP = MLE + Prior (규제와 동치)</div></div>
  </div>
</div>

<div class="study-section">
  <div class="section-title">정보이론 <span class="ibadge">면접 필수</span></div>
  <div class="formula">
엔트로피:   H(p) = -Σ p(x) log p(x)         (불확실성 측정)
Cross-Entropy: H(p,q) = -Σ p(x) log q(x)   (분류 손실 함수)
KL Divergence: D_KL(P‖Q) = Σ P log(P/Q)    (분포 간 차이)

관계: H(p,q) = H(p) + D_KL(P‖Q)
→ Cross-Entropy 최소화 = KL Divergence 최소화 = MLE 최대화
  </div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · 정보이론 구현</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> numpy <span class="k">as</span> np

<span class="k">def</span> <span class="f">softmax</span>(x):
    x = x - x.max()                  <span class="c"># 수치 안정성</span>
    <span class="k">return</span> np.exp(x) / np.exp(x).sum()

<span class="k">def</span> <span class="f">cross_entropy</span>(y_true, y_pred):
    y_pred = np.clip(y_pred, <span class="n">1e-9</span>, <span class="n">1</span>)
    <span class="k">return</span> -np.sum(y_true * np.log(y_pred))

<span class="k">def</span> <span class="f">kl_div</span>(p, q):
    p = np.clip(p, <span class="n">1e-9</span>, <span class="n">1</span>)
    q = np.clip(q, <span class="n">1e-9</span>, <span class="n">1</span>)
    <span class="k">return</span> np.sum(p * np.log(p / q))

logits = np.array([<span class="n">2.0</span>, <span class="n">1.0</span>, <span class="n">0.5</span>])
probs  = softmax(logits)
y_true = np.array([<span class="n">1.0</span>, <span class="n">0.0</span>, <span class="n">0.0</span>])

<span class="f">print</span>(<span class="s">f"Softmax: {probs}"</span>)
<span class="f">print</span>(<span class="s">f"CE Loss: {cross_entropy(y_true, probs):.4f}"</span>)
<span class="f">print</span>(<span class="s">f"KL Div:  {kl_div(y_true, probs):.4f}"</span>)</pre>
  </div>
</div>
`},

// ══════════════════════════════════════════════════════════
//  PART C  ─  ML 기초
// ══════════════════════════════════════════════════════════
{
  id:'C1', group:'C', icon:'🧠', color:'#10b981',
  title:'ML 패러다임 & 평가',
  desc:'지도/비지도/강화학습. 편향-분산. 핵심 평가 지표.',
  html:`
<div class="study-section">
  <div class="section-title">학습 패러다임</div>
  <div class="concept-grid">
    <div class="concept-card"><div class="cc-icon">🎯</div><div class="cc-title">지도학습 (Supervised)</div><div class="cc-body">레이블 있는 데이터로 학습. 분류·회귀. RandomForest, XGBoost, SVM, 신경망</div></div>
    <div class="concept-card"><div class="cc-icon">🔍</div><div class="cc-title">비지도학습 (Unsupervised)</div><div class="cc-body">레이블 없이 패턴 발견. K-Means, DBSCAN, PCA, AutoEncoder</div></div>
    <div class="concept-card"><div class="cc-icon">🤖</div><div class="cc-title">강화학습 (RL)</div><div class="cc-body">환경 상호작용, 보상 최대화. DQN, PPO, AlphaGo, RLHF</div></div>
    <div class="concept-card"><div class="cc-icon">🔄</div><div class="cc-title">자기지도학습 (SSL)</div><div class="cc-body">데이터에서 자체 레이블 생성. BERT MLM, GPT CLM. LLM의 기반</div></div>
  </div>
</div>

<div class="study-section">
  <div class="section-title">편향-분산 트레이드오프 <span class="ibadge">면접 필수</span></div>
  <div class="formula">
E[Error] = Bias² + Variance + Irreducible Noise

고편향(Underfitting): 모델 너무 단순 → 훈련/테스트 모두 성능 나쁨
  해결: 더 복잡한 모델, 피처 추가, 다항 특성

고분산(Overfitting): 모델 너무 복잡 → 훈련↑, 테스트↓
  해결: 규제(L1/L2), Dropout, 데이터 증강, 조기 종료
  </div>
</div>

<div class="study-section">
  <div class="section-title">핵심 평가 지표</div>
  <div class="formula">
TP=실제양성·예측양성, FP=실제음성·예측양성, FN=실제양성·예측음성, TN=실제음성·예측음성

Accuracy  = (TP+TN) / 전체           → 균형 데이터
Precision = TP / (TP+FP)             → "예측 양성 중 진짜 양성" (스팸 필터)
Recall    = TP / (TP+FN)             → "실제 양성 중 맞춘 비율" (암 진단)
F1        = 2PR / (P+R)              → 불균형 데이터
AUC-ROC   = TPR vs FPR 곡선 아래 면적 → 임계값 무관
  </div>
  <div class="hl hl-yellow">⚠️ 99% 정상/1% 이상인 데이터에서 "전부 정상" 예측 → Accuracy=99%지만 쓸모없음. 불균형 데이터에는 F1 또는 AUC-ROC 사용!</div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · sklearn 평가</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">from</span> sklearn.metrics <span class="k">import</span> (classification_report, roc_auc_score,
                              confusion_matrix, f1_score)
<span class="k">from</span> sklearn.model_selection <span class="k">import</span> StratifiedKFold, cross_val_score
<span class="k">from</span> sklearn.ensemble <span class="k">import</span> RandomForestClassifier

model = RandomForestClassifier(n_estimators=<span class="n">100</span>, random_state=<span class="n">42</span>)

<span class="c"># 교차 검증 (데이터 누수 없이 평가)</span>
cv = StratifiedKFold(n_splits=<span class="n">5</span>, shuffle=<span class="k">True</span>, random_state=<span class="n">42</span>)
scores = cross_val_score(model, X, y, cv=cv, scoring=<span class="s">'roc_auc'</span>)
<span class="f">print</span>(<span class="s">f"CV AUC: {scores.mean():.4f} ± {scores.std():.4f}"</span>)

<span class="c"># 상세 리포트</span>
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, <span class="n">1</span>]
<span class="f">print</span>(classification_report(y_test, y_pred))</pre>
  </div>
</div>
`},

{
  id:'C2', group:'C', icon:'🌲', color:'#10b981',
  title:'핵심 ML 알고리즘',
  desc:'선형·SVM·트리·앙상블. 각 알고리즘의 핵심 아이디어.',
  html:`
<div class="study-section">
  <div class="section-title">알고리즘 비교</div>
  <table class="data-table">
    <thead><tr><th>알고리즘</th><th>핵심 아이디어</th><th>장점</th><th>단점</th><th>주요 하이퍼파라미터</th></tr></thead>
    <tbody>
      <tr><td>Linear/Logistic Reg</td><td>최소제곱/MLE</td><td>해석 용이, 빠름</td><td>비선형 불가</td><td>C(규제강도)</td></tr>
      <tr><td>SVM</td><td>마진 최대화</td><td>고차원 강함</td><td>대용량 느림</td><td>C, gamma, kernel</td></tr>
      <tr><td>Decision Tree</td><td>정보이득 최대화</td><td>해석 용이</td><td>과적합 심함</td><td>max_depth, min_samples</td></tr>
      <tr><td>Random Forest</td><td>배깅+다수결</td><td>과적합 방지</td><td>해석 어려움</td><td>n_estimators, max_features</td></tr>
      <tr><td>XGBoost</td><td>순차 부스팅</td><td>성능 최강</td><td>하이퍼파라미터↑</td><td>lr, depth, subsample</td></tr>
      <tr><td>K-Means</td><td>중심 반복 갱신</td><td>단순 빠름</td><td>K 결정 어려움</td><td>n_clusters, init</td></tr>
    </tbody>
  </table>
</div>

<div class="study-section">
  <div class="section-title">XGBoost + Optuna 파이프라인</div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · XGBoost + Optuna</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> xgboost <span class="k">as</span> xgb
<span class="k">import</span> optuna
<span class="k">from</span> sklearn.model_selection <span class="k">import</span> cross_val_score
<span class="k">from</span> sklearn.datasets <span class="k">import</span> load_breast_cancer

X, y = load_breast_cancer(return_X_y=<span class="k">True</span>)

<span class="k">def</span> <span class="f">objective</span>(trial):
    params = {
        <span class="s">'max_depth'</span>:    trial.suggest_int(<span class="s">'depth'</span>, <span class="n">3</span>, <span class="n">9</span>),
        <span class="s">'learning_rate'</span>:trial.suggest_float(<span class="s">'lr'</span>, <span class="n">1e-3</span>, <span class="n">0.3</span>, log=<span class="k">True</span>),
        <span class="s">'n_estimators'</span>: trial.suggest_int(<span class="s">'n_est'</span>, <span class="n">100</span>, <span class="n">500</span>),
        <span class="s">'subsample'</span>:    trial.suggest_float(<span class="s">'sub'</span>, <span class="n">0.6</span>, <span class="n">1.0</span>),
        <span class="s">'colsample_bytree'</span>: trial.suggest_float(<span class="s">'col'</span>, <span class="n">0.5</span>, <span class="n">1.0</span>),
    }
    model = xgb.XGBClassifier(**params, random_state=<span class="n">42</span>, eval_metric=<span class="s">'logloss'</span>)
    <span class="k">return</span> cross_val_score(model, X, y, cv=<span class="n">5</span>, scoring=<span class="s">'roc_auc'</span>).mean()

study = optuna.create_study(direction=<span class="s">'maximize'</span>)
study.optimize(objective, n_trials=<span class="n">50</span>)
<span class="f">print</span>(<span class="s">f"Best AUC: {study.best_value:.4f}"</span>)</pre>
  </div>
</div>
`},

// ══════════════════════════════════════════════════════════
//  PART D  ─  딥러닝 핵심
// ══════════════════════════════════════════════════════════
{
  id:'D1', group:'D', icon:'🔥', color:'#f59e0b',
  title:'신경망 & 역전파',
  desc:'퍼셉트론, 활성화 함수, 손실 함수, 역전파 알고리즘.',
  html:`
<div class="study-section">
  <div class="section-title">활성화 함수 비교 <span class="ibadge">면접 필수</span></div>
  <table class="data-table">
    <thead><tr><th>함수</th><th>범위</th><th>장점</th><th>단점</th><th>주 용도</th></tr></thead>
    <tbody>
      <tr><td>Sigmoid</td><td>(0,1)</td><td>확률 해석</td><td>Vanishing Gradient, 0 비중심</td><td>이진 분류 출력</td></tr>
      <tr><td>Tanh</td><td>(-1,1)</td><td>0 중심</td><td>여전히 Vanishing</td><td>RNN 게이트</td></tr>
      <tr><td>ReLU</td><td>[0,∞)</td><td>계산 빠름, 소실 없음</td><td>Dying ReLU (음수 그래디언트=0)</td><td>CNN, MLP 기본값</td></tr>
      <tr><td>Leaky ReLU</td><td>(-∞,∞)</td><td>Dying 해결</td><td>α 선택 필요</td><td>범용</td></tr>
      <tr><td>GELU</td><td>(-∞,∞)</td><td>부드러운 ReLU</td><td>계산 비용</td><td>Transformer 표준 (BERT/GPT)</td></tr>
      <tr><td>SiLU/Swish</td><td>(-∞,∞)</td><td>자기 게이팅</td><td>복잡</td><td>LLaMA, 최신 LLM</td></tr>
    </tbody>
  </table>
</div>

<div class="study-section">
  <div class="section-title">PyTorch 전체 학습 루프</div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · PyTorch 완전한 파이프라인</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> torch
<span class="k">import</span> torch.nn <span class="k">as</span> nn
<span class="k">import</span> torch.optim <span class="k">as</span> optim
<span class="k">from</span> torch.utils.data <span class="k">import</span> DataLoader, TensorDataset

<span class="k">class</span> <span class="cls">MLP</span>(nn.Module):
    <span class="k">def</span> <span class="f">__init__</span>(self, in_dim, hidden, out_dim, p=<span class="n">0.3</span>):
        <span class="f">super</span>().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, hidden), nn.BatchNorm1d(hidden), nn.GELU(), nn.Dropout(p),
            nn.Linear(hidden, hidden//<span class="n">2</span>), nn.GELU(), nn.Dropout(p//<span class="n">2</span>),
            nn.Linear(hidden//<span class="n">2</span>, out_dim)
        )
    <span class="k">def</span> <span class="f">forward</span>(self, x): <span class="k">return</span> self.net(x)

<span class="c"># 데이터 준비</span>
X_t = torch.FloatTensor(X_train)
y_t = torch.LongTensor(y_train)
loader = DataLoader(TensorDataset(X_t, y_t), batch_size=<span class="n">64</span>, shuffle=<span class="k">True</span>)

model = <span class="cls">MLP</span>(<span class="n">30</span>, <span class="n">128</span>, <span class="n">2</span>)
optimizer = optim.AdamW(model.parameters(), lr=<span class="n">1e-3</span>, weight_decay=<span class="n">1e-4</span>)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=<span class="n">50</span>)
criterion = nn.CrossEntropyLoss()

<span class="k">for</span> epoch <span class="k">in</span> <span class="f">range</span>(<span class="n">50</span>):
    model.train()
    total_loss = <span class="n">0</span>
    <span class="k">for</span> xb, yb <span class="k">in</span> loader:
        optimizer.zero_grad()
        loss = criterion(model(xb), yb)
        loss.backward()
        nn.utils.clip_grad_norm_(model.parameters(), <span class="n">1.0</span>)  <span class="c"># Gradient Clipping</span>
        optimizer.step()
        total_loss += loss.item()
    scheduler.step()
    <span class="k">if</span> epoch % <span class="n">10</span> == <span class="n">0</span>:
        model.eval()
        <span class="k">with</span> torch.no_grad():
            val_out = model(torch.FloatTensor(X_test))
            val_acc = (val_out.argmax(<span class="n">1</span>) == torch.LongTensor(y_test)).float().mean()
        <span class="f">print</span>(<span class="s">f"Epoch {epoch:3d} | Loss: {total_loss/len(loader):.4f} | Val Acc: {val_acc:.4f}"</span>)</pre>
  </div>
</div>

<div class="study-section">
  <div class="section-title">정규화 기법</div>
  <div class="concept-grid">
    <div class="concept-card"><div class="cc-icon">📊</div><div class="cc-title">Batch Normalization</div><div class="cc-body">배치 내 활성화를 정규화. 학습 안정화, 학습률 ↑ 가능. CNN/MLP 표준. 배치 크기 의존</div></div>
    <div class="concept-card"><div class="cc-icon">📏</div><div class="cc-title">Layer Normalization</div><div class="cc-body">피처 차원으로 정규화. 배치 크기 독립. Transformer 표준. RNN에도 적합</div></div>
    <div class="concept-card"><div class="cc-icon">💧</div><div class="cc-title">Dropout</div><div class="cc-body">p 확률로 뉴런 비활성화. 앙상블 효과. 추론 시 비활성화 + 출력×(1-p)</div></div>
    <div class="concept-card"><div class="cc-icon">🏋️</div><div class="cc-title">Weight Decay (L2)</div><div class="cc-body">가중치 크기 페널티 →loss + λ‖W‖². 과적합 방지. AdamW는 분리 적용</div></div>
  </div>
</div>
`},

// ══════════════════════════════════════════════════════════
//  PART E  ─  주요 아키텍처
// ══════════════════════════════════════════════════════════
{
  id:'E1', group:'E', icon:'🏗️', color:'#f59e0b',
  title:'CNN & ResNet',
  desc:'합성곱 신경망의 구조와 스킵 커넥션의 핵심 아이디어.',
  html:`
<div class="study-section">
  <div class="section-title">CNN 핵심 개념</div>
  <div class="formula">
Conv2D 출력 크기: (W - F + 2P) / S + 1
  W: 입력 크기, F: 필터 크기, P: 패딩, S: 스트라이드

파라미터 수: F × F × C_in × C_out + C_out  (편향 포함)
  </div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · PyTorch CNN</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> torch.nn <span class="k">as</span> nn

<span class="k">class</span> <span class="cls">ResBlock</span>(nn.Module):
    <span class="k">def</span> <span class="f">__init__</span>(self, ch, stride=<span class="n">1</span>):
        <span class="f">super</span>().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(ch, ch, <span class="n">3</span>, stride, <span class="n">1</span>, bias=<span class="k">False</span>),
            nn.BatchNorm2d(ch), nn.ReLU(inplace=<span class="k">True</span>),
            nn.Conv2d(ch, ch, <span class="n">3</span>, <span class="n">1</span>, <span class="n">1</span>, bias=<span class="k">False</span>),
            nn.BatchNorm2d(ch)
        )
        self.relu = nn.ReLU(inplace=<span class="k">True</span>)

    <span class="k">def</span> <span class="f">forward</span>(self, x):
        <span class="k">return</span> self.relu(self.conv(x) + x)   <span class="c"># Skip Connection ★</span>

<span class="k">class</span> <span class="cls">SimpleCNN</span>(nn.Module):
    <span class="k">def</span> <span class="f">__init__</span>(self, num_classes=<span class="n">10</span>):
        <span class="f">super</span>().__init__()
        self.stem = nn.Sequential(
            nn.Conv2d(<span class="n">3</span>, <span class="n">64</span>, <span class="n">3</span>, <span class="n">1</span>, <span class="n">1</span>), nn.BatchNorm2d(<span class="n">64</span>), nn.ReLU()
        )
        self.layers = nn.Sequential(
            <span class="cls">ResBlock</span>(<span class="n">64</span>), <span class="cls">ResBlock</span>(<span class="n">64</span>),
            nn.MaxPool2d(<span class="n">2</span>),
        )
        self.head = nn.Sequential(nn.AdaptiveAvgPool2d(<span class="n">1</span>), nn.Flatten(), nn.Linear(<span class="n">64</span>, num_classes))

    <span class="k">def</span> <span class="f">forward</span>(self, x): <span class="k">return</span> self.head(self.layers(self.stem(x)))</pre>
  </div>
  <div class="hl hl-blue">💡 <strong>ResNet 핵심:</strong> y = F(x) + x — 잔차만 학습. 그래디언트가 Skip Connection으로 직접 흐름 → 152층+ 학습 가능. VGG 이후 딥러닝 혁명.</div>
</div>
`},

{
  id:'E2', group:'E', icon:'🔁', color:'#f59e0b',
  title:'RNN & LSTM',
  desc:'순환 신경망과 장기 의존성 문제 해결.',
  html:`
<div class="study-section">
  <div class="section-title">LSTM 게이트 메커니즘 <span class="ibadge">면접 필수</span></div>
  <div class="formula">
Forget Gate:  f = σ(Wf·[h,x] + bf)   ← 무엇을 잊을지
Input Gate:   i = σ(Wi·[h,x] + bi)   ← 무엇을 기억할지
Cell Update:  C̃ = tanh(Wc·[h,x] + bc)
New Cell:     C = f⊙C_prev + i⊙C̃     ← Cell State (장기 기억)
Output Gate:  o = σ(Wo·[h,x] + bo)
Hidden:       h = o⊙tanh(C)           ← 단기 기억/출력
  </div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · PyTorch LSTM</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> torch
<span class="k">import</span> torch.nn <span class="k">as</span> nn

<span class="k">class</span> <span class="cls">LSTMClassifier</span>(nn.Module):
    <span class="k">def</span> <span class="f">__init__</span>(self, vocab_size, embed_dim, hidden, num_class):
        <span class="f">super</span>().__init__()
        self.embed = nn.Embedding(vocab_size, embed_dim)
        self.lstm  = nn.LSTM(embed_dim, hidden, batch_first=<span class="k">True</span>,
                             num_layers=<span class="n">2</span>, dropout=<span class="n">0.3</span>, bidirectional=<span class="k">True</span>)
        self.fc = nn.Linear(hidden * <span class="n">2</span>, num_class)  <span class="c"># ×2 for bidirectional</span>

    <span class="k">def</span> <span class="f">forward</span>(self, x):
        e = self.embed(x)                  <span class="c"># (B, T, E)</span>
        out, (h, c) = self.lstm(e)         <span class="c"># out: (B,T,2H)</span>
        pooled = out.mean(dim=<span class="n">1</span>)          <span class="c"># Mean pooling</span>
        <span class="k">return</span> self.fc(pooled)</pre>
  </div>
  <div class="hl hl-red">⚠️ <strong>RNN → LSTM → Transformer:</strong> RNN은 Vanishing Gradient로 장기 의존성 학습 실패. LSTM은 게이트로 해결했지만 병렬 처리 불가. Transformer는 Attention으로 모든 쌍을 병렬 처리.</div>
</div>
`},

// ══════════════════════════════════════════════════════════
//  PART F  ─  Transformer & Attention
// ══════════════════════════════════════════════════════════
{
  id:'F1', group:'F', icon:'⚡', color:'#7c3aed',
  title:'Self-Attention 메커니즘',
  desc:'"Attention Is All You Need" — Scaled Dot-Product Attention 완전 이해.',
  html:`
<div class="study-section">
  <div class="section-title">Scaled Dot-Product Attention <span class="ibadge">면접 필수</span></div>
  <div class="formula">
Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V

Q (Query):  "내가 찾는 정보"     ← 현재 토큰이 무엇을 원하는가
K (Key):    "내가 가진 정보"     ← 각 토큰이 어떤 정보를 제공하는가
V (Value):  "실제 전달할 값"     ← 정보를 얼마나 가져올 것인가
√dₖ 나누는 이유: 내적이 커지면 softmax 포화 → 기울기 소실 방지
  </div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · Multi-Head Attention 구현</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> torch, torch.nn <span class="k">as</span> nn, math

<span class="k">def</span> <span class="f">scaled_dot_attention</span>(Q, K, V, mask=<span class="k">None</span>):
    d_k = Q.size(-<span class="n">1</span>)
    scores = Q @ K.transpose(-<span class="n">2</span>, -<span class="n">1</span>) / math.sqrt(d_k)
    <span class="k">if</span> mask <span class="k">is not None</span>:
        scores = scores.masked_fill(mask == <span class="n">0</span>, <span class="n">-1e9</span>)
    attn = scores.softmax(dim=-<span class="n">1</span>)
    <span class="k">return</span> attn @ V, attn

<span class="k">class</span> <span class="cls">MultiHeadAttention</span>(nn.Module):
    <span class="k">def</span> <span class="f">__init__</span>(self, d_model, n_heads):
        <span class="f">super</span>().__init__()
        self.h = n_heads
        self.d_k = d_model // n_heads
        self.Wq = nn.Linear(d_model, d_model)
        self.Wk = nn.Linear(d_model, d_model)
        self.Wv = nn.Linear(d_model, d_model)
        self.Wo = nn.Linear(d_model, d_model)

    <span class="k">def</span> <span class="f">split_heads</span>(self, x):
        B, T, D = x.shape
        <span class="k">return</span> x.view(B, T, self.h, self.d_k).transpose(<span class="n">1</span>, <span class="n">2</span>)

    <span class="k">def</span> <span class="f">forward</span>(self, Q, K, V, mask=<span class="k">None</span>):
        B = Q.size(<span class="n">0</span>)
        Q, K, V = self.split_heads(self.Wq(Q)), self.split_heads(self.Wk(K)), self.split_heads(self.Wv(V))
        x, attn = scaled_dot_attention(Q, K, V, mask)
        x = x.transpose(<span class="n">1</span>, <span class="n">2</span>).contiguous().view(B, -<span class="n">1</span>, self.h * self.d_k)
        <span class="k">return</span> self.Wo(x)</pre>
  </div>
</div>

<div class="study-section">
  <div class="section-title">BERT vs GPT <span class="ibadge">면접 필수</span></div>
  <table class="data-table">
    <thead><tr><th>특성</th><th>BERT</th><th>GPT 계열</th></tr></thead>
    <tbody>
      <tr><td>구조</td><td>Encoder-only</td><td>Decoder-only</td></tr>
      <tr><td>Attention</td><td>Bidirectional (양방향)</td><td>Causal (단방향, 미래 마스킹)</td></tr>
      <tr><td>사전학습</td><td>MLM (마스크 채우기) + NSP</td><td>CLM (다음 토큰 예측)</td></tr>
      <tr><td>주 용도</td><td>분류, NER, QA, 임베딩</td><td>텍스트 생성, 챗봇, 코드 생성</td></tr>
      <tr><td>대표 모델</td><td>BERT, RoBERTa, DeBERTa</td><td>GPT-4, LLaMA, Claude, Gemini</td></tr>
    </tbody>
  </table>
</div>
`},

// ══════════════════════════════════════════════════════════
//  PART G  ─  LLM & Fine-tuning
// ══════════════════════════════════════════════════════════
{
  id:'G1', group:'G', icon:'🤖', color:'#00e5ff',
  title:'LLM & 파인튜닝',
  desc:'Pre-training, SFT, RLHF, DPO, LoRA, QLoRA.',
  html:`
<div class="study-section">
  <div class="section-title">LLM 학습 파이프라인</div>
  <div class="concept-grid">
    <div class="concept-card"><div class="cc-icon">📚</div><div class="cc-title">1. Pre-training</div><div class="cc-body">수천억 토큰, 다음 토큰 예측(CLM). 수천 GPU-month. 세계 지식을 파라미터에 압축</div></div>
    <div class="concept-card"><div class="cc-icon">🎯</div><div class="cc-title">2. SFT</div><div class="cc-body">Supervised Fine-Tuning. 고품질 명령-응답 쌍으로 지시 따르기 학습</div></div>
    <div class="concept-card"><div class="cc-icon">🏆</div><div class="cc-title">3. RLHF</div><div class="cc-body">보상 모델 학습 → PPO로 정책 최적화. ChatGPT, Claude의 핵심. 복잡하고 비쌈</div></div>
    <div class="concept-card"><div class="cc-icon">⚡</div><div class="cc-title">4. DPO</div><div class="cc-body">Direct Preference Optimization. 보상 모델 없이 선호 데이터로 직접 최적화. 최신 트렌드</div></div>
  </div>
</div>

<div class="study-section">
  <div class="section-title">LoRA — 효율적 파인튜닝 <span class="ibadge">면접 필수</span></div>
  <div class="formula">
W' = W + ΔW = W + B·A
  W: 원본 가중치 (동결)
  A ∈ ℝ^(r×d), B ∈ ℝ^(d×r), r ≪ d  (저랭크 분해)

파라미터 절감: d×d → 2×r×d
예) d=4096, r=8: 16.7M → 65K (약 0.4%)

QLoRA = LoRA + 4-bit NF4 양자화 → 7B 모델을 단일 24GB GPU에서 파인튜닝
  </div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · PEFT + LoRA</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">from</span> transformers <span class="k">import</span> AutoModelForCausalLM, AutoTokenizer
<span class="k">from</span> peft <span class="k">import</span> get_peft_model, LoraConfig, TaskType

model = AutoModelForCausalLM.from_pretrained(<span class="s">"meta-llama/Llama-3.2-1B"</span>)

cfg = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=<span class="n">8</span>, lora_alpha=<span class="n">32</span>, lora_dropout=<span class="n">0.1</span>,
    target_modules=[<span class="s">"q_proj"</span>, <span class="s">"v_proj"</span>]
)
model = get_peft_model(model, cfg)
model.print_trainable_parameters()
<span class="c"># trainable params: 4,194,304 || all params: 1,240,000,000 (0.34%)</span></pre>
  </div>
</div>
`},

// ══════════════════════════════════════════════════════════
//  PART H  ─  RAG & 벡터 DB
// ══════════════════════════════════════════════════════════
{
  id:'H1', group:'H', icon:'🔍', color:'#10b981',
  title:'RAG & 벡터 DB',
  desc:'Retrieval-Augmented Generation. 임베딩, FAISS, LangChain.',
  html:`
<div class="study-section">
  <div class="section-title">RAG 파이프라인 <span class="ibadge">면접 필수</span></div>
  <div class="concept-grid">
    <div class="concept-card"><div class="cc-icon">✂️</div><div class="cc-title">① 문서 청킹</div><div class="cc-body">512토큰 + 64 오버랩. 문맥 보존 vs 정밀도 트레이드오프</div></div>
    <div class="concept-card"><div class="cc-icon">🧬</div><div class="cc-title">② 임베딩</div><div class="cc-body">BAAI/bge-m3 (한국어), OpenAI ada. 밀집 벡터로 변환</div></div>
    <div class="concept-card"><div class="cc-icon">💾</div><div class="cc-title">③ 벡터 DB</div><div class="cc-body">FAISS (로컬), Chroma (개발), Pinecone (프로덕션)</div></div>
    <div class="concept-card"><div class="cc-icon">🔎</div><div class="cc-title">④ 검색</div><div class="cc-body">코사인 유사도로 Top-k. MMR로 다양성 확보</div></div>
    <div class="concept-card"><div class="cc-icon">✍️</div><div class="cc-title">⑤ 생성</div><div class="cc-body">검색 문서 + 쿼리를 컨텍스트로 LLM에 제공</div></div>
  </div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · LangChain RAG</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">from</span> langchain.text_splitter <span class="k">import</span> RecursiveCharacterTextSplitter
<span class="k">from</span> langchain_community.embeddings <span class="k">import</span> HuggingFaceEmbeddings
<span class="k">from</span> langchain_community.vectorstores <span class="k">import</span> Chroma
<span class="k">from</span> langchain.chains <span class="k">import</span> RetrievalQA

splitter = RecursiveCharacterTextSplitter(chunk_size=<span class="n">512</span>, chunk_overlap=<span class="n">64</span>)
chunks   = splitter.split_documents(docs)

emb = HuggingFaceEmbeddings(model_name=<span class="s">"BAAI/bge-m3"</span>)
db  = Chroma.from_documents(chunks, emb)

retriever = db.as_retriever(search_type=<span class="s">"mmr"</span>, search_kwargs={<span class="s">"k"</span>:<span class="n">5</span>})
qa = RetrievalQA.from_chain_type(llm=llm, retriever=retriever,
                                  return_source_documents=<span class="k">True</span>)
result = qa(<span class="s">"문서의 핵심 내용은?"</span>)</pre>
  </div>
</div>
`},

// ══════════════════════════════════════════════════════════
//  PART I  ─  에이전틱 AI
// ══════════════════════════════════════════════════════════
{
  id:'I1', group:'I', icon:'🚀', color:'#00e5ff',
  title:'에이전틱 AI & 최신 트렌드',
  desc:'ReAct, Tool Use, Multi-Agent, MCP. 2025 최신 트렌드.',
  html:`
<div class="study-section">
  <div class="section-title">에이전트 아키텍처</div>
  <div class="concept-grid">
    <div class="concept-card"><div class="cc-icon">🔄</div><div class="cc-title">ReAct</div><div class="cc-body">Reasoning + Acting 반복. Thought → Action → Observation 루프. 도구 사용의 표준 패턴</div></div>
    <div class="concept-card"><div class="cc-icon">🔧</div><div class="cc-title">Tool Use</div><div class="cc-body">Function Calling으로 외부 API·DB·코드 실행 연결. JSON으로 구조화된 호출</div></div>
    <div class="concept-card"><div class="cc-icon">🌐</div><div class="cc-title">Multi-Agent</div><div class="cc-body">오케스트레이터-워커 패턴. 복잡한 태스크를 전문 에이전트에 위임</div></div>
    <div class="concept-card"><div class="cc-icon">🔌</div><div class="cc-title">MCP</div><div class="cc-body">Model Context Protocol. Anthropic 제안 표준. 도구 연결을 표준화</div></div>
  </div>
  <div class="hl hl-purple">🚀 <strong>2025 트렌드:</strong> Reasoning Models (o3, R2), Computer Use (GUI 자동화), Long Context (1M+ 토큰), Multimodal Agents, Agentic Coding (Cursor, Claude Code)</div>
</div>

<div class="study-section">
  <div class="section-title">Function Calling 구현</div>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">Python · OpenAI Function Calling</span><button class="code-copy" onclick="copyCode(this)">copy</button></div>
    <pre><span class="k">import</span> json
<span class="k">from</span> openai <span class="k">import</span> OpenAI

client = OpenAI()
tools = [{
    <span class="s">"type"</span>: <span class="s">"function"</span>,
    <span class="s">"function"</span>: {
        <span class="s">"name"</span>: <span class="s">"search_db"</span>,
        <span class="s">"description"</span>: <span class="s">"데이터베이스에서 정보를 검색합니다"</span>,
        <span class="s">"parameters"</span>: {
            <span class="s">"type"</span>: <span class="s">"object"</span>,
            <span class="s">"properties"</span>: {<span class="s">"query"</span>: {<span class="s">"type"</span>: <span class="s">"string"</span>}},
            <span class="s">"required"</span>: [<span class="s">"query"</span>]
        }
    }
}]

<span class="k">def</span> <span class="f">run_agent</span>(user_msg, max_steps=<span class="n">5</span>):
    messages = [{<span class="s">"role"</span>: <span class="s">"user"</span>, <span class="s">"content"</span>: user_msg}]
    <span class="k">for</span> _ <span class="k">in</span> <span class="f">range</span>(max_steps):
        resp = client.chat.completions.create(model=<span class="s">"gpt-4o"</span>, messages=messages, tools=tools)
        msg = resp.choices[<span class="n">0</span>].message
        messages.append(msg)
        <span class="k">if not</span> msg.tool_calls: <span class="k">return</span> msg.content
        <span class="k">for</span> tc <span class="k">in</span> msg.tool_calls:
            result = search_db(**json.loads(tc.function.arguments))
            messages.append({<span class="s">"role"</span>:<span class="s">"tool"</span>, <span class="s">"tool_call_id"</span>:tc.id, <span class="s">"content"</span>:str(result)})
    <span class="k">return</span> <span class="s">"max steps reached"</span></pre>
  </div>
</div>
`},

];
