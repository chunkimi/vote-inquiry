<style lang="scss" scoped>
/**
 * 解說：為了符合設計稿的樣式， active 時的文字顏色要改成白色
 */
.btn-outline-warning {
  --bs-btn-active-color: #fff;
}
</style>

<template>
  <div
    class="btn-group"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <template v-for="year in electionYears" :key="year">
      <input
        type="radio"
        class="btn-check"
        autocomplete="off"
        :name="year"
        :id="year"
        :value="year"
        v-model="yearModal"
      />
      <label class="btn btn-outline-warning" :for="year">{{ year }}</label>
    </template>
  </div>
</template>
<script setup>
/**
 * 解說：方法一
 */
// import { computed } from 'vue'
/**
 * 解說：方法二
 */
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  electionYears: Array,
  /**
   * 解說：如果是必要的值，可以加上 required: true，這樣就不用在判斷是否有值，像是 if (!modelValue) { return [] } 這樣的判斷
   */
  modelValue: {
    type: String,
    required: true,
  },
})

/**
 * 解說：這一行可以刪除，因為 props 的值需透過 emit 來改變，所以不需要用到 toRefs
 */
// const { electionYears, modelValue } = toRefs(props)

/**
 * 解說：方法一
 * https://vuejs.org/guide/components/v-model.html#component-v-model
 */
// const yearModal = computed({
//   get() {
//     return props.modelValue
//   },
//   set(value) {
//     emit('update:modelValue', value)
//   },
// })

/**
 * 解說：方法二
 * https://vueuse.org/core/useVModel/
 */
const yearModal = useVModel(props, 'modelValue', emit)
</script>
