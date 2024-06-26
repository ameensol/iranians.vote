<template>
  <div class="announce">
    <announce-block
      class="announce__block"
      :icon-right="$icons.announceLeft"
      :title="$t('announce.title')"
      :desc="$t('announce.desc')"
    />
  </div>
</template>

<script setup lang="ts">
import { AnnounceBlock } from '@/common'
</script>

<style scoped lang="scss">
.announce {
  padding-bottom: toRem(120);

  @include respond-to(small) {
    padding-bottom: toRem(64);
  }
}

.announce__block {
  margin: 0 auto;
}
</style>
