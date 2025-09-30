import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const portfolioSections = gsap.utils.toArray('.HomeSection--portfolio')

  portfolioSections.forEach((section) => {
    const portfolioWrapper = section.querySelector('.HomePortfolio')
    const scrollAmount = 5000

    gsap.set(portfolioWrapper, { xPercent: 100 })

    const portfolioTl = gsap.timeline({
      scrollTrigger: {
        id: section.id,
        trigger: section,
        pin: true,
        pinSpacer: true,
        start: 'center center',
        end: `+=${scrollAmount} center`,
        scrub: true,
        onEnter: () => {
          section.classList.add('is-visible')
        },
      },
    })

    portfolioTl.to(portfolioWrapper, {
      xPercent: -100,
    })
  })
}
