import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default function (heading) {
  gsap.registerPlugin(ScrollTrigger, SplitText)

  const split = new SplitText(heading, { type: 'words, chars' })
  const chars = split.chars
  gsap.from(chars, {
    y: 10,
    autoAlpha: 0,
    stagger: 0.04,
    ease: 'power1.out',
    duration: 0.5,
    onStart: () => (heading.style.opacity = 1),
    onComplete: () => split.revert(),
  })
}
