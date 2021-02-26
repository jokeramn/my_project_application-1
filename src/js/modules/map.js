class Map {
  constructor(mapId) {
    this.mapId = mapId;
    this.currentCoords = null;
    this.markersFromStorage = window.localStorage.getItem('markers');
  }
  async init() {
    await this.injectYMapsScript();
    await this.loadYMaps();
    this.initMap();
    this.addDocumentListeners();
  }
  injectYMapsScript() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=50f976f6-1098-4dca-a7bf-9028ad375a69&lang=ru_RU';
      document.body.appendChild(script);
      script.addEventListener('load', resolve);
    })
  }
  loadYMaps() {
    return new Promise((resolve) => ymaps.ready(resolve));
  }
  async postData(body = {}) {
    const res = await fetch('https://maps-reviews-e5dc7-default-rtdb.firebaseio.com/reviews.json', {
      method: 'post',
      body: JSON.stringify(body),
    });
    return await res.json();
  }
  async onClick(coords) {
    console.log(coords);
  }
  addDocumentListeners() {
    document.body.addEventListener('click', (evt) => {
      if (evt.target.id === 'add-review') {
        const name = document.getElementById('name');
        const place = document.getElementById('place');
        const comment = document.getElementById('comment');
        const formIsArr = [name.value, place.value, comment.value]
        const isValidate = formIsArr.every(value => value.trim().length > 0)
        if (!isValidate) {
          alert('не прошел валидацию');
        } else {
          const markerData = {
            name: name.value,
            place: place.value,
            comment: comment.value,
            coords: this.currentCoords,
          }
          window.localStorage.setItem('markers', JSON.stringify(
            this.markersFromStorage ? [...JSON.parse(this.markersFromStorage), markerData] : [markerData]));
          this.createPlacemark(this.currentCoords);
          this.closeBalloon();
          this.setBalloonContent()
        }
      }
    })
  }
  handleMapClick(evt) {
    const coords = evt.get('coords');
    const modal = document.getElementById('modal');
    const modalHtml = modal.innerHTML;
    this.openBalloon(coords, modalHtml);
  }
  initMap() {
    this.map = new ymaps.Map('map', {
      center: [59.57, 30.19],
      zoom: 8
    });
    this.clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true
      })

    if (this.markersFromStorage) {
      const markersJSON = JSON.parse(this.markersFromStorage);
      const markers = markersJSON.map(item => item.coords);
      markers.forEach((markerCoords) => this.createPlacemark(markerCoords));
      this.map.geoObjects.add(this.clusterer);
    }
    this.map.events.add(
      'click',
      (evt) => this.handleMapClick(evt)
    );
  }
  openBalloon(coords, content) {
    this.currentCoords = coords;
    this.map.balloon.open(coords, content);
  }
  setBalloonContent(content) {
    this.map.balloon.setData(content);
  }
  closeBalloon() {
    this.map.balloon.close();
    this.currentCoords = null;
  }
  handlePlacemarkClick(coords) {
    const markersJSON = JSON.parse(this.markersFromStorage)
    const marker = markersJSON.find(
      item => item.coords[0] === coords[0] &&
      item.coords[1] === coords[1]
    )
    const modal = document.getElementById('modal');
    const modalHtml = modal.innerHTML;
    const modalHeader = `<div class="modal__header">
      <div class="item">
        <div class="name">Name: ${marker.name}</div>
        <div class="place">Place: ${marker.place}</div>
        <div class="comment">Comment: ${marker.comment}</div>
      </div>
    </div>`
    this.openBalloon(coords, `${modalHeader}${modalHtml}`)

  }

  createPlacemark(coords) {
    const placemark = new ymaps.Placemark(coords);
    placemark.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.handlePlacemarkClick(coords);
    });
    this.clusterer.add(placemark);
  }



}
const map = new Map('map');
map.init();