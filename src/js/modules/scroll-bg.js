import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const elements = document.querySelectorAll('[data-bg]')

  elements.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => (document.body.dataset.bg = el.dataset.bg),
      onLeave: () => (document.body.dataset.bg = el.dataset.bg),
      onEnterBack: () => (document.body.dataset.bg = el.dataset.bg),
      onLeaveBack: () => (document.body.dataset.bg = el.dataset.bg),
    })
  })
}
