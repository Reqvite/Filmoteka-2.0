import Swiper, {Autoplay} from 'swiper';
  // import Swiper and modules styles


  // init Swiper:
const swiper = new Swiper('.swiper', {
  // Optional parameters
    modules: [Autoplay],

    slidesPerView: 1,
    spaceBetween: 10,

  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 10
    }
  },
  
    autoplay: {
        delay: 1500,
  },
     

});

setInterval(() => {
swiper.update()
},1000)



