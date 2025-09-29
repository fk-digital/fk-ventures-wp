import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default function () {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  const headerProgress = document.querySelector('.Header__Progress')

  // create the smooth scroller FIRST!
  const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 2,
    effects: false,
    normalizeScroll: true,
    smoothTouch: 0.1,
    onUpdate: (self) => {
      headerProgress.style.width = `${Math.round(self.progress * 100)}%`
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
