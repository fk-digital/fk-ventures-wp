import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default function () {
  gsap.registerPlugin(ScrollTrigger, SplitText)

  const headings = gsap.utils.toArray('.AnimatedHeading')

  headings.forEach((heading) => {
    const split = new SplitText(heading, { type: 'words, chars' })
    const chars = split.chars
    gsap.from(chars, {
      y: 10,
      autoAlpha: 0,
      stagger: 0.05,
      ease: 'power1.out',
      delay: 0.25,
      scrollTrigger: {
        trigger: heading,
        start: 'top center',
      },
    })
  })
}
