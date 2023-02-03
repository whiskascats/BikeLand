<template>
  <header class="navbar navbar-light header">
    <div class="container-fluid py-2 d-flex">
      <a class="navbar-brand logo" href="" @click.stop>
        <img class="img-fluid" src="@/assets/images/Logo.svg" alt="">
      </a>
      <div class="collapse d-none d-md-flex navbar-pc">
        <router-link class="btn btn-change" :class="{ 'active': route.name === 'BikeStation' }" to="/">
          <i class="fas fa-bicycle"></i> 
          找單車
        </router-link>
        <router-link class="btn btn-change" :class="{ 'active': route.name === 'BikeRoute' }" to="/BikeRoute">
          <i class="fas fa-route"></i> 
          找路線
        </router-link>
        <router-link class="btn btn-change" :class="{ 'active': route.name === 'Attractions' }" to="/Attractions">
          <i class="fas fa-umbrella-beach"></i> 
          找景點
        </router-link>
      </div>
      <div class="d-flex d-md-none flex-wrap navbar-m" :class="{ 'show': show }">
        <div class="col-4 m-link">
          <router-link to="/">
            <div class="text-center"><i class="fas fa-bicycle"></i></div>
            找單車
          </router-link>
        </div>
        <div class="col-4 m-link">
          <router-link to="/BikeRoute">
            <div class="text-center"><i class="fas fa-route"></i></div>
            找路線
          </router-link>
        </div>
        <div class="col-4 m-link">
          <router-link to="/Attractions">
            <div class="text-center"><i class="fas fa-umbrella-beach"></i></div>
            找景點
          </router-link>
        </div>
        <div class="col-12 contact">
          <a href="https://www.youbike.com.tw/region/main/customer-service/" target="_blank">
            <i class="fas fa-phone"></i>
            聯絡單車客服            
          </a>
        </div>
      </div>

      <div class="d-block d-md-none" @click="show = !show">
        <i class="fas fa-bars fa-2x text-white"></i>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const show = ref(false)
</script>
