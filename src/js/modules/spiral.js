import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  // Spiral
  const spiralSvg = document.querySelector('#SpiralBG')
  if (!spiralSvg) return

  const body = document.body,
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
  const spiralTimeline = gsap.timeline({
    scrollTrigger: {
      id: 'spiral',
      trigger: body,
      start: 'top bottom',
      end: () => 'bottom+=48000 top',
      scrub: true,
      markers: true,
    },
  })

  // Scroll-driven base rotation on wrappers
  spiralTimeline.to(innerWrap, { rotation: 260 }, 0)
  spiralTimeline.to(midWrap, { rotation: -220 }, 0)
  spiralTimeline.to(outerWrap, { rotation: 180 }, 0)
  ScrollTrigger.refresh()
}
