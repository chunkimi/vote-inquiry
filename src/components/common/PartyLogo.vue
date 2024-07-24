<style lang="scss" scoped>
.party-logo--shorten {
  width: 24px;
  height: 24px;
  line-height: 24px;
}
</style>
<template>
  <span
    v-if="size === 'shorten' || logoSrc.includes('undefined')"
    :class="`bg-${partyId}`"
    class="party-logo--shorten rounded-circle fs-7 d-inline-block text-center"
  >
    {{ shortenPartyName[partyId] }}
  </span>
  <img
    v-else
    :src="logoSrc"
    class="rounded-circle d-none d-lg-block"
    alt="party-logo"
    width="100"
    height="100"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { CandidateVotes } from '@/types'

const props = withDefaults(
  defineProps<{
    partyId: keyof CandidateVotes
    size?: 'default' | 'shorten'
  }>(),
  {
    size: 'default',
  },
)

const logoSrc = computed(() => {
  return new URL(
    `../../assets/party-logo/${props.partyId}.png`,
    import.meta.url,
  ).href
})

const shortenPartyName: Record<keyof CandidateVotes, string> = {
  savannah: '野',
  coast: '海',
  rainforest: '林',
}
</script>
