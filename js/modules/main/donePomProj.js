import saveDoneLS from "../settings/saveDoneLS.js";

export default function donePomodoroProject(currentPomName){
    const doneBtn = document.querySelector('.main__done');
    const aside = document.querySelector('.aside');
    const addBtn = document.querySelector('#main-img--wrapper')
    const currentProject = document.querySelector('.main__current-project')

    doneBtn.addEventListener('click', function(){
        aside.classList.remove('hidden')
        doneBtn.classList.add('hidden')
        addBtn.classList.add('main__img-wrapper')
        currentProject.classList.add('hidden')

        const activeProjects = document.querySelectorAll('.main__modal-proj');
        const progressProjects = document.querySelectorAll('.progress__project');
        
        activeProjects.forEach(el => {
            if(el.textContent === currentPomName){
                progressProjects.forEach(el => {
                    if(el.querySelector('.progress__project-name').textContent === currentPomName){
                        el.querySelector('.progress__delete-project').click();
                        saveDoneLS();
                    }
                })
                el.remove();
                location.reload()
            }
        });
    })
}