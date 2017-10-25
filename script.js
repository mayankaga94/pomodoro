var sessionTime = 25;
var breakTime = 5;
var timer = document.getElementById('countdown');
var timerHeading = document.getElementById('countdown-heading');
var running = false;
var pause = false;
var startClock;
var t = {};
//The state includes running and pause,starting condition is both are false.timer is paused when the condition becomes
function increaseTime(id){  //if plus button is pressed.
  var time = document.getElementById(id);
  if(!running && !pause){
    if(id === 'break-time' && breakTime < 25){
      breakTime++;
      time.innerHTML = breakTime;
    }
    if(id === 'session-time' && sessionTime < 60){
      sessionTime++;
      time.innerHTML = sessionTime;
      timer.innerHTML = sessionTime;
    }
  }
}

function decreaseTime(id){  //if minus button is pressed.
  var time = document.getElementById(id);
  if(!running && !pause){
    if(id === 'break-time' && breakTime > 1){
      breakTime--;
      time.innerHTML = breakTime;
    }
    if(id ==='session-time' && sessionTime > 1) {
      sessionTime--;
      time.innerHTML = sessionTime;
      timer.innerHTML = sessionTime;
    }
  }
}

function timerClick(){
  if(!running && !pause) startTimer(sessionTime*60,'Session',sessionTime);
  else if(running && !pause) pause = true;
  else if(!running && pause) resumeTimer();
}

function startTimer(time,type,minutes){
  var audio = new Audio('http://s000.tinyupload.com/download.php?file_id=04470092254471833282&t=0447009225447183328244593');
  var start = Math.round( (new Date().getTime())/1000);
  audio.pause();
  running = true;
  timerHeading.innerHTML = type;
  startClock = setInterval(function(){
    var now = Math.round( (new Date().getTime())/1000);
    var diff = now - start;
    var seconds = (time-diff) % 60;
    console.log(seconds);
    //timerHeading.innerHTML = type; //set the type of timer.
    if(seconds === 59) {
      minutes--;
      if(minutes === -1) minutes = 0;
    }
    //maintain minutes
    var min = minutes;
    // adds zero in front of minutes if it is less than 10.
    min = zero(min);
    seconds = zero(seconds);
    //pause the timer and store the necessary info for when timer will be resumed.
    if(pause){
      clearInterval(startClock);
      //after pausing,the timer still runs for an extra second.increasing it by 1 counters that,although a second is still spent.
      seconds++;
      seconds = zero(seconds);
      running = false;
      t.minutes = minutes;
      t.seconds = seconds;
      t.type = type;
    }
    //print out the seconds.
    timer.innerHTML = min + ":" + seconds;
     //check if the current timer has to be stopped and then start the other timer.
    if( diff >= time){
      running = false;
      audio.play();
      clearInterval(startClock);
      if(type === 'Session') {
        startTimer(breakTime*60,'break',breakTime);
      }
      else if(type === 'break') {
        startTimer(sessionTime*60,'Session',sessionTime);
      }

    }
  },1000);
}

function resumeTimer(){
  console.log(t);
  //pass on the remaining countdown time
  var time = t.minutes*60 + t.seconds;
  //tell if session or break.
  var type = t.type;
  //specify the minutes remaining.eg - 24:30 will give 24
  var minutes = t.minutes;
  pause = false;
  //start the timer again.
  startTimer(time,type,minutes);
}

function resetTimer(){
  clearInterval(startClock);
  running = false;
  pause = false;
  timer.innerHTML = 25;
  document.getElementById("break-time").innerHTML = breakTime = 5;
  document.getElementById("session-time").innerHTML = sessionTime = 25;
  timerHeading.innerHTML = "Session";
}

function zero(t){
  if(t<10) return t = '0'+t;
  else return t;
}
