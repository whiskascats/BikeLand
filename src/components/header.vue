<template>
  <header class="navbar navbar-light header">
    <div class="container-fluid py-2 d-flex">
      <a class="navbar-brand logo" href="#" @click.stop>
        <img src="@/assets/images/Logo.svg" alt="">
      </a>
      <div class="d-flex">
        <router-link class="btn btn-change" to="/">
          <i class="fas fa-bicycle"></i> 
          找單車
        </router-link>
        <router-link class="btn btn-change" to="/BikeRoute">
          <i class="fas fa-route"></i> 
          找路線
        </router-link>
        <router-link class="btn btn-change" to="/">
          <i class="fas fa-umbrella-beach"></i> 
          找景點
        </router-link>
      </div>
    </div>
  </header>
</template>
<script>
</script>