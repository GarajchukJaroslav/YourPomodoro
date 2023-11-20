export default function saveBrainLS(){
    setInterval(() => {
        let brainText = document.querySelector('.brain__textarea').value
        if(!brainText) return false;
        localStorage.setItem('currentBrain', brainText);
    });
}