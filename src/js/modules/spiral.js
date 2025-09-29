import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  // Spiral
  const spiralSvg = document.querySelector('#SpiralBG')
  if (!spiralSvg) return

  const innerWrap = spiralSvg.querySelector('#wrapInner'),
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
      trigger: document.querySelector('body'),
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })

  // Scroll-driven base rotation on wrappers (wobble continues inside)
  timeline.to(innerWrap, { rotation: 260 }, 0)
  timeline.to(midWrap, { rotation: -220 }, 0)
  timeline.to(outerWrap, { rotation: 180 }, 0)

  // Continuous subtle wobble (-10deg to 10deg)
  //   gsap.set([inner, mid, outer], { rotation: -5 })
  //   gsap.to(inner, {
  //     rotation: 5,
  //     duration: 3,
  //     repeat: -1,
  //     yoyo: true,
  //     ease: 'sine.inOut',
  //   })
  //   gsap.to(mid, {
  //     rotation: 5,
  //     duration: 2.6,
  //     repeat: -1,
  //     yoyo: true,
  //     ease: 'sine.inOut',
  //   })
  //   gsap.to(outer, {
  //     rotation: 5,
  //     duration: 3.4,
  //     repeat: -1,
  //     yoyo: true,
  //     ease: 'sine.inOut',
  //   })
}
