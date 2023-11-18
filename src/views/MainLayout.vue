<template>
  <HeaderComponentVue></HeaderComponentVue>
  <RouterView />
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