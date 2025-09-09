// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// export default function initializeSpiralAnimation() {
//   const section = document.querySelector('.SpiralDemo')
//   if (!section) return

//   // Ensure plugin is registered (in case module order changes)
//   gsap.registerPlugin(ScrollTrigger)

//   const svg = section.querySelector('svg')
//   if (!svg) return

//   const spiral = section.querySelector('.Spiral')
//   if (!spiral) return

//   // Handle headline span swaps based on scroll progress
//   const textSpans = Array.from(spiral.querySelectorAll('.Sprial__Text span'))
//   let currentTextIndex = -1
//   const setActiveTextIndex = (index) => {
//     if (!textSpans.length) return
//     if (index === currentTextIndex) return
//     textSpans.forEach((el, i) => el.classList.toggle('is-active', i === index))
//     currentTextIndex = index
//   }
//   // Show first span on load
//   setActiveTextIndex(0)

//   const inner = svg.querySelector('#inner')
//   const mid = svg.querySelector('#mid')
//   const outer = svg.querySelector('#outer')
//   if (!inner || !mid || !outer) return

//   // Wrap each group in a container <g> so we can
//   // apply scroll-driven rotation on the wrapper and
//   // a continuous wobble on the inner group independently.
//   const wrapGroup = (target, className) => {
//     const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g')
//     wrapper.setAttribute('class', className)
//     target.parentNode.insertBefore(wrapper, target)
//     wrapper.appendChild(target)
//     return wrapper
//   }

//   const innerWrap = wrapGroup(inner, 'spiral-wrap spiral-wrap--inner')
//   const midWrap = wrapGroup(mid, 'spiral-wrap spiral-wrap--mid')
//   const outerWrap = wrapGroup(outer, 'spiral-wrap spiral-wrap--outer')

//   gsap.set([inner, mid, outer, innerWrap, midWrap, outerWrap], {
//     transformOrigin: '50% 50%',
//   })

//   // Continuous subtle wobble (-10deg to 10deg)
//   gsap.set([inner, mid, outer], { rotation: -10 })
//   gsap.to(inner, {
//     rotation: 10,
//     duration: 3,
//     repeat: -1,
//     yoyo: true,
//     ease: 'sine.inOut',
//   })
//   gsap.to(mid, {
//     rotation: 10,
//     duration: 2.6,
//     repeat: -1,
//     yoyo: true,
//     ease: 'sine.inOut',
//   })
//   gsap.to(outer, {
//     rotation: 10,
//     duration: 3.4,
//     repeat: -1,
//     yoyo: true,
//     ease: 'sine.inOut',
//   })

//   const timeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: 'body',
//       start: 'top top',
//       end: '+=3000px',
//       pin: spiral,
//       scrub: true,
//       // markers: true,
//       onUpdate: (self) => {
//         // Swap text at ~0%, 33%, 66% progress
//         const p = self.progress
//         let index = 0
//         if (p >= 2 / 3) index = 2
//         else if (p >= 1 / 3) index = 1
//         setActiveTextIndex(index)
//       },
//     },
//   })

//   // Scroll-driven base rotation on wrappers (wobble continues inside)
//   timeline.to(innerWrap, { rotation: 70 }, 0)
//   timeline.to(midWrap, { rotation: -70 }, 0)
//   timeline.to(outerWrap, { rotation: 70 }, 0)
// }
