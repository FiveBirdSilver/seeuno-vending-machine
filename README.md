
# 자판기 프로젝트 (Vending Machine)

## 1. 프로젝트 소개
사용자는 현금을 및 카드를 투입하고 다양한 음료를 구매할 수 있습니다.

## 2. 주요 기능
- 💰 현금 결제: 100원, 500원, 1,000원, 5,000원, 10,000원 권 지원
- 💳 캬드 결제
- 🥤 음료수 선택: 콜라, 물, 커피 중 선택 가능
- 💸 잔액 실시간 확인
- 💵 거스름돈 반환
- 📦 실시간 재고 관리

## 3. 설치 방법 (2가지 옵션)

#### 옵션 1: zip 파일 다운로드
1. 프로젝트 GitHub 페이지에서 "Code" 버튼 클릭
2. "Download ZIP" 선택
3. 다운로드한 ZIP 파일 압축 해제

#### 옵션 2: Git 클론
```bash
  git clone https://github.com/FiveBirdSilver/seeuno-vending-machine.git
  cd seeuno-vending-machine
```

## 4. 프로젝트 실행하기 (2가지 옵션)
### 옵션 1.
#### Step 1: 필요한 프로그램 설치
1. [Node.js 공식 웹사이트](https://nodejs.org/)에 방문
2. "LTS(장기 지원) 버전" 다운로드 및 설치
3. 설치 중 모든 기본 옵션 그대로 진행

#### Step 2: 프로젝트 의존성 설치
터미널(명령 프롬프트)에서 다음 명령어 실행:
```bash
  npm install
```

#### Step 3: 개발 서버 실행
```bash
  npm run dev
```

#### Step 4: 웹 브라우저에서 확인
1. 터미널에 표시된 주소 (예: `http://127.0.0.1:8080/`)를 브라우저에 입력
2. 자판기 페이지가 나타나면 성공!

### 옵션 2.
#### 폴더 내의 index.html 파일을 더블클릭하여 브라우저에서 열거나, 브라우저에서 index.html 파일을 드래그 앤 드롭해서 열기

## 5. 다이어그램 문서 
diagram 폴더 내의 diagram.html 파일을 더블클릭하여 브라우저에서 열거나, 브라우저에서 diagram.html 파일을 드래그 앤 드롭해서 열기

## 6. 디렉토리 구조
```
seeuno-vending-machine/
│
├── package.json      # 프로젝트 설정 및 의존성 관리 파일
├── index.html        # 메인 HTML 파일
├── styles.css        # 스타일 시트
├── assets            # 이미지 경로
├── app.js            # 컴파일된 TypeScript
└── app.ts            # TypeScript 소스 코드
```

## 7. 버전
v1.0.0