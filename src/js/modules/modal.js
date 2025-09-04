export default function () {
  const modalTriggers = document.querySelectorAll('[data-modal]')

  modalTriggers.forEach((modalTrigger) => {
    const modalId = modalTrigger.dataset.modal,
      modal = document.getElementById(modalId),
      modalClose = modal.querySelector('.Modal__Close')

    modalTrigger.addEventListener('click', (e) => {
      e.preventDefault()
      modal.showModal()
    })

    modalClose.addEventListener('click', (e) => {
      e.preventDefault()
      modal.close('dismiss')
    })

    modal.addEventListener('click', ({ target: modal }) => {
      if (modal.nodeName === 'DIALOG') {
        modal.close('dismiss')
      }
    })
  })
}
