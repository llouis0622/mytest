# 🧠 Louis AI Lab — 취업 대비 AI 완전 정복

Python 기초부터 에이전틱 AI까지, 이론·코드·퀴즈 150문항을 한 곳에서.

## 📁 파일 구조

```
ailab/
├── index.html            ← 앱 진입점
├── css/
│   └── style.css         ← 전체 스타일
├── js/
│   ├── app.js            ← 라우팅 & UI 로직
│   ├── data-chapters.js  ← 챕터별 학습 내용
│   └── data-quiz.js      ← 150문항 퀴즈 데이터
└── README.md
```

## 🚀 GitHub Pages 배포 방법

### 1. 저장소 생성
```bash
# GitHub에서 새 저장소 생성 (예: ai-lab)
git init
git add .
git commit -m "init: AI Lab 완전 정복"
git branch -M main
git remote add origin https://github.com/llouis0622/ai-lab.git
git push -u origin main
```

### 2. GitHub Pages 설정
1. GitHub 저장소 → **Settings** 탭
2. 왼쪽 메뉴 → **Pages**
3. Source → **Deploy from a branch**
4. Branch → **main** / **(root)** 선택
5. **Save** 클릭

### 3. 접속
```
https://llouis0622.github.io/ai-lab/
```
(배포까지 1~2분 소요)

---

## 📚 학습 챕터

| 파트 | 내용 |
|------|------|
| A | Python, NumPy, Pandas, Matplotlib |
| B | 선형대수, 미적분, 확률통계, 정보이론 |
| C | ML 패러다임, 평가지표, 핵심 알고리즘 |
| D | 신경망, 역전파, 활성화 함수, PyTorch |
| E | CNN, ResNet, LSTM |
| F | Transformer, Self-Attention, BERT/GPT |
| G | LLM, Fine-tuning, LoRA, RLHF |
| H | RAG, 벡터 DB, FAISS, LangChain |
| I | 에이전틱 AI, ReAct, Multi-Agent |

## 📝 퀴즈 유형 (총 150문항)
- **선택형(MCQ)**: 4지선다 개념 확인
- **단답형(Short)**: 키워드 서술
- **코드 작성(Code)**: 직접 구현
- **결과 예측(Output)**: 코드 실행 결과 맞추기

---

Made with ❤️ for Louis's job preparation journey
