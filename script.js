const countdownElement = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const progressCircle = document.querySelector('.progress-ring__circle');
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

// Set target date to 24 October 2024, 17:45
const targetDate = new Date('2024-10-29T17:45:00').getTime();
const totalDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// Check if the current time has reached or passed the target date
function checkTime() {
  const currentTime = new Date().getTime();

  if (currentTime >= targetDate) {
    startCountdown(); // Automatically start the countdown when the target date is reached
    startButton.disabled = false; // Enable the button when countdown starts
    startButton.textContent = 'Start Test'; // Change button text to "Start Test"
  } else {
    // If the current time hasn't reached the target date, show the time until the countdown starts
    const timeUntilStart = targetDate - currentTime;
    const hours = Math.floor((timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeUntilStart % (1000 * 60)) / 1000);
    
    // Display countdown until the test is available
    countdownElement.textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Recheck every second
    setTimeout(checkTime, 1000);
  }
}

// Start the countdown for the test duration (2 hours)
function startCountdown() {
  const endTime = targetDate + totalDuration;

  const mainInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      clearInterval(mainInterval);
      countdownElement.textContent = '00:00:00';
      setProgress(100); // Full progress when countdown reaches 0
      return;
    }

    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update the countdown display
    countdownElement.textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Update progress circle based on the elapsed time
    const elapsedTime = now - targetDate;
    const progressPercent = (elapsedTime / totalDuration) * 100;
    setProgress(progressPercent);
  }, 1000);
}

// Set the progress of the circle
function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

// Initial time check to start the countdown at the correct time
checkTime();

// Button functionality - controls only redirection
startButton.addEventListener('click', function () {
  if (startButton.textContent === 'Start Test') {
    window.open(
      'https://form.jotform.com/243023737154048',
      '_blank'
    );
  }
});
