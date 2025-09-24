import { gsap } from 'gsap'

export default function () {
  const galleries = document.querySelectorAll('.Gallery')
  if (galleries) {
    galleries.forEach((gallery) => {
      const imgs = gsap.utils.toArray('img', gallery)
      const next = 3 // time to change
      const fade = 1.5 // fade time

      //only for the first
      gsap.set(imgs[0], { autoAlpha: 1 })

      function crossfade() {
        const action = gsap
          .timeline()
          .to(imgs[0], { autoAlpha: 0, duration: fade })
          .to(imgs[1], { autoAlpha: 1, duration: fade }, 0)

        imgs.push(imgs.shift())
        // start endless run
        gsap.delayedCall(next, crossfade)
      }

      gsap.delayedCall(next, crossfade)
    })
  }
}
