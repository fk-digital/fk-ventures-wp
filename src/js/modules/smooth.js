import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const headerProgress = document.querySelector('.Header__Progress')

  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis({
    anchors: true,
  })

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on('scroll', ScrollTrigger.update)

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000) // Convert time from seconds to milliseconds
  })

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0)

  // Progress
  // Listen for the scroll event and log the event data
  lenis.on('scroll', (e) => {
    headerProgress.style.width = `${(lenis.progress * 100).toFixed(2)}%`
  })
}
