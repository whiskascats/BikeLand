<template>
  <div class="sidebar d-flex flex-wrap align-content-start">
    <div class="d-flex w-100 justify-content-between mb-4 flex-wrap">
      <div class="search col-8">     
        <i class="fa-solid fa-chevron-down"></i>
        <select class="form-control search-button" @change="changeCity($event.target.value)">
          <option value="" style="display: none">請選擇縣市</option>
          <option :value="city.city_value" v-for="city in cityDataList" :key="city.city_value">{{ city.city_name }}</option>
        </select>
      </div>
      <div class="sort col-4">
        <button type="button" class="btn btn-change">
          <i class="fa fa-arrow-up-wide-short"></i>
          排序
        </button>
      </div>
      <div class="search col-8 mt-3">
        <input id="search-button" placeholder="搜尋站點或路名" type="text" class="form-control search-button" v-model.trim="ks">
      </div>
      <div class="col-4 mt-3">
        <button type="button" class="btn btn-change" @click="search">
          <i class="fa fa-search"></i>
          搜尋
        </button>
      </div>
      
    </div>
    <div class="d-flex w-100 card-section">
      <div class="w-100 card-list pe-3">
        <template v-for="item in filterCardList" :key="item.StationID">
          <Card1 :item="item" />
        </template>
      </div>
    </div>
  </div>
  <div class="top-icon">
    <div class="find-tab">
      <span :class="{ 'active': tab == 2 }"></span>
      <div class="col-12">
        <div class="col-6" :class="{ 'active': tab == 1 }" @click="changeTab(1)">
          <i class="fas fa-bicycle me-1"></i>
          找單車
        </div>
        <div class="col-6" :class="{ 'active': tab == 2 }" @click="changeTab(2)">
          <i class="fas fa-parking me-1"></i>
          找車位
        </div>
      </div>
    </div>
    <button type="button" class="locate-icon" :class="{'none-locate': userLocation.length==0}"
     @click="moveToPosition(userLocation)" :disabled="userLocation.length==0">
      <i class="fas fa-crosshairs fa-2x"></i>
    </button>
  </div>

</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import Card1 from '@/components/card1.vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import _ from 'lodash';
import { markerSetNerby,  moveToPosition } from '@/composition-api/map.js';

const dataStore = useDataStore()
const { userLocation, findTab, cityDataList } = storeToRefs(dataStore)

const emit = defineEmits(['changeCity','changeTab'])
const props = defineProps({
  cardList: {
    type: Array,
    default: []
  },
  tab: Number
  
})
const filterCardList = computed(() => {
  let filterList = props.cardList
  if(searchParams.value.ks) {
    filterList = filterList.filter(item => {
      return item.StationName.Zh_tw.includes(ks.value) || item.StationAddress.Zh_tw.includes(ks.value)
    })
  }
  return filterList
})
const ks = ref('')
const searchParams = ref({
  ks: ''
})
onMounted(async()=> {
  await dataStore.getCityData();
})
const changeCity = async(value) => {
  emit('changeCity',value)
}
const changeTab = (tab) => {
  emit('changeTab',tab)
}
const search = () => {
  if(!ks.value) return false
  if(props.cardList.length<=0) {
    alert('請先搜尋縣市或是打開定位')
    return false
  }
  searchParams.value.ks = ks.value;
}
</script>

