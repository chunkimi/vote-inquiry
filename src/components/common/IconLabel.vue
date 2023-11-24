<template>
  <h4 class="h4">
    <i class="bi" :class="icon"></i>
    {{ text }}
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
})
</script>
