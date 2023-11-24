<template>
  <HeaderComponent></HeaderComponent>
  <main class="container d-grid gap-8 px-4 py-5 px-md-8 py-md-6">
    <RouterView />
  </main>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { RouterView } from 'vue-router'
import FooterComponent from '@/components/base/FooterComponent.vue'
import HeaderComponent from '@/components/base/HeaderComponent.vue'
</script>
