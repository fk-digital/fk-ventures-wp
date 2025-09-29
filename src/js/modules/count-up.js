import { CountUp } from 'countup.js'

export default function () {
  // Countup
  const CountUpNumbers = document.querySelectorAll('.CountUp__Number')
  if (CountUpNumbers) {
    CountUpNumbers.forEach((CountUpNumber) => {
      const CountUpNumberTarget = CountUpNumber.dataset.number
      const countUp = new CountUp(CountUpNumber, CountUpNumberTarget, {
        duration: 2,
        decimalPlaces: 0,
        enableScrollSpy: true,
        scrollSpyDelay: 300,
        scrollSpyOnce: false,
      })
    })
  }
}
