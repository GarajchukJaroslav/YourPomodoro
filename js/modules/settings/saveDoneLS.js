export default function saveDoneLS() {
    const doneProjects = document.querySelectorAll('.settings__done-item');
    const doneNames = [];

    doneProjects.forEach(el => {
        doneNames.push(el.textContent)
    })

    localStorage.setItem('doneProjects', JSON.stringify(doneNames));
}