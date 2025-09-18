import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { CountUp } from 'countup.js'

export default function () {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  const body = document.body
  const headerProgress = document.querySelector('.Header__Progress')
  const homeSections = gsap.utils.toArray('.HomeSection')

  // Hoizontal Scroll of Portfolio
  const portfolioContainer = document.querySelector('.HomeSection--portfolio')
  const portfolioWrapper = document.querySelector('.HomePortfolio')
  const scrollAmount = portfolioWrapper.offsetWidth - window.innerWidth

  // Quote
  const quoteSections = gsap.utils.toArray('.HomeSection--quote')

  // create the smooth scroller FIRST!
  const smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
    onUpdate: (self) =>
      (headerProgress.style.width = `${Math.round(self.progress * 100)}%`),
  })

  // Fix Anchor Links
  const anchorLinks = document.querySelectorAll("a[href^='#']")
  anchorLinks.forEach((anchorLink) => {
    const href = anchorLink.getAttribute('href')
    anchorLink.addEventListener('click', (e) => {
      e.preventDefault()
      smoother.scrollTo(`${href}`, true, 'top 100px')
    })
  })

  homeSections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        id: section.id,
        trigger: section,
        pin: true,
        start: 'center center',
        scrub: true,
        // markers: true,
        end: () => {
          if (
            section.classList.contains('HomeSection--pannels') ||
            section.classList.contains('HomeSection--quote')
          ) {
            return '+=3000'
          } else if (section.classList.contains('HomeSection--portfolio')) {
            return `+=${scrollAmount}`
          } else {
            return 'bottom center'
          }
        },
        // snap: {
        //   snapTo: 1 / (homeSections.length - 1),
        //   duration: { min: 0.3, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        //   inertia: false,
        // },
        onEnter: (self) => {
          section.classList.add('is-visible')
        },
        onEnterBack: () => {},
      },
    })
  })

  // Bg Colour
  homeSections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        id: section.id,
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setBackgroundColour(section.dataset.bg)
        },
        onEnterBack: () => {
          setBackgroundColour(section.dataset.bg)
        },
      },
    })
  })

  // Portfolio
  const portfolioTl = gsap.timeline({
    scrollTrigger: {
      trigger: portfolioContainer,
      start: 'center center',
      end: `+=${scrollAmount}`,
      scrub: true,
    },
  })

  portfolioTl.to(portfolioWrapper, {
    x: -scrollAmount,
  })

  // Quote

  quoteSections.forEach((section) => {
    const sectionRow1 = section.querySelector('.Quote__Images--top')
    const sectionRow2 = section.querySelector('.Quote__Images--bottom ')

    const quoteTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'center center',
        end: `+=3000`,
        scrub: true,
        markers: true,
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

  // Spiral
  const spiralSvg = document.querySelector('#SpiralBG')
  if (!spiralSvg) return

  const inner = spiralSvg.querySelector('#inner')
  const mid = spiralSvg.querySelector('#mid')
  const outer = spiralSvg.querySelector('#outer')
  if (!inner || !mid || !outer) return

  gsap.set([inner, mid, outer], {
    transformOrigin: '50% 50%',
  })

  //Continuous subtle wobble (-10deg to 10deg)
  gsap.set([inner, mid, outer], { rotation: -10 })
  gsap.to(inner, {
    rotation: 10,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
  gsap.to(mid, {
    rotation: 10,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
  gsap.to(outer, {
    rotation: 10,
    duration: 3.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  // Background Colour Changer
  function setBackgroundColour(bg) {
    if (bg == 'yellow') {
      body.dataset.bg = 'yellow'
    } else {
      body.dataset.bg = 'black'
    }
  }

  function setBackgroundColourReverse(bg) {
    if (bg == 'yellow') {
      body.dataset.bg = 'black'
    } else {
      body.dataset.bg = 'yellow'
    }
  }

  // Countup
  const CountUpNumbers = document.querySelectorAll('.CountUp__Number')
  CountUpNumbers.forEach((CountUpNumber) => {
    const CountUpNumberTarget = CountUpNumber.dataset.number
    const countUp = new CountUp(CountUpNumber, CountUpNumberTarget, {
      duration: 2.5,
      decimalPlaces: 0,
      enableScrollSpy: true,
      scrollSpyDelay: 400,
      scrollSpyOnce: true,
    })
  })
}
