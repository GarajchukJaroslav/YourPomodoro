let clientHeight = window.innerHeight;

export default function asideBtnsListener() {
    document.addEventListener('click', function (e) {
        let asideAttr = e.target.dataset.aside;
        if (asideAttr) {
            window.scrollTo(0, clientHeight*asideAttr)
        }
    })
}