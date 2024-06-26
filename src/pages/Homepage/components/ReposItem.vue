<template>
  <div class="repos-item">
    <a class="repos-item__head" :href="repoLink" target="_blank">
      <div class="repos-item__head-title">
        {{ title }}
      </div>

      <icon class="repos-item__head-icon" :name="$icons.externalLink" />
    </a>
    <div class="repos-item__body">
      <div class="repos-item__badge">
        <icon class="repos-item__badge-icon" :name="$icons.checkStar" />
        <div class="repos-item__badge-text">
          {{ $t('repos-item.badge-text') }}
        </div>
      </div>
      <span>{{ `-` }}</span>
      <a :href="auditLink" target="_blank" class="repos-item__badge-link">
        {{ $t('repos-item.badge-link') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/common'

defineProps<{
  title: string
  repoLink: string
  auditLink: string
}>()
</script>

<style scoped lang="scss">
$item-z-index: 1;

.repos-item {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
  background: var(--background-primary-main);
  min-width: toRem(220);
  z-index: $item-z-index;
  padding: toRem(16);
  border-radius: toRem(8);
}

.repos-item__head {
  display: flex;
  align-items: center;
  gap: toRem(8);
  color: var(--text-primary-main);
}

.repos-item__head-title {
  font-size: toRem(16);
  font-weight: 500;
  line-height: 1.2;

  .repos-item__head:hover & {
    text-decoration: underline;
  }
}

.repos-item__head-icon {
  @include static-size(#{toRem(18)});
}

.repos-item__body {
  display: flex;
  align-items: center;
  gap: toRem(8);
}

.repos-item__badge {
  display: flex;
  align-items: center;
  gap: toRem(8);
  color: var(--success-dark);
}

.repos-item__badge-icon {
  @include static-size(#{toRem(18)});
}

.repos-item__badge-text {
  text-transform: uppercase;
  font-size: toRem(12);
  line-height: 1.2;
  font-weight: 500;
}

.repos-item__badge-link {
  font-size: toRem(12);
  line-height: 1.2;
  color: var(--text-tertiary-main);

  &:hover {
    text-decoration: underline;
  }
}
</style>
