# 졸음방지 귀신 버튼

유튜브 쇼츠 녹화용으로 만든 정적 웹페이지입니다.
버튼을 누르면 1초 정적 화면 뒤에 귀신 이미지와 비명 소리가 함께 재생됩니다.

## 파일 구조

```text
.
├─ index.html
├─ style.css
├─ script.js
├─ assets/
│  ├─ ghost.png
│  └─ scream.mp3
├─ vercel.json
├─ netlify.toml
└─ README.md
```

## 로컬 실행

가장 쉬운 방법은 `index.html`을 브라우저로 여는 것입니다.

```text
C:\Users\junyj\Desktop\귀신 나오게 만드는 어플\index.html
```

VSCode Live Server를 쓰는 경우에는 `Go Live`를 누른 뒤 아래 주소로 접속합니다.

```text
http://127.0.0.1:5500/index.html
```

## Vercel 배포

1. 이 폴더 전체를 GitHub 저장소에 올립니다.
2. Vercel에서 `Add New Project`를 누릅니다.
3. GitHub 저장소를 선택합니다.
4. Framework Preset은 `Other`로 두면 됩니다.
5. Build Command는 비워둡니다.
6. Output Directory도 비워둡니다.
7. Deploy를 누릅니다.

배포가 끝나면 Vercel이 아래처럼 공유 가능한 주소를 만들어줍니다.

```text
https://your-project-name.vercel.app
```

## Netlify 배포

1. Netlify에서 `Add new site`를 누릅니다.
2. GitHub 저장소를 연결합니다.
3. Build command는 비워둡니다.
4. Publish directory는 `.`으로 둡니다.
5. Deploy를 누릅니다.

## GitHub Pages 배포

1. GitHub 저장소에 파일을 올립니다.
2. 저장소의 `Settings`로 들어갑니다.
3. `Pages` 메뉴를 엽니다.
4. Source를 `Deploy from a branch`로 선택합니다.
5. Branch는 `main`, folder는 `/root`를 선택합니다.
6. Save를 누릅니다.

## 주의

- `assets/ghost.png`와 `assets/scream.mp3`는 반드시 같이 올려야 합니다.
- 브라우저 정책 때문에 비명 소리는 사용자가 버튼을 직접 클릭했을 때만 재생됩니다.
