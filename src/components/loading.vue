<template>
  <div class="spinner" v-if="loading">
    <div class="spinner-box">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
  </div>
</template>
<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore()
  const { loading } = storeToRefs(dataStore)
</script>