<template>
  <div
    class="w-100"
    :class="isMobile ? 'btn-group' : 'btn-group-vertical'"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <input
      type="radio"
      class="btn-check"
      name="btnRadioVote"
      id="btnRadioVote"
      autocomplete="off"
      checked
    />
    <label class="btn btn-outline-warning" for="btnRadioVote">投票情況</label>
    <input
      type="radio"
      class="btn-check"
      name="btnRadioParty"
      id="btnRadioParty"
      autocomplete="off"
    />
    <label class="btn btn-outline-warning" for="btnRadioParty"
      >政黨得票分析</label
    >
  </div>
</template>
<script setup>
import { useMediaQuery } from '@vueuse/core'
const isMobile = useMediaQuery('(max-width: 767px)')
</script>
