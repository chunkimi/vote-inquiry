<style lang="scss" scoped>
.icon-vote-stamp {
  width: 24px;
  height: 24px;
  background-image: url('src/assets/icons/vote-stamp.svg');
  background-size: cover;
  vertical-align: -3px;
}
</style>

<template>
  <h4 class="h4">
    <span
      v-if="icon === 'vote-stamp'"
      class="d-inline-block icon-vote-stamp"
    ></span>
    <i class="bi" :class="icon"></i>
    {{ text }}
    <small v-if="source" class="fs-7 fw-normal text-gray-500 d-block px-8 py-2">
      {{ `※資料來源：${source}` }}
    </small>
  </h4>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'bi-geo-alt-fill',
  },
  source: {
    type: String,
  },
})
</script>
