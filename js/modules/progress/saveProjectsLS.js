export default function saveProjectsLS() {
    const projectTitles = document.querySelectorAll('.progress__project-name');
    const projectNames = []

    if(!projectTitles) return;
    projectTitles.forEach(el => {
        projectNames.push(el.textContent)
    })

    localStorage.setItem('projectsNames', JSON.stringify(projectNames))
}