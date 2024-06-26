<template>
  <div class="app-logo">
    <!-- <img
      class="app-logo__img"
      src="/branding/logo.svg"
      :alt="$config.APP_NAME"
    /> -->
    <p class="app-logo__img">Iranians.vote</p>
    <router-link class="app-logo__link" :to="{ name: $routes.app }" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.app-logo {
  display: flex;
  flex-direction: column;
  position: relative;
}
.app-logo__img{
  font-weight: bold;
  font-size: 20px;
}
.app-logo__link {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
