const projectsWrapper = document.querySelector('.progress__projects-wrapper')
let project = `
<div class="progress__project">
    <div class="progress__project-content">
        <h3 class="progress__project-name">Project name</h3>
        <ul class="progress__project-btns">
            <li class="progress__project-item">
                <button class="progress__project-btn">
                    <img src="./img/done.svg" class="progress__project-img" data-btn="done">
                </button>
            </li>
            <li class="progress__project-item">
                <button class="progress__project-btn">
                    <img src="./img/pencil.svg" class="progress__project-img" data-btn="pencil">
                </button>
            </li>
            <li class="progress__project-item">
                <button class="progress__project-btn">
                    <img src="./img/cross.svg" class="progress__project-img progress__delete-project" data-btn="delete">
                </button>                            
            </li>
        </ul>
    </div>
    </div> 
`

class Project {
    constructor(name, startDate, endDate, comment) {
        this.name = name
        this.startDate = startDate
        this.endDate = endDate
        this.comment = comment
    }
}

let projectsArray = [];

export default function crtProjObj(name, startDate, endDate, comment) {
    let countProj = document.querySelectorAll('.progress__project').length
    let projectObject = new Project(name, startDate, endDate, comment)
    projectsArray.push(projectObject)
    createProject(name, countProj)
    countProj++;
    return projectsArray
}

export function getProjectsArray(){
    return projectsArray
}

function createProject(name, countProj) {
    projectsWrapper.innerHTML += project
    let projectNames = document.querySelectorAll('.progress__project-name')
    projectNames[countProj].innerHTML = name
    countProj++
}