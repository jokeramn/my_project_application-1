(()=>{var e={823:()=>{new class{constructor(e){this.mapId=e,this.currentCoords=null,this.markersFromStorage=window.localStorage.getItem("markers")}async init(){await this.injectYMapsScript(),await this.loadYMaps(),this.initMap(),this.addDocumentListeners()}injectYMapsScript(){return new Promise((e=>{const t=document.createElement("script");t.src="https://api-maps.yandex.ru/2.1/?apikey=50f976f6-1098-4dca-a7bf-9028ad375a69&lang=ru_RU",document.body.appendChild(t),t.addEventListener("load",e)}))}loadYMaps(){return new Promise((e=>ymaps.ready(e)))}async postData(e={}){const t=await fetch("https://maps-reviews-e5dc7-default-rtdb.firebaseio.com/reviews.json",{method:"post",body:JSON.stringify(e)});return await t.json()}async onClick(e){console.log(e)}addDocumentListeners(){document.body.addEventListener("click",(e=>{if("add-review"===e.target.id){const e=document.getElementById("name"),t=document.getElementById("place"),a=document.getElementById("comment");if([e.value,t.value,a.value].every((e=>e.trim().length>0))){const o={name:e.value,place:t.value,comment:a.value,coords:this.currentCoords};window.localStorage.setItem("markers",JSON.stringify(this.markersFromStorage?[...JSON.parse(this.markersFromStorage),o]:[o])),this.createPlacemark(this.currentCoords),this.closeBalloon(),this.setBalloonContent()}else alert("не прошел валидацию")}}))}handleMapClick(e){const t=e.get("coords"),a=document.getElementById("modal").innerHTML;this.openBalloon(t,a)}initMap(){this.map=new ymaps.Map("map",{center:[59.57,30.19],zoom:8}),this.clusterer=new ymaps.Clusterer({clusterDisableClickZoom:!0}),this.markersFromStorage&&(JSON.parse(this.markersFromStorage).map((e=>e.coords)).forEach((e=>this.createPlacemark(e))),this.map.geoObjects.add(this.clusterer)),this.map.events.add("click",(e=>this.handleMapClick(e)))}openBalloon(e,t){this.currentCoords=e,this.map.balloon.open(e,t)}setBalloonContent(e){this.map.balloon.setData(e)}closeBalloon(){this.map.balloon.close(),this.currentCoords=null}handlePlacemarkClick(e){const t=JSON.parse(this.markersFromStorage).find((t=>t.coords[0]===e[0]&&t.coords[1]===e[1])),a=document.getElementById("modal").innerHTML,o=`<div class="modal__header">\n      <div class="item">\n        <div class="name">Name: ${t.name}</div>\n        <div class="place">Place: ${t.place}</div>\n        <div class="comment">Comment: ${t.comment}</div>\n      </div>\n    </div>`;this.openBalloon(e,`${o}${a}`)}createPlacemark(e){const t=new ymaps.Placemark(e);t.events.add("click",(e=>{const t=e.get("target").geometry.getCoordinates();this.handlePlacemarkClick(t)})),this.clusterer.add(t)}}("map").init()}},t={};function a(o){if(t[o])return t[o].exports;var s=t[o]={exports:{}};return e[o](s,s.exports,a),s.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";a(823)})()})();