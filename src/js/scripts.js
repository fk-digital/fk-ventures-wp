import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// import spiral from './modules/spiral'
import smooth from './modules/smooth'
import countup from './modules/count-up'

import scrollCentered from './modules/scroll-centered'
import scrollPortfolio from './modules/scroll-portfolio'
import scrollSubnav from './modules/scroll-subnav'
import scrollCaseStudy from './modules/scroll-case-study'
import gallery from './modules/gallery'
import scrollBG from './modules/scroll-bg'
import cta from './modules/cta'

gsap.registerPlugin(ScrollTrigger)

smooth()

if (document.body.classList.contains('home')) {
  // Wait for fonts to load
  document.fonts.ready.then(function () {
    // Scroll Sections in Order on Home Page
    scrollCentered(document.getElementById('brand-led'))
    scrollCentered(document.getElementById('fund'))
    scrollCentered(document.getElementById('investment'))
    scrollPortfolio(document.getElementById('portfolio'))
    scrollCentered(document.getElementById('soon'))
    scrollCentered(document.getElementById('what'))
    scrollCentered(document.getElementById('why'))
    scrollCaseStudy(document.getElementById('heidi'))
    scrollSubnav(document.getElementById('about'))
    scrollSubnav(document.getElementById('the-power-of-brand'))

    // Refresh to setup post-pin-spacer layout
    ScrollTrigger.refresh()

    scrollBG()
    countup()
    gallery()
    // cta()
  })
} else {
  scrollBG()
  countup()
  gallery()
  // cta()
}

// fonts.ready can resolve a frame or two before the browser actually
// repaints with the swapped-in font, so heading-heavy sections can still
// grow/shrink after our triggers were measured. Refresh again once
// everything (including fonts) has settled.
window.addEventListener('load', () => ScrollTrigger.refresh())
