<template>  
  <SideBar :cardList="cardList" @change="changeCity" />
</template>
<script setup>
import SideBar from '@/components/sidebar.vue';
import { ref, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { markerSetNerby, removeMerkers, moveToPosition } from '@/composition-api/map.js';

const dataStore = useDataStore()
const { userLocation, chooseNearbyBikeDataList, filterBikeData } = storeToRefs(dataStore)
const cardList = ref([])
onMounted(async() => {
  if(userLocation.value.length>0) {
    const data = await dataStore.getNearbyBikeData(userLocation.value);
    cardList.value = data;
    chooseNearbyBikeDataList.value = data;
    markerSetNerby(data);
  }
})

const changeCity = async(city) => {
  const data = await dataStore.getCityBikeData(city);
  cardList.value = data;
}
</script>
