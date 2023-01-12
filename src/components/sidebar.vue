<template>
  <div class="sidebar d-flex flex-wrap align-content-start">
    <div class="d-flex w-100 justify-content-between mb-4">
      <div class="search">        
        <label for="search-button">
          <i class="fa fa-search fa-2x"></i>
        </label>        
        <input id="search-button" placeholder="搜尋站點或鄰近地點" type="text" class="form-control search" >
      </div>
      <div class="sort">
        <button type="button" class="btn btn-change">
          <i class="fa fa-arrow-up-wide-short"></i>
          排序
        </button>        
      </div>
    </div>
    <div class="d-flex w-100 card-section">
      <div class="w-100 card-list pe-3">
        <Card1 v-for="item in 30" />
      </div>
    </div>
  </div>
  <div class="top-icon">
    <div class="find-tab">
      <div class="col-6 active">
        <i class="fas fa-bicycle me-1"></i>
        找單車
      </div>
      <div class="col-6">
        <i class="fas fa-parking me-1"></i>
        找車位
      </div>
    </div>
    <div class="locate-icon">
      <i class="fas fa-crosshairs fa-2x"></i>
    </div>
  </div>
  
</template>
<script setup>
  import Card1 from '@/components/card1.vue'
</script>