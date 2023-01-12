<template>
  <div class="w-100 cards d-flex flex-wrap">
    <h2 class="col-12 mb-3">我是標題123</h2>
    <div class="col-12 d-flex justify-content-between mb-3">
      <div class="card-button">
        <div class="w-100">          
          <i class="fa fa-bicycle"></i>
          可租借
        </div>
        <div class="w-100 count">43</div>
      </div>
      <div class="card-button">
        <div class="w-100">          
          <i class="fa fa-parking"></i>
          可停車
        </div>
        <div class="w-100 count">25</div>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-between mb-3">
      <ParkingStatus />
      <div class="distance">
        <i class="fas fa-map-marker-alt"></i>
        <span>距離<span> 25 公尺</span></span>        
      </div>
    </div>
  </div>
</template>
<script setup>
  import ParkingStatus from '@/components/parkingStatus.vue'
</script>