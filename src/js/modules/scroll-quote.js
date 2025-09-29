import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const qouteSections = gsap.utils.toArray('.HomeSection--quote')

  qouteSections.forEach((section) => {
    const sectionRow1 = section.querySelector('.Quote__Images--top')
    const sectionRow2 = section.querySelector('.Quote__Images--bottom ')

    const quoteTl = gsap.timeline({
      scrollTrigger: {
        id: section.id,
        trigger: section,
        pin: true,
        pinSpacer: true,
        start: 'center center',
        end: `+=3000`,
        scrub: true,
        // snap: {
        //   snapTo: 1 / (qouteSections.length - 1),
        //   duration: { min: 0.3, max: 3 },
        //   inertia: false,
        // },
        onEnter: () => {
          section.classList.add('is-visible')
        },
      },
    })

    quoteTl
      .to(sectionRow1, {
        x: '50%',
      })
      .to(
        sectionRow2,
        {
          x: '-50%',
        },
        '<',
      )
  })
}
