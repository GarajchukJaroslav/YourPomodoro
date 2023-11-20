let pomodoroDivs = document.querySelectorAll('.main__pomodoro-div');
const timer = document.querySelector('.main__pomodoro-timer');
const startBtn = document.querySelector('.main__pomodoro-startBtn');
let doubleListWrappers = document.querySelectorAll('.main__double-list');
const mainListsWrapper = document.querySelector('.main__lists-wrapper');
let sittingCount = 1;
let countGroup = 1;
const line = `
<ul class="main__pomodoro-list">
                            <li class="main__pomodoro-item">
                                <div class="main__pomodoro-div"></div>
                            </li>
                            <li class="main__pomodoro-item">
                                <div class="main__pomodoro-div"></div>
                            </li>
                            <li class="main__pomodoro-item">
                                <div class="main__pomodoro-div"></div>
                            </li>
                            <li class="main__pomodoro-item">
                                <div class="main__pomodoro-div"></div>
                            </li>
                        </ul>
`
const doubleLine = line + line


export default function colorDiv(interval) {
    let ok = true;
    if (sittingCount % 4 == 0) {

        pomodoroDivs[sittingCount - 1].style.background = 'green';
        startBtn.textContent = 'Take a long break!'
        timer.innerHTML = '15:00'

        if (pomodoroDivs.length % 8 == 0) {

            pomodoroDivs.forEach(el => {
                if(!ok) return;
                if(el.style.background != 'green'){
                    pomodoroDivs[sittingCount - 1].style.background = 'green';
                    ++sittingCount;
                    ok = false
                    return clearInterval(interval);
                }
            });

            if(!ok){
                return clearInterval(interval);
            }

            if(pomodoroDivs.length >= 24){
                timer.innerHTML = 'Идите отдыхать!!!'
                startBtn.style.display = 'none'
                return clearInterval(interval);
            }

            ++countGroup
            mainListsWrapper.innerHTML += `<div class="main__double-list"></div>`
            doubleListWrappers = document.querySelectorAll('.main__double-list');
            doubleListWrappers[countGroup - 1].innerHTML += doubleLine;
            pomodoroDivs = document.querySelectorAll('.main__pomodoro-div');
            ++sittingCount;
            return clearInterval(interval);
        }

        doubleListWrappers[0].innerHTML += line;
        pomodoroDivs = document.querySelectorAll('.main__pomodoro-div');
        ++sittingCount;
        return clearInterval(interval);
    }
    pomodoroDivs[sittingCount - 1].style.background = 'green';
    ++sittingCount;
}

