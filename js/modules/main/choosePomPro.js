import createPomodoroProjDiv from "./crtPomPrjDiv.js";

export default function choosePomProj() {
    const pomProjects = document.querySelectorAll('.main__modal-proj');
    const pomodoroModal = document.querySelector('.main__modal-wrapper');
    const pomodoroWrapper = document.querySelector('.main__img-wrapper'); 
    const aside = document.querySelector('.aside')

    pomProjects.forEach(el => {
        el.addEventListener('click', function (e) {
            createPomodoroProjDiv(el);
            pomodoroModal.classList.add('hidden');
            pomodoroWrapper.classList.remove('main__img-wrapper');
            aside.classList.add('hidden')
        })
    })
}