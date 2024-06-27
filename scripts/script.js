let timer;
let minutes = 25;
let seconds = 0;
let isPaused = false;
let enteredTime = null;
let isStarted = false;
let currentMode = 'work';

function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 50);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert('O tempo acabou');
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
    }
}

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function togglePauseResume() {
    const pauseResumeButton = document.querySelector('.pause-resume');

    if (!isStarted) {
        isStarted = true;
        isPaused = false;
        pauseResumeButton.textContent = 'Parar';
        startTimer();
    } else {
        isPaused = !isPaused;

        if (isPaused) {
            clearInterval(timer);
            pauseResumeButton.textContent = 'Continuar';
        } else {
            startTimer();
            pauseResumeButton.textContent = 'Parar';
        }
    }
}

function restartTimer() {
    clearInterval(timer);
    setTimer(currentMode);
}

function chooseTime() {
    const newTime = prompt('Digite o tempo em minutos:');
    if (!isNaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
        isPaused = false;
        isStarted = false;
        currentMode = 'custom';
        const timerElement = document.getElementById('timer');
        timerElement.textContent = formatTime(minutes, seconds);
        clearInterval(timer);
        const pauseResumeButton = document.querySelector('.pause-resume');
        pauseResumeButton.textContent = 'Iniciar';
    } else {
        alert('Valor inválido, coloque um número inteiro maior que 0.');
    }
}

function setTimer(mode) {
    currentMode = mode;
    clearInterval(timer);
    isPaused = false;
    isStarted = false;

    switch (mode) {
        case 'work':
            minutes = 25;
            break;
        case 'shortBreak':
            minutes = 5;
            break;
        case 'longBreak':
            minutes = 15;
            break;
        default:
            minutes = enteredTime || 25;
    }
    seconds = 0;

    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);
    const pauseResumeButton = document.querySelector('.pause-resume');
    pauseResumeButton.textContent = 'Iniciar';
}

document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);
});