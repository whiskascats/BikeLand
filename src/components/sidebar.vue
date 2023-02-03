<template>

  <div class="sidebar d-flex flex-wrap align-content-start">
    <div class="d-flex w-100 justify-content-between mb-3 flex-wrap">
      <div class="search col-lg-8 col-sm-10 col-8 mb-3"> 
        <i class="fa-solid fa-chevron-down"></i>
        <select class="form-control search-button" @change="changeCity($event.target.value)" v-model="searchParams.city">
          <option value="" style="display: none">請選擇縣市</option>
          <option :value="city.city_value" v-for="city in filterCityList" :key="city.city_value">{{ city.city_name }}</option>
        </select>
      </div>
      <div class="sort col-lg-4 col-sm-2 col-4 d-flex mb-3 justify-content-center">
        <button type="button" class="btn btn-change">
          <i class="fa fa-arrow-up-wide-short"></i>
          排序
        </button>
      </div>
      <div class="search col-lg-8 col-sm-10 col-8">
        <input id="search-button" placeholder="搜尋站點或路名" type="text" class="form-control search-button" v-model.trim="ks">
      </div>
      <div class="col-lg-4 col-sm-2 col-4 d-flex justify-content-center">
        <button type="button" class="btn btn-change" @click="search">
          <i class="fa fa-search"></i>
          搜尋
        </button>
      </div>
      
    </div>
    <div class="d-flex w-100 card-section">
      <div class="w-100 card-list pe-3" :class="{ 'Attractions': route.name === 'Attractions' }">
        <template v-if="route.name === 'BikeStation'">
          <template :key="item.StationID" v-for="item in filterCardList">
            <Card1 :item="item" />
          </template>
        </template>
        <template v-else-if="route.name === 'BikeRoute'">
          <template :key="item.RouteName" v-for="item in filterCardList">
            <Card2 :item="item" />
          </template>
        </template>
        <template v-else-if="route.name === 'Attractions'">
          <template :key="item.ScenicSpotID" v-for="item in filterCardList">
            <Card3 :item="item" />
          </template>
        </template>
      </div>
    </div>
  </div>
  <div class="top-icon">
    <div class="find-tab" v-if="tab!=0">
      <span class="cover" :class="{ 'active': tab == 2 }"></span>
      <div class="col-12">
        <div class="col-6 cover-tabs" :class="{ 'active': tab == 1 }" @click="changeTab(1)">
          <template v-if="route.name === 'BikeStation'">
            <i class="fas fa-bicycle"></i>
            <span class="d-none d-lg-block">找單車</span>
          </template>
          <template v-if="route.name === 'Attractions'">
            <i class="fas fa-umbrella-beach"></i>
            <span class="d-none d-lg-block">找景點</span>
          </template>
        </div>
        <div class="col-6 cover-tabs" :class="{ 'active': tab == 2 }" @click="changeTab(2)">
          <template v-if="route.name === 'BikeStation'">
            <i class="fas fa-parking"></i>
            <span class="d-none d-lg-block">找車位</span>
          </template>
          <template v-if="route.name === 'Attractions'">
            <i class="fas fa-utensils"></i>
            <span class="d-none d-lg-block">找餐廳</span>
          </template>
        </div>
      </div>
    </div>    
    <div>
      <button type="button" class="locate-icon" :class="{'none-locate': userLocation.length==0}"
        @click="moveToPosition(userLocation)" :disabled="userLocation.length==0">
        <i class="fas fa-crosshairs fa-2x"></i>
      </button>
    </div>
  </div>

</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Card1 from '@/components/card1.vue';
import Card2 from '@/components/card2.vue';
import Card3 from '@/components/card3.vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import _ from 'lodash';
import { moveToPosition } from '@/composition-api/map.js';

const route = useRoute();
const dataStore = useDataStore();
const { userLocation, searchParams, cityDataList } = storeToRefs(dataStore);

const emit = defineEmits(['changeCity','changeTab'])
const props = defineProps({
  cardList: {
    type: Array,
    default: []
  },
  tab: [String, Number]
  
})
const filterCityList = computed(() => {
  let filterList = cityDataList.value
  filterList = filterList.filter(item => {
    return item.type.includes(route.name)
  })
  return filterList
})
const filterCardList = computed(() => {
  let filterList = props.cardList
  if(searchParams.value.ks) {
    switch(route.name) {
      case 'BikeStation':
        filterList = filterList.filter(item => {
          return item.StationName.Zh_tw.includes(ks.value) || item.StationAddress.Zh_tw.includes(ks.value)
        })
      break;
      case 'BikeRoute':
        filterList = filterList.filter(item => {
          return item.RouteName.includes(ks.value)
        })
      break;
    }
  }
  return filterList
})
const ks = ref('')
onMounted(async()=> {
  await dataStore.getCityData();
  searchParams.value.city = ''
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

