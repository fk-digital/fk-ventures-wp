import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const triggers = document.querySelectorAll('.FramedCta')

  triggers.forEach((el) => {
    const letterF = el.querySelector('.LetterF')
    const letterK = el.querySelector('.LetterK')

    if (!letterF || !letterK) return

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: el,
        start: 'center bottom',
        end: 'center center',
        scrub: true,
      },
    })

    tl.fromTo(
      letterF,
      { '--letter-shift': '-30vw' },
      { '--letter-shift': '0vw', duration: 1 },
      0,
    ).fromTo(
      letterK,
      { '--letter-shift': '30vw' },
      { '--letter-shift': '0vw', duration: 1 },
      0,
    )
  })
}
