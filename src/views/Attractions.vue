<template>  
  <SideBar :cardList="cardList" :tab="attractionsTab" @changeCity="changeCity" @changeTab="changeTab" />
  <AttractionsInfo v-if="!_.isEmpty(chooseAttraction)" :key="chooseAttraction.ScenicSpotID" />
</template>
<script setup>
import SideBar from '@/components/sidebar.vue';
import AttractionsInfo from '@/components/attractionsInfo.vue';
import { ref, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { removeLayers, setIcon } from '@/composition-api/map.js';
import _ from 'lodash';

const dataStore = useDataStore();
const { userLocation, searchParams, cityDataList, attractionsTab, chooseAttraction } = storeToRefs(dataStore);
const cardList = ref([]);
onMounted(async() => {
  removeLayers()
  chooseAttraction.value = {}
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
  let data
  attractionsTab.value == 1
  ? data = await dataStore.getAttractionsData(city)
  : data = await dataStore.getRestaurantData(city)
  data.map((item,index) => {
    item.sid = index
  })
  setIcon(data)
  cardList.value = data;
}
const changeTab = async(tab) => {  
  attractionsTab.value = tab;
  if(tab==2) {
    setTimeout(() => {
      attractionsTab.value = 1
      alert('餐廳資料建置中!!')
    }, 500);
  }
}
</script>
