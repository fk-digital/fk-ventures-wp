import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default function () {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  const headerProgress = document.querySelector('.Header__Progress')
  const homeSections = gsap.utils.toArray('.HomeSection')

  // create the smooth scroller FIRST!
  const smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
    onUpdate: (self) =>
      (headerProgress.style.width = `${Math.round(self.progress * 100)}%`),
  })

  // Parallax
  // smoother.effects('.CaseStudy__Images', { speed: 1.5, lag: 0 })

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
