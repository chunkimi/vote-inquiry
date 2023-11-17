<template>
  <header>
    <h1>2020臺灣總統大選情報站</h1>
  </header>
  <i class="bi bi-0-circle"></i>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-light">Light</button>
  <button type="button" class="btn btn-dark">Dark</button>
  <button type="button" class="btn btn-link">Link</button>
  <button type="button" class="btn btn-savannah">金色曠野同盟</button>
  <button type="button" class="btn btn-coast">蔚藍海岸陣線</button>
  <button type="button" class="btn btn-rainforest">鬱蔥雨林聯盟</button>
  <footer>
    <FooterComponent></FooterComponent>
  </footer>
</template>

<script>
import FooterComponent from '@/components/base/FooterComponent.vue'

export default {
  components: {
    FooterComponent,
  },
}
</script>
