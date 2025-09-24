import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const portfolioSections = gsap.utils.toArray('.HomeSection--portfolio')

  portfolioSections.forEach((section) => {
    // Hoizontal Scroll of Portfolio
    const portfolioWrapper = section.querySelector('.HomePortfolio')
    const scrollAmount = portfolioWrapper.offsetWidth - window.innerWidth

    const portfolioTl = gsap.timeline({
      scrollTrigger: {
        id: section.id,
        trigger: section,
        pin: true,
        pinSpacer: true,
        start: 'center center',
        end: `+=${scrollAmount}`,
        scrub: true,
        snap: {
          snapTo: 1 / (portfolioSections.length - 1),
          duration: { min: 0.3, max: 3 },
          inertia: false,
        },
        onEnter: () => {
          section.classList.add('is-visible')
        },
      },
    })

    portfolioTl.to(portfolioWrapper, {
      x: -scrollAmount,
    })
  })
}
