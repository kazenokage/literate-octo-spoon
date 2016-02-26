function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds,
  };
}

function initializeClock(id, endtime, birth) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  var barSpan = clock.querySelector('.bar');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  function updateBar() {
    var obsolencePercentage = ((endtime-birth)-(getTimeRemaining(endtime).total))/(endtime-birth)*100;
    barSpan.style.width = obsolencePercentage+"%";
  }

  function updateAll() {
    updateClock();
    updateBar();
  }

  updateAll();
  var timeinterval = setInterval(updateAll, 1000);
}

var birthDate = new Date(Date.parse("1995-03-01T00:00:00Z"));
var deadline = new Date(Date.parse("2035-03-01T00:00:00Z"));
initializeClock('clockdiv', deadline, birthDate);
