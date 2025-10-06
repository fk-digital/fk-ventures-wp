import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function (section) {
  gsap.registerPlugin(ScrollTrigger)

  const sectionSubMenuLinks = section.querySelectorAll('.Subnav__MenuList a')
  const sectionSubSections = section.querySelectorAll('.Subnav__Section')

  gsap.from(section, {
    scrollTrigger: {
      id: section.id,
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        section.classList.add('is-visible')
        // console.log(`${section.id} background: ${section.dataset.bg}`)
        document.body.dataset.bg = section.dataset.bg
      },
      onEnterBack: () => {
        document.body.dataset.bg = section.dataset.bg
      },
    },
  })

  // Update menu active state per subsection
  sectionSubSections.forEach((sectionSubSection) => {
    gsap.set(sectionSubSection, { alpha: 0, x: 10 })

    gsap.from(sectionSubSection, {
      scrollTrigger: {
        id: sectionSubSection.id,
        trigger: sectionSubSection,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onEnter: () => {
          gsap.to(sectionSubSection, {
            alpha: 1,
            ease: 'power1.out',
            duration: 0.5,
          })

          const sectionSubSectionId = sectionSubSection.id
          sectionSubMenuLinks.forEach((sectionSubMenuLink) => {
            if (sectionSubMenuLink.dataset.section == sectionSubSectionId) {
              sectionSubMenuLink.classList.add('active')
            } else {
              sectionSubMenuLink.classList.remove('active')
            }
          })
        },
        onEnterBack: () => {
          sectionSubSection.classList.add('is-visible')
          const sectionSubSectionId = sectionSubSection.id
          sectionSubMenuLinks.forEach((sectionSubMenuLink) => {
            if (sectionSubMenuLink.dataset.section == sectionSubSectionId) {
              sectionSubMenuLink.classList.add('active')
            } else {
              sectionSubMenuLink.classList.remove('active')
            }
          })
        },
      },
    })
  })
}
