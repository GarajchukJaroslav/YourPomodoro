import changeDivs from "./changeDivs.js";

const bell = new Audio("../../../audio/bell.mp3")
const startBtn = document.querySelector('.main__pomodoro-startBtn')
const timer = document.querySelector('.main__pomodoro-timer')
let timeTypeIndex = 1;

export default function changeTime() {
    let secondsLeft = +timer.innerHTML.slice(0, 2) * 60 + +timer.innerHTML.slice(3, 5);
    let saveTime = timer.textContent;
    if (saveTime != '25:00' && saveTime != '15:00' && saveTime != '05:00') {
        if (timeTypeIndex % 2) {
            saveTime = '25:00'
        }

        if (!(timeTypeIndex % 2) && timeTypeIndex % 8) {
            saveTime = '05:00'
        }

        if (!(timeTypeIndex % 8)) {
            saveTime = '15:00'
        }
    }

    let returnUnfocused = false
    let closedDate = 0
    let closedSeconds = 0
    let unfocusedTimeout;
    let negativeTime = false;

    let countTime;

    function doTimerLogic() {
        if (document.hidden && !returnUnfocused) {
            closedDate = Date.now();
            closedSeconds = +timer.innerHTML.slice(0, 2) * 60 + +timer.innerHTML.slice(3, 5);
            returnUnfocused = true;
            unfocusedTimeout = setTimeout(() => {
                negativeTime = true;
                bell.play()
                handleEndTime(secondsLeft, saveTime, countTime, intervalWrapper)
                startBtn.addEventListener('click', function () {
                    bell.pause()
                })
            }, closedSeconds * 1000)
            return;
        }

        if (!document.hidden && returnUnfocused) {
            if(negativeTime){
                handleEndTime(secondsLeft, saveTime, countTime, intervalWrapper)
                if (saveTime == '25:00') {
                    startBtn.textContent = 'Take a break!'
                    timer.innerHTML = '05:00'
                    changeDivs()
                    timeTypeIndex++;
                    clearInterval(countTime)
                    clearInterval(intervalWrapper)
                }
        
                if (saveTime == '05:00' || saveTime == '15:00') {
                    startBtn.textContent = 'Start working!'
                    timer.innerHTML = '25:00'
                    timeTypeIndex++;
                    clearInterval(countTime)
                    clearInterval(intervalWrapper)
                }
                console.log(timeTypeIndex);
                return console.log('Negative time');
            }
            console.log('Вставка после возврата (начало функции)');

            clearTimeout(unfocusedTimeout)
            const focusedDate = Date.now();
            const unfocusedSeconds = Math.floor((focusedDate - closedDate) / 1000)
            const totalSec = closedSeconds - unfocusedSeconds

            let returnHours = Math.floor(totalSec / 60)
            let returnMinutes = totalSec % 60

            if ((returnHours + '').length === 1) {
                returnHours = `0${returnHours}`
            }
            if ((returnMinutes + '').length === 1) {
                returnMinutes = `0${returnMinutes}`
            }

            console.log('После возврата вставка: ' + `${returnHours}:${returnMinutes}`);

            timer.innerHTML = `${returnHours}:${returnMinutes}`
            returnUnfocused = false;
            return;
        }

        secondsLeft = +timer.innerHTML.slice(0, 2) * 60 + +timer.innerHTML.slice(3, 5);

        if (startBtn.dataset.paused == 'true') {
            return clearInterval(intervalWrapper);
        }

        handleEndTime(secondsLeft, saveTime, countTime, intervalWrapper)

        if (secondsLeft > 0) {
            secondsLeft--;
            let minutes = String(Math.floor(secondsLeft / 60));
            let seconds = String(secondsLeft % 60);

            if (minutes.length == 1) {
                minutes = `0${minutes}`
            }

            if (seconds.length == 1) {
                seconds = `0${seconds}`
            }

            timer.innerHTML = (minutes + ':' + seconds);
        }
    }

    let intervalWrapper = setInterval(() => {
        countTime = setInterval(doTimerLogic(), 1000)
    }, 1000); 
}

function handleEndTime(secondsLeft, saveTime, countTime, wrapper) {
    if (secondsLeft <= 0) {
        bell.play()

        startBtn.addEventListener('click', function () {
            bell.pause()
        })

        if (saveTime == '25:00') {
            startBtn.textContent = 'Take a break!'
            timer.innerHTML = '05:00'
            changeDivs()
            timeTypeIndex++;
            clearInterval(wrapper)
            clearInterval(countTime)
        }

        if (saveTime == '05:00' || saveTime == '15:00') {
            startBtn.textContent = 'Start working!'
            timer.innerHTML = '25:00'
            timeTypeIndex++;
            clearInterval(wrapper)
            clearInterval(countTime)
        }

        clearInterval(wrapper)
        clearInterval(countTime)
    }
}