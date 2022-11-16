import { popularMovieMarkup } from "../markups/popularMovieMarkup";

  import Swiper, {Autoplay} from 'swiper';
  // import Swiper and modules styles


  // init Swiper:
const swiper = new Swiper('.swiper', {
  // Optional parameters
    modules: [Autoplay],

    loop: true,
    slidesPerView: 5,
    spaceBetween: 10,

    autoplay: {
        delay: 1500,
  },
     

  // If we need pagination


});

setInterval(() => {
swiper.update()
},1000)



