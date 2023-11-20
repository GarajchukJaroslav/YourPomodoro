export default function createPomodoroProjDiv(project){
    const currentProject = document.querySelector('.main__current-project');
    const pomodoroDoneBtn = document.querySelector('.main__done-wrapper');

    pomodoroDoneBtn.classList.remove('hidden');
    currentProject.classList.remove('hidden');
    setTitle(project);
}

function setTitle(project){
    let currentTitle = document.querySelector('.main__current-title');
    currentTitle.innerHTML = project.innerHTML;
}