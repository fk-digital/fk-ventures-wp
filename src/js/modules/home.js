import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  // const homeSections = gsap.utils.toArray('.HomeSection')

  // Hoizontal Scroll of Portfolio
  // const portfolioContainer = document.querySelector('.HomeSection--portfolio')

  // const portfolioWrapper = document.querySelector('.HomePortfolio')
  // const scrollAmount = portfolioWrapper.offsetWidth - window.innerWidth

  // // Quote
  // const quoteSections = gsap.utils.toArray('.HomeSection--quote')

  // // Subnav
  // const subNavSections = gsap.utils.toArray('.Subnav__Grid')

  // homeSections.forEach((section) => {
  //   gsap.from(section, {
  //     scrollTrigger: {
  //       id: section.id,
  //       trigger: section,
  //       pin: section.classList.contains('HomeSection--subnav') ? false : true,
  //       pinSpacer: section.classList.contains('HomeSection--subnav')
  //         ? false
  //         : true,
  //       start: 'center center',
  //       scrub: true,
  //       // markers: true,
  //       end: () => {
  //         if (
  //           section.classList.contains('HomeSection--pannels') ||
  //           section.classList.contains('HomeSection--quote')
  //         ) {
  //           return '+=3000'
  //         } else if (section.classList.contains('HomeSection--portfolio')) {
  //           return `+=${scrollAmount}`
  //         } else {
  //           return 'bottom center'
  //         }
  //       },
  //       snap: {
  //         snapTo: 1 / (homeSections.length - 1),
  //         duration: { min: 0.3, max: 3 },
  //         inertia: false,
  //       },
  //       onEnter: () => {
  //         section.classList.add('is-visible')
  //       },
  //     },
  //   })
  // })

  // Portfolio
  // const portfolioTl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: portfolioContainer,
  //     start: 'center center',
  //     end: `+=${scrollAmount}`,
  //     scrub: true,
  //   },
  // })

  // portfolioTl.to(portfolioWrapper, {
  //   x: -scrollAmount,
  // })

  // // Quote
  // quoteSections.forEach((section) => {
  //   const sectionRow1 = section.querySelector('.Quote__Images--top')
  //   const sectionRow2 = section.querySelector('.Quote__Images--bottom ')

  //   const quoteTl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: section,
  //       start: 'center center',
  //       end: `+=3000`,
  //       scrub: true,
  //     },
  //   })
  //   quoteTl
  //     .to(sectionRow1, {
  //       x: '50%',
  //     })
  //     .to(
  //       sectionRow2,
  //       {
  //         x: '-50%',
  //       },
  //       '<',
  //     )
  // })

  // Pin Panels section and fade panels in sequentially
  const panelsSection = document.querySelector('.HomeSection--pannels')
  if (panelsSection) {
    const panels = gsap.utils.toArray('.HomePannel')
    gsap.set(panels, { autoAlpha: 0 })

    const panelsTl = gsap.timeline({
      scrollTrigger: {
        trigger: panelsSection,
        start: 'center center',
        end: () => `+=${panels.length * 1000}`,
        scrub: true,
      },
    })

    panels.forEach((panel) => {
      panelsTl.to(panel, {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power1.out',
      })
    })
  }
}
