import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function (section) {
  gsap.registerPlugin(ScrollTrigger)

  // portfolioSections.forEach((section) => {
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
      onEnter: () => {
        console.log(`${section.id} background: ${section.dataset.bg}`)
        document.body.dataset.bg = section.dataset.bg
      },
      onEnterBack: () => {
        document.body.dataset.bg = section.dataset.bg
      },
    },
  })

  portfolioTl.to(portfolioWrapper, {
    x: () => -(portfolioWrapper.scrollWidth + window.innerWidth * 0.01),
  })
  // })
}
