<template>
  <div>
    <button class="btn btn-warn" type="button" v-if="item.AvailableRentBikes>0 && item.AvailableReturnBikes>0">可借可還</button>
    <button class="btn btn-trouble" type="button" v-else-if="item.AvailableRentBikes>0 && item.AvailableReturnBikes==0">只可借車</button>
    <button class="btn btn-trouble" type="button" v-else-if="item.AvailableRentBikes==0 && item.AvailableReturnBikes>0">只可停車</button>
    <button class="btn btn-none" type="button" v-else>站點施工中</button>
  </div>
</template>
<script setup>
  const props = defineProps({
    item: {
      type: Object
    }
  })
</script>