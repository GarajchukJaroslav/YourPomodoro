import donePomodoroProject from "./donePomProj.js";

export default function changeCurrentPro() {
    const changeBtn = document.querySelector('.main__change-img');
    const doneBtn = document.querySelector('.main__done');

    changeBtn.addEventListener('click', function () { 
        if(confirm('Поменять проект?')){
            location.reload();
        }
    })

    doneBtn.addEventListener('click', function(){
        let currentTitle = document.querySelector('.main__current-title').innerHTML;
        donePomodoroProject(currentTitle)
    })
}