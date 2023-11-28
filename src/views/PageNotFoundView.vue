<template>
  <main
    class="d-flex flex-column justify-content-center align-items-center h-100 gap-2"
  >
    <img :src="blueBirdSvg" alt="bluebird" />
    <h1 class="display-1 fw-bolder">404</h1>
    <p class="fs-4">您造訪的頁面不存在或已被刪除</p>
    <router-link type="button" class="btn btn-warning" :to="{ name: 'Home' }">
      回首頁
    </router-link>
  </main>
</template>

<script setup>
import blueBirdSvg from '@/assets/bluebird_fired.png'
</script>
