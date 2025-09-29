import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default function () {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  const headerProgress = document.querySelector('.Header__Progress')

  // Spiral
  // const spiralSvg = document.querySelector('#SpiralBG')
  // if (!spiralSvg) return

  // const body = document.querySelector('body'),
  //   innerWrap = spiralSvg.querySelector('#wrapInner'),
  //   midWrap = spiralSvg.querySelector('#wrapMid'),
  //   outerWrap = spiralSvg.querySelector('#wrapOuter'),
  //   inner = spiralSvg.querySelector('#inner'),
  //   mid = spiralSvg.querySelector('#mid'),
  //   outer = spiralSvg.querySelector('#outer')
  // if (!innerWrap || !midWrap || !outerWrap || !inner || !mid || !outer) return

  // gsap.set([inner, mid, outer, innerWrap, midWrap, outerWrap], {
  //   transformOrigin: '50% 50%',
  // })

  // const spiralTimeline = gsap.timeline()

  // spiralTimeline.to(innerWrap, { rotation: 260, ease: 'power1.out' })
  // spiralTimeline.to(midWrap, { rotation: -220, ease: 'power1.out' })
  // spiralTimeline.to(outerWrap, { rotation: 180, ease: 'power1.out' })

  // create the smooth scroller FIRST!
  const smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
    onUpdate: (self) => {
      headerProgress.style.width = `${Math.round(self.progress * 100)}%`
      // spiralTimeline.progress(self.progress)
    },
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
}
