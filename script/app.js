const app = () => {
  /* === DOM === */
  const $timerBtn = document.querySelectorAll('.timer-picker button');
  const $timer = document.querySelector('.timer');
  const $playBtn = document.querySelector('.play');
  const $video = document.querySelector('.video-container video');
  const $videoSource = $video.querySelector('source');
  const $bgm = document.querySelector('.player-container audio');
  const $movingOutline = document.querySelector('.moving-outline circle');

  const urlParam = window.location.search.split('name=')[1];
  $bgm.setAttribute('src', `./media/${urlParam}.mp3`);
  $videoSource.setAttribute('src', `./media/${urlParam}.mp4`);
  $video.load();

  /* === SVG === */
  const outlineLength = $movingOutline.getTotalLength();
  // white위에 color가 위에있는 상태
  // outline크기만큼 dashed가 됨 => 1300(색) => 1300(빈칸) => 1300(색)
  $movingOutline.style.strokeDasharray = outlineLength;
  // offset을 1300 띄우고 dashed => 1300(빈칸) => 1300(색)
  $movingOutline.style.strokeDashoffset = outlineLength;

  let fakeTimer = 600;
  let setTimer = 600;

  $timer.textContent =
    fakeTimer % 60 < 10
      ? `${fakeTimer / 60}:0${fakeTimer % 60}`
      : `${fakeTimer / 60}:${fakeTimer % 60}`;
  let timerState = false;

  /* === Functions === */
  function timerOn() {
    timerState = true;
    $playBtn.src = './images/pause.svg';
    $video.play();
    $bgm.play();
  }
  function timerOff() {
    timerState = false;
    $playBtn.src = './images/play.svg';
    $video.pause();
    $bgm.pause();
    $playBtn.classList.remove('on');
  }
  const startCounterTimer = setInterval(() => {
    if (!timerState) return;
    // timer 표시
    fakeTimer = fakeTimer - 1;

    const setTimeMinutes = Math.floor(fakeTimer / 60);
    const setTimeSeconds = Math.floor(fakeTimer % 60);

    $timer.textContent =
      setTimeSeconds < 10
        ? `${setTimeMinutes}:0${setTimeSeconds}`
        : `${setTimeMinutes}:${setTimeSeconds}`;

    // progress animation
    let currentTime = $bgm.currentTime;
    console.log(currentTime);
    console.log(fakeTimer);
    let progress = outlineLength - (currentTime / setTimer) * outlineLength;
    $movingOutline.style.strokeDashoffset = progress;

    if (fakeTimer <= 0) {
      timerOff();
      clearInterval(startCounterTimer);
    }
  }, 1000);

  /* === EVENT === */
  // Click Timer Button
  $timerBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
      timerOff();
      fakeTimer = e.target.getAttribute('data-time');
      setTimer = e.target.getAttribute('data-time');

      $bgm.currentTime = 0;
      $movingOutline.style.strokeDashoffset = outlineLength;

      const setTimeMinutes = fakeTimer / 60;
      const setTimeSeconds = fakeTimer % 60;
      $timer.textContent =
        setTimeSeconds < 10
          ? `${setTimeMinutes}:0${setTimeSeconds}`
          : `${setTimeMinutes}:${setTimeSeconds}`;
    });
  });

  // Click play Button
  $playBtn.addEventListener('click', () => {
    $playBtn.classList.toggle('on');

    if ($playBtn.classList.contains('on')) {
      timerOn();
    } else {
      timerOff();
    }
  });
};
app();
