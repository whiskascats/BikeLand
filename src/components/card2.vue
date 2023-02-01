<template>
  <div class="w-100 cards card2 d-flex flex-wrap">
    <h2 class="col-12 mb-3" @click="cardClick">{{ item.RouteName }}</h2>
    <div class="col-12 d-flex pb-3">
      <div class="col-1 card-tab-dot dot1"></div>
      <div class="col-11 d-flex justify-content-between">
        <div class="w-100 d-flex card-tabs">
          <div class="col-2 card-tab justify-content-center me-2">起</div>
          <div class="col-10 card-tab justify-content-start ps-2">{{ item.RoadSectionStart || '資料建置中' }}</div>
        </div>
      </div>
    </div>
    <div class="col-12 d-flex pb-3">
      <div class="col-1 card-tab-dot dot2"></div>
      <div class="col-11 d-flex justify-content-between">
        <div class="w-100 d-flex card-tabs">
          <div class="col-2 card-tab justify-content-center me-2">迄</div>
          <div class="col-10 card-tab justify-content-start ps-2">{{ item.RoadSectionEnd || '資料建置中' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { moveToPosition, markerSetNerby, distance, setRoutePolyline } from '@/composition-api/map.js'
import wicket from 'wicket'
const props = defineProps({
  item: {
    type: Object
  }
})
const cardClick = () => {
  setRoutePolyline(props.item);
}
</script>