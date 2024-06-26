<template>
  <div class="tip">
    <div class="tip__icon-wrp">
      <icon class="tip__icon" :name="icon" />
    </div>

    <div class="tip__content">
      <div class="tip__title">
        {{ title }}
      </div>
      <div class="tip__text">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/common'
import { ICON_NAMES } from '@/enums'

defineProps<{ icon: ICON_NAMES; title: string; text: string }>()
</script>

<style scoped lang="scss">
.tip {
  display: flex;
  align-items: center;
  gap: toRem(24);
  padding: toRem(18) toRem(16);
  border: toRem(1) solid var(--black);
  border-radius: toRem(8);
  background: var(--success-light);
}

.tip__icon {
  @include static-size(toRem(52));
}

.tip__content {
  display: flex;
  flex-direction: column;
  gap: toRem(8);
}

.tip__title {
  font-size: toRem(20);
  color: var(--text-primary-main);
  font-weight: 700;
}

.tip__text {
  font-size: toRem(14);
  line-height: 1.25;
  font-weight: 400;
  color: var(--text-secondary-main);
}
</style>
