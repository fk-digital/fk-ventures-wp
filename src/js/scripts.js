import skipLinkFocusFix from './modules/skip-link-focus-fix'
import spiral from './modules/spiral'
import smooth from './modules/smooth'
import countup from './modules/count-up'

import scrollCentered from './modules/scroll-centered'
import scrollPortfolio from './modules/scroll-portfolio'
import scrollSubnav from './modules/scroll-subnav'
import scrollCaseStudy from './modules/scroll-case-study'
import gallery from './modules/gallery'
import scrollHeadings from './modules/scroll-headings'
import scrollBG from './modules/scroll-bg'

skipLinkFocusFix()
smooth()
countup()
gallery()

// Scroll Stuff In order
spiral()
scrollHeadings()

// Scroll Sections in Order
scrollCentered(document.getElementById('help'))
scrollCentered(document.getElementById('building-brand'))
scrollCentered(document.getElementById('funded'))
scrollCentered(document.getElementById('investment'))
scrollPortfolio(document.getElementById('portfolio'))
scrollCentered(document.getElementById('soon'))
scrollCentered(document.getElementById('what'))
scrollCentered(document.getElementById('why'))
scrollCaseStudy(document.getElementById('heidi'))
scrollSubnav(document.getElementById('about'))
scrollCaseStudy(document.getElementById('carifit'))
scrollSubnav(document.getElementById('the-power-of-brand'))
scrollBG(document.getElementById('register-interest'))
