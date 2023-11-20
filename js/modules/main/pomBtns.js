import changeTime from "./changeTime.js";

const startBtn = document.querySelector('.main__pomodoro-startBtn')

export default function pomodoroStartBtnListener() {
    startBtn.addEventListener('click', function () {
        const currentProject = document.querySelector('.main__current-project');
        
        if(currentProject.classList.contains('hidden')){
            return alert('Необходимо выбрать задачу!!!')
        }

        if (startBtn.textContent == 'Pause') {
            startBtn.textContent = 'Resume work';
            return startBtn.dataset.paused = 'true';
        }

        if(startBtn.textContent == 'Resume work'){
            startBtn.dataset.paused = '';
        }
        
        changeTime();

        startBtn.textContent = 'Pause'
    })
}