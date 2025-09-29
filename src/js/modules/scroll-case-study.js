import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)

  const caseStudySections = gsap.utils.toArray('.HomeSection--case-study')
  const finalScale = 1

  caseStudySections.forEach((section) => {
    const imageColumn = section.querySelector('.CaseStudy__Images')
    const mediaEl = section.querySelector('.CaseStudy__Media')
    const imageItems = section.querySelectorAll('.CaseStudy__ImageItem')
    gsap.set(imageColumn, { yPercent: '100' })

    // Ensure images scale from center
    if (imageItems && imageItems.length) {
      gsap.set(imageItems, { transformOrigin: '50% 50%' })
    }
    // let scrollAmount = window.innerHeight * 2
    const scrollAmount = 4000

    const CaseStudyTl = gsap.timeline({
      scrollTrigger: {
        id: section.id,
        trigger: section,
        pin: true,
        pinSpacer: true,
        start: 'center center',
        end: `+=${scrollAmount}`,
        scrub: true,
        onEnter: () => {
          section.classList.add('is-visible')
        },
      },
    })

    CaseStudyTl.to(imageColumn, {
      yPercent: '-100',
    })

    // Scale items based on proximity to the media column's vertical center (coverflow-like)
    const updateScaleByCenter = () => {
      if (!mediaEl || !imageItems || !imageItems.length) return
      const mediaRect = mediaEl.getBoundingClientRect()
      const centerY = mediaRect.top + mediaRect.height / 2
      const maxDistance = mediaRect.height / 2 || 1

      imageItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect()
        const itemCenter = itemRect.top + itemRect.height / 2
        // Once an item reaches/passes the center line, keep it at max scale
        if (itemCenter <= centerY) {
          gsap.set(item, { scale: finalScale, filter: 'blur(0)' })
          return
        }
        const distance = itemCenter - centerY
        const t = Math.min(distance / maxDistance, 1)
        // finalScale at center → 0.75 at far edge
        const scale = finalScale - 0.25 * t
        const blur = 4 * t
        gsap.set(item, { scale, filter: `blur(${blur}px)` })
      })
    }

    ScrollTrigger.create({
      trigger: imageColumn,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: updateScaleByCenter,
      onRefresh: updateScaleByCenter,
    })

    // initial call post layout
    requestAnimationFrame(updateScaleByCenter)
  })
}
