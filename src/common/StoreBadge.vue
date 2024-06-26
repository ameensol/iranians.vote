<template>
  <app-tooltip :is-disabled="!!url">
    <template #trigger>
      <a
        :href="url"
        target="_blank"
        :class="['store-badge', { 'store-badge--disabled': !url }]"
      >
        <img class="store-badge__img" :src="imageUrl" :alt="url" />
      </a>
    </template>
    <template #default>
      <div>
        {{ $t('hero-banner.disabled-msg') }}
      </div>
    </template>
  </app-tooltip>
</template>

<script setup lang="ts">
import { AppTooltip } from '@/common/index'

defineProps<{
  imageUrl: string
  url: string
}>()
</script>

<style scoped lang="scss">
.store-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--black);
  border-radius: toRem(8);
  max-width: toRem(168);
  padding: toRem(8) toRem(16);
  max-height: toRem(48);

  &--disabled {
    opacity: 0.25;
    cursor: not-allowed;
    pointer-events: none;
  }

  @include respond-to(small) {
    width: 100%;
    max-width: none;
  }
}

.store-badge__img {
  max-width: toRem(100);
  max-height: toRem(24);
}
</style>
