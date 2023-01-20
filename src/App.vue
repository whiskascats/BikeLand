<template>
  <MyHeader />
  <Loading />
  <router-view />  
  <div id="map"></div>
  
</template>
<script setup>
  import MyHeader from '@/components/header.vue';
  import Loading from '@/components/loading.vue'
  import {  onMounted } from 'vue';
  import { createMap } from '@/composition-api/map.js';
  onMounted(() => {    
    createMap()
  })
</script>
