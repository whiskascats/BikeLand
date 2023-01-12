import L from 'leaflet'

let openStreetMap = null
let markers = {}
let markerList = {}
export function createMap() {
  openStreetMap = L.map('map', {
    center: [24.052137, 120.555235],
    zoom: 10,
    zoomControl: false
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="">Mapbox</a>',
    maxZoom: 20,
  }).addTo(openStreetMap)

  // markers = new L.MarkerClusterGroup({
  //   spiderfyOnMaxZoom: true,
  //   showCoverageOnHover: false,
  //   zoomToBoundsOnClick: true
  // }).addTo(openStreetMap);
}