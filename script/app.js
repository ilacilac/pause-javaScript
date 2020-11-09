const app = () => {
  // DOM
  const $timerBtn = document.querySelectorAll('.timer-picker button');
  const $timer = document.querySelector('.timer');
  const $playBtn = document.querySelector('.play');
  const $video = document.querySelector('.video-container video');
  const $bgm = document.querySelector('.player-container audio');

  let fakeTimer = 600;
  $timer.textContent =
    fakeTimer % 60 < 10
      ? `${fakeTimer / 60}:0${fakeTimer % 60}`
      : `${fakeTimer / 60}:${fakeTimer % 60}`;
  let timerState = false;

  // Functions
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

    fakeTimer = fakeTimer - 1;

    const setTimeMinutes = Math.floor(fakeTimer / 60);
    const setTimeSeconds = Math.floor(fakeTimer % 60);

    $timer.textContent =
      setTimeSeconds < 10
        ? `${setTimeMinutes}:0${setTimeSeconds}`
        : `${setTimeMinutes}:${setTimeSeconds}`;

    if (fakeTimer <= 0) {
      timerOff();
      clearInterval(startCounterTimer);
    }
  }, 1000);

  // EVENT
  // Click Timer Button
  $timerBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
      timerOff();

      fakeTimer = e.target.getAttribute('data-time');
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
