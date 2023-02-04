<template>  
  <SideBar :cardList="cardList" :tab="bikeTab" @changeCity="changeCity" @changeTab="changeTab" />
</template>
<script setup>
import SideBar from '@/components/sidebar.vue';
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { markerSetNerby, removeLayers, distance } from '@/composition-api/map.js';

const dataStore = useDataStore();
const { userLocation, bikeTab, chooseNearbyBikeDataList } = storeToRefs(dataStore);
const cardList = ref([]);
onMounted(async() => {
  removeLayers()
  if(userLocation.value.length>0) {
    const data = await dataStore.getNearbyBikeData(userLocation.value);
    data.map(item => item.distance = distance(userLocation.value[0],userLocation.value[1], item.StationPosition.PositionLat,item.StationPosition.PositionLon))
    cardList.value = data;
    chooseNearbyBikeDataList.value = cardList.value;
    
    markerSetNerby(chooseNearbyBikeDataList.value);
  }
})

const changeCity = async(city) => {
  const data = await dataStore.getCityBikeData(city);
  data.map(item => item.distance = distance(userLocation.value[0],userLocation.value[1], item.StationPosition.PositionLat,item.StationPosition.PositionLon))
  cardList.value = data;
}
const changeTab = async(tab) => {  
  bikeTab.value = tab;
  markerSetNerby(chooseNearbyBikeDataList.value);
}

</script>
