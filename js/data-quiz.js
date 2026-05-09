// ═══════════════════════════════════════════════════════
//  data-quiz.js  ·  150문항 전체 퀴즈 데이터
//  type: mcq(선택), short(단답), code(코드작성), output(결과작성)
// ═══════════════════════════════════════════════════════

const QUIZ_DATA = [

// ══════════════════════════════════════════════════
//  PART A — Python & 라이브러리 (Q1~Q30)
// ══════════════════════════════════════════════════

{id:1,part:'A',chapter:'NumPy',type:'output',
 q:'다음 코드의 출력 결과를 작성하세요.',
 code:`import numpy as np
a = np.array([[1,2,3],[4,5,6]])
print(a.shape)
print(a[1,2])`,
 answer:'(2, 3)\n6',
 exp:'shape는 (행, 열)=(2,3). a[1,2]는 2행(0-index) 3열(0-index) = 6.'},

{id:2,part:'A',chapter:'NumPy',type:'mcq',
 q:'shape (3,1)과 (1,4) 배열을 더한 결과의 shape은? (브로드캐스팅)',
 options:['(3,4)','(1,1)','오류 발생','(4,3)'],
 answer:0,
 exp:'브로드캐스팅: 크기 1인 차원은 자동 확장. (3,1)+(1,4) → (3,4) 격자 연산.'},

{id:3,part:'A',chapter:'NumPy',type:'code',
 q:'shape (100,5)인 정규분포 랜덤 행렬 X를 만들고, 각 열의 평균을 빼고 표준편차로 나누는 Z-score 정규화 코드를 작성하세요.',
 hint:'np.random.randn(), X.mean(axis=0), X.std(axis=0) 사용',
 answer:`import numpy as np
X = np.random.randn(100, 5)
mean = X.mean(axis=0)
std  = X.std(axis=0)
X_norm = (X - mean) / std`,
 keywords:['randn','mean','std','axis'],
 exp:'axis=0은 열 방향(↓). 브로드캐스팅으로 (100,5)-(5,)가 자동 계산. 결과 shape은 여전히 (100,5).'},

{id:4,part:'A',chapter:'NumPy',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
a = np.arange(12).reshape(3,4)
print(a[a > 6])`,
 answer:'[ 7  8  9 10 11]',
 exp:'arange(12)=[0~11]. 불리언 인덱싱 a>6: 7 이상인 원소만 1D 배열로 반환.'},

{id:5,part:'A',chapter:'NumPy',type:'mcq',
 q:'A.shape=(3,4), B.shape=(4,5)일 때 (A @ B).shape은?',
 options:['(3,5)','(4,4)','오류','(5,3)'],
 answer:0,
 exp:'행렬 곱: (m×k)×(k×n)=(m×n). (3×4)×(4×5)=(3×5).'},

{id:6,part:'A',chapter:'NumPy',type:'short',
 q:'numpy에서 배열의 전체 합을 구하는 함수와, 각 행의 최댓값 인덱스를 반환하는 함수를 작성하세요.',
 answer:'np.sum(arr) 또는 arr.sum() / np.argmax(arr, axis=1) 또는 arr.argmax(axis=1)',
 exp:'argmax(axis=1): 각 행(→방향)에서 최댓값의 위치 인덱스 반환.'},

{id:7,part:'A',chapter:'NumPy',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
a = np.array([1,2,3,4,5])
print(a[::-1])`,
 answer:'[5 4 3 2 1]',
 exp:'[::-1]은 역순 슬라이싱. step=-1로 뒤에서 앞으로 순회.'},

{id:8,part:'A',chapter:'NumPy',type:'code',
 q:'shape (4,4) 단위행렬을 생성하고, 주대각선의 합(trace)을 출력하는 코드를 작성하세요.',
 hint:'np.eye(), np.trace() 사용',
 answer:`import numpy as np
I = np.eye(4)
print(np.trace(I))  # 4.0`,
 keywords:['eye','trace'],
 exp:'np.eye(n): n×n 단위행렬. trace = 주대각선 원소의 합 = 4.0.'},

{id:9,part:'A',chapter:'NumPy',type:'mcq',
 q:'np.random.randn()과 np.random.rand()의 차이는?',
 options:['차이 없음','randn: 표준정규분포 N(0,1), rand: [0,1) 균등분포','randn이 더 빠름','rand가 정규분포'],
 answer:1,
 exp:'randn: N(0,1). rand: [0,1) 균등. 가중치 초기화엔 randn 기반의 Xavier/He 초기화 사용.'},

{id:10,part:'A',chapter:'NumPy',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
a = np.array([[1,2],[3,4]])
b = np.array([[5,6],[7,8]])
print((a @ b)[0,1])`,
 answer:'22',
 exp:'a@b[0,1] = 1행×2열 = 1×6+2×8 = 6+16 = 22.'},

{id:11,part:'A',chapter:'Pandas',type:'mcq',
 q:'훈련 데이터에 fit_transform(), 테스트 데이터에 transform()만 쓰는 이유는?',
 options:['속도 때문','데이터 누수(Data Leakage) 방지. 테스트 통계를 모델이 미리 알면 실제 성능 과대평가','메모리 절약','형식 변환 때문'],
 answer:1,
 exp:'fit()은 훈련 데이터 통계(평균,분산)를 학습. 테스트에도 fit하면 정보 누출 → 실제 배포 성능 과대평가.'},

{id:12,part:'A',chapter:'Pandas',type:'code',
 q:'DataFrame에서 age 결측치를 중앙값으로 채우고, score가 80 이상인 행만 필터링하는 코드를 작성하세요.',
 hint:'fillna(median()), 불리언 인덱싱 사용',
 answer:`df['age'].fillna(df['age'].median(), inplace=True)
result = df[df['score'] >= 80]`,
 keywords:['fillna','median','>='],
 exp:'fillna로 결측치 대체. 불리언 인덱싱으로 조건 필터링.'},

{id:13,part:'A',chapter:'Pandas',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import pandas as pd
df = pd.DataFrame({'A':[1,2,3],'B':[4,5,6]})
print(df.shape)
print(df['A'].sum())`,
 answer:'(3, 2)\n6',
 exp:'shape=(행,열)=(3,2). A열 합=1+2+3=6.'},

{id:14,part:'A',chapter:'Pandas',type:'mcq',
 q:'pd.merge(df1, df2, on="id", how="left")는?',
 options:['교집합만','df1 모든 행 유지, df2 매칭 행 가져옴. 미매칭은 NaN','df2 모든 행 유지','두 DataFrame 모든 행 포함'],
 answer:1,
 exp:'LEFT JOIN: 왼쪽(df1) 전체 유지. 오른쪽(df2) key 일치하는 행 병합.'},

{id:15,part:'A',chapter:'Pandas',type:'short',
 q:'category 컬럼별로 price의 평균과 표준편차를 동시에 구하는 groupby 코드를 작성하세요.',
 answer:`df.groupby('category')['price'].agg(['mean','std'])`,
 exp:'agg()에 함수 리스트 전달. describe()도 활용 가능.'},

{id:16,part:'A',chapter:'시각화',type:'mcq',
 q:'훈련 손실은 계속 감소하지만 검증 손실이 특정 에폭부터 올라간다면?',
 options:['정상 학습','Underfitting','Overfitting — 조기 종료, Dropout, 정규화 필요','학습률이 너무 작음'],
 answer:2,
 exp:'Overfitting: 훈련 데이터를 암기. 검증 손실 증가 지점이 최적 Early Stopping 포인트.'},

{id:17,part:'A',chapter:'시각화',type:'code',
 q:'matplotlib으로 에폭 1~5의 학습/검증 손실을 같은 그래프에 그리는 코드를 작성하세요. train=[0.9,0.6,0.4,0.25,0.15], val=[0.95,0.7,0.55,0.52,0.55]',
 hint:'plt.plot() 두 번, label, legend() 사용',
 answer:`import matplotlib.pyplot as plt
train = [0.9,0.6,0.4,0.25,0.15]
val   = [0.95,0.7,0.55,0.52,0.55]
epochs = range(1,6)
plt.plot(epochs, train, label='Train Loss')
plt.plot(epochs, val, label='Val Loss', linestyle='--')
plt.xlabel('Epoch'); plt.ylabel('Loss')
plt.legend(); plt.title('Learning Curve')
plt.show()`,
 keywords:['plot','label','legend','xlabel'],
 exp:'검증 손실이 상승 반전하는 지점 = Early Stopping 최적 시점.'},

{id:18,part:'A',chapter:'NumPy',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
a = np.arange(1,7).reshape(2,3)
print(a.sum(axis=0))`,
 answer:'[5 7 9]',
 exp:'[[1,2,3],[4,5,6]]. axis=0 열 방향(↓): [1+4,2+5,3+6]=[5,7,9].'},

{id:19,part:'A',chapter:'NumPy',type:'mcq',
 q:'np.where(condition, a, b)의 동작은?',
 options:['True 인덱스만 반환','condition True면 a, False면 b 반환 (element-wise)','a와 b 중 큰 값 반환','오류'],
 answer:1,
 exp:'element-wise 삼항 연산자. np.where(x>0, x, 0)은 ReLU와 동일. 조건만 넣으면 np.nonzero처럼 True 인덱스 반환.'},

{id:20,part:'A',chapter:'Pandas',type:'code',
 q:'DataFrame의 text 컬럼에서 각 문자열의 길이를 text_len 컬럼에 추가하는 코드를 작성하세요.',
 hint:'str.len() 또는 apply(len) 사용',
 answer:`df['text_len'] = df['text'].str.len()
# 또는
df['text_len'] = df['text'].apply(len)`,
 keywords:['str.len','apply','len'],
 exp:'Pandas str accessor로 벡터화 문자열 연산. apply(len)은 각 원소에 len() 적용.'},

{id:21,part:'A',chapter:'NumPy',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
a = np.array([3,1,4,1,5,9,2,6])
print(np.argsort(a)[:3])`,
 answer:'[1 3 6]',
 exp:'argsort: 정렬된 인덱스 반환. 오름차순 값: 1,1,2,... 인덱스: 1(값1),3(값1),6(값2). 앞 3개=[1,3,6].'},

{id:22,part:'A',chapter:'NumPy',type:'mcq',
 q:'numpy에서 원소별 곱셈(Hadamard product)은?',
 options:['A @ B','np.dot(A,B)','A * B','np.cross(A,B)'],
 answer:2,
 exp:'*는 원소별 곱. @는 행렬 곱. LSTM 게이트의 ⊙ 기호가 바로 *.'},

{id:23,part:'A',chapter:'Pandas',type:'mcq',
 q:'pd.get_dummies()에서 drop_first=True를 사용하는 이유는?',
 options:['속도 개선','다중공선성(더미 변수 함정) 방지 — k-1개로 k개 카테고리 표현 가능','메모리 절약','정확도 향상'],
 answer:1,
 exp:'k개 카테고리 → k열이지만 k-1개면 충분. 마지막 열 = 나머지 열이 모두 0. 선형 종속 제거.'},

{id:24,part:'A',chapter:'NumPy',type:'code',
 q:'벡터 a=[1,2,3], b=[4,5,6]의 코사인 유사도를 numpy로 계산하는 코드를 작성하세요.',
 hint:'np.dot(), np.linalg.norm() 사용',
 answer:`import numpy as np
a = np.array([1,2,3])
b = np.array([4,5,6])
cos_sim = np.dot(a,b) / (np.linalg.norm(a) * np.linalg.norm(b))
print(f"{cos_sim:.4f}")  # 0.9746`,
 keywords:['dot','norm'],
 exp:'a·b=4+10+18=32, ‖a‖=√14, ‖b‖=√77. 32/(√14×√77)≈0.9746.'},

{id:25,part:'A',chapter:'NumPy',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
np.random.seed(42)
print(np.random.randint(0,10,3))`,
 answer:'[6 3 7]',
 exp:'seed(42) 고정 시 재현 가능한 랜덤. 0~9 정수 3개 생성.'},

{id:26,part:'A',chapter:'Pandas',type:'short',
 q:'DataFrame 중복 행 제거 메서드와, 특정 컬럼 기준 정렬 메서드를 작성하세요.',
 answer:'drop_duplicates() / sort_values("column_name")',
 exp:'drop_duplicates(subset=["col"])으로 특정 컬럼 기준. sort_values(ascending=False)로 내림차순.'},

{id:27,part:'A',chapter:'NumPy',type:'mcq',
 q:'np.concatenate()와 np.stack()의 차이는?',
 options:['차이 없음','concatenate: 기존 축으로 이어붙임, stack: 새 축 추가','stack이 빠름','concatenate는 1D만'],
 answer:1,
 exp:'concat: (3,4)+(3,4) → axis=0 → (6,4). stack: (3,4)+(3,4) → axis=0 → (2,3,4) 새 차원 생성.'},

{id:28,part:'A',chapter:'Pandas',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import pandas as pd
s = pd.Series([10,20,30,40,50])
print(s[s > 25].values)`,
 answer:'[30 40 50]',
 exp:'불리언 인덱싱으로 25 초과 필터. .values로 numpy 배열 반환.'},

{id:29,part:'A',chapter:'NumPy',type:'code',
 q:'1D 배열 np.arange(1,11)에서 홀수 인덱스(1,3,5,7,9번째) 원소를 추출하고 합을 출력하세요.',
 hint:'슬라이싱 [1::2] 사용',
 answer:`import numpy as np
a = np.arange(1, 11)
odd_idx = a[1::2]  # [2,4,6,8,10]
print(odd_idx.sum())  # 30`,
 keywords:['arange','1::2','sum'],
 exp:'[1::2]: start=1, step=2 → 인덱스 1,3,5,7,9 → 값 2,4,6,8,10. 합=30.'},

{id:30,part:'A',chapter:'Pandas',type:'mcq',
 q:'시계열 결측치를 이전 관측값으로 채우는 방법은?',
 options:['fillna(0)','fillna(df.mean())','fillna(method="ffill") 또는 ffill()','dropna()'],
 answer:2,
 exp:'ffill(forward fill): 이전 값으로 채움. bfill: 이후 값. 시계열 연속성 보존에 적합.'},

// ══════════════════════════════════════════════════
//  PART B — AI 수학 (Q31~Q55)
// ══════════════════════════════════════════════════

{id:31,part:'B',chapter:'선형대수',type:'mcq',
 q:'행렬 역행렬이 존재하지 않는 조건은?',
 options:['정사각 행렬이 아닐 때','det(A)=0 (특이 행렬)','대각 행렬일 때','원소가 실수일 때'],
 answer:1,
 exp:'det(A)=0 → 특이(singular) 행렬 → 역행렬 없음. 선형 독립이 아닌 행/열 존재 = 정보 손실.'},

{id:32,part:'B',chapter:'선형대수',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
A = np.array([[2,0],[0,3]])
print(np.linalg.det(A))`,
 answer:'6.0',
 exp:'대각행렬의 행렬식 = 대각원소의 곱 = 2×3 = 6.0.'},

{id:33,part:'B',chapter:'선형대수',type:'short',
 q:'PCA에서 고유벡터(Eigenvector)와 고유값(Eigenvalue)은 각각 무엇을 의미하나요?',
 answer:'고유벡터: 주성분 방향(데이터가 가장 많이 퍼진 방향). 고유값: 해당 방향의 분산량(설명력 크기).',
 exp:'고유값이 클수록 해당 주성분이 분산을 많이 설명. 누적 설명 분산 비율로 몇 개 선택할지 결정.'},

{id:34,part:'B',chapter:'선형대수',type:'mcq',
 q:'Attention에서 내적을 √dₖ로 나누는 이유는?',
 options:['계산 속도 향상','dₖ 클수록 내적 분산↑ → softmax 포화(기울기≈0) 방지','차원 통일','메모리 절약'],
 answer:1,
 exp:'√dₖ로 나누면 내적 분산=1. softmax가 극단값 없이 부드럽게 분포 → 기울기 소실 방지.'},

{id:35,part:'B',chapter:'미적분',type:'mcq',
 q:'역전파(Backpropagation)의 수학적 기반은?',
 options:['테일러 전개','연쇄 법칙(Chain Rule)','라그랑주 승수법','푸리에 변환'],
 answer:1,
 exp:'Chain Rule: df/dx = df/dg · dg/dx. 출력에서 입력 방향으로 기울기를 역방향 전파.'},

{id:36,part:'B',chapter:'미적분',type:'short',
 q:'학습률(LR)이 너무 크거나 너무 작을 때 각각 어떤 문제가 발생하나요?',
 answer:'너무 크면: 발산(overshooting), 손실이 오히려 증가 또는 진동. 너무 작으면: 수렴 매우 느림, 안장점/지역 최솟값에 갇힐 수 있음.',
 exp:'해결: Cosine Annealing, Warmup, Adam 적응적 LR.'},

{id:37,part:'B',chapter:'확률통계',type:'mcq',
 q:'Cross-Entropy Loss 최소화와 수학적으로 동치인 것은?',
 options:['KL Divergence 최소화','MSE 최소화','Accuracy 최대화','편향 최소화'],
 answer:0,
 exp:'H(p,q) = H(p) + D_KL(P‖Q). H(p) 상수 → CE 최소화 = KL 최소화 = MLE 최대화.'},

{id:38,part:'B',chapter:'확률통계',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
def sigmoid(x): return 1/(1+np.exp(-x))
x = 0.0
s = sigmoid(x)
print(f"{s:.4f}")
print(f"{s*(1-s):.4f}")`,
 answer:'0.5000\n0.2500',
 exp:'sigmoid(0)=0.5. 도함수=σ(1-σ)=0.5×0.5=0.25. 최대 기울기=0.25 → Vanishing Gradient 원인.'},

{id:39,part:'B',chapter:'선형대수',type:'code',
 q:'shape (5,3) 행렬 X에서 각 행벡터를 L2 정규화(단위 벡터화)한 뒤 (5,5) 코사인 유사도 행렬을 계산하는 코드를 작성하세요.',
 hint:'np.linalg.norm(keepdims=True), X_norm @ X_norm.T 사용',
 answer:`import numpy as np
X = np.random.randn(5, 3)
norms = np.linalg.norm(X, axis=1, keepdims=True)
X_norm = X / norms
sim = X_norm @ X_norm.T  # (5,5)
print(sim.shape)`,
 keywords:['norm','keepdims','@'],
 exp:'L2 정규화 후 내적 = 코사인 유사도. keepdims=True로 브로드캐스팅 유지.'},

{id:40,part:'B',chapter:'미적분',type:'mcq',
 q:'Adam의 β₁, β₂ 기본값(default)과 의미는?',
 options:['β₁=0.5, β₂=0.5','β₁=0.9, β₂=0.999 — 1차·2차 모멘트 지수이동평균 비율','β₁=1.0, β₂=0.0','β₁=0.01, β₂=0.01'],
 answer:1,
 exp:'β₁=0.9: 방향(관성) 90% 유지. β₂=0.999: 적응적 LR 99.9% 유지. ε=1e-8 분모 안정화.'},

{id:41,part:'B',chapter:'선형대수',type:'short',
 q:'L1(Lasso)과 L2(Ridge) 정규화의 차이와 각각 적합한 상황을 설명하세요.',
 answer:'L1: 가중치를 정확히 0으로 만들어 희소 모델(피처 선택 효과). L2: 가중치를 고르게 작게 만듦. 대부분 피처가 중요할 때. ElasticNet=L1+L2 결합.',
 exp:'기하학적: L1은 마름모(꼭짓점 접촉→희소), L2는 구형(부드럽게 접촉→비희소).'},

{id:42,part:'B',chapter:'확률통계',type:'mcq',
 q:'베이즈 정리에서 P(A)를 무엇이라 부르나요?',
 options:['우도(Likelihood)','사전 확률(Prior)','사후 확률(Posterior)','증거(Evidence)'],
 answer:1,
 exp:'Prior P(A): 관측 전 믿음. Likelihood P(B|A): 관측 가능성. Posterior P(A|B): 관측 후 갱신. MAP = Prior 정규화 = L2와 동치.'},

{id:43,part:'B',chapter:'선형대수',type:'code',
 q:'numpy로 PCA를 직접 구현하세요. (100,10) 데이터를 2차원으로 압축.',
 hint:'평균 제거 → 공분산 행렬 → 고유값 분해 → 상위 k개 투영',
 answer:`import numpy as np
def pca(X, k):
    X = X - X.mean(axis=0)
    cov = X.T @ X / (len(X)-1)
    eigval, eigvec = np.linalg.eigh(cov)
    idx = np.argsort(eigval)[::-1]
    return X @ eigvec[:, idx[:k]]

X = np.random.randn(100, 10)
X_2d = pca(X, 2)
print(X_2d.shape)  # (100, 2)`,
 keywords:['mean','eigh','argsort','@'],
 exp:'eigh: 대칭 행렬 고유값 분해(eig보다 안정적). 내림차순 정렬 후 상위 k개 고유벡터로 투영.'},

{id:44,part:'B',chapter:'선형대수',type:'mcq',
 q:'SVD(특이값 분해)의 주요 응용이 아닌 것은?',
 options:['이미지 압축(저랭크 근사)','추천 시스템(Matrix Factorization)','PCA 계산','시계열 이상 탐지'],
 answer:3,
 exp:'SVD: 이미지 압축, 협업 필터링, PCA(내부적으로 SVD 사용), LSA. 시계열 이상 탐지는 LSTM, Isolation Forest 등이 주로 사용.'},

{id:45,part:'B',chapter:'확률통계',type:'code',
 q:'KL Divergence D_KL(P‖Q)를 numpy로 계산하는 함수를 완성하세요.',
 hint:'np.clip으로 0 나누기 방지, np.sum(p * np.log(p/q))',
 answer:`import numpy as np
def kl_divergence(p, q):
    p = np.clip(p, 1e-9, 1)
    q = np.clip(q, 1e-9, 1)
    return np.sum(p * np.log(p / q))`,
 keywords:['clip','log','sum'],
 exp:'KL Divergence는 비대칭. VAE 잠재 공간 정규화, RLHF KL 페널티에 사용.'},

{id:46,part:'B',chapter:'선형대수',type:'mcq',
 q:'행렬 곱 AB가 정의되려면?',
 options:['A와 B shape이 완전히 같아야 함','A의 열 수 = B의 행 수','둘 다 정사각 행렬','A의 행 수 = B의 열 수'],
 answer:1,
 exp:'(m×k)×(k×n)=(m×n). A의 열(k)과 B의 행(k)이 일치해야 내적 계산 가능.'},

{id:47,part:'B',chapter:'미적분',type:'short',
 q:'Momentum SGD가 일반 SGD보다 빠르게 수렴하는 이유를 설명하세요.',
 answer:'이전 기울기 방향을 관성으로 누적. 평탄한 구간에서 가속, 진동 감소. v=βv+(1-β)g. 좁고 긴 손실 곡면에서 특히 효과적.',
 exp:'β=0.9면 이전 기울기 가중치 90%. 안장점(saddle point) 탈출에도 도움.'},

{id:48,part:'B',chapter:'확률통계',type:'mcq',
 q:'정규분포 68-95-99.7 규칙의 의미는?',
 options:['전체 데이터의 68%가 평균','μ±σ 내 68%, μ±2σ 내 95%, μ±3σ 내 99.7%','이상치 제거 기준','p-value 기준'],
 answer:1,
 exp:'경험 법칙. |Z|>3 → 이상치(0.3%). 가우시안 분포 가정에서 이상치 탐지 기준으로 사용.'},

{id:49,part:'B',chapter:'선형대수',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
a = np.array([3.0, 4.0])
print(np.linalg.norm(a))`,
 answer:'5.0',
 exp:'L2 norm = √(3²+4²) = √25 = 5.0. 피타고라스 정리.'},

{id:50,part:'B',chapter:'미적분',type:'mcq',
 q:'안장점(Saddle Point)에서의 문제와 해결책은?',
 options:['수렴이 너무 빠름','일부 방향은 최솟값, 일부는 최댓값 → 기울기=0이지만 최솟값 아님. Momentum, Adam, SGD 노이즈로 탈출','지역 최솟값과 동일','배치 크기 증가'],
 answer:1,
 exp:'고차원에서 안장점이 지역 최솟값보다 훨씬 많음. SGD 노이즈가 오히려 탈출에 도움. Adam의 2차 모멘트도 방향 제어.'},

{id:51,part:'B',chapter:'확률통계',type:'short',
 q:'딥러닝에서 가중치를 모두 0으로 초기화하면 안 되는 이유는?',
 answer:'대칭성(Symmetry) 문제: 모든 뉴런이 동일한 기울기로 업데이트 → 여러 뉴런이 있어도 의미 없이 동일하게 작동. 모델 표현력 완전 손실.',
 exp:'해결: Xavier(sigmoid/tanh) N(0,1/n), He(ReLU) N(0,2/n) 랜덤 초기화로 대칭성 파괴.'},

{id:52,part:'B',chapter:'확률통계',type:'code',
 q:'수치 안정성을 고려한 softmax 함수를 numpy로 구현하세요. 배치 입력 (N,C) 지원.',
 hint:'max를 빼면 exp() 오버플로우 방지, keepdims=True',
 answer:`import numpy as np
def softmax(x):
    x = x - np.max(x, axis=-1, keepdims=True)
    e = np.exp(x)
    return e / e.sum(axis=-1, keepdims=True)`,
 keywords:['max','keepdims','exp','sum'],
 exp:'최댓값을 빼도 softmax 결과 동일(분자분모 동일 상수 곱). exp(x-max)≤1 → 오버플로우 없음.'},

{id:53,part:'B',chapter:'미적분',type:'mcq',
 q:'Gradient Clipping이 필요한 주된 상황은?',
 options:['Vanishing Gradient','Exploding Gradient — 특히 RNN 긴 시퀀스','배치 크기 과대','학습률 과소'],
 answer:1,
 exp:'RNN에서 BPTT(Backprop Through Time)로 기울기 폭발 가능. clip_grad_norm_(params, 1.0)으로 L2 노름 제한. Transformer에도 표준 적용.'},

{id:54,part:'B',chapter:'확률통계',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
p = np.array([0.5, 0.5])
H = -np.sum(p * np.log2(p))
print(f"{H:.1f}")`,
 answer:'1.0',
 exp:'균등분포 엔트로피가 최대. 동전 던지기 엔트로피=1 bit. 불확실성 최고 상태.'},

{id:55,part:'B',chapter:'선형대수',type:'mcq',
 q:'(AB)ᵀ = ?',
 options:['AᵀBᵀ','BᵀAᵀ','AB','BA'],
 answer:1,
 exp:'전치의 곱셈 역순 법칙. 역전파에서 dL/dA = dL/dC · Bᵀ 형태로 등장.'},

// ══════════════════════════════════════════════════
//  PART C — ML 기초 (Q56~Q75)
// ══════════════════════════════════════════════════

{id:56,part:'C',chapter:'ML기초',type:'mcq',
 q:'Random Forest가 단일 Decision Tree보다 과적합에 강한 이유는?',
 options:['더 많은 데이터 사용','배깅(Bagging): 독립적 트리 평균으로 분산 감소','더 깊은 트리','손실 함수 차이'],
 answer:1,
 exp:'부트스트랩 샘플링으로 독립 트리 → 평균/다수결. 각 트리는 고분산이지만 평균 내면 분산↓. max_features로 열도 랜덤 샘플링.'},

{id:57,part:'C',chapter:'ML기초',type:'short',
 q:'Stratified K-Fold가 일반 K-Fold보다 나은 이유는?',
 answer:'각 폴드에 클래스 비율 유지 → 불균형 데이터에서도 각 폴드가 전체 분포를 대표. 일반 K-Fold는 특정 클래스가 없는 폴드 생성 가능.',
 exp:'불균형 데이터(암 진단 등)에서 Stratified K-Fold 필수.'},

{id:58,part:'C',chapter:'ML기초',type:'mcq',
 q:'SVM에서 서포트 벡터(Support Vector)란?',
 options:['모든 훈련 샘플','결정 경계에서 가장 가까운 샘플들 — 이 점들만 모델에 영향','무작위 샘플','클래스 중심점'],
 answer:1,
 exp:'마진(두 클래스 경계 거리) 최대화가 SVM의 목표. 서포트 벡터만 모델에 영향 → 메모리 효율적.'},

{id:59,part:'C',chapter:'ML기초',type:'code',
 q:'sklearn으로 breast_cancer 데이터를 로드하고 RandomForest로 학습 후 테스트 AUC-ROC를 출력하세요.',
 hint:'load_breast_cancer, train_test_split, predict_proba 사용',
 answer:`from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score
X, y = load_breast_cancer(return_X_y=True)
X_tr,X_te,y_tr,y_te = train_test_split(X,y,test_size=0.2,random_state=42)
model = RandomForestClassifier(n_estimators=100,random_state=42)
model.fit(X_tr,y_tr)
prob = model.predict_proba(X_te)[:,1]
print(f"AUC: {roc_auc_score(y_te,prob):.4f}")`,
 keywords:['load_breast_cancer','train_test_split','predict_proba','roc_auc_score'],
 exp:'predict_proba()[:,1]: 양성 클래스 확률. roc_auc_score는 임계값 무관 평가.'},

{id:60,part:'C',chapter:'ML기초',type:'mcq',
 q:'특성 중요도(Feature Importance)를 직접 제공하지 않는 모델은?',
 options:['Random Forest','XGBoost','Logistic Regression','KNN'],
 answer:3,
 exp:'KNN: 인스턴스 기반, 파라미터 없음 → 특성 중요도 없음. SHAP으로 대리 설명. 트리 계열은 분할 기여도로 제공.'},

{id:61,part:'C',chapter:'ML기초',type:'short',
 q:'StandardScaler와 MinMaxScaler의 차이와 각각 적합한 상황은?',
 answer:'StandardScaler: 평균0,분산1. 이상치 덜 민감. 대부분 ML 알고리즘. MinMaxScaler: [0,1] 범위. 이상치 민감. 이미지(픽셀 0~255)나 범위가 중요한 경우.',
 exp:'SVM, KNN은 거리 기반이라 스케일링 필수. 신경망엔 StandardScaler 또는 BatchNorm.'},

{id:62,part:'C',chapter:'ML기초',type:'output',
 q:'TP=80, FP=20, FN=10, TN=90일 때 Precision과 Recall을 계산하세요.',
 code:`TP=80, FP=20, FN=10, TN=90`,
 answer:'Precision = 80/(80+20) = 0.8\nRecall = 80/(80+10) ≈ 0.8889',
 exp:'Precision=TP/(TP+FP)=80/100=0.8. Recall=TP/(TP+FN)=80/90≈0.8889. F1=2×0.8×0.8889/(0.8+0.8889)≈0.842.'},

{id:63,part:'C',chapter:'ML기초',type:'mcq',
 q:'Gradient Boosting에서 각 트리가 집중하는 것은?',
 options:['이전 모델이 잘 맞춘 샘플','이전 모델의 잔차(residual) — 순차적 오차 보정으로 편향 감소','무작위 샘플','고분산 샘플'],
 answer:1,
 exp:'GBM: 이전 모델의 잔차를 다음 트리가 학습. AdaBoost: 틀린 샘플 가중치 증가. 순차 오차 보정 = 편향 감소.'},

{id:64,part:'C',chapter:'ML기초',type:'code',
 q:'KMeans로 iris를 3군집 분류하고 실루엣 스코어를 출력하세요.',
 hint:'KMeans(n_clusters=3), silhouette_score 사용',
 answer:`from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.datasets import load_iris
X,_ = load_iris(return_X_y=True)
km = KMeans(n_clusters=3, random_state=42, n_init=10)
labels = km.fit_predict(X)
print(f"Silhouette: {silhouette_score(X, labels):.4f}")`,
 keywords:['KMeans','silhouette_score','fit_predict'],
 exp:'실루엣: -1~1. 1에 가까울수록 잘 분리. Elbow Method와 함께 최적 k 선택.'},

{id:65,part:'C',chapter:'ML기초',type:'mcq',
 q:'SMOTE가 해결하는 문제는?',
 options:['과적합','불균형 데이터 — 소수 클래스 합성 샘플로 보충','차원의 저주','결측치'],
 answer:1,
 exp:'SMOTE: 소수 클래스 K-이웃 사이 선형 보간으로 합성 데이터 생성. 단순 복제보다 다양성 확보.'},

{id:66,part:'C',chapter:'ML기초',type:'short',
 q:'암 진단 모델 (암=양성 1%, 정상=음성 99%)에서 가장 중요한 평가 지표와 이유는?',
 answer:'Recall(재현율). 암을 놓치는 것(FN)이 가장 위험. Accuracy는 전부 음성 예측해도 99%로 무의미.',
 exp:'의료: Recall 중시. 스팸: Precision 중시(정상 메일 스팸 분류 방지). 임계값 조정으로 균형.'},

{id:67,part:'C',chapter:'ML기초',type:'mcq',
 q:'Bagging, Boosting, Stacking의 핵심 차이는?',
 options:['모델 종류 차이','Bagging: 병렬·동종·분산↓. Boosting: 순차·동종·편향↓. Stacking: 이종 베이스 모델 + Meta Learner','데이터 크기 차이','손실 함수 차이'],
 answer:1,
 exp:'Stacking: 여러 이종 모델(RF+XGB+LR)의 예측값을 피처로 메타 모델 학습. 두 장점 결합.'},

{id:68,part:'C',chapter:'ML기초',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`from sklearn.preprocessing import StandardScaler
import numpy as np
X = np.array([[1.],[2.],[3.],[4.],[5.]])
sc = StandardScaler()
Xs = sc.fit_transform(X)
print(f"{Xs[2][0]:.4f}")`,
 answer:'0.0000',
 exp:'mean=3, std=√2≈1.414. (3-3)/1.414=0. 평균값은 정규화 후 항상 0.'},

{id:69,part:'C',chapter:'ML기초',type:'mcq',
 q:'Early Stopping의 patience 파라미터 의미는?',
 options:['최대 에폭 수','검증 손실 개선 없이 기다리는 에폭 수','학습률 감소 주기','배치 크기'],
 answer:1,
 exp:'patience=5: 5에폭 연속 개선 없으면 중단. 너무 작으면 조기 중단(underfitting), 너무 크면 과적합. restore_best_weights=True로 최선 모델 복원.'},

{id:70,part:'C',chapter:'ML기초',type:'code',
 q:'sklearn Pipeline으로 StandardScaler → RandomForest 파이프라인을 만들고 5-fold CV AUC를 계산하세요.',
 hint:'Pipeline, cross_val_score 사용',
 answer:`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.datasets import load_breast_cancer
X,y = load_breast_cancer(return_X_y=True)
pipe = Pipeline([('sc',StandardScaler()),('clf',RandomForestClassifier(random_state=42))])
scores = cross_val_score(pipe,X,y,cv=5,scoring='roc_auc')
print(f"AUC: {scores.mean():.4f} ± {scores.std():.4f}")`,
 keywords:['Pipeline','cross_val_score','StandardScaler'],
 exp:'Pipeline이 데이터 누수 방지. 각 폴드마다 scaler.fit()이 독립적으로 실행.'},

{id:71,part:'C',chapter:'ML기초',type:'mcq',
 q:'차원의 저주(Curse of Dimensionality)란?',
 options:['데이터 너무 많음','차원 증가 → 데이터 희소성↑, 거리 의미 손실, 필요 데이터 기하급수 증가','모델 복잡도 문제','계산 속도 문제'],
 answer:1,
 exp:'100차원에서 유클리드 거리가 모두 비슷해짐. 해결: PCA, Feature Selection, 도메인 지식.'},

{id:72,part:'C',chapter:'ML기초',type:'short',
 q:'PR 곡선(Precision-Recall)이 ROC 곡선보다 불균형 데이터에서 더 유용한 이유는?',
 answer:'ROC는 FPR 분모에 TN이 많으므로 불균형에서 과대평가. PR은 양성 클래스만 평가 → 소수 클래스 모델 성능을 더 정직하게 보여줌.',
 exp:'불균형 99%:1%에서 ROC AUC는 0.99여도 PR AUC는 낮을 수 있음.'},

{id:73,part:'C',chapter:'ML기초',type:'mcq',
 q:'Bayesian Optimization이 Grid Search보다 효율적인 이유는?',
 options:['병렬 실행 가능','이전 탐색 결과 기반 유망 구간 집중 탐색 (Gaussian Process/TPE)','전체 공간 탐색','구현 간단'],
 answer:1,
 exp:'Grid Search: 지수적 조합. Random Search: 무작위. Bayesian(Optuna): 이전 결과로 다음 탐색 위치 결정. 같은 횟수로 더 좋은 하이퍼파라미터 발견.'},

{id:74,part:'C',chapter:'ML기초',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`from sklearn.metrics import f1_score
y_true = [0,1,1,0,1,0,1,1]
y_pred = [0,1,0,0,1,1,1,1]
print(f"{f1_score(y_true, y_pred):.4f}")`,
 answer:'0.8000',
 exp:'TP=4, FP=1, FN=1. P=4/5=0.8, R=4/5=0.8. F1=0.8.'},

{id:75,part:'C',chapter:'ML기초',type:'mcq',
 q:'Target Encoding의 위험성은?',
 options:['계산이 느림','Target Leakage — 타겟 정보가 피처에 포함돼 검증 성능 과대평가','메모리 문제','범주형 전용'],
 answer:1,
 exp:'훈련 데이터에서 카테고리별 타겟 평균 → 타겟 정보 포함. 해결: Leave-One-Out 인코딩, K-Fold 내부 CV.'},

// ══════════════════════════════════════════════════
//  PART D — 딥러닝 핵심 (Q76~Q100)
// ══════════════════════════════════════════════════

{id:76,part:'D',chapter:'딥러닝',type:'mcq',
 q:'BatchNorm과 LayerNorm의 핵심 차이는?',
 options:['속도만 다름','BN: 배치 차원 정규화(CNN/MLP, 배치 크기 의존). LN: 피처 차원 정규화(Transformer, 배치 독립)','LN이 항상 좋음','BN은 추론 불가'],
 answer:1,
 exp:'BN: 배치 통계. 작은 배치에서 불안정. LN: 샘플별 통계. 가변 시퀀스 Transformer 표준.'},

{id:77,part:'D',chapter:'딥러닝',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import torch.nn as nn
model = nn.Sequential(nn.Linear(10,20), nn.Linear(20,5))
total = sum(p.numel() for p in model.parameters())
print(total)`,
 answer:'325',
 exp:'Linear(10→20): 10×20+20=220. Linear(20→5): 20×5+5=105. 합=325.'},

{id:78,part:'D',chapter:'딥러닝',type:'mcq',
 q:'model.train()과 model.eval()의 핵심 차이는?',
 options:['속도만 다름','train(): Dropout 활성, BN 통계 업데이트. eval(): Dropout 비활성, BN 저장 통계 사용','그래디언트 계산 여부','배치 크기'],
 answer:1,
 exp:'torch.no_grad()는 그래디언트 계산 비활성. model.eval()은 추론 모드 전환. 둘 다 추론 시 필요.'},

{id:79,part:'D',chapter:'딥러닝',type:'code',
 q:'PyTorch Linear(128→64)→ReLU→Linear(64→10) 모델의 총 파라미터 수를 출력하세요.',
 hint:'sum(p.numel() for p in model.parameters())',
 answer:`import torch.nn as nn
model = nn.Sequential(nn.Linear(128,64), nn.ReLU(), nn.Linear(64,10))
total = sum(p.numel() for p in model.parameters())
print(f"총 파라미터: {total}")
# 128*64+64 + 64*10+10 = 8192+64+640+10 = 8906`,
 keywords:['numel','parameters','sum'],
 exp:'ReLU는 파라미터 없음. Linear(128→64)=8256, Linear(64→10)=650. 합=8906.'},

{id:80,part:'D',chapter:'딥러닝',type:'mcq',
 q:'Dying ReLU 문제와 해결책은?',
 options:['ReLU 계산이 느림','음수 입력 기울기=0 → 뉴런 영구 비활성화. 해결: Leaky ReLU(α=0.01), ELU, He 초기화, 작은 LR','범위가 0~1 초과','BN 필요'],
 answer:1,
 exp:'ReLU(x<0)=0, 미분=0 → 음수 구간 뉴런 업데이트 불가. Leaky ReLU: 음수도 작은 기울기 유지.'},

{id:81,part:'D',chapter:'딥러닝',type:'short',
 q:'torch.no_grad()를 사용하는 이유와 사용 시점은?',
 answer:'추론/검증 시 그래디언트 계산 그래프 미구성 → 메모리 절약(약 50%) + 속도 향상. 파라미터 업데이트 없는 평가/테스트 단계에서 model.eval()과 함께 사용.',
 exp:'학습 루프: optimizer.zero_grad() → forward → loss.backward() → optimizer.step(). 평가 루프: torch.no_grad() + model.eval()'},

{id:82,part:'D',chapter:'딥러닝',type:'mcq',
 q:'Vanishing Gradient 해결 기법 3가지는?',
 options:['Sigmoid, Tanh, ReLU','ReLU 계열 활성화 + Batch Normalization + Residual Connection','더 많은 데이터, 큰 배치, 높은 LR','Dropout, Weight Decay, Early Stopping'],
 answer:1,
 exp:'ReLU: 양수 기울기=1. BN: 활성화 분포 안정. Skip Connection: 기울기 직통로. 추가: LSTM(시퀀스), Gradient Clipping.'},

{id:83,part:'D',chapter:'딥러닝',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import torch
import torch.nn as nn
x = torch.tensor([-2.,-1.,0.,1.,2.])
print(nn.ReLU()(x))`,
 answer:'tensor([0., 0., 0., 1., 2.])',
 exp:'ReLU(x) = max(0,x). 음수=0, 양수=그대로.'},

{id:84,part:'D',chapter:'딥러닝',type:'code',
 q:'PyTorch로 이진 분류 모델(입력4, 배치8)을 만들고 BCELoss로 단일 배치 손실을 계산하세요.',
 hint:'nn.Sigmoid(), nn.BCELoss() 사용',
 answer:`import torch, torch.nn as nn
model = nn.Sequential(nn.Linear(4,8),nn.ReLU(),nn.Linear(8,1),nn.Sigmoid())
criterion = nn.BCELoss()
x = torch.randn(8,4)
y = torch.randint(0,2,(8,1)).float()
loss = criterion(model(x), y)
print(f"Loss: {loss.item():.4f}")`,
 keywords:['BCELoss','Sigmoid','randn'],
 exp:'Sigmoid 출력(0~1)+BCELoss. 더 안정적인 방법: Sigmoid 제거 + BCEWithLogitsLoss.'},

{id:85,part:'D',chapter:'딥러닝',type:'mcq',
 q:'AdamW와 Adam의 차이는?',
 options:['학습률 차이','AdamW: Weight Decay를 Adam 업데이트와 분리 적용 → 실질적 L2 정규화 효과','AdamW가 더 빠름','파라미터 수 차이'],
 answer:1,
 exp:'Adam에서 L2는 그래디언트에 더해져 적응적 LR로 나뉨 → 정규화 효과 약화. AdamW: 파라미터 업데이트 별개로 weight decay 직접 적용. Transformer 표준.'},

{id:86,part:'D',chapter:'딥러닝',type:'short',
 q:'배치 크기(Batch Size)가 학습에 미치는 영향을 설명하세요.',
 answer:'작은 배치: 노이즈 많아 일반화↑, 수렴 느림. 큰 배치: 정확한 기울기, 빠른 학습, 날카로운 최솟값(sharp minima) → 일반화↓. LR 스케일링 필요.',
 exp:'Linear Scaling Rule: 배치 크기 k배 → LR k배. Warmup 함께 사용.'},

{id:87,part:'D',chapter:'딥러닝',type:'mcq',
 q:'Dropout 추론 시 동작은?',
 options:['동일하게 적용','완전 비활성화, 모든 뉴런 사용. Inverted Dropout: 학습 시 출력을 1/(1-p)로 스케일 → 추론 시 추가 처리 불필요','50% 적용','무작위 적용'],
 answer:1,
 exp:'model.eval() 호출하면 자동으로 Dropout 비활성화. PyTorch Inverted Dropout으로 추론 시 별도 스케일링 없음.'},

{id:88,part:'D',chapter:'딥러닝',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import torch
a = torch.tensor([1.,2.,3.], requires_grad=True)
b = (a**2).sum()
b.backward()
print(a.grad)`,
 answer:'tensor([2., 4., 6.])',
 exp:'b=a₁²+a₂²+a₃². ∂b/∂aᵢ=2aᵢ → [2,4,6].'},

{id:89,part:'D',chapter:'딥러닝',type:'mcq',
 q:'Cosine Annealing LR Scheduler의 장점은?',
 options:['LR 고정','코사인 함수로 주기적 감소-증가 → 지역 최솟값 탈출, 일반화 향상','항상 증가','일정 간격 감소'],
 answer:1,
 exp:'SGDR(Warm Restart): 코사인 감소 후 재시작. 최신 LLM: Warmup + Cosine Decay 조합 표준.'},

{id:90,part:'D',chapter:'딥러닝',type:'code',
 q:'PyTorch 모델 가중치를 저장하고 다시 불러오는 코드를 작성하세요.',
 hint:'torch.save(model.state_dict()), load_state_dict() 사용',
 answer:`import torch, torch.nn as nn
model = nn.Linear(10, 5)
torch.save(model.state_dict(), 'model.pth')
new_model = nn.Linear(10, 5)
new_model.load_state_dict(torch.load('model.pth'))
new_model.eval()`,
 keywords:['state_dict','torch.save','load_state_dict'],
 exp:'state_dict(): 파라미터 딕셔너리. 구조는 코드로, 가중치만 파일로 저장.'},

{id:91,part:'D',chapter:'딥러닝',type:'mcq',
 q:'He(Kaiming) 초기화가 ReLU에 적합한 이유는?',
 options:['계산이 빠름','ReLU는 음수=0으로 분산 절반 감소 → He: Var(W)=2/n으로 보상. Xavier: 1/n이라 부족','메모리 절약','수식이 단순'],
 answer:1,
 exp:'Xavier: sigmoid/tanh 가정(대칭 미분). ReLU는 절반이 0 → 분산 절반 → He는 2/n으로 2배 크게.'},

{id:92,part:'D',chapter:'딥러닝',type:'short',
 q:'PyTorch에서 Gradient Clipping을 적용하는 코드 한 줄을 작성하세요. (최대 노름=1.0)',
 answer:'torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)',
 exp:'optimizer.step() 전에 적용. 전체 그래디언트 L2 노름이 max_norm 초과 시 스케일링.'},

{id:93,part:'D',chapter:'딥러닝',type:'mcq',
 q:'optimizer.zero_grad()를 매 배치마다 호출해야 하는 이유는?',
 options:['속도 향상','PyTorch는 기본적으로 기울기 누적 → 이전 배치 기울기 초기화 필요','메모리 절약','정확도 향상'],
 answer:1,
 exp:'grad += 방식으로 누적. Gradient Accumulation에서는 의도적으로 여러 배치 누적 후 step().'},

{id:94,part:'D',chapter:'딥러닝',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import torch, torch.nn as nn
x = torch.tensor([[1.,2.,3.],[4.,5.,6.]])
bn = nn.BatchNorm1d(3)
print(bn(x).shape)`,
 answer:'torch.Size([2, 3])',
 exp:'BatchNorm1d: 입력 shape 유지. 배치(2)×특성(3). 각 특성(열)별 배치 내 정규화.'},

{id:95,part:'D',chapter:'딥러닝',type:'mcq',
 q:'전이학습에서 Feature Extraction과 Fine-tuning의 차이는?',
 options:['차이 없음','Feature Extraction: 사전학습 레이어 동결+헤드만 학습. Fine-tuning: 사전학습 레이어 일부도 학습','Fine-tuning 항상 느림','Feature Extraction 항상 좋음'],
 answer:1,
 exp:'데이터 적을 때: Feature Extraction. 데이터 충분: Fine-tuning (낮은 레이어 동결, 상위 레이어부터 낮은 LR).'},

{id:96,part:'D',chapter:'딥러닝',type:'code',
 q:'PyTorch DataLoader를 사용해 (200,10) 랜덤 데이터의 배치 크기 32, shuffle=True DataLoader를 만들고 첫 배치 shape를 출력하세요.',
 hint:'TensorDataset, DataLoader 사용',
 answer:`import torch
from torch.utils.data import TensorDataset, DataLoader
X = torch.randn(200, 10)
y = torch.randint(0, 2, (200,))
ds = TensorDataset(X, y)
loader = DataLoader(ds, batch_size=32, shuffle=True)
xb, yb = next(iter(loader))
print(xb.shape, yb.shape)
# torch.Size([32, 10]) torch.Size([32])`,
 keywords:['TensorDataset','DataLoader','next','iter'],
 exp:'DataLoader: 자동 배치, 셔플, 멀티프로세싱 지원. num_workers로 병렬 데이터 로딩.'},

{id:97,part:'D',chapter:'딥러닝',type:'mcq',
 q:'Label Smoothing을 사용하는 이유는?',
 options:['학습 속도 향상','원-핫 레이블(0/1)의 과신(overconfidence) 방지 → 일반화 향상. 정답=0.9, 나머지=0.1/C로 분포','배치 정규화 대체','메모리 절약'],
 answer:1,
 exp:'CE Loss + Label Smoothing: 모델이 100% 확신하지 않도록. Calibration 향상. Transformer 분류에서 표준 기법.'},

{id:98,part:'D',chapter:'딥러닝',type:'short',
 q:'Mixed Precision Training(fp16/bf16)의 장점과 주의사항은?',
 answer:'장점: GPU 메모리 절반, 연산 속도 2배(Tensor Core 활용). 주의: 수치 불안정(오버플로우/언더플로우). GradScaler로 스케일링 필요. bf16은 더 안정적(범위↑, 정밀도↓).',
 exp:'torch.cuda.amp.autocast() + GradScaler 조합. BF16은 A100, H100에서 지원. LLM 학습 표준.'},

{id:99,part:'D',chapter:'딥러닝',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import torch
x = torch.tensor([[-1.,0.,1.]])
gelu = torch.nn.GELU()
print(gelu(x).round(decimals=4))`,
 answer:'tensor([[-0.1587,  0.0000,  0.8413]])',
 exp:'GELU(x) = x·Φ(x). x=-1: -1×Φ(-1)=-0.1587. x=0: 0. x=1: 1×Φ(1)=0.8413. Transformer 표준 활성화.'},

{id:100,part:'D',chapter:'딥러닝',type:'mcq',
 q:'Gradient Checkpointing(Activation Checkpointing)의 목적은?',
 options:['학습 속도 향상','메모리 절약 — 중간 활성화를 저장하지 않고 역전파 시 재계산. 속도↓ but 메모리↓','정확도 향상','배치 크기 감소'],
 answer:1,
 exp:'Forward 시 활성화 저장 → 메모리↑. Checkpointing: 저장 안 하고 역전파 시 재계산 → 메모리 최대 1/√n. 대형 LLM 학습에 필수.'},

// ══════════════════════════════════════════════════
//  PART E·F·G·H·I — 종합 고급 (Q101~Q150)
// ══════════════════════════════════════════════════

{id:101,part:'F',chapter:'Transformer',type:'mcq',
 q:'Self-Attention의 시간복잡도는?',
 options:['O(n)','O(n log n)','O(n²d)','O(nd)'],
 answer:2,
 exp:'n×n Attention 행렬: O(n²d). Flash Attention: IO-aware로 메모리 O(n²)→O(n). 속도 2~4배↑.'},

{id:102,part:'F',chapter:'Transformer',type:'short',
 q:'Positional Encoding이 필요한 이유를 설명하세요.',
 answer:'Self-Attention은 집합 연산 — 순서 정보 없음. sin/cos 함수로 위치 임베딩 추가. 없으면 단어 순서를 구분 못함.',
 exp:'최신: RoPE(LLaMA), ALiBi(긴 컨텍스트 외삽), 학습 가능한 위치 임베딩(BERT).'},

{id:103,part:'F',chapter:'Transformer',type:'mcq',
 q:'Causal (Masked) Attention이 필요한 이유는?',
 options:['속도 향상','언어 모델이 미래 토큰을 보지 못하게 — 자동회귀 생성의 학습 조건 유지','메모리 절약','정규화'],
 answer:1,
 exp:'하삼각 마스크로 미래 위치=-inf → softmax 후 0. BERT는 양방향이므로 마스크 없음.'},

{id:104,part:'F',chapter:'Transformer',type:'code',
 q:'Scaled Dot-Product Attention을 PyTorch로 구현하세요. Q/K/V shape: (B,T,D)',
 hint:'Q @ K.transpose(-2,-1) / sqrt(d_k), softmax, @ V',
 answer:`import torch, math
def attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = Q @ K.transpose(-2,-1) / math.sqrt(d_k)
    if mask is not None:
        scores = scores.masked_fill(mask==0, -1e9)
    return scores.softmax(dim=-1) @ V

Q=K=V=torch.randn(2,4,8)
out = attention(Q,K,V)
print(out.shape)  # torch.Size([2, 4, 8])`,
 keywords:['transpose','sqrt','softmax','masked_fill'],
 exp:'(2,4,8)@(2,8,4)=(2,4,4). /√8. softmax. @(2,4,8)=(2,4,8).'},

{id:105,part:'F',chapter:'Transformer',type:'mcq',
 q:'BERT와 GPT의 사전학습 방식 차이는?',
 options:['BERT 생성, GPT 분류','BERT: MLM(마스크 예측, 양방향). GPT: CLM(다음 토큰 예측, 단방향)','둘 다 동일','BERT가 더 큰 모델'],
 answer:1,
 exp:'BERT: 이해(분류/NER/QA). GPT: 생성(챗봇/요약/코드). 용도에 맞게 선택.'},

{id:106,part:'F',chapter:'Transformer',type:'short',
 q:'Multi-Head Attention에서 헤드 수를 늘리면 어떤 효과가 있나요?',
 answer:'여러 헤드가 다른 관점(구문, 의미, 위치 등) Attention 학습. 다양한 표현 서브스페이스 포착. 헤드당 dₖ=d_model/h라 총 계산량 유사.',
 exp:'BERT-Base: 12헤드. 어떤 헤드는 구문적 관계, 어떤 헤드는 장거리 의존성. h는 d_model의 약수여야 함.'},

{id:107,part:'F',chapter:'Transformer',type:'mcq',
 q:'Flash Attention의 핵심 아이디어는?',
 options:['더 작은 모델','IO-aware: SRAM에서 타일(tile) 단위 계산으로 HBM 읽기/쓰기 최소화. 메모리 O(n²)→O(n)','병렬 처리 증가','양자화'],
 answer:1,
 exp:'표준 Attention: n×n 행렬 전체 HBM 저장. Flash: 타일별 SRAM 처리 → IO 대폭 감소. 정확도 동일. Flash Attention 2/3에서 더 개선.'},

{id:108,part:'G',chapter:'LLM',type:'mcq',
 q:'LoRA에서 rank r을 줄이면?',
 options:['성능 향상','파라미터 수↓(속도↑, 메모리↓), 표현력↓ — 트레이드오프 파라미터','학습률 변화','배치 크기 변화'],
 answer:1,
 exp:'r=4: 극소 파라미터. r=64: 풀 파인튜닝에 근접. 일반적으로 r=8~16 균형. alpha=2r로 스케일.'},

{id:109,part:'G',chapter:'LLM',type:'short',
 q:'RLHF 파이프라인의 3단계를 설명하세요.',
 answer:'1. SFT: 고품질 데모로 지시 따르기 기본 학습. 2. RM 학습: 인간 선호 비교 데이터(A vs B)로 보상 모델 학습. 3. PPO: RM 피드백으로 LM 정책 최적화(KL 페널티 추가).',
 exp:'DPO는 RM 없이 선호 데이터로 직접 최적화. 더 단순하고 안정적.'},

{id:110,part:'G',chapter:'LLM',type:'mcq',
 q:'파인튜닝 vs RAG 선택 기준은?',
 options:['항상 파인튜닝','지식이 자주 변하면 RAG, 행동/스타일/형식 학습이면 파인튜닝. 둘 조합이 최선일 때도 많음','RAG 항상 비쌈','파인튜닝 항상 정확'],
 answer:1,
 exp:'RAG: 최신 정보, 출처 추적. 파인튜닝: 도메인 스타일, 특수 형식. 조합: RAG+LoRA.'},

{id:111,part:'G',chapter:'LLM',type:'mcq',
 q:'Chain-of-Thought(CoT) 프롬프팅의 핵심 효과는?',
 options:['응답 속도 향상','중간 추론 단계 생성 → 복잡한 수학/논리 문제 정확도↑','토큰 수 감소','파인튜닝 불필요'],
 answer:1,
 exp:'"단계별로 생각해" 한 문장으로 추론 능력 대폭 향상. Zero-shot CoT, Self-Consistency, Tree of Thought.'},

{id:112,part:'G',chapter:'LLM',type:'short',
 q:'Temperature와 Top-p 샘플링의 역할을 설명하세요.',
 answer:'Temperature: 분포 날카로움. T<1=보수적(결정론적), T>1=창의적. Top-p(nucleus): 누적 확률 p 이내 토큰만 샘플링. 창의성-일관성 균형.',
 exp:'코드 생성: T=0(greedy). 창의적 글쓰기: T=0.9, p=0.9. Temperature=0은 argmax와 동일.'},

{id:113,part:'G',chapter:'LLM',type:'mcq',
 q:'KV Cache가 LLM 추론에서 중요한 이유는?',
 options:['모델 파라미터 캐싱','생성된 토큰의 K,V 저장으로 재계산 방지 → 자동회귀를 O(n²)에서 O(n)으로 개선','배치 최적화','양자화'],
 answer:1,
 exp:'새 토큰마다 Q만 새로 계산. K,V는 변하지 않으므로 저장. PagedAttention(vLLM)으로 메모리 효율적 관리.'},

{id:114,part:'G',chapter:'LLM',type:'code',
 q:'HuggingFace로 GPT-2를 로드하고 텍스트를 생성하는 최소한의 코드를 작성하세요.',
 hint:'from_pretrained, generate, tokenizer.decode 사용',
 answer:`from transformers import GPT2LMHeadModel, GPT2Tokenizer
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')
model.eval()
inputs = tokenizer("Hello, AI", return_tensors='pt')
out = model.generate(**inputs, max_new_tokens=20, do_sample=False)
print(tokenizer.decode(out[0], skip_special_tokens=True))`,
 keywords:['from_pretrained','generate','decode'],
 exp:'do_sample=False: greedy decoding. do_sample=True+temperature로 확률적 샘플링.'},

{id:115,part:'G',chapter:'LLM',type:'mcq',
 q:'BPE 토크나이저의 핵심 아이디어는?',
 options:['단어 단위 분리','자주 등장하는 문자 쌍을 반복 병합하여 서브워드 어휘 구축 — OOV 문제 해결','글자 단위','공백 기준 분리'],
 answer:1,
 exp:'"low"→[l,o,w]→[lo,w]→[low]. 미등록 단어도 서브워드로 분해. GPT-2/3/4, LLaMA 표준.'},

{id:116,part:'H',chapter:'RAG',type:'mcq',
 q:'RAG에서 Reranking을 추가하는 이유는?',
 options:['속도 향상','1차 벡터 검색 결과를 Cross-Encoder로 재정렬 → 관련성 품질↑','비용 절감','임베딩 개선'],
 answer:1,
 exp:'Bi-Encoder(빠름): 독립 임베딩 후 유사도. Cross-Encoder(정확): 쿼리+문서 함께 처리. 100개 후보 → Cross-Encoder Top-5.'},

{id:117,part:'H',chapter:'RAG',type:'short',
 q:'Dense Retrieval과 BM25(Sparse)의 차이와 하이브리드 검색이 좋은 이유를 설명하세요.',
 answer:'Dense: 신경망 임베딩, 의미론적 유사도, 동의어 처리 강함. BM25: TF-IDF 기반 키워드 일치, 정확한 단어 매칭 강함. 하이브리드(RRF): 두 장점 결합 → 대부분 더 좋음.',
 exp:'RRF(Reciprocal Rank Fusion): 두 순위의 역수 합으로 최종 순위. 구현 간단, 효과적.'},

{id:118,part:'H',chapter:'RAG',type:'mcq',
 q:'HyDE(Hypothetical Document Embeddings)의 아이디어는?',
 options:['문서 가상 삭제','LLM이 가상 답변 문서 생성 → 그 임베딩으로 실제 문서 검색. 쿼리-문서 분포 차이 해소','임베딩 크기 확장','청킹 방식 변경'],
 answer:1,
 exp:'쿼리(짧음)-문서(긺) 임베딩 분포가 다름. HyDE: 쿼리→LLM→가상 답변→임베딩→실제 문서 검색. 문서-문서 비교.'},

{id:119,part:'H',chapter:'RAG',type:'code',
 q:'FAISS로 100개 128차원 벡터를 인덱싱하고 1개 쿼리의 Top-3를 검색하세요.',
 hint:'faiss.IndexFlatL2, index.add(), index.search() 사용',
 answer:`import faiss, numpy as np
dim = 128
vecs = np.random.rand(100, dim).astype('float32')
q    = np.random.rand(1, dim).astype('float32')
index = faiss.IndexFlatL2(dim)
index.add(vecs)
D, I = index.search(q, k=3)
print("인덱스:", I[0])
print("거리:", D[0].round(4))`,
 keywords:['IndexFlatL2','add','search'],
 exp:'IndexFlatL2: 브루트포스 L2. 대용량엔 IndexIVFFlat(근사). float32 필수.'},

{id:120,part:'H',chapter:'RAG',type:'mcq',
 q:'Chunk size 512, overlap 64의 의미는?',
 options:['512단어, 64문장','최대 512 토큰 청크, 연속 청크 간 64 토큰 겹침 — 문맥 단절 방지','512KB, 64MB 오버랩','문서 수와 섹션 수'],
 answer:1,
 exp:'오버랩: 청크 경계 맥락 단절 방지. 512-64=448 토큰씩 진행. 작은 청크: 맥락 부족. 큰 청크: 검색 정밀도↓.'},

{id:121,part:'I',chapter:'에이전틱AI',type:'mcq',
 q:'ReAct 패턴의 3요소는?',
 options:['Read-Act-Check','Reasoning(추론)-Acting(행동)-Observation(관찰) 반복','Register-Analyze-Convert','Request-Answer-Confirm'],
 answer:1,
 exp:'Thought→Action(도구)→Observation 반복. 도구 사용으로 LLM 지식 한계 극복.'},

{id:122,part:'I',chapter:'에이전틱AI',type:'short',
 q:'Prompt Injection 공격이란 무엇이며 에이전트에서 특히 위험한 이유는?',
 answer:'외부 데이터(웹,문서)에 숨긴 지시로 에이전트 조종. 에이전트는 실제 도구 실행 → 파일 삭제, 이메일 전송 등 실제 피해 발생.',
 exp:'방어: 입력 검증, 샌드박스, 최소 권한, 중요 작업 전 사용자 확인.'},

{id:123,part:'I',chapter:'에이전틱AI',type:'mcq',
 q:'Orchestrator-Worker 멀티에이전트 패턴의 특징은?',
 options:['모든 에이전트가 동등','오케스트레이터가 계획 수립 + 워커에 서브태스크 위임. 복잡한 태스크 분해','워커가 모든 결정','단일 에이전트와 동일'],
 answer:1,
 exp:'Reflection: 생성+비평 에이전트. Peer-to-Peer: 에이전트 간 직접 통신. 병렬 처리 가능.'},

{id:124,part:'I',chapter:'에이전틱AI',type:'mcq',
 q:'Reasoning Model (o3, R1 등)의 핵심 특징은?',
 options:['파라미터 수가 작음','추론 시 내부 CoT(Thinking) 생성 → 수학·코딩·논리 문제에서 기존 LLM 대비 성능 대폭 향상','실시간 학습','RAG 없이 동작'],
 answer:1,
 exp:'기존 LLM: 즉시 답변. Reasoning: 수백~수천 토큰의 내부 사고 후 답변. 더 많은 컴퓨팅 but 복잡한 추론 가능.'},

{id:125,part:'I',chapter:'에이전틱AI',type:'short',
 q:'에이전트에서 Human-in-the-loop가 필요한 상황과 이유를 설명하세요.',
 answer:'돌이킬 수 없는 행동(파일 삭제, 이메일, 결제, 배포) 전 사용자 확인. LLM 환각·오류로 인한 실제 피해 방지.',
 exp:'최소 권한 원칙: 필요한 도구만. 점진적 신뢰도 상승. 확인 후 실행 패턴.'},

{id:126,part:'I',chapter:'종합',type:'mcq',
 q:'Speculative Decoding의 원리는?',
 options:['멀티 GPU 분산','작은 Draft 모델이 k개 예측 → Target 모델이 1 forward pass로 검증. 병렬처리로 레이턴시 2~3배 감소','KV Cache 종류','양자화 기법'],
 answer:1,
 exp:'Draft 정확도 높을수록 효율. 거부된 토큰부터 재샘플링. vLLM, TGI에 구현됨.'},

{id:127,part:'I',chapter:'종합',type:'short',
 q:'모델 양자화(Quantization)의 장단점을 설명하세요.',
 answer:'장점: 모델 크기↓(4-bit: 75% 감소), 추론 속도↑, 메모리↓. 단점: 정확도 손실(극단 양자화). INT8 거의 손실 없음. NF4(QLoRA)는 정규분포 가정으로 최소화.',
 exp:'PTQ: 학습 후 변환. QAT: 학습 중 시뮬레이션. bitsandbytes 라이브러리.'},

{id:128,part:'A',chapter:'종합',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
X = np.array([[1,2],[3,4],[5,6]])
print(X.T.shape)
print(X.flatten()[:3])`,
 answer:'(2, 3)\n[1 2 3]',
 exp:'(3,2).T=(2,3). flatten()=[1,2,3,4,5,6], 처음 3개=[1,2,3].'},

{id:129,part:'F',chapter:'종합',type:'mcq',
 q:'ViT(Vision Transformer)가 CNN과 다른 핵심 구조는?',
 options:['합성곱 사용','이미지를 패치(16×16)로 분할 후 1D 시퀀스로 Transformer 처리 — CNN 없이 이미지 분류','더 작은 모델','BN 없음'],
 answer:1,
 exp:'ViT: 이미지→N패치→선형임베딩→[CLS]+Transformer Encoder→분류. 충분한 데이터에서 CNN 능가.'},

{id:130,part:'B',chapter:'종합',type:'code',
 q:'numpy 경사하강법으로 y=2x+1 데이터에서 w,b를 학습하세요.',
 hint:'y_pred=w*X+b, dw,db 계산 후 업데이트',
 answer:`import numpy as np
np.random.seed(42)
X = np.linspace(0, 10, 100)
y = 2*X + 1 + np.random.randn(100)*0.5
w, b, lr = 0.0, 0.0, 0.01
for _ in range(1000):
    yp = w*X + b
    err = yp - y
    w -= lr * (2*X*err).mean()
    b -= lr * (2*err).mean()
print(f"w≈{w:.2f}, b≈{b:.2f}")`,
 keywords:['linspace','randn','mean'],
 exp:'이론: w=2, b=1. 1000 에폭 후 수렴. 경사하강법의 가장 기본 구현.'},

{id:131,part:'G',chapter:'종합',type:'short',
 q:'Few-shot과 Zero-shot 프롬프팅의 차이와 CoT가 효과적인 이유는?',
 answer:'Zero-shot: 예시 없이 요청. Few-shot: k개 입력-출력 예시 제공으로 형식·스타일 유도. CoT: 중간 추론 단계 생성 → 복잡한 문제에서 정확도↑. 예시가 추론 패턴 유도.',
 exp:'Self-Consistency: 여러 CoT 경로 샘플링 후 다수결. Tree of Thought: 트리 탐색.'},

{id:132,part:'D',chapter:'종합',type:'mcq',
 q:'Attention Is All You Need 논문의 핵심 기여는?',
 options:['CNN 개선','RNN/LSTM 없이 순수 Attention으로 seq2seq 달성 — 병렬 처리, 장거리 의존성 직접 포착','더 많은 파라미터','BN 도입'],
 answer:1,
 exp:'2017년 Google. 현대 LLM의 모든 기반. Multi-Head Attention + FFN + Positional Encoding.'},

{id:133,part:'I',chapter:'종합',type:'short',
 q:'MCP(Model Context Protocol)가 AI 에이전트 생태계에서 중요한 이유는?',
 answer:'LLM-도구 연결 표준 프로토콜(Anthropic 제안). USB-C처럼 어떤 LLM도 어떤 도구(DB,API,파일)와 표준 방식으로 연결. 에이전트 생태계 파편화 해결.',
 exp:'이전: 도구마다 다른 연결 방식. MCP: 표준화 → 도구 재사용, 조합이 쉬워짐.'},

{id:134,part:'C',chapter:'종합',type:'mcq',
 q:'데이터 전처리 파이프라인에서 가장 중요한 순서는?',
 options:['정규화→결측치처리→분리','분리(train/test) → 결측치처리 → 정규화 (훈련 기준으로) → 인코딩','인코딩→분리→정규화','무순서'],
 answer:1,
 exp:'반드시 먼저 분리 후 전처리. 훈련 데이터 통계만으로 fit. 테스트엔 transform만 → 데이터 누수 방지.'},

{id:135,part:'F',chapter:'종합',type:'code',
 q:'간단한 Transformer Encoder 블록을 PyTorch로 구현하세요. d_model=64, n_heads=4.',
 hint:'MultiheadAttention, LayerNorm, Linear FFN 사용',
 answer:`import torch, torch.nn as nn
class TransformerBlock(nn.Module):
    def __init__(self, d=64, h=4, ff=256, p=0.1):
        super().__init__()
        self.attn = nn.MultiheadAttention(d, h, dropout=p, batch_first=True)
        self.ff   = nn.Sequential(nn.Linear(d,ff), nn.GELU(), nn.Linear(ff,d))
        self.ln1  = nn.LayerNorm(d)
        self.ln2  = nn.LayerNorm(d)
        self.drop = nn.Dropout(p)
    def forward(self, x):
        a, _ = self.attn(x, x, x)
        x = self.ln1(x + self.drop(a))   # Add & Norm
        x = self.ln2(x + self.drop(self.ff(x)))
        return x

blk = TransformerBlock()
x = torch.randn(2, 10, 64)  # (B, T, D)
print(blk(x).shape)          # (2, 10, 64)`,
 keywords:['MultiheadAttention','LayerNorm','GELU','batch_first'],
 exp:'Pre-LN(LayerNorm 먼저)과 Post-LN 두 변형 존재. 최신 LLM은 Pre-LN 사용. FFN 차원은 보통 4×d_model.'},

{id:136,part:'G',chapter:'종합',type:'mcq',
 q:'LLM Hallucination(환각)이 발생하는 근본 원인은?',
 options:['모델이 너무 작음','LLM은 확률적 다음 토큰 예측 — 사실 여부와 무관하게 그럴듯한 텍스트 생성. 지식 공백을 메우려 함','학습 데이터 부족만','GPU 메모리 부족'],
 answer:1,
 exp:'해결: RAG(검색으로 그라운딩), RLHF(정직성 학습), Constitutional AI, 불확실할 때 "모른다" 답변 유도.'},

{id:137,part:'H',chapter:'종합',type:'mcq',
 q:'GraphRAG가 일반 RAG보다 나은 점은?',
 options:['더 빠름','지식 그래프 기반으로 문서 간 관계 파악 → 멀티홉 추론, 글로벌 요약에 강함','비용이 더 싸','구현이 간단'],
 answer:1,
 exp:'일반 RAG: 청크 단위 검색 → 멀티홉 추론 약함. GraphRAG: 엔티티-관계 그래프 구축 → 연결 추론. Microsoft 오픈소스.'},

{id:138,part:'D',chapter:'종합',type:'code',
 q:'PyTorch로 간단한 학습 루프를 작성하세요. 모델: Linear(5→1), 손실: MSELoss, 옵티마이저: Adam, 에폭: 100.',
 answer:`import torch, torch.nn as nn, torch.optim as optim
torch.manual_seed(42)
X = torch.randn(50, 5)
y = torch.randn(50, 1)
model = nn.Linear(5, 1)
opt = optim.Adam(model.parameters(), lr=1e-3)
crit = nn.MSELoss()
for ep in range(100):
    model.train()
    opt.zero_grad()
    loss = crit(model(X), y)
    loss.backward()
    opt.step()
    if ep % 20 == 0:
        print(f"Ep{ep:3d} Loss:{loss.item():.4f}")`,
 keywords:['MSELoss','Adam','zero_grad','backward','step'],
 exp:'표준 PyTorch 학습 루프: zero_grad → forward → loss → backward → step. 검증 시 no_grad+eval().'},

{id:139,part:'B',chapter:'종합',type:'mcq',
 q:'다음 중 AI에서 Regularization(정규화) 기법이 아닌 것은?',
 options:['L1/L2 Weight Penalty','Dropout','Batch Normalization','Data Augmentation','Max Pooling'],
 answer:4,
 exp:'Max Pooling은 공간 축소/위치 불변성 역할. L1/L2, Dropout, BN, Data Aug 모두 과적합 방지 목적.'},

{id:140,part:'A',chapter:'종합',type:'code',
 q:'pandas로 아래 데이터를 처리하세요: DataFrame에 결측치 있는 age 컬럼을 중앙값으로 채우고, age가 30 이상인 사람의 평균 score를 출력하세요.',
 hint:'fillna(median), boolean indexing, mean()',
 answer:`import pandas as pd
import numpy as np
df = pd.DataFrame({'name':['A','B','C','D'],
                   'age':[25,None,35,40],
                   'score':[80,70,90,85]})
df['age'].fillna(df['age'].median(), inplace=True)
avg = df[df['age'] >= 30]['score'].mean()
print(f"평균 score: {avg:.1f}")`,
 keywords:['fillna','median','mean'],
 exp:'median()은 결측치 제외 계산. age>=30: [35,40] → score: [90,85] → 평균=87.5.'},

{id:141,part:'E',chapter:'종합',type:'mcq',
 q:'Depthwise Separable Convolution(MobileNet)이 일반 Conv보다 효율적인 이유는?',
 options:['정확도가 높음','채널별 독립 Conv(Depthwise) + 1×1 채널 혼합(Pointwise) → 파라미터/연산량 대폭 감소','더 많은 파라미터','BN이 없음'],
 answer:1,
 exp:'일반 Conv: F×F×C_in×C_out. Depthwise Sep: F×F×C_in + C_in×C_out. 약 8~9배 감소. 모바일/엣지 AI 표준.'},

{id:142,part:'G',chapter:'종합',type:'short',
 q:'System Prompt와 User Prompt의 역할 차이를 설명하세요.',
 answer:'System Prompt: 모델의 역할/행동 방식/제약을 정의. 개발자가 설정. User Prompt: 실제 사용자 요청. System이 모델의 "성격"을 결정하고 User가 "질문"을 함.',
 exp:'역할 분리: System="당신은 친절한 의료 보조입니다". User="두통이 있어요". Few-shot 예시도 System에 포함.'},

{id:143,part:'C',chapter:'종합',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`from sklearn.preprocessing import MinMaxScaler
import numpy as np
X = np.array([[0.],[5.],[10.]])
sc = MinMaxScaler()
print(sc.fit_transform(X).flatten())`,
 answer:'[0.  0.5 1. ]',
 exp:'MinMaxScaler: (x-min)/(max-min). min=0,max=10. [0/10, 5/10, 10/10]=[0, 0.5, 1].'},

{id:144,part:'F',chapter:'종합',type:'mcq',
 q:'RoPE(Rotary Position Embedding)가 기존 위치 인코딩보다 나은 점은?',
 options:['계산이 빠름','상대 위치 정보를 회전 행렬로 인코딩 → 학습 길이 이상의 외삽(extrapolation)에 강함. LLaMA 표준','절대 위치만 처리','파라미터 없음'],
 answer:1,
 exp:'기존 sin/cos: 절대 위치. RoPE: 토큰 간 상대 거리를 내적에 자연스럽게 반영. 긴 컨텍스트(4K→8K→32K) 확장에 유리.'},

{id:145,part:'I',chapter:'종합',type:'code',
 q:'OpenAI API로 Function Calling을 사용해 날씨 검색 에이전트를 구현하는 핵심 코드를 작성하세요.',
 hint:'tools 파라미터, tool_calls 처리',
 answer:`from openai import OpenAI
import json
client = OpenAI()
tools = [{"type":"function","function":{
    "name":"get_weather",
    "description":"도시 날씨 조회",
    "parameters":{"type":"object","properties":{
        "city":{"type":"string"}},
        "required":["city"]}}}]

def get_weather(city): return f"{city}: 맑음 23°C"

msgs = [{"role":"user","content":"서울 날씨 알려줘"}]
resp = client.chat.completions.create(model="gpt-4o",messages=msgs,tools=tools)
msg = resp.choices[0].message
if msg.tool_calls:
    for tc in msg.tool_calls:
        args = json.loads(tc.function.arguments)
        result = get_weather(**args)
        print(result)`,
 keywords:['tool_calls','function.arguments','json.loads'],
 exp:'tool_calls 체크 → arguments 파싱 → 실제 함수 호출 → 결과를 role=tool로 대화에 추가.'},

{id:146,part:'D',chapter:'종합',type:'mcq',
 q:'Knowledge Distillation(지식 증류)이란?',
 options:['데이터 압축 기법','큰 교사 모델의 소프트 레이블(확률 분포)로 작은 학생 모델을 학습 → 작은 모델이 큰 모델의 지식 학습','양자화의 일종','Feature Engineering'],
 answer:1,
 exp:'소프트 레이블: [0.01, 0.95, 0.04] → 클래스 간 관계 포함. 원-핫보다 더 많은 정보. DistilBERT: BERT 40% 작고 60% 빠르며 97% 성능.'},

{id:147,part:'B',chapter:'종합',type:'output',
 q:'다음 코드의 출력을 작성하세요.',
 code:`import numpy as np
W = np.array([[1,2],[3,4],[5,6]])
x = np.array([1,1])
b = np.array([0.1,0.2,0.3])
z = W @ x + b
print(z)`,
 answer:'[3.1 7.2 11.3]',
 exp:'W@x=[1+2, 3+4, 5+6]=[3,7,11]. +b=[3.1, 7.2, 11.3]. 신경망 선형 레이어 연산.'},

{id:148,part:'G',chapter:'종합',type:'mcq',
 q:'Instruction Tuning과 Chat Tuning의 차이는?',
 options:['차이 없음','Instruction: 단일 명령-응답 형식. Chat: 멀티턴 대화 형식(시스템/사용자/어시스턴트 역할). Chat이 더 복잡하고 자연스러운 대화 가능','Chat이 항상 더 좋음','Instruction이 더 최신'],
 answer:1,
 exp:'InstructGPT: Instruction Tuning. ChatGPT: Chat Tuning. 역할 구분(system/user/assistant) + 대화 맥락 유지.'},

{id:149,part:'C',chapter:'종합',type:'code',
 q:'sklearn으로 feature_importances_를 시각화하는 코드를 작성하세요. RandomForest 사용.',
 hint:'model.feature_importances_, np.argsort, plt.barh 사용',
 answer:`from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
import matplotlib.pyplot as plt
import numpy as np
X, y = load_iris(return_X_y=True)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)
imp = model.feature_importances_
feat_names = ['sepal_len','sepal_wid','petal_len','petal_wid']
idx = np.argsort(imp)
plt.barh([feat_names[i] for i in idx], imp[idx])
plt.xlabel('Importance')
plt.title('Feature Importance')
plt.tight_layout()
plt.show()`,
 keywords:['feature_importances_','argsort','barh'],
 exp:'argsort로 오름차순 정렬 후 barh로 수평 막대. SHAP으로 더 정교한 설명도 가능.'},

{id:150,part:'I',chapter:'종합',type:'mcq',
 q:'AI 시스템 평가에서 "Evaluation(Evals)"의 중요성은?',
 options:['속도 측정만','모델 출력 품질을 자동/반자동으로 측정 — 회귀(regression) 감지, A/B 비교, 안전성 평가. LLM 개발 핵심 인프라','비용 측정','파라미터 수 측정'],
 answer:1,
 exp:'LLM-as-Judge: GPT-4로 GPT-4 출력 평가. Human Eval(코딩), MMLU(지식), MT-Bench(대화). 좋은 Eval 없이는 모델 개선 불가.'},

];
