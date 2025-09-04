const body = document.querySelector('body'),
  siteNav = document.querySelector('.MainNav'),
  menuButton = document.querySelector('.MenuToggle'),
  menuCloseButton = document.querySelector('.MenuToggleClose'),
  subNavToggles = document.querySelectorAll('.SubToggle'),
  backButtons = document.querySelectorAll('.BackButton'),
  mainNavOverlay = document.querySelector('.MainNavOverlay')

export function menu() {
  menuButton.addEventListener('click', (e) => {
    const menuState = e.target.getAttribute('aria-expanded')
    if (menuState == 'true') {
      menuClose()
    } else {
      menuOpen()
    }
  })

  menuCloseButton.addEventListener('click', (e) => {
    menuClose()
  })

  subNavToggles.forEach((subNavToggle) => {
    subNavToggle.addEventListener('click', (e) => {
      const subPanelID = e.target.getAttribute('data-sub-menu'),
        subPanelEl = document.getElementById(subPanelID)
      subPanelOpen(subPanelEl)
    })
  })

  backButtons.forEach((backButton) => {
    backButton.addEventListener('click', (e) => {
      const subPanelID = e.target.getAttribute('data-sub-menu'),
        subPanelEl = document.getElementById(subPanelID)
      subPanelClose(subPanelEl)
    })
  })

  mainNavOverlay.addEventListener('click', (e) => {
    menuClose()
  })
}

export function menuOpen() {
  body.classList.add('nav-open')
  siteNav.setAttribute('aria-expanded', 'true')
  menuButton.setAttribute('aria-expanded', 'true')
  mainNavOverlay.setAttribute('aria-expanded', 'true')
}

export function menuClose() {
  body.classList.remove('nav-open')
  siteNav.setAttribute('aria-expanded', 'false')
  menuButton.setAttribute('aria-expanded', 'false')
  mainNavOverlay.setAttribute('aria-expanded', 'false')
}

export function subPanelOpen(el) {
  el.setAttribute('aria-expanded', 'true')
}

export function subPanelClose(el) {
  el.setAttribute('aria-expanded', 'false')
}

export function closeAllMenus() {
  menuClose()
  const allSubMenus = document.querySelectorAll('[data-sub-menu]')
  allSubMenus.forEach((allSubMenu) => {
    allSubMenu.setAttribute('aria-expanded', 'false')
  })
}
