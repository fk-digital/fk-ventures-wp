import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const caseStudySections = gsap.utils.toArray('.HomeSection--case-study')
  const finalScale = 1

  let mm = gsap.matchMedia(),
    breakPoint = 960

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions

      caseStudySections.forEach((section) => {
        const caseStudyCol = section.querySelector('.CaseStudy')
        const caseStudyBlock = section.querySelector('.CaseStudy__Block')
        const imageColumn = section.querySelector('.CaseStudy__Images')
        const mediaEl = section.querySelector('.CaseStudy__Media')
        const imageItems = gsap.utils.toArray('.CaseStudy__ImageItem img')
        // const scrollAmount = 4000

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

          CaseStudyTl.to(caseStudyBlock, {
            scrollTrigger: {
              start: 'top top',
              end: 'bottom bottom',
              trigger: caseStudyCol,
              pin: true,
              anticipatePin: 1,
              pinSpacer: false,
              pinSpacing: false,
              onEnter: () => {
                window.dispatchEvent(new Event('resize'))
              },
            },
          })

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
                // markers: true,
              },
            })
          })
        } else {
          // If Mobile

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
      })
    },
  )
}
