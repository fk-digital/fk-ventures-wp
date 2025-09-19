import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

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
}
