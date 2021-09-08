$(function () {

    $('.owl-carousel').owlCarousel({
        center: true,
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeout: 5000,
        nav:false,

    });

})
 const elem = document.querySelectorAll('.price__save');
 const link = document.querySelectorAll('.price__container');
 const href = document.getElementsByClassName('footer__btn');
 const dark = document.getElementById('dark')


 for (let i = 0; i < link.length; i++){
     link[i].addEventListener('click' , function () {
         for(let g = 0 ; g < link.length; g++){
             link[g].classList.remove('price-active')
         }
         link[i].classList.add('price-active')

     })
     console.log(link[i].getAttribute('data-link'))
 }
for ( let i = 0 ; i < elem.length; i++ ){
    console.log(elem[i].innerHTML.length)
    if(elem[i].innerHTML.length !== 0 ){
        elem[i].classList.add('price__save-active')
    } else {
        elem[i].classList.remove('price__save-active')
    }
}
href[0].addEventListener('click' ,function () {
    let links = ''
    document.querySelectorAll('.price-active').forEach(function (item,i,arr) {
        links =  arr[i].getAttribute('data-link');
    })
    console.log(this.setAttribute('href', links))
})
dark.addEventListener('click',function () {
   document.getElementById('container').classList.toggle('dark-team')
})