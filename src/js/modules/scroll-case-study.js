import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const caseStudySections = gsap.utils.toArray('.HomeSection--case-study')

  caseStudySections.forEach((section) => {
    const imagesList = section.querySelector('.CaseStudy__Images')
    const imageItems = imagesList
      ? gsap.utils.toArray('.CaseStudy__ImageItem', imagesList)
      : []

    gsap.from(section, {
      scrollTrigger: {
        id: section.id,
        trigger: section,
        pin: true,
        pinSpacer: true,
        start: 'center center',
        end: () =>
          `+=${imageItems.length > 0 ? imageItems.length * 500 : 1000}`,
        scrub: true,
        // markers: true,
        onEnter: () => {
          section.classList.add('is-visible')
        },
      },
    })

    if (imagesList && imageItems.length > 0) {
      // Vertical translate of the list based on scroll to simulate carousel
      const itemGap = 24 // must match CSS gap
      const itemHeights = imageItems.map((el) => el.offsetHeight)
      const avgItemHeight =
        itemHeights.reduce((a, b) => a + b, 0) / imageItems.length || 0
      const step = avgItemHeight + itemGap
      const totalTravel = step * imageItems.length

      const wrapY = gsap.utils.wrap(-totalTravel, 0)

      gsap.to(imagesList, {
        y: () => -totalTravel,
        ease: 'none',
        modifiers: {
          y: (y) => wrapY(parseFloat(y)) + 'px',
        },
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: () => `+=${imageItems.length * 500}`,
          scrub: true,
        },
      })

      // Continuous focus/scale/blur based on distance to the media column's center
      const mediaEl = section.querySelector('.CaseStudy__Media') || imagesList
      const updateCenterState = () => {
        const mediaRect = mediaEl.getBoundingClientRect()
        const centerY = mediaRect.top + mediaRect.height / 2
        const maxDistance = mediaRect.height / 2

        imageItems.forEach((item) => {
          const itemRect = item.getBoundingClientRect()
          const itemCenter = itemRect.top + itemRect.height / 2
          const distance = Math.abs(itemCenter - centerY)
          const t = Math.min(distance / maxDistance, 1)
          const scale = 1 - 0.2 * t // 1 at center → 0.8 at edges
          const blur = 6 * t // 0px at center → 6px at edges

          gsap.set(item, {
            transformOrigin: '50% 50%',
            filter: `blur(${blur}px)`,
          })
        })
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: updateCenterState,
        onRefresh: updateCenterState,
      })
      // Initial call after layout
      requestAnimationFrame(updateCenterState)
    }
  })
}
