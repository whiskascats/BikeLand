import { defineStore } from 'pinia';
import { useCookies } from "vue3-cookies";
import useApi from '@/composition-api/api'
const { cookies } = useCookies()
export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    userLocation: [],
    searchParams: {
      city: '',
      ks: ''
    },
    bikeTab: 1,
    attractionsTab: 1,
    loading: false,
    cityDataList: [],
    cityBikeDataList: [],
    chooseStation: {},
    chooseNearbyBikeDataList: [],
    chooseAttraction: {},
    open: false,
  }),
  actions: {
    async getToken() {
      let token
      await useApi('post', 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token', {
        'grant_type': 'client_credentials',
        'client_id': 'toby010203222-c0c00b56-0762-4527',
        'client_secret': '6ddbf6bf-0d22-4fe5-b8c1-5d623e4d5a6d'
      })
      .then(res => {
        token = res.data.access_token
      })
      return {
        token
      }
    },
    async getCityData() {
      let cityData
      await useApi('get','./city.json')
      .then(res => {
        this.$state.cityDataList = res.data
        cityData = res.data
      })
      return {
        cityData
      }
    },
    async getUserCityName(lat,lon) {
      let address
      await useApi('get',`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then(res => {
        address = res.data.address
      })
      return address
    },
    async getCityBikeData(cityName) {
      let stationList = []
      let countList = []
      await useApi('get',`https://tdx.transportdata.tw/api/basic/v2/Bike/Station/City/${cityName}?$top=5000&$format=JSON`)
      .then(res => {
        stationList = res.data
      })
      await useApi('get',`https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/${cityName}?$top=5000&$format=JSON`)
      .then(res => {
        countList = res.data
      })
      stationList.forEach(item => {
        let item2 = countList.find(item2 => item.StationID === item2.StationID)
        item = Object.assign(item,item2)
      })
      return stationList
    },
    async getNearbyBikeData(location) {
      let stationList = []
      let countList = []
      await useApi('get',`https://tdx.transportdata.tw/api/advanced/v2/Bike/Station/NearBy?$top=30&$spatialFilter=nearby(${location},1000)&$format=JSON`)
      .then(res => {
        stationList = res.data
      })
      await useApi('get',`https://tdx.transportdata.tw/api/advanced/v2/Bike/Availability/NearBy?$top=30&$spatialFilter=nearby(${location},1000)&$format=JSON`)
      .then(res => {
        countList = res.data
      })
      stationList.forEach(item => {
        let item2 = countList.find(item2 => item.StationID === item2.StationID)
        item = Object.assign(item,item2)
      })
      return stationList
    },
    async getBikeRouteData(cityName) {
      let routeData = []
      await useApi('get',`https://tdx.transportdata.tw/api/basic/v2/Cycling/Shape/City/${cityName}?$top=5000&$format=JSON`)
      .then(res => {
        routeData = res.data;
      })
      return routeData
    },
    async getAttractionsData(cityName) {
      let attractionsData = []      
      await useApi('get',`https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${cityName}?$top=5000&$format=JSON`)
      .then(res => {
        attractionsData  = res.data;
      })
      return attractionsData
    },
    async getRestaurantData(cityName) {
      let restaurantData = []      
      await useApi('get',`https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${cityName}?$top=5000&$format=JSON`)
      .then(res => {
        restaurantData  = res.data;
      })
      return restaurantData
    },
    async getAttractionsMoreInfo(query) {
      let attractionsData = []      
      await useApi('get',`https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?$top=1&$format=JSON&$filter=${query}`)
      .then(res => {
        attractionsData  = res.data;
      })
      return attractionsData
    },
  }

})
