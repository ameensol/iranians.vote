<template>
  <div v-if="isAppInitialized" class="app__container">
    <app-navbar class="app__navbar" />
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component class="app__main" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { AppNavbar } from '@/common'

import { ref } from 'vue'
import { config } from '@config'
import { ErrorHandler } from '@/helpers'

const isAppInitialized = ref(false)

const init = async () => {
  try {
    document.title = config.APP_NAME
  } catch (error) {
    ErrorHandler.process(error)
  }
  isAppInitialized.value = true
}

init()
</script>

<style lang="scss" scoped>
.app__container {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: var(--app-content-width);
  width: 100%;
  margin: 0 auto;
  padding: toRem(20);

  @include respond-to(small) {
    grid-template-rows: max-content 1fr max-content;
  }
}

.fade-enter-active {
  animation: fade-in 0.25s;
}

.fade-leave-active {
  animation: fade-in 0.25s reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
