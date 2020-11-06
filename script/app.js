const app = () => {
  // DOM
  const $timerBtn = document.querySelectorAll(".timer-picker button");
  const $timer = document.querySelector(".timer");
  const $playBtn = document.querySelector(".play");
  let fakeTimer = 600;
  $timer.textContent =
    fakeTimer % 60 < 10
      ? `${fakeTimer / 60}:0${fakeTimer % 60}`
      : `${fakeTimer / 60}:${fakeTimer % 60}`;
  // Functions
  function startCounter() {
    // setInterval(() => {
    //   fakeTimer - 1;
    //   const setTimeMinutes = fakeTimer / 60;
    //   const setTimeSeconds = fakeTimer % 60;
    //   $timer.textContent =
    //     setTimeSeconds < 10
    //       ? `${setTimeMinutes}:0${setTimeSeconds}`
    //       : `${setTimeMinutes}:${setTimeSeconds}`;
    // }, 1000);
  }
  function stopCounter() {}

  // EVENT
  // Click Timer Button
  $timerBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      fakeTimer = e.target.getAttribute("data-time");
      const setTimeMinutes = fakeTimer / 60;
      const setTimeSeconds = fakeTimer % 60;
      $timer.textContent =
        setTimeSeconds < 10
          ? `${setTimeMinutes}:0${setTimeSeconds}`
          : `${setTimeMinutes}:${setTimeSeconds}`;
    });
  });

  // Click play Button
  $playBtn.addEventListener("click", () => {
    if ($playBtn.classList.contains("on")) {
      $playBtn.classList.remove("on");
      $playBtn.src = "./images/play.svg";
      stopCounter();
    } else {
      $playBtn.classList.add("on");
      $playBtn.src = "./images/pause.svg";
      startCounter();
    }
  });
};
app();
