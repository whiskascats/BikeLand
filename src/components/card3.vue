<template>
  <div class="col-lg-12 col-md-5 col-12 cards card3 d-flex flex-wrap" @click="cardClick">
    <div class="card3-img mt-lg-4 default" ref="backgroundImage" style=""></div>
    <div class="col-12 d-flex">
      <h2 class="col-12 my-2" @click="cardClick">{{ item.ScenicSpotName }}</h2>
      <!-- <div class="col-3 locate">
        <i class="fas fa-map-marker-alt"></i>
        <div>{{ item.City }}</div>
      </div> -->
    </div>
    <div class="col-12 d-none d-lg-flex mb-2 tabs">
      <template v-for="num in 5" :key="num">
        <span class="oneline" v-if="item['Class'+num]">
          {{ item['Class'+num] }}
        </span>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { moveToPosition, attractionPopup } from '@/composition-api/map.js';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import _ from 'lodash';

const props = defineProps({
  item: {
    type: Object
  }
})
const dataStore = useDataStore();
const { chooseAttraction } = storeToRefs(dataStore);
const backgroundImage = ref();
onMounted(() => {
  if(!_.isEmpty(props.item.Picture)) {
    const bgImage = new Image();
    bgImage.src = props.item.Picture.PictureUrl1;
    bgImage.onload = function(){
      backgroundImage.value.classList.remove('default');
      backgroundImage.value.style.backgroundImage = `url(${bgImage.src})`;
      setTimeout(() => {
        backgroundImage.value.classList.add('has-img');
      }, 500);
    }
  }
})
const cardClick = () => {
  chooseAttraction.value = props.item;
  moveToPosition([props.item.Position.PositionLat,props.item.Position.PositionLon],18);
  attractionPopup(props.item.sid);
}
</script>