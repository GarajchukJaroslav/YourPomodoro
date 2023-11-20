export default function bindEditPom(oldTitle, newTitle){
    const pomProjects = document.querySelectorAll('.main__modal-proj');
    
    pomProjects.forEach(project => {
        if(project.textContent === oldTitle){
            project.textContent = newTitle;
        }
    })
}