<template>
  <div class="hero-banner">
    <div class="hero-banner__titles">
      <h1 class="hero-banner__title">
        {{ $t('hero-banner.title') }}
      </h1>
      <span class="hero-banner__subtitle">
        {{ $t('hero-banner.subtitle') }}
      </span>
    </div>

    <div class="hero-banner__desc-wrp">
      <div class="hero-banner__desc-content">
        <h2 class="hero-banner__desc-title">
          {{ $t('hero-banner.desc-title') }}
        </h2>

        <p class="hero-banner__desc">
          {{ $t('hero-banner.desc') }}
        </p>

        <!--        <template v-if="config.VOTING_END_DATE">-->
        <!--          <div class="hero-banner__desc-counter-wrp">-->
        <!--            <span class="hero-banner__desc-counter-title">-->
        <!--              {{ $t('hero-banner.counter-end-title') }}-->
        <!--            </span>-->

        <!--            <countdown-->
        <!--              class="hero-banner__desc-counter"-->
        <!--              :end-time="new Date(config.VOTING_END_DATE)"-->
        <!--            />-->
        <!--          </div>-->
        <!--        </template>-->
        <!--        <template v-else-if="config.VOTING_START_DATE">-->
        <!--          <div class="hero-banner__desc-counter-wrp">-->
        <!--            <span class="hero-banner__desc-counter-title">-->
        <!--              {{ $t('hero-banner.counter-start-title') }}-->
        <!--            </span>-->

        <!--            <countdown-->
        <!--              class="hero-banner__desc-counter"-->
        <!--              :end-time="new Date(config.VOTING_START_DATE)"-->
        <!--            />-->
        <!--          </div>-->
        <!--        </template>-->

        <div class="hero-banner__desc-links">
          <router-link
            v-for="(item, idx) in appLinks"
            :key="idx"
            class="hero-banner__desc-links-item"
            :to="{
              name: item.routeName,
              params: {
                deviceType: item.deviceType,
              },
            }"
          >
            <icon
              class="hero-banner__desc-links-item-icon"
              :style="{
                ...(item?.iconColor && { color: item?.iconColor }),
              }"
              :name="item.iconName"
            />
            <span class="hero-banner__desc-links-item-text">
              {{ item.text }}
            </span>

            <app-button
              class="hero-banner__desc-links-item-btn"
              :text="$t('hero-banner.vote-link')"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppButton, Icon } from '@/common'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { Devices, ICON_NAMES, ROUTE_NAMES } from '@/enums'
// import { config } from '@config'

const { t } = useI18n({ useScope: 'global' })

const appLinks = computed(() => {
  const iosAppLink = {
    deviceType: Devices.iOS,
    iconColor: undefined,
    iconName: ICON_NAMES.apple,
    text: t('hero-banner.app-store-link'),
    routeName: ROUTE_NAMES.guide,
  }

  const androidAppLink = {
    deviceType: Devices.Android,
    iconName: ICON_NAMES.androidHead,
    iconColor: 'rgba(164, 198, 57, 1)',
    text: t('hero-banner.gplay-link'),
    routeName: ROUTE_NAMES.guide,
  }

  return [iosAppLink, androidAppLink]
})
</script>

<style scoped lang="scss">
.hero-banner {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: toRem(120);
}

.hero-banner__titles {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  gap: toRem(16);
  background: url('/src/assets/test4.png') no-repeat top center;
  background-size: cover;
  margin-top: -150px;
  padding-top: toRem(300);
  padding-bottom: toRem(160);

  @include respond-to(small) {
    padding-top: toRem(32);
    padding-bottom: toRem(50);
    background-position: top center;
    background-size: contain;
  }
}

.hero-banner__title {
  font-family: 'Vazir' !important;
  font-size: toRem(64);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -4%;

  @include respond-to(small) {
    font-size: toRem(32);
    letter-spacing: toRem(0);
  }
}

.hero-banner__subtitle {
  color: var(--text-secondary-main);
  font-size: toRem(24);
  line-height: 1.3;
  max-width: toRem(500);

  @include respond-to(small) {
    font-size: toRem(20);
    margin-top: toRem(16);
  }
}

.hero-banner__desc-wrp {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  background: rgba(128, 237, 153, 0.1);
  padding: toRem(64) 0 toRem(80);

  @include respond-to(small) {
    padding: toRem(40) 0 toRem(40);
  }
}

.hero-banner__desc-content {
  max-width: 65%;
  margin: 0 auto;

  @include respond-to(small) {
    text-align: right;
    max-width: 90%;
  }
}

.hero-banner__desc-title {
  font-family: 'Vazir';
  text-align: right;
  white-space: pre-line;
  margin-bottom: toRem(24);
}

.hero-banner__desc {
  text-align: right;
  white-space: pre-line;
  margin-bottom: toRem(24);
  line-height: 1.5;
}

.hero-banner__desc-counter-wrp {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
}

.hero-banner__desc-counter-title {
  color: var(--text-primary-main);
  text-align: center;
  font-size: toRem(16);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.hero-banner__desc-counter {
  align-self: center;
  width: auto;
}

.hero-banner__desc-links {
  display: flex;
  gap: toRem(24);
  margin-top: toRem(64);

  @include respond-to(small) {
    flex-direction: column;
    margin-top: toRem(40);
  }
}

.hero-banner__desc-links-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: toRem(24);
  background: var(--white);
  width: 100%;
  color: var(--text-primary-main);
  padding: toRem(24) toRem(16);
}

.hero-banner__desc-links-item-icon {
  @include static-size(toRem(24));
}

.hero-banner__desc-wrp .hero-banner__desc-links-item-btn {
  color: var(--text-primary-main);
  font-weight: 700;
  font-family: 'Vazir';
  &:hover {
    color: var(--text-primary-main);
  }
}
</style>
