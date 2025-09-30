import skipLinkFocusFix from './modules/skip-link-focus-fix'
import spiral from './modules/spiral'
import smooth from './modules/smooth'
import countup from './modules/count-up'

import scrollBg from './modules/scroll-bg'
import scrollCentered from './modules/scroll-centered'
import scrollPortfolio from './modules/scroll-portfolio'
import scrollSubnav from './modules/scroll-subnav'
import scrollQuote from './modules/scroll-quote'
import scrollCaseStudy from './modules/scroll-case-study'
import gallery from './modules/gallery'
import scrollHeadings from './modules/scroll-headings'

skipLinkFocusFix()
smooth()

countup()
gallery()

// Scroll
scrollBg()
scrollCentered()
scrollPortfolio()
scrollSubnav()
scrollQuote()
scrollCaseStudy()

scrollHeadings()

// Set Spiral Last
spiral()
