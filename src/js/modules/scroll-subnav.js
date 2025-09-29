import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function () {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.normalizeScroll(true)

  const sections = gsap.utils.toArray('.HomeSection--subnav')

  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        id: section.id,
        trigger: section,
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    })

    const sectionSubMenu = section.querySelector('.Subnav__Menu')
    const sectionSubMenuLinks = sectionSubMenu.querySelectorAll('a')
    const sectionSubSections = section.querySelectorAll('.Subnav__Section')

    // Update menu active state per subsection
    sectionSubSections.forEach((sectionSubSection) => {
      gsap.timeline({
        scrollTrigger: {
          id: sectionSubSection.id,
          trigger: sectionSubSection,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
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

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionSubSection,
          start: 'top top',
          end: 'bottom center',
        },
      })
    })

    // Pin Menu within its subnav section bounds
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom center',
        pin: sectionSubMenu,
        pinSpacing: false,
      },
    })
  })
}
