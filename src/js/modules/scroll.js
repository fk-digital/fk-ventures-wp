import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function scroll() {
  // Register scroll trigger
  gsap.registerPlugin(ScrollTrigger)
  gsap.core.globals('ScrollTrigger', ScrollTrigger)

  // Vars
  const body = document.body,
    appearSections = gsap.utils.toArray('[data-appear]')

  // Add Scroll Class
  body.classList.add('scroll-active')

  // Media Queries
  let mm = gsap.matchMedia()
  const breakPoint = 960

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions

      // Visible Class on Animate Sections
      appearSections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            start: `104px ${isDesktop ? '80%' : '90%'}`,
            end: `bottom 10%`,
            trigger: section,
            // markers: true,
            onEnter: () => {
              section.classList.add('is-visible')
            },
          },
        })
      })

      // Scroll Direction
      gsap.to(body, {
        scrollTrigger: {
          trigger: body,
          scrub: true,
          onUpdate: (self) => {
            if (self.direction !== self.prevDirection) {
              if (self.direction > 0) {
                body.dataset.direction = 'down'
              } else {
                body.dataset.direction = 'up'
              }
              self.prevDirection = self.direction
            }
            if (self.scroll.v >= 200) {
              body.classList.add('is-scrolled')
            } else {
              body.classList.remove('is-scrolled')
            }
          },
        },
      })
    },
  )
}
