import GLightbox from 'glightbox'

export default function () {
  const lightbox = GLightbox({
    selector: '.Lightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
  })
}
