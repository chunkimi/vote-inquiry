<style lang="scss" scoped>
.btn-outline-warning {
  --bs-btn-active-color: #fff;
}
</style>
<template>
  <div
    class="w-100"
    :class="isMobile ? 'btn-group' : 'btn-group-vertical'"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <template v-for="label in menuData" :key="label">
      <input
        type="radio"
        class="btn-check"
        autocomplete="off"
        :name="label"
        :id="label"
        :value="label"
        v-model="labelModal"
      />
      <label class="btn btn-outline-warning" :for="label">{{ label }}</label>
    </template>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
const isMobile = useMediaQuery('(max-width: 767px)')

const emit = defineEmits(['update:analStatus'])
const props = defineProps({
  menuData: {
    type: Array,
    required: true,
  },
  analStatus: {
    type: String,
    required: true,
  },
})

const labelModal = computed({
  get() {
    return props.analStatus
  },
  set(value) {
    emit('update:analStatus', value)
  },
})
</script>
