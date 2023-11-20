export default function showDoneList(){
    document.body.addEventListener('click', function(e){
        const doneList = document.querySelector('.settings__done-modal')
        if(e.target.dataset.type === 'done-list') doneList.classList.remove('hidden')
        if(e.target.dataset.type === 'done-list-close') doneList.classList.add('hidden')
    })
}