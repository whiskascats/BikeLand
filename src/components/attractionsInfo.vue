<template>
  <div class="attraction-page" :class="{'open': open}">
    <div class="left-page">
      <h2>{{ chooseAttraction.ScenicSpotName }}</h2>
      <div class="col-12 contact">
        <div class="col-12 d-flex align-items-center">
          <i class="fas fa-map-marker-alt"></i>
          <p class="ms-1 oneline">{{ chooseAttraction.Address || '資料建置中' }}</p>
        </div>
        <div class="col-12 d-flex align-items-center">
          <i class="fas fa-clock"></i>
          <p class="ms-1 oneline">{{ chooseAttraction.OpenTime || '資料建置中' }}</p>
        </div>
        <div class="col-12 d-flex align-items-center">
          <i class="fas fa-phone-alt"></i>
          <p class="ms-1 oneline">{{ chooseAttraction.Phone || '資料建置中' }}</p>
        </div>
      </div>
      <div class="info mt-2">
        {{ chooseAttraction.DescriptionDetail }}
      </div>
    </div>
    <div class="right-page">
      <div class="right-page-img" :style="imageObj" v-if="chooseAttraction.Picture.PictureUrl1"></div>
      <div class="right-page-img default" v-else></div>
    </div>
    <div class="page-bar" @click="open = !open">
      <div class="triangle" :class="{'active': open}"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue';
import { moveToPosition } from '@/composition-api/map.js';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const { chooseAttraction, open } = storeToRefs(dataStore);
const imageObj = reactive({
  backgroundImage: `url(${chooseAttraction.value.Picture.PictureUrl1})`
})
console.log(imageObj);
onMounted(async() => {
  const data = await dataStore.getAttractionsMoreInfo(`contains(ScenicSpotID,'${chooseAttraction.value.ScenicSpotID}')`)
  if(data.length > 0) {
    chooseAttraction.Address = data[0]['Address'];
    chooseAttraction.OpenTime = data[0]['OpenTime'];
    open.value = true;
  }
})
</script>