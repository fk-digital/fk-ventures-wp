import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const body = document.body
  const colorSections = gsap.utils.toArray('.HomeSection')

  // Bg Colour
  colorSections.forEach((section) => {
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
}
