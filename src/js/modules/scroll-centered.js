import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import scrollHeading from './scroll-heading'

export default function (section) {
  gsap.registerPlugin(ScrollTrigger)

  const sectionHeading = section.querySelector('.AnimatedHeading')

  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'center center',
      end: 'bottom+=1000 center',
      scrub: true,
      pin: true,
      // pinSpacer: true,
      snap: {
        snapTo: 1,
        duration: 0.02,
        ease: 'power1.inOut',
      },
      onEnter: () => {
        section.classList.add('is-visible')
        if (sectionHeading != null) {
          scrollHeading(sectionHeading)
        }
      },
    },
  })
}
