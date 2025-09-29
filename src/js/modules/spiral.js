import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  // Spiral
  const spiralSvg = document.querySelector('#SpiralBG')
  if (!spiralSvg) return

  const body = document.querySelector('body'),
    innerWrap = spiralSvg.querySelector('#wrapInner'),
    midWrap = spiralSvg.querySelector('#wrapMid'),
    outerWrap = spiralSvg.querySelector('#wrapOuter'),
    inner = spiralSvg.querySelector('#inner'),
    mid = spiralSvg.querySelector('#mid'),
    outer = spiralSvg.querySelector('#outer')
  if (!innerWrap || !midWrap || !outerWrap || !inner || !mid || !outer) return

  gsap.set([inner, mid, outer, innerWrap, midWrap, outerWrap], {
    transformOrigin: '50% 50%',
  })

  // Add Scroll
  const timeline = gsap.timeline({
    scrollTrigger: {
      id: 'spiral',
      trigger: body,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })

  // Scroll-driven base rotation on wrappers (wobble continues inside)
  timeline.to(innerWrap, { rotation: 260 }, 0)
  timeline.to(midWrap, { rotation: -220 }, 0)
  timeline.to(outerWrap, { rotation: 180 }, 0)
}
