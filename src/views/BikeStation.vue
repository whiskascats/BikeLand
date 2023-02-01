<template>  
  <SideBar :cardList="cardList" :tab="bikeTab" @changeCity="changeCity" @changeTab="changeTab" />
</template>
<script setup>
import SideBar from '@/components/sidebar.vue';
import { ref, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { markerSetNerby, removeLayers } from '@/composition-api/map.js';

const dataStore = useDataStore();
const { userLocation, bikeTab, chooseNearbyBikeDataList } = storeToRefs(dataStore);
const cardList = ref([]);
onMounted(async() => {
  removeLayers()
  if(userLocation.value.length>0) {
    const data = await dataStore.getNearbyBikeData(userLocation.value);
    cardList.value = data;
    chooseNearbyBikeDataList.value = data;
    markerSetNerby(chooseNearbyBikeDataList.value);
  }
})

const changeCity = async(city) => {
  const data = await dataStore.getCityBikeData(city);
  cardList.value = data;
}
const changeTab = async(tab) => {  
  bikeTab.value = tab;
  markerSetNerby(chooseNearbyBikeDataList.value);
}
</script>
