// HTML 요소를 미리 찾아두면 아래 함수들에서 계속 재사용할 수 있습니다.
const stage = document.querySelector("#stage");
const introPanel = document.querySelector("#introPanel");
const warningPanel = document.querySelector("#warningPanel");
const ghostScene = document.querySelector("#ghostScene");
const ghostImage = document.querySelector("#ghostImage");
const ghostFallback = document.querySelector("#ghostFallback");
const resultPanel = document.querySelector("#resultPanel");
const wakeButton = document.querySelector("#wakeButton");
const restartButton = document.querySelector("#restartButton");
const screamSound = document.querySelector("#screamSound");

// setTimeout을 다시 시작할 때 지우기 위해 변수에 담아둡니다.
let ghostTimer;
let resultTimer;

// assets/ghost.png가 없거나 불러오기 실패하면 CSS로 만든 대체 화면을 보여줍니다.
ghostImage.addEventListener("error", () => {
  ghostImage.hidden = true;
  ghostFallback.hidden = false;
});

// 오디오 파일이 없어도 화면 진행은 멈추지 않게 합니다.
screamSound.addEventListener("error", () => {
  console.warn("assets/scream.mp3 파일을 불러오지 못했습니다.");
});

wakeButton.addEventListener("click", startScare);
restartButton.addEventListener("click", resetExperience);

function startScare() {
  clearTimers();
  prepareSoundAfterClick();

  // 첫 화면을 숨기고 1초 동안 긴장 문구를 보여줍니다.
  stage.className = "stage is-warning";
  introPanel.hidden = true;
  warningPanel.hidden = false;
  ghostScene.hidden = true;
  resultPanel.hidden = true;

  ghostTimer = setTimeout(showGhost, 1000);
}

function showGhost() {
  // 귀신 화면을 다시 보여줄 때 CSS 애니메이션이 새로 시작되도록 클래스를 재적용합니다.
  stage.className = "stage is-scare";
  warningPanel.hidden = true;
  ghostScene.hidden = false;
  ghostScene.classList.remove("is-active");
  void ghostScene.offsetWidth;
  ghostScene.classList.add("is-active");

  playScream();

  resultTimer = setTimeout(showResult, 2000);
}

function showResult() {
  stage.classList.remove("is-scare");
  stage.classList.add("is-result");
  resultPanel.hidden = false;
}

function resetExperience() {
  clearTimers();
  stopScream();

  stage.className = "stage is-idle";
  introPanel.hidden = false;
  warningPanel.hidden = true;
  ghostScene.hidden = true;
  resultPanel.hidden = true;
  ghostScene.classList.remove("is-active");
}

function clearTimers() {
  clearTimeout(ghostTimer);
  clearTimeout(resultTimer);
}

function prepareSoundAfterClick() {
  // 브라우저는 사용자의 직접 클릭 없이 소리가 나는 것을 막습니다.
  // 클릭 순간에 조용히 준비해두면 1초 뒤 귀신 등장 타이밍에 재생될 가능성이 높아집니다.
  try {
    screamSound.pause();
    screamSound.currentTime = 0;
    screamSound.muted = true;

    const unlockPromise = screamSound.play();

    if (unlockPromise !== undefined) {
      unlockPromise
        .then(() => {
          // 아직 귀신이 나오기 전이면 조용히 멈춰서 시작 지점을 되돌립니다.
          // 귀신이 이미 나왔다면 실제 비명을 끊지 않기 위해 그대로 둡니다.
          if (ghostScene.hidden) {
            screamSound.pause();
            screamSound.currentTime = 0;
          }

          screamSound.muted = false;
        })
        .catch(() => {
          screamSound.muted = false;
        });
    }
  } catch (error) {
    screamSound.muted = false;
  }
}

function playScream() {
  try {
    screamSound.muted = false;
    screamSound.volume = 1;
    screamSound.currentTime = 0;

    const playPromise = screamSound.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.warn("브라우저가 오디오 재생을 막았습니다. 버튼을 다시 눌러보세요.");
      });
    }
  } catch (error) {
    console.warn("오디오 재생 중 문제가 생겼습니다.", error);
  }
}

function stopScream() {
  try {
    screamSound.pause();
    screamSound.currentTime = 0;
    screamSound.muted = false;
  } catch (error) {
    console.warn("오디오 정지 중 문제가 생겼습니다.", error);
  }
}
