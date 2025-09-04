import Splide from '@splidejs/splide'

export default function () {
  const MediaCardCarousels = document.querySelectorAll(
      '.MediaCardCarousel__List',
    ),
    MediaCarousels = document.querySelectorAll('.MediaCarousel__List')

  // Media Card Carousel
  MediaCardCarousels.forEach((MediaCardCarousel) => {
    new Splide(MediaCardCarousel, {
      type: 'loop',
      perPage: 2,
      gap: 32,
      mediaQuery: 'min',
      arrows: true,
      breakpoints: {
        960: {
          perPage: 4,
        },
      },
    }).mount()
  })

  // Media Articles
  MediaCarousels.forEach((mediaCarousel) => {
    new Splide(mediaCarousel, {
      type: 'loop',
      perPage: 1,
      gap: 12,
    }).mount()
  })
}
