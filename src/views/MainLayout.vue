<template>
  <HeaderComponentVue></HeaderComponentVue>
  <main class="container p-3 p-md-4">
    <RouterView />
  </main>
  <FooterComponent></FooterComponent>
</template>

<script>
import { RouterView } from 'vue-router'
import FooterComponent from '@/components/base/FooterComponent.vue'
import HeaderComponentVue from '../components/base/HeaderComponent.vue'

export default {
  components: {
    RouterView,
    FooterComponent,
    HeaderComponentVue,
  },
}
</script>