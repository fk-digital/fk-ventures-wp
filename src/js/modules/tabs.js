export function tabs() {
  const tabs = document.querySelectorAll('.TabGroup')

  tabs.forEach((tab) => {
    const tabButtons = document.querySelectorAll('.TabGroup__Button')
    const tabContents = document.querySelectorAll('.Tab')

    tabButtons.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault()
        const tabTarget = e.target.getAttribute('aria-controls')

        // Set Buttons
        setButtonStates(tabButtons, tabTarget)

        // Set Contents
        tabContents.forEach((tabContent) => {
          if (tabTarget == tabContent.id) {
            tabContent.classList.add('active')
            tabContent.setAttribute('aria-selected', 'true')
          } else {
            tabContent.classList.remove('active')
            tabContent.setAttribute('aria-selected', 'false')
          }
        })
      })
    })
  })

  function setButtonStates(tabButtons, targetButton) {
    tabButtons.forEach((button) => {
      if (targetButton == button.getAttribute('aria-controls')) {
        button.classList.add('active')
        button.setAttribute('aria-selected', 'true')
      } else {
        button.classList.remove('active')
        button.setAttribute('aria-selected', 'false')
      }
    })
  }
}
