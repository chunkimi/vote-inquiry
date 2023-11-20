<style lang="scss">
@import '@/styles/main.scss';

.header {
  &__subject {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    text-align: center;
  }
  &__subTitle {
    font-size: 0.75rem;
    @include media-breakpoint-up(md) {
      font-size: 1rem;
      font-weight: bold;
    }
  }
}
</style>
<template>
  <header>
    <div class="header__subject">
      <h2 class="h2 fw-bold mb-2">
        <div>2020<br class="d-md-none" />臺灣總統大選情報站</div>
      </h2>
      <p class="fs-7 fs-md-6 fw-normal fw-md-bold">
        2020 Taiwan Presidential Election Election Hub
      </p>
    </div>
    <nav class="navbar navbar-expand-lg bg-warning">
      <div class="container-fluid justify-content-end">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#headerNavbar"
          aria-controls="headerNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-center"
          id="headerNavbar"
        >
          <ul class="navbar-nav">
            <li v-for="item in menu" :key="item.name" class="nav-item">
              <router-link :to="item.to" class="nav-link" aria-current="page">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
const menu = [
  { name: '開票即時報', to: { name: 'Home' } },
  { name: '縣市選情版圖', to: { name: 'Analysis' } },
  { name: '歷屆選情', to: { name: 'PastElections' } },
  { name: '歷屆候選公僕名單', to: { name: 'Candidate' } },
]
</script>
