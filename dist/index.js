(()=>{var e={823:()=>{let e;const t=document.getElementById("modal"),n=document.querySelector(".modal__cross");ymaps.ready((function(){e=new ymaps.Map("map",{center:[59.93,30.3],zoom:11,controls:["zoomControl"]}),e.events.add("click",(e=>{let o=e.getSourceEvent().originalEvent.domEvent.originalEvent.clientX,r=e.getSourceEvent().originalEvent.domEvent.originalEvent.clientY;t.style.display="block",t.style.top=`${r}px`,t.style.left=`${o}px`,n.addEventListener("click",(()=>{t.style.display="none"}))})),document.getElementById("reviewForm").addEventListener("submit",(e=>{e.preventDefault()}))}))}},t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(823)})()})();