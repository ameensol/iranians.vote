<template>
  <div class="invitation">
    <h2 class="invitation__title">
      {{ $t('invitation.title') }}
    </h2>

    <app-tooltip :is-disabled="!!$config.DISCORD_LINK">
      <template #trigger>
        <app-button
          class="invitation__btn"
          text="Discord"
          :icon-left="$icons.discord"
          size="large"
          :disabled="!$config.DISCORD_LINK"
          :href="$config.DISCORD_LINK"
          target="_blank"
        />
      </template>
      <template #default>
        <div>
          {{ $t('invitation.disabled-msg') }}
        </div>
      </template>
    </app-tooltip>
  </div>
</template>

<script setup lang="ts">
import { AppButton, AppTooltip } from '@/common'
</script>

<style scoped lang="scss">
.invitation {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: toRem(64);
  padding: toRem(80) 0 0;

  @include respond-to(small) {
    padding-top: toRem(64);
  }
}

.invitation__btn {
  --button-icon-size: #{toRem(24)};
}
</style>
