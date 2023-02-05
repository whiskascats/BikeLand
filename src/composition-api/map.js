import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import iconSetFn from '@/composition-api/icons.js';
import Wkt from 'wicket';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import _ from 'lodash';

let openStreetMap = null
let myLayers = [];
let userMarker = null;
let markers = [];
let markers2 = [];
/**
 * 產生openstreetmap地圖
 */
export function createMap() {
  openStreetMap = L.map('map', {
    center: [24.052137, 120.555235],
    zoom: 10,
    zoomControl: false,
    attributionControl: false
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
  }).addTo(openStreetMap)
  
  getLocation()
}
/**
 * 取得使用者座標+設定圖釘
 */
export function getLocation() {
  if(userMarker) {
    userMarker.openPopup()
  }
  else {
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
}
/**
 * 移動到指定經緯度
 * @param {Array} data [緯度,經度]
 * @param {Number} level 畫面縮放比例
 */
export function moveToPosition(data,level = 17) {
  openStreetMap.panTo(data).setView(data,level)
}
/**
 * 放置使用者位置圖釘
 * @param {*} data 
 */
export function merkerSetUser(data) {
  let userIcon = L.icon(iconSetFn('users'))
  userMarker = L.marker(data, {icon: userIcon})
  .bindPopup(`<p>目前位置</p>`,{
    'className': 'bike-popup'
  })
  .addTo(openStreetMap)
  .openPopup()
}
export function markerSetNerby(dataList) {
  const dataStore = useDataStore();
  const { chooseStation } = storeToRefs(dataStore);
  removeLayers();

  if(!_.isEmpty(chooseStation.value)) {
    let iconTarget = L.divIcon(iconSetting(chooseStation.value));
    myLayers.push(
      L.marker([chooseStation.value.StationPosition.PositionLat,chooseStation.value.StationPosition.PositionLon], 
        {icon: iconTarget})
      .bindPopup(popUpSetting(chooseStation.value),{
        'className': 'bike-popup'
      })
      .addTo(openStreetMap)
      .openPopup()
    )
    // 過濾選擇的車站，避免重複
    dataList.filter(item => item.StationID !== chooseStation.value.StationID)
  }
  
  dataList.forEach(item => {
    let icon = L.divIcon(iconSetting(item));
    myLayers.push(
      L.marker([item.StationPosition.PositionLat,item.StationPosition.PositionLon], {icon: icon})
      .bindPopup(popUpSetting(item),{
        'className': 'bike-popup'
      })
      .addTo(openStreetMap)
    ) 
  })
}
/**
 * 清空圖層
 */
export function removeLayers() {
  myLayers.forEach(item => {
    openStreetMap.removeLayer(item)
  })
  openStreetMap.removeLayer(markers)
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
        距離${formatDistance(item.distance)}
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

    return dist;
  }
}
export function formatDistance(count) {
  count < 1 
  ? count = Math.floor(count * 1000) + ' 公尺'
  : count = count.toFixed(2) + ' 公里'
  return count
}
/**
 * 設定路線
 * @param {Object} item 
 */
export function setRoutePolyline(item) {
  removeLayers();
  const wicket = new Wkt.Wkt();
  wicket.read(item.Geometry);
  const geojsonFeature = wicket.toJson();
  myLayers.push(
    L.geoJSON(geojsonFeature,{
      style: {
        'color': '#E75578',
        'weight': 5,
        'opacity': .65
      }
    })
    .addTo(openStreetMap)
  )
  let start = geojsonFeature.coordinates[0][0].reverse();
  let end = geojsonFeature.coordinates.pop().pop().reverse();
  let routeIcon = L.icon(iconSetFn('route'));
  myLayers.push(
    L.marker(start,{icon: routeIcon})
    .bindPopup(`
      <p>起: ${item.RoadSectionStart || '資料建置中'}</p>
    `,{
      'autoClose': false,
      'className': 'route-popup'
    })
    .addTo(openStreetMap)
    .openPopup()
  )
  myLayers.push(
    L.marker(end,{icon: routeIcon})
    .bindPopup(`
      <p>迄: ${item.RoadSectionEnd || '資料建置中'}</p>
    `,{
      'autoClose': false,
      'className': 'route-popup'
    })
    .addTo(openStreetMap)
    .openPopup()
  )
  moveToPosition(start)
}
export function setIcon(data) {
  const dataStore = useDataStore()
  const { chooseAttraction } = storeToRefs(dataStore)
  removeLayers();
  markers2 = [];
  markers = L.markerClusterGroup();
  let routeIcon = L.icon(iconSetFn('route'));
  data.forEach(item => {
    let marker = L.marker([item.Position.PositionLat,item.Position.PositionLon],{icon: routeIcon})
    .bindPopup(`<p>${item.ScenicSpotName}</p>`)
    marker.on('click', function() {
      chooseAttraction.value = item;
    })
    markers.addLayer(marker);
    markers2.push(marker);
  })
  // let userIcon = L.icon(iconSetFn('users'))
  // markers.getLayers().slice().reverse()[0].setIcon(userIcon);
  openStreetMap.addLayer(markers);
}
export function attractionPopup(sid) {
  markers2[sid].openPopup();
}