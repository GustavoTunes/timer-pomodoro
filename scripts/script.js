let timer;
let minutes = 25;
let seconds = 0;
let isPaused = false;
let enteredTime = null;
let isStarted = false;

function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert('O tempo acabou, faça uma pausa');
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
    const pauseResumeButton = document.querySelector('.control-buttons button');
    
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
    minutes = enteredTime || 25;
    seconds = 0;
    isPaused = false;
    isStarted = false; // Reinicia a variável isStarted
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);
    const pauseResumeButton = document.querySelector('.control-buttons button');
    pauseResumeButton.textContent = 'Iniciar';
}

function chooseTime() {
    const newTime = prompt('Digite o tempo em minutos:');
    if (!isNaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
        isPaused = false;
        isStarted = false; // Reinicia a variável isStarted
        const timerElement = document.getElementById('timer');
        timerElement.textContent = formatTime(minutes, seconds);
        clearInterval(timer);
        const pauseResumeButton = document.querySelector('.control-buttons button');
        pauseResumeButton.textContent = 'Iniciar';
    } else {
        alert('Valor inválido, coloque um número inteiro maior que 0.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);
});
