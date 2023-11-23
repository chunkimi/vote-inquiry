<template>
  <HeaderComponent></HeaderComponent>
  <main class="container p-3 p-md-4">
    <RouterView />
  </main>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { RouterView } from 'vue-router'
import FooterComponent from '@/components/base/FooterComponent.vue'
import HeaderComponent from '@/components/base/HeaderComponent.vue'
</script>
