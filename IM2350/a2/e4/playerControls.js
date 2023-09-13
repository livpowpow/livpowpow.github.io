/* DEFINITIONS & SETUP */

let videoElement = document.getElementById("videoElement");
let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
let muteButton = document.getElementById("muteButton");
let unmuteButton = document.getElementById("unmuteButton");
let fullScreenButton = document.getElementById("fullScreenButton");

//followed format and code of the mute/unmute function to create the full screen button//

let progressBar = document.getElementById("progressBar");

videoElement.removeAttribute("controls");

document.getElementById("controlsWrapper").style.display = "flex";

videoElement.addEventListener('loadedmetadata', () => {
  progressBar.setAttribute('max', videoElement.duration);
});


videoElement.addEventListener("playing", () => {
  
  if (!progressBar.getAttribute('max')){
    progressBar.setAttribute('max', videoElement.duration);
  }
});

/* LOADING */

videoElement.addEventListener("waiting", () => {
  progressBar.classList.add("timeline-loading");
});
videoElement.addEventListener("canplay", () => {
  progressBar.classList.remove("timeline-loading");
});

/* MEDIA FINSIHED */


videoElement.addEventListener("ended", () => {
  playButton.style.backgroundImage = "url('./icons/play.svg')";
});

/* PLAY/PAUSE */


function playPause(){

  if (videoElement.paused || videoElement.ended) {
    // if it isn't already playing make it play
    videoElement.play();
    // then make sure the icon on the button changes to pause indicating what it does if you click it
    playButton.style.backgroundImage = "url('./icons/pause.svg')";
    document.getElementById("videoPlayOverlay").style.display = "none";
  } else {
    // if it is already playing make it pause
    videoElement.pause();
    // then make sure the icon on the button changes to play indicating what it does if you click it
    playButton.style.backgroundImage = "url('./icons/play.svg')";
    document.getElementById("videoPlayOverlay").style.display = "block";
  }
}

playButton.addEventListener('click', playPause);

videoElement.addEventListener('click', playPause);


/* TIMELINE */


videoElement.addEventListener('timeupdate', () => {
  
  progressBar.value = videoElement.currentTime;
});


function scrubToTime(e){
  

  let x = e.clientX - (progressBar.getBoundingClientRect().left + window.scrollX);
  videoElement.currentTime = clampZeroOne(x / progressBar.offsetWidth) * videoElement.duration;
}



progressBar.addEventListener('mousedown', scrubToTime);
progressBar.addEventListener('mousedown', (e) => {
  
  window.addEventListener('mousemove', scrubToTime);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', scrubToTime);
  });
});

/* MUTE/UNMUTE */
// this is my function to toggle mute and unmute //
function muteUnmute(){
  // check if working //
  //console.log("mute/unmute is working");
  
  if(videoElement.muted){
    //if muted is true set to false
    videoElement.muted = false;
    // change the icon to mute
    muteButton.style.backgroundImage = "url('./icons/mute.svg')";

  } else {
    videoElement.muted = true;
    // if muted is false set to true //
    muteButton.style.backgroundImage = "url('./icons/unmute.svg')";
    //if audio is false (muted) set to true //
  }
}
  muteButton.addEventListener('click',muteUnmute);


// Signifier - I want to click a button //
// Affordance - I want the button to toggle between mute and unmute //
// Feedback - I want the button icon to describe the state of muted or unmuted //


/* FULL SCREEN/EXITFULL SCREEN */ 

 function fullUnfull(){

    videoElement.requestFullscreen();
    console.log("3563");

 }

fullButton.addEventListener('click',fullUnfull);

//Signifier - i want to click a button // 
// affordance - i want to make the video media player full screen //
//Feedback - I want the media to become full screen, * the escape key can be used to navigate out of full screen //


/* HELPER FUNCTIONS */

function clampZeroOne(input){
  return Math.min(Math.max(input, 0), 1);
}

function logEvent(e){
  console.log(e);
}

