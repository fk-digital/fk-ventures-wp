import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function (section) {
  gsap.registerPlugin(ScrollTrigger)

  let mm = gsap.matchMedia(),
    breakPoint = 960

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions

      gsap.from(section, {
        scrollTrigger: {
          id: section.id,
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            section.classList.add('is-visible')
            document.body.dataset.bg = section.dataset.bg
          },
          onEnterBack: () => {
            document.body.dataset.bg = section.dataset.bg
          },
        },
      })

      const imageColumn = section.querySelector('.CaseStudy__Images')
      const mediaEl = section.querySelector('.CaseStudy__Media')
      const imageItems = gsap.utils.toArray(
        section.querySelectorAll('.CaseStudy__ImageItem img'),
      )

      if (isDesktop) {
        // If Desktop

        // Ensure images scale from center
        if (imageItems && imageItems.length) {
          gsap.set(imageItems, {
            transformOrigin: '50% 50%',
            scale: 0.5,
            filter: `blur(4px)`,
          })
        }

        const CaseStudyTl = gsap.timeline()

        imageItems.forEach((imageItem) => {
          CaseStudyTl.to(imageItem, {
            scale: 1,
            filter: `blur(0px)`,
            scrollTrigger: {
              trigger: imageItem,
              start: 'top bottom',
              end: 'bottom center',
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
        })
      } else {
        // If Mobile

        if (!imageColumn || !mediaEl) {
          return
        }

        const getMobileScrollAmount = () =>
          Math.max(0, imageColumn.scrollWidth - mediaEl.clientWidth)

        const mobileTL = gsap.timeline({
          scrollTrigger: {
            trigger: mediaEl,
            pin: true,
            pinSpacer: true,
            start: 'center center',
            end: () => `+=${getMobileScrollAmount()} center`,
            scrub: true,
          },
        })

        mobileTL.to(imageColumn, {
          x: () => -getMobileScrollAmount(),
        })
      }
    },
  )
}
