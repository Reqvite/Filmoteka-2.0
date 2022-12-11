import Swiper, { Autoplay, Navigation } from 'swiper';
// import Swiper and modules styles

// init Swiper:
const swiper = new Swiper('.swiper', {
  // Optional parameters
  modules: [Autoplay, Navigation],

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
  },

  autoplay: {
    delay: 1500,
  },
});

setInterval(() => {
  swiper.update();
}, 1000);
