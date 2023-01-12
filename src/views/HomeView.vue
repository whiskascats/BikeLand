<template>
  <!-- <i class="fas fa-parking"></i> /*停車圖示*/
<i class="fas fa-bicycle"></i> /*單車圖示*/
<i class="fas fa-map-marker-alt"></i> /*地圖指標*/
<i class="fas fa-route"></i> /*路線*/
<i class="fas fa-umbrella-beach"></i> /*景點*/
<i class="fas fa-crosshairs"></i> /*定位*/
<i class="fas fa-search"></i> /*搜尋*/
<i class="fas fa-sort-amount-down"></i> /*排序*/
<i class="fas fa-globe-americas"></i> /*網站*/
<i class="fas fa-phone-alt"></i> /*電話*/
<i class="fas fa-clock"></i> /*時間*/
<i class="fas fa-utensils"></i> /*餐廳*/
<i class="fas fa-bars"></i> /*Menu*/ -->
  <MyHeader />
  <SideBar />
  <Map ref="map" />
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import MyHeader from '@/components/header.vue';
  import SideBar from '@/components/sidebar.vue';
  import Map from '@/components/map.vue'
  // import { createMap } from '@/composition-api/map.js'
  
  const map = ref(null)
  onMounted(() => {
    map.value.createMap()
  })
</script>
