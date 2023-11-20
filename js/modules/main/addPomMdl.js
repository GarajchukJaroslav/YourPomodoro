import choosePomProj from "./choosePomPro.js"

const pomodoroImg = document.querySelector('.main__img-wrapper')
const pomodoroModal = document.querySelector('.main__modal-wrapper')
const modalCloseBtn = document.querySelector('.main__modal-close')

export default function addPomodoroModal(){
    pomodoroImg.addEventListener('click', function(){
        if(!pomodoroImg.classList.contains('main__img-wrapper')) return;

        pomodoroModal.classList.remove('hidden')
        choosePomProj();
    })

    modalCloseBtn.addEventListener('click', function(){
        pomodoroModal.classList.add('hidden')
    })
}