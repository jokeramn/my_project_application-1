let myMap;
const modal = document.getElementById('modal')
const cross = document.querySelector('.modal__cross')

ymaps.ready(init);

function init() {
  myMap = new ymaps.Map("map", {
      center: [59.93, 30.30],
      zoom: 11,
      controls: ['zoomControl']
    }),
    addListeners()
}


function addListeners() {
  myMap.events.add('click', (event) => {
    let posX = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientX
    let posY = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientY
    
    modal.style.display = 'block'
    modal.style.top = `${posY}px`
    modal.style.left = `${posX}px`

    cross.addEventListener('click', () => {
      modal.style.display = 'none'
    })
  })

  const form = document.getElementById('reviewForm')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
  })

}