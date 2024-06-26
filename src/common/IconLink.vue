<template>
  <template v-if="route">
    <router-link :to="route" class="icon-link">
      <span class="icon-link__text">
        <slot />
      </span>
      <icon class="icon-link__icon" :name="$icons.externalLink" />
    </router-link>
  </template>
  <template v-else-if="href">
    <a :href="href" target="_blank" class="icon-link">
      <span class="icon-link__text">
        <slot />
      </span>
      <icon class="icon-link__icon" :name="$icons.externalLink" />
    </a>
  </template>
</template>

<script setup lang="ts">
import { Icon } from '@/common'
import type { LocationAsRelativeRaw } from 'vue-router'

withDefaults(
  defineProps<{
    route?: LocationAsRelativeRaw
    href?: string
  }>(),
  {
    route: undefined,
    href: '',
  },
)
</script>

<style scoped lang="scss">
.icon-link {
  display: flex;
  justify-content: center;
  line-height: normal;
  font-style: normal;
  gap: toRem(8);
  color: var(--text-primary-main);
  width: max-content;
  font-size: toRem(20);
  font-weight: 400;
  text-decoration-line: underline;
}

.icon-link__icon {
  width: toRem(20);
  height: toRem(20);
  color: inherit;
}
</style>
