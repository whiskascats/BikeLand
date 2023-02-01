<template>  
  <SideBar :cardList="cardList" tab="0" @changeCity="changeCity" @changeTab="changeTab" />
</template>
<script setup>
import SideBar from '@/components/sidebar.vue';
import { ref, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { removeLayers, setRoutePolyline } from '@/composition-api/map.js';

const dataStore = useDataStore();
const { userLocation, searchParams, cityDataList } = storeToRefs(dataStore);
const cardList = ref([]);
onMounted(async() => {
  removeLayers()
  if(userLocation.value.length>0) {    
    const address = await dataStore.getUserCityName(userLocation.value[0], userLocation.value[1]);
    // 有分縣(county)和市(city)
    if('city' in address || 'county' in address) {
      const userCity = cityDataList.value.find(item => {
        return item.city_name == address.city || item.city_name == address.county
      })
      if(userCity) {
        changeCity(userCity.city_value)
        searchParams.value.city = userCity.city_value
      }
    }
  }
})

const changeCity = async(city) => {
  const data = await dataStore.getBikeRouteData(city);
  cardList.value = data;
}
const changeTab = () => {

}
</script>
