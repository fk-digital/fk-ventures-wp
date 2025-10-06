import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function (section) {
  gsap.registerPlugin(ScrollTrigger)

  const portfolioWrapper = section.querySelector('.HomePortfolio')
  const portfolioItems = gsap.utils.toArray(
    section.querySelectorAll('.PortfolioItem--item'),
  )

  // Scale Each item
  portfolioItems.forEach((item) => {
    gsap.set(item, { scale: 0.5, opacity: 0.5 })
  })

  const portfolioTl = gsap.timeline({
    scrollTrigger: {
      id: section.id,
      trigger: section,
      pin: true,
      start: 'center center',
      end: () =>
        `+=${Math.max(0, portfolioWrapper.scrollWidth - section.clientWidth)}`,
      scrub: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        document.body.dataset.bg = section.dataset.bg
      },
      onEnterBack: () => {
        document.body.dataset.bg = section.dataset.bg
      },
    },
  })

  portfolioTl.to(portfolioWrapper, {
    x: () => -Math.max(0, portfolioWrapper.scrollWidth - section.clientWidth),
    ease: 'none',
  })

  portfolioItems.forEach((item) => {
    gsap.to(item, {
      scale: 1,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'left right',
        end: 'right center',
        horizontal: true,
        scrub: true,
        invalidateOnRefresh: true,
        containerAnimation: portfolioTl,
      },
    })
  })

  ScrollTrigger.refresh()
}
