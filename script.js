const countdownElement = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const progressCircle = document.querySelector('.progress-ring__circle');
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

// Date and time setup: Set the target date to current time to activate immediately
const targetDate = new Date().getTime(); // Current time
const totalDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// Start the countdown automatically as the target time is now
function checkTime() {
  const currentTime = new Date().getTime();

  if (currentTime >= targetDate) {
    startCountdown();
    startButton.disabled = false; // Enable the button when countdown starts
    startButton.textContent = 'Start'; // Change button text to "Start"
  }
}

// Start the countdown
function startCountdown() {
  const endTime = targetDate + totalDuration;

  const mainInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      clearInterval(mainInterval);
      countdownElement.textContent = '00:00:00';
      setProgress(100);
      return;
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display countdown
    countdownElement.textContent = `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Update progress circle
    const elapsedTime = now - targetDate;
    const progressPercent = (elapsedTime / totalDuration) * 100;
    setProgress(progressPercent);
  }, 1000);
}

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

// Start the countdown immediately since the time is now
checkTime();

// Button functionality
startButton.addEventListener('click', function () {
  if (startButton.textContent === 'Start') {
    window.open(
      'https://form.jotform.com/gomolemosibiyadev/mad115c-evaluation-2',
      '_blank'
    );
  }
});
