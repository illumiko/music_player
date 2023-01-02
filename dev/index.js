const cover = document.querySelector(".cover");
const progressBar = document.querySelector(".progressBarContainer");
const title = document.querySelector(".title");
const activeBtn = document.querySelector(".pause");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const forwardBtn = document.querySelector(".forward");
const backwardBtn = document.querySelector(".backward");
const loop = document.querySelector(".loop");
const music = document.querySelector(".audio");
const volume = document.querySelector(".volume");
let musicIndex = 1;
const musicList = ["Sanity", "Power", "Run&Hide"];
let playing = false;

//---------------
//functions
//---------------
console.log('hello')

//loads the current selected music
const load = () => {
  cover.style.background = `url('./Img/${musicList[musicIndex]}.png') center center/cover`;
  title.innerHTML = musicList[musicIndex];
  music.src = `./Music/${musicList[musicIndex]}.mp3`;
};



//stops and plays music
const play = (e) => {
  cover.classList.toggle("vibe");
  if (playing == false) {
    playedTimeShow();
    music.play();
    playing = true;
    activeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
    viewBox="0 0 24 24"><path d="M10 24h-6v-24h6v24zm10-24h-6v24h6v-24z"/></svg>`;
  } else {
    music.pause();
    playing = false;
    activeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
    viewBox="0 0 24 24"><path d="M2 24v-24l20 12-20 12z"/></svg>`;
  }
};
//next track and plays the music if music was already playing
const next = () => {
  musicIndex++;
  if (musicIndex > musicList.length - 1) {
    musicIndex = 0;
  }
  load();
  if (playing) {
    music.load();
    music.play();
    playedTimeShow();
  }
};

//prev track and plays the music if music was already playing
const prev = () => {
  musicIndex--;
  if (musicIndex < 0) {
    musicIndex = musicList.length - 1;
  }
  load();
  if (playing) {
    music.load();
    music.play();
    playedTimeShow();
    //sets end timer
  }
};

//shows how much of the music is played
const playedTimeShow = (e) => {
  window.setInterval(() => {
    playedDuration = (music.currentTime / music.duration) * 100;
    progressBar.firstElementChild.style.width = `${playedDuration}%`;
  }, 50);
};

const musicTimerUpdate = () => {
  //random shit ignore
  //normal output = 2.67 changed output = 2:67
  let endTimer = (music.duration / 60).toFixed(2).split("");
  let x = endTimer;
  x.splice(1, 1, ":");
  endTimer = x.join("");
  //random shit ignores ends
  //sets the end timer
  document.querySelector(".musicEndTimer").innerText = endTimer;

  //formatting current timer
  let formated = music.currentTime;
  if (music.currentTime > 60) {
    formated /= 60;
    document.querySelector(".musicCurrentTimer").innerText =
      formated.toFixed(2);
  } else if (music.currentTime > 10) {
    document.querySelector(".musicCurrentTimer").innerText =
      "0:" + Math.round(formated);
  } else {
    document.querySelector(".musicCurrentTimer").innerText =
      "0:0" + Math.round(formated);
  }
};

const loopToggle = () => {
  if (playing) {
    if (!music.loop) {
      music.loop = true;
      loop.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.09 18h-.09c-3.313 0-6-2.687-6-6s2.687-6 6-6h2v-3l6 4-6 4v-3h-2c-2.206 0-4 1.794-4 4s1.794 4 4 4h.09c-.055.326-.09.658-.09 1s.035.674.09 1zm11.91-12h-2v2h2c2.206 0 4 1.794 4 4s-1.794 4-4 4h-.09c.055.326.09.658.09 1s-.035.674-.09 1h.09c3.313 0 6-2.687 6-6s-2.687-6-6-6zm-6 7c-2.209 0-4 1.791-4 3.999 0 2.209 1.791 4.001 4 4.001s4-1.792 4-4.001c0-2.208-1.791-3.999-4-3.999zm1.016 6.188h-1.055v-3.109c-.022 0-.884.413-.904.423l-.179-.936 1.241-.574h.896v4.196z"/></svg>';
    } else {
      music.loop = false;
      loop.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2 12c0 .999.381 1.902.989 2.604l-1.098.732-.587.392c-.814-1.025-1.304-2.318-1.304-3.728 0-3.313 2.687-6 6-6h9v-3l6 4-6 4v-3h-9c-2.206 0-4 1.794-4 4zm20.696-3.728l-.587.392-1.098.732c.608.702.989 1.605.989 2.604 0 2.206-1.795 4-4 4h-9v-3l-6 4 6 4v-3h9c3.313 0 6-2.687 6-6 0-1.41-.489-2.703-1.304-3.728z"/></svg>';
    }
  } else {
    alert("Play Music");
  }
};

const forward = () => {
  if (playing) {
    music.currentTime += 5;
  }
};

const backward = () => {
  if (playing) {
    music.currentTime -= 5;
  }
};

const volumeAdjuster = () => {
  let y = parseInt(volume.value)
  let x = volume.value.split("");
  let finalVal
  if (playing){
    if (y < 10) {
      x.splice(0, 0, "0");
      x.splice(1, 0, ".");
      finalVal = parseFloat(x.join(''))
      music.volume = finalVal
    } else {
      x.splice(1,0,'.')
      finalVal = parseFloat(x.join(''))
      music.volume = finalVal
    }
  } else {
    alert('Please play the music first')
  }
};

//functions to load on site launch
load();
window.setInterval(musicTimerUpdate, 500);

//event listeners
activeBtn.addEventListener("click", play);
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
music.addEventListener("ended", next);
loop.addEventListener("click", loopToggle);
forwardBtn.addEventListener("click", forward);
backwardBtn.addEventListener("click", backward);
volume.addEventListener("input", volumeAdjuster);
