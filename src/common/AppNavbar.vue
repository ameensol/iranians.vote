<template>
  <div class="app-navbar">
    <app-logo class="app-navbar__logo" />

    <!--<span class="app-navbar__locale-switcher">-->
    <!--  <span class="app-navbar__locale-switcher-text">-->
    <!--    {{ `rus` }}-->
    <!--  </span>-->
    <!--  <switch-field-->
    <!--    :label="'en'"-->
    <!--    value="stub"-->
    <!--    v-model="localeStub"-->
    <!--    @update:model-value="toggleLocale"-->
    <!--  />-->
    <!--</span>-->
  </div>
</template>

<script lang="ts" setup>
import { AppLogo } from '@/common'
// import { setLocale } from '@/localization'
// import { useI18n } from 'vue-i18n'
// import { SwitchField } from '@/fields'
// import { ref } from 'vue'
//
// const { locale } = useI18n({ useScope: 'global' })

// const localeStub = ref(locale.value === 'en')
//
// const toggleLocale = () => {
//   setLocale(locale.value === 'en' ? 'rus' : 'en')
// }
</script>

<style lang="scss" scoped>
.app-navbar {
  display: flex;
  align-items: center;
  gap: toRem(24);
  border-bottom: var(--border-primary-main);
  padding: toRem(32) 0;
}

.app-navbar__logo {
  margin-right: auto;
}

.app-navbar__locale-switcher {
  display: flex;
  align-items: center;
  gap: toRem(12);
}
</style>
