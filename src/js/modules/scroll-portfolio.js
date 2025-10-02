import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const portfolioSections = gsap.utils.toArray('.HomeSection--portfolio')

  portfolioSections.forEach((section) => {
    const portfolioWrapper = section.querySelector('.HomePortfolio')
    const scrollAmount = 5000

    gsap.set(portfolioWrapper, { x: () => window.innerWidth })

    const portfolioTl = gsap.timeline({
      scrollTrigger: {
        id: section.id,
        trigger: section,
        pin: true,
        start: 'center center',
        end: `+=${scrollAmount} center`,
        scrub: true,
        invalidateOnRefresh: true,
        onEnter: () => {
          section.classList.add('is-visible')
        },
      },
    })

    portfolioTl.to(portfolioWrapper, {
      x: () => -(portfolioWrapper.scrollWidth + window.innerWidth * 0.01),
    })
  })
}
