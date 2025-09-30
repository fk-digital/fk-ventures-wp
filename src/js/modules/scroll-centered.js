import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const centeredSections = gsap.utils.toArray(
    '.HomeSection--centered, .HomeSection--text',
  )

  centeredSections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        id: section.id,
        trigger: section,
        start: 'center center',
        end: 'bottom center',
        scrub: true,
        pin: true,
        pinSpacer: true,
        onEnter: () => {
          section.classList.add('is-visible')
        },
      },
    })
  })
}
