<template>
  <div
    class="announce-block"
    :class="{
      'announce-block--centered': isCentered,
    }"
  >
    <div v-if="iconLeft" class="announce-block__decor">
      <icon class="announce-block__decor-icon" :name="iconLeft" />
    </div>
    <div class="announce-block__content">
      <h2 v-if="title" class="announce-block__title">
        {{ title }}
      </h2>
      <p class="announce-block__desc">
        {{ desc }}
      </p>
    </div>
    <div v-if="iconRight" class="announce-block__decor">
      <icon class="announce-block__decor-icon" :name="iconRight" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/common'
import { ICON_NAMES } from '@/enums'

withDefaults(
  defineProps<{
    title?: string
    desc: string
    iconLeft?: ICON_NAMES
    iconRight?: ICON_NAMES
    isCentered?: boolean
  }>(),
  {
    title: '',
    iconLeft: undefined,
    iconRight: undefined,
    isCentered: false,
  },
)
</script>

<style scoped lang="scss">
.announce-block {
  position: relative;
  display: flex;
  padding: toRem(32);
  border-radius: toRem(16);
  gap: toRem(24);

  &--centered {
    align-items: center;
  }

  @include respond-to(small) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23333' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: toRem(16);
  }
}

.announce-block__decor-icon {
  @include static-size(#{toRem(64)});
}

.announce-block__content {
  display: flex;
  flex-direction: column;
}

.announce-block__title {
  font-weight: 700;
  font-size: toRem(16);
  line-height: 1.2;
  margin-bottom: toRem(28);
}

.announce-block__desc {
  text-align: left;
  white-space: pre-line;
  font-size: toRem(14);
  line-height: 1.5;
  color: var(--text-secondary-main);
}
</style>
