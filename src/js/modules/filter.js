export default function () {
  const LocationFilters = document.querySelectorAll('.Location__Filter')
  const LocationAreas = document.querySelectorAll('.Locations__Area')

  LocationFilters.forEach((LocationFilter) => {
    LocationFilter.addEventListener('click', (e) => {
      showAllAreas()
      document
        .getElementById(`#${e.target.getAttribute('data-area')}`)
        .classList.add('hidden')
    })
  })

  function showAllAreas() {
    LocationAreas.forEach((LocationArea) => {
      LocationArea.classList.remove('hidden')
    })
  }
}
