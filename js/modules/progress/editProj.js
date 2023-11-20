import bindEditPom from "./bindEditPom.js";
import saveDoneLS from "../settings/saveDoneLS.js";
import saveProjectsLS from "./saveProjectsLS.js";
import {getProjectsArray} from "./crtProj.js";

const progressContent = document.querySelector('.progress__content')
const projectsWrapper = document.querySelector('.progress__projects-wrapper')

let editWindow = `
<div class="edit-project">
<div class="edit-project__modal">
    <div class="edit__content-wrapper">
        <h1 class="edit__modal-title">Редактирование</h1>
        <div class="edit__item-wrapper">
            <h3 class="edit__modal-name">Введите название проекта:</h3>
            <input class="edit__input" id="edit-name--input" type="text" value="My Project">
        </div>
        <div class="edit__item-wrapper">
            <h3 class="edit__modal-name">Введите дату начала:</h3>
            <input id="edit-start--input" class="edit__input data-input" type="date">
        </div>
        <div class="edit__item-wrapper">
            <h3 class="edit__modal-name">Введите дату завершения:</h3>
            <input id="edit-end--input" class="edit__input data-input" type="date">
        </div>
        <div class="edit__item-wrapper">
            <h3 class="edit__modal-name">Комментарий к проекту:</h3>
            <textarea id="edit-comment--input" class="edit__input textarea" placeholder="Some comments..." cols="5" rows="8"></textarea>
        </div>
    </div>
    <button class="modal__save-btn">
        Сохранить проект
    </button>
</div>
</div>
`

export default function projectBtnsHandler() {
    projectsWrapper.addEventListener('click', function (e) {
        let emptyText = document.querySelector('.progress__projects-empty')
        let countProj = document.querySelectorAll('.progress__project').length

        if (e.target.dataset.btn === 'done') {
            bindSettigsDone(e.target)
            saveDoneLS()
            deletePomodoroProj(e.target)
            deleteProject(e, countProj)
            if (!document.querySelector('.progress__project')) emptyText.classList.remove('hidden')
            saveProjectsLS();

            let projectsArray = getProjectsArray();
            localStorage.setItem('projectObjects', JSON.stringify(projectsArray))
        }

        if (e.target.dataset.btn === 'pencil') {
            progressContent.insertAdjacentHTML('afterbegin', editWindow)

            const editTitleInput = document.querySelector('#edit-name--input')
            const editStartInput = document.querySelector('#edit-start--input')
            const editEndInput = document.querySelector('#edit-end--input')
            const editCommentInput = document.querySelector('#edit-comment--input')

            let currentTitle = e.target.closest('.progress__project-btns').previousElementSibling
            let currentTitleValue = currentTitle.textContent;
            const nameInBeging = currentTitleValue;
            const projectsArray = getProjectsArray();
            editTitleInput.value = currentTitleValue;
            let currentIndex = -1;
            let isIndexCurrent = false;

            projectsArray.forEach(el => {
                if(!isIndexCurrent) currentIndex++;

                if(el.name === currentTitleValue){
                    editCommentInput.value = el.comment
                    editStartInput.value = el.startDate
                    editEndInput.value = el.endDate

                    isIndexCurrent = true;
                }
            });
            editSaveBnt(projectsArray, currentTitle, editTitleInput, editCommentInput, currentIndex, editStartInput, editEndInput, nameInBeging)
        }

        if (e.target.dataset.btn === 'delete') {
            if (e.isTrusted && confirm('Delete project?')) {
                deletePomodoroProj(e.target)
                deleteProject(e, countProj)
                if (!document.querySelector('.progress__project')) emptyText.classList.remove('hidden');
                saveProjectsLS();

                let projectsArray = getProjectsArray();
                localStorage.setItem('projectObjects', JSON.stringify(projectsArray))

                return;
            }
            if(!e.isTrusted){
                bindSettigsDone(e.target)
                deletePomodoroProj(e.target)
                deleteProject(e, countProj)
                if (!document.querySelector('.progress__project')) emptyText.classList.remove('hidden')
                saveProjectsLS();
                let projectsArray = getProjectsArray();
                localStorage.setItem('projectObjects', JSON.stringify(projectsArray))
            }
        }
    })
}

function deleteProject(e, countProj) {
    const projectsArray = getProjectsArray();
    const thisProject = e.target.closest('.progress__project')
    const nameDelete = thisProject.querySelector('.progress__project-name').textContent

    projectsArray.forEach(el => {
        if(el.name === nameDelete) {
            console.log(projectsArray.indexOf(el));
            projectsArray.splice(projectsArray.indexOf(el), 1);
        }
    })
    thisProject.remove()
    --countProj
}

function deletePomodoroProj(btn) {
    const name = btn.closest('ul').previousElementSibling.innerHTML;
    const pomProjectsList = document.querySelector('.main__modal-list');
    const pomProjects = pomProjectsList.querySelectorAll('.main__modal-proj');
    const emptyPomodoroText = document.querySelector('.main__modal-empty');

    pomProjects.forEach(el => {
        if (el.innerHTML === name) {
            return el.remove()
        }
    })

    if (pomProjects.length <= 1) emptyPomodoroText.classList.remove('hidden')
}

function bindSettigsDone(btn) {
    const doneList = document.querySelector('.settings__done-list')
    const emptyDone = document.querySelector('.settings__done-empty')
    const name = btn.closest('ul').previousElementSibling.innerHTML

    if (emptyDone) {
        emptyDone.remove()
    }

    doneList.innerHTML += `<div class="settings__done-item">${name}</div>`
}

function editSaveBnt(projectsArray, currentTitle, editTitleInput, editCommentInput, currentIndex, editStartInput, editEndInput, nameInBeging) {
    let editSaveBtn = document.querySelector('.modal__save-btn');
    const existingNamesTitles = document.querySelectorAll('.progress__project-name')

    editSaveBtn.addEventListener('click', function () {
        let doReturn = false;
        existingNamesTitles.forEach(el => {
            if(editTitleInput.value === el.textContent && editTitleInput.value !== nameInBeging){
                alert('Проект с таким именем уже существует!!!')
                doReturn = true;
            }

            if(editTitleInput.value.length > 65){
                alert('Название проекта слишком длинное, воспользуйтесь комментарием!')
                doReturn = true;
                return
            }
        })

        if(doReturn) return

        bindEditPom(currentTitle.textContent, editTitleInput.value);
        currentTitle.textContent = editTitleInput.value;

        projectsArray[currentIndex].comment = editCommentInput.value;
        projectsArray[currentIndex].name = editTitleInput.value;
        projectsArray[currentIndex].startDate = editStartInput.value;
        projectsArray[currentIndex].endDate = editEndInput.value;

        localStorage.setItem('projectObjects', JSON.stringify(projectsArray))
        saveProjectsLS();
        document.querySelector('.edit-project').remove();
    })
}