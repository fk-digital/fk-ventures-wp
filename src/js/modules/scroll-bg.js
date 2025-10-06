import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function (section) {
  gsap.registerPlugin(ScrollTrigger)

  gsap.from(section, {
    scrollTrigger: {
      id: section.id,
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        section.classList.add('is-visible')
        console.log(`${section.id} background: ${section.dataset.bg}`)
        document.body.dataset.bg = section.dataset.bg
      },
      onEnterBack: () => {
        document.body.dataset.bg = section.dataset.bg
      },
    },
  })
}
