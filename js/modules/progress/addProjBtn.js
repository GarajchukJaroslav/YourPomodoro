import crtProjObj from "./crtProj.js";
import projectBtnsHandler from "./editProj.js";
import addPomodoroProj from "./pomodoroProj.js";
import saveProjectsLS from "./saveProjectsLS.js";

const addProjBtn = document.querySelector('.pogress__add-btn')
const modalWindow = document.querySelector('.progress__modal-wrapper')
const createBtn = document.querySelector('.modal__create-btn')

export default function wrapper(forLS = false, projName = undefined, startLSdate = '', endLSdate = '', comment = '') {
    if(forLS){
        let emptyText = document.querySelector('.progress__projects-empty');

        emptyText.classList.add('hidden')
        addPomodoroProj(projName)
        crtProjObj(projName, startLSdate, endLSdate, comment)
        return
    }

    function addProjListener() {
        addProjBtn.addEventListener('click', function () {
            modalWindow.classList.toggle('hidden')
        })
    }

    createBtn.addEventListener('click', function () {
        let emptyText = document.querySelector('.progress__projects-empty')

        let nameInput = document.querySelector('#name-input')
        let startDateInput = document.querySelector('#start--date-input')
        let endDateInput = document.querySelector('#end--date-input')
        let commentInput = document.querySelector('#comment-input')

        let name = nameInput.value
        let startDate = startDateInput.value
        let endDate = endDateInput.value
        let comment = commentInput.value

        const existingTitles = document.querySelectorAll('.progress__project-name')
        let nameConflict = false
        existingTitles.forEach(title => {
            if(name === title.innerHTML){
                alert('Проект с таким именем уже существует!!!')
                nameConflict = true
            }
        });
        
        if(nameConflict) return;

        if(name.length > 65){
            alert('Название проекта слишком длинное, воспользуйтесь комментарием!')
            return
        }

        modalWindow.classList.add('hidden')
        emptyText.classList.add('hidden')

        addPomodoroProj(name);
        let projectsArray = crtProjObj(name, startDate, endDate, comment);
        localStorage.setItem('projectObjects', JSON.stringify(projectsArray))
        document.querySelector('.main__modal-wrapper').classList.add('hidden');
        saveProjectsLS();
    })
    addProjListener()
    projectBtnsHandler()
}

