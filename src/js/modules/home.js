import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

export default function () {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin)

  const body = document.body
  const headerProgress = document.querySelector('.Header__Progress')

  const bgLineUp = document.querySelector('#line-goes-up')
  const bgLineFlat = document.querySelector('#line-goes-flat')
  const bgLineDown = document.querySelector('#line-goes-down')

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

  // Pin + Snap Home Sections
  const homeSections = gsap.utils.toArray('.HomeSection')

  homeSections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        id: section.id,
        trigger: section,
        pin: true,
        start: 'center center',
        end: () => {
          if (section.classList.contains('HomeSection--pannels')) {
            return '+=3000'
          } else {
            return 'bottom center'
          }
        },
        snap: {
          snapTo: 1 / (homeSections.length - 1),
          duration: { min: 0.3, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
          inertia: false,
        },
        onEnter: (self) => {
          section.classList.add('is-visible')
        },
        // snap: 1 / (homeSections.length - 1),
      },
    })
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

  // Background Colours
  homeSections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top+=100 80%',
        end: 'bottom-=100 20%',

        id: `${section.id}-color`,
        onEnter: () => {
          setBackgroundColour(section.dataset.bg)
        },
        onEnterBack: () => {
          setBackgroundColour(section.dataset.bg)
        },
      },
    })
  })

  // Draw Lines
  gsap.set(bgLineUp, { drawSVG: '0% 0%' })
  gsap.set(bgLineDown, { drawSVG: '0% 0%' })

  const lineDrwingTLUp = gsap
    .timeline({
      scrollTrigger: {
        trigger: '#one',
        scrub: true,
        start: 'center center',
        end: 'bottom center',
      },
    })
    .to(bgLineUp, { drawSVG: '100% 0%' }, 0)

  const lineDrwingTLDown = gsap
    .timeline({
      scrollTrigger: {
        trigger: '#two',
        scrub: true,
        start: 'top center',
        end: 'bottom center',
      },
    })
    .to(bgLineDown, { drawSVG: '100% 0%' }, 0)

  // Spiral
  const svg = document.querySelector('.HomeSection--spiral svg')
  if (!svg) return

  const inner = svg.querySelector('#inner')
  const mid = svg.querySelector('#mid')
  const outer = svg.querySelector('#outer')
  if (!inner || !mid || !outer) return

  gsap.set([inner, mid, outer], {
    transformOrigin: '50% 50%',
  })

  // Continuous subtle wobble (-10deg to 10deg)
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
    } else if (bg == 'white') {
      body.dataset.bg = 'white'
    } else {
      body.dataset.bg = 'black'
    }
  }
}
