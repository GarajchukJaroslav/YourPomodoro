const textarea = document.querySelector('.brain__textarea')
const saveLink = document.querySelector('.brain__save-link')

export default function saveText() {
    saveLink.addEventListener('click', function () {
        saveLink.removeAttribute('href');
        saveLink.removeAttribute('download');
        const text = textarea.value;
        const blob = new Blob([text], { type: 'text/plain' });
        const date = new Date();
        const formatedDate = date.getDate() + ':' + (date.getMonth() + 1) + ':' + (date.getFullYear());
        const fileName = String(prompt('Введите название файла', 'brainstorm ' + formatedDate));

        if(fileName === 'null') return

        saveLink.setAttribute('href', URL.createObjectURL(blob));
        saveLink.setAttribute('download', fileName);
        textarea.value = '';
        localStorage.setItem('currentBrain', '')
    })
}