import L from 'leaflet';
import iconSetFn from '@/composition-api/icons.js';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

let openStreetMap = null
let markers = []
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
  
  getLocation()
  // markers = new L.MarkerClusterGroup({
  //   spiderfyOnMaxZoom: true,
  //   showCoverageOnHover: false,
  //   zoomToBoundsOnClick: true
  // }).addTo(openStreetMap);
}
export function getLocation() {
  const succFn = async function(position) {
    const dataStore = useDataStore();
    const { userLocation } = storeToRefs(dataStore);
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    userLocation.value = [lat, lng];
    moveToPosition([lat, lng])
    merkerSetUser([lat, lng])
  };
  const errFn = function() {
    console.log('定位失敗')
  }
  const options = {
    maximumAge: 60000,
    timeout: 45000
  };
  navigator.geolocation.getCurrentPosition(succFn, errFn, options);
}
export function moveToPosition(data) {
  // const userData = useUserData()
  // const { slidebar } = storeToRefs(userData)
  // slidebar.value = true
  openStreetMap.panTo(data).setView(data,17)
}
/**
 * 放置使用者位置圖釘
 * @param {*} data 
 */
export function merkerSetUser(data) {
  let userIcon = L.icon(iconSetFn('users'))
  L.marker(data, {icon: userIcon})
  .bindPopup(`<p>目前位置</p>`)
  .addTo(openStreetMap)
  .openPopup()
}
export function markerSetNerby(dataList) {
  const dataStore = useDataStore();
  const { chooseStation } = storeToRefs(dataStore);
  removeMerkers();
  dataList.forEach(item => {
    let icon = L.divIcon(iconSetting(item));
    if(item.StationID !== chooseStation.value.StationID) {
      markers.push(
        L.marker([item.StationPosition.PositionLat,item.StationPosition.PositionLon], {icon: icon})
        .bindPopup(popUpSetting(item))
        .addTo(openStreetMap)
      )
    } else {
      markers.push(
        L.marker([item.StationPosition.PositionLat,item.StationPosition.PositionLon], {icon: icon})
        .bindPopup(popUpSetting(item))
        .addTo(openStreetMap)
        .openPopup()
      )
    }

  })
}

export function removeMerkers() {
  markers.forEach(item => {
    openStreetMap.removeLayer(item)
  })
}

export function countColor(count) {
  let className = ''
  
  return className
}
function popUpSetting (item) {  
  const dataStore = useDataStore();
  const { userLocation } = storeToRefs(dataStore);
  let html = ''
  html = `
  <p>${item.StationName.Zh_tw}</p>
  <div class="d-flex justify-content-between gap-5">
    <div class="d-flex box">
      <div class="${item.AvailableRentBikes>5 ? '' : item.AvailableRentBikes>0 ? 'danger' : 'none'}">
        <i class="fas fa-bicycle"></i>
        ${item.AvailableRentBikes}
      </div>
      <div class="${item.AvailableReturnBikes>5 ? '' : item.AvailableReturnBikes>0 ? 'danger' : 'none'}">
        <i class="fas fa-parking"></i>
        ${item.AvailableReturnBikes}
      </div>
    </div>
    <div class="d-flex align-items-center ${userLocation.value.length>0 ? '' : 'd-none'}" >    
      <div class="distance">
        <i class="fas fa-map-marker-alt"></i>
        距離${distance(item.StationPosition.PositionLat,item.StationPosition.PositionLon,userLocation.value[0],userLocation.value[1])}
      </div>
    </div>
  </div>
  `
  return html
}
function iconSetting (data) {
  const dataStore = useDataStore()
  const { bikeTab } = storeToRefs(dataStore)
  let count = 0
  let iconType = ''
  bikeTab.value == 1 
  ? count = data.AvailableRentBikes
  : count = data.AvailableReturnBikes
  count > 5
  ? iconType = 'enough'
  : count > 0 
  ? iconType = 'no-enough'
  : iconType = 'none'
  return iconSetFn(iconType,count)
}

export function distance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
  }
  else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344 //公里
      dist < 1 
      ? dist = Math.floor(dist * 1000) + ' 公尺'
      : dist = dist.toFixed(2) + ' 公里'
      return dist;
  }
}