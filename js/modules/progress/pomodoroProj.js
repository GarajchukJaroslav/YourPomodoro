export default function addPomodoroProj(name) {
    const pomProjectsList = document.querySelector('.main__modal-list')
    const emptyPomodoroText = document.querySelector('.main__modal-empty')

    if (emptyPomodoroText) emptyPomodoroText.classList.add('hidden')
    pomProjectsList.innerHTML += `<li class='main__modal-proj'>${name}</li>`
}