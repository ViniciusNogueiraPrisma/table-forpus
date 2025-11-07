var swiper = new Swiper(".mySwiper-banner-home", {
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".mySwiper-imprensa-home", {
  spaceBetween: 32,
  slidesPerView: "auto",
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Arenas Esportivas
var swiperEsportiva = new Swiper(".arena-esportiva-swiper", {
  spaceBetween: 8,
  slidesPerView: "auto",
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".arena-esportiva-next",
    prevEl: ".arena-esportiva-prev",
  },
});

// Arenas Indoor
var swiperIndoor = new Swiper(".arena-indoor-swiper", {
  spaceBetween: 8,
  slidesPerView: "auto",
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".arena-indoor-next",
    prevEl: ".arena-indoor-prev",
  },
});

// Arenas 360˚
var swiper360 = new Swiper(".arena-360-swiper", {
  spaceBetween: 8,
  slidesPerView: "auto",
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".arena-360-next",
    prevEl: ".arena-360-prev",
  },
});
