<template>
  <div class="w-100 cards d-flex flex-wrap">
    <h2 class="col-12 mb-3" @click="stationClick(item)">{{ item.StationName.Zh_tw }}</h2>
    <div class="col-12 d-flex justify-content-between mb-3">
      <div class="card-button" :class="item.AvailableRentBikes > 5 ? '' : item.AvailableRentBikes > 0 ? 'danger' : 'none'">
        <div class="w-100">          
          <i class="fa fa-bicycle"></i>
          可租借
        </div>
        <div class="w-100 count">{{ item.AvailableRentBikes }}</div>
      </div>
      <div class="card-button">
        <div class="w-100">          
          <i class="fa fa-parking"></i>
          可停車
        </div>
        <div class="w-100 count">{{ item.AvailableReturnBikes }}</div>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-between mb-3">
      <ParkingStatus :item="item" />
      <div class="distance">
        <i class="fas fa-map-marker-alt"></i>
        <span>距離<span> {{ distance(userLocation[0], userLocation[1], item.StationPosition.PositionLat, item.StationPosition.PositionLon ) }} </span></span>        
      </div>
    </div>
  </div>
</template>
<script setup>
  import ParkingStatus from '@/components/parkingStatus.vue'
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';
  import { moveToPosition, markerSetNerby, distance } from '@/composition-api/map.js'

  const dataStore = useDataStore()
  const { userLocation, chooseStation, chooseNearbyBikeDataList } = storeToRefs(dataStore)
  const props = defineProps({
    item: {
      type: Object
    }
  })
  const stationClick = async (item) => {
    chooseStation.value = item;
    moveToPosition([item.StationPosition.PositionLat,item.StationPosition.PositionLon]);
    const data = await dataStore.getNearbyBikeData(`${item.StationPosition.PositionLat},${item.StationPosition.PositionLon}`);
    chooseNearbyBikeDataList.value = data;
    markerSetNerby(chooseNearbyBikeDataList.value);
  }
</script>