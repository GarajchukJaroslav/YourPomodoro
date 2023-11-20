export default function vipBtnHandler(){
    document.body.addEventListener('click', function(e){
        if(e.target.dataset.type === 'get-vip') alert(`В разработке. \nПоддержать проект: 7-985-101-09-40`)
    })
}