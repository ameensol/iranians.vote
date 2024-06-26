<template>
  <vue-countdown :time="time" v-slot="{ days, hours, minutes }">
    <div class="countdown">
      <div
        v-for="(item, idx) in [
          { value: days, text: 'Д' },
          { value: hours, text: 'Ч' },
          { value: minutes, text: 'М' },
        ]"
        :key="idx"
        class="countdown__cell"
      >
        <div class="countdown__text">
          {{ item.value + item.text }}
        </div>
      </div>
    </div>
  </vue-countdown>
</template>

<script setup lang="ts">
import VueCountdown from '@chenfengyuan/vue-countdown'

import { computed } from 'vue'

const props = defineProps<{
  endTime: Date
}>()

const time = computed(() => {
  const now = new Date()

  return props.endTime.getTime() - now.getTime()
})
</script>

<style scoped lang="scss">
.countdown {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.countdown__cell {
  border: toRem(1) solid var(--primary-main);
  border-right: none;
  padding: toRem(8);
  background: var(--white);

  &:first-child {
    border-top-left-radius: toRem(8);
    border-bottom-left-radius: toRem(8);
  }

  &:last-child {
    border-top-right-radius: toRem(8);
    border-bottom-right-radius: toRem(8);
    border-right: toRem(1) solid var(--primary-main);
  }
}

.countdown__text {
  text-align: center;
  font-size: toRem(20);
  font-weight: 500;
}
</style>
