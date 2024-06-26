<template>
  <div class="guide-header">
    <div class="guide-header__content">
      <app-button
        class="guide-header__back-link"
        :route="{ name: backRoute || $routes.app }"
        :icon-left="$icons.chevronLeft"
        scheme="none"
        color="none"
        size="none"
      >
        {{ $t('tech-doc.back-link') }}
      </app-button>

      <h2 class="guide-header__title">
        {{ title }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppButton } from '@/common/index'
import { ROUTE_NAMES } from '@/enums'

withDefaults(
  defineProps<{
    title: string
    backRoute?: ROUTE_NAMES
  }>(),
  {
    backRoute: undefined,
  },
)
</script>

<style scoped lang="scss">
.guide-header {
  position: relative;
  padding: toRem(32) 0;

  &::v-global(.app-container) {
    overflow: visible;
  }

  @include dark-bg;
}

.guide-header__content {
  max-width: var(--app-content-width);
  margin: 0 auto;
}

.guide-header__back-link {
  display: flex;
  align-items: center;
  gap: toRem(12);

  /* stylelint-disable-next-line */
  color: rgba(var(--black-rgb), 0.4);
  margin-bottom: toRem(32);
}

.guide-header__title {
  font-size: toRem(40);
  line-height: 1.15;
  letter-spacing: -#{toRem(1.5)};

  @include respond-to(small) {
    font-size: toRem(24);
  }
}
</style>
