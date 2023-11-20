import asideBtnsListener from './modules/main/asideBtns.js';
import pomodoroStartBtnListener from './modules/main/pomBtns.js';
import showDoneList from './modules/settings/done-list.js'
import addProjListener from './modules/progress/addProjBtn.js';
import saveText from './modules/brain/saveText.js';
import addPomodoroModal from './modules/main/addPomMdl.js';
import vipBtnHandler from './modules/settings/vip-btn.js';
import changeCurrentPro from './modules/main/changeCurrPro.js';
import saveBrainLS from './modules/brain/saveBrainLS.js';

asideBtnsListener();
pomodoroStartBtnListener();
addProjListener();
showDoneList();
saveText();
addPomodoroModal();
vipBtnHandler();
changeCurrentPro();
saveBrainLS();

function getLSBrain() {
    const brainTextarea = document.querySelector('.brain__textarea')
    brainTextarea.value = localStorage.getItem('currentBrain')
}

function getLSDone() {
    const settingsDoneList = document.querySelector('.settings__done-list');
    const emptyDone = document.querySelector('.settings__done-empty');
    const jsonNames = localStorage.getItem('doneProjects');

    if (jsonNames) {
        const doneNames = JSON.parse(jsonNames)
        emptyDone.remove();
        doneNames.forEach(el => {
            settingsDoneList.innerHTML += `<div class="settings__done-item">${el}</div>`
        });
    }
}

function getLSProjects() {
    const jsonProjects = localStorage.getItem('projectsNames');
    const projectNamesArr = JSON.parse(jsonProjects);
    let projectObjects = JSON.parse(localStorage.getItem('projectObjects'))

    let comments = [];
    let startDates = [];
    let endDates = [];

    if(!projectObjects) return;
    for (let i = 0; i < projectObjects.length; i++) {
        comments.push(projectObjects[i].comment)
        startDates.push(projectObjects[i].startDate)
        endDates.push(projectObjects[i].endDate)
    }

    if (!projectNamesArr) return;
    let count = 0;
    projectNamesArr.forEach(el => {
        addProjListener(true, el, startDates[count], endDates[count], comments[count]);
        count++;
    });
}

getLSBrain();
getLSDone();
getLSProjects();
