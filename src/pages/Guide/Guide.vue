<template>
  <div class="guide">
    <div class="guide__header">
      <div class="guide__header-content">
        <icon
          v-if="content?.headerIconName"
          :name="content?.headerIconName"
          class="guide__header-icon"
        />

        <h2 class="guide__header-title">
          {{ content?.title }}
        </h2>

        <span v-if="content?.subtitle" class="guide__header-subtitle">
          {{ content?.subtitle }}
        </span>

        <div v-if="content?.appLinks?.length" class="guide__header-app-links">
          <store-badge
            v-for="(item, idx) in content?.appLinks"
            :key="idx"
            :image-url="item.value.imageUrl"
            :url="item.value.link"
          />
        </div>

        <!--<template v-if="isWebVotingRequired">-->
        <!--  <div class="guide__divider" />-->
        <!--  <app-button-->
        <!--    class="guide__external-link"-->
        <!--    :href="config.WEB_VOTING_URL"-->
        <!--    target="_blank"-->
        <!--    :icon-right="ICON_NAMES.externalLink"-->
        <!--  >-->
        <!--    {{ $t('guide.ios.web-voting-link') }}-->
        <!--  </app-button>-->
        <!--</template>-->

        <button class="guide__anchor" @click="scrollTo(stepsEl)">
          <span class="guide__anchor-text">
            {{ $t('guide.anchor-link') }}
          </span>
          <icon class="guide__anchor-icon" :name="$icons.chevronDoubleDown" />
        </button>
      </div>
    </div>

    <div ref="stepsEl" class="guide__steps">
      <h3 class="guide__steps-title">
        {{ $t('guide.steps-title') }}
      </h3>

      <tip
        class="guide__tip"
        :icon="$icons.globeVpn"
        :title="$t('guide.tip-title')"
        :text="$t('guide.tip-msg')"
      />

      <guide-step-overview
        v-if="content?.steps.value"
        :steps="content.steps.value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon, StoreBadge, Tip } from '@/common'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { Devices, ICON_NAMES } from '@/enums'
import { useI18n } from 'vue-i18n'
import { config } from '@config'
import { GuideStepOverview } from '@/pages/Guide/components'

type Step = {
  imgUrl: string
  imgAnchor: 'top-center' | 'bottom-right' | 'bottom-center'
  title: string
  desc: string
}[]

const params = useRoute().params

const stepsEl = ref<HTMLElement>()

const deviceType = computed(() => params.deviceType as string)

const { t } = useI18n({ useScope: 'global' })

const iosAppLink = computed(() => ({
  imageUrl: '/images/apple.svg',
  text: t('hero-banner.app-store-link'),
  link: config.APPSTORE_LINK,
}))

const gPlayAppLink = computed(() => ({
  imageUrl: '/images/gplay.svg',
  text: t('hero-banner.gplay-link'),
  link: config.PLAYSTORE_LINK,
}))

const apkAppLink = computed(() => ({
  imageUrl: '/images/android.svg',
  text: t('hero-banner.android-apk-link'),
  link: config.APK_LINK,
}))

const iOsSteps = computed<Step>(() => [
  {
    imgUrl: '/images/guide/ios/1.png',
    imgAnchor: 'bottom-center',
    title: t('guide.ios.step-1-title'),
    desc: t('guide.ios.step-1-desc'),
  },
  {
    imgUrl: '/images/guide/ios/2.png',
    imgAnchor: 'bottom-center',
    title: t('guide.ios.step-2-title'),
    desc: t('guide.ios.step-2-desc'),
  },
  {
    imgUrl: '/images/guide/ios/3.png',
    imgAnchor: 'bottom-center',
    title: t('guide.ios.step-3-title'),
    desc: t('guide.ios.step-3-desc'),
  },
  {
    imgUrl: '/images/guide/ios/4.png',
    imgAnchor: 'top-center',
    title: t('guide.ios.step-4-title'),
    desc: t('guide.ios.step-4-desc'),
  },
  {
    imgUrl: '/images/guide/ios/5.png',
    imgAnchor: 'top-center',
    title: t('guide.ios.step-5-title'),
    desc: t('guide.ios.step-5-desc'),
  },
  {
    imgUrl: '/images/guide/ios/6.png',
    imgAnchor: 'bottom-center',
    title: t('guide.ios.step-6-title'),
    desc: t('guide.ios.step-6-desc'),
  },
])

const androidSteps = computed<Step>(() => [
  {
    imgUrl: '/images/guide/android/1.png',
    imgAnchor: 'bottom-center',
    title: t('guide.android.step-1-title'),
    desc: t('guide.android.step-1-desc'),
  },
  {
    imgUrl: '/images/guide/android/2.png',
    imgAnchor: 'top-center',
    title: t('guide.android.step-2-title'),
    desc: t('guide.android.step-2-desc'),
  },
  {
    imgUrl: '/images/guide/android/3.png',
    imgAnchor: 'bottom-center',
    title: t('guide.android.step-3-title'),
    desc: t('guide.android.step-3-desc'),
  },
  {
    imgUrl: '/images/guide/android/4.png',
    imgAnchor: 'bottom-center',
    title: t('guide.android.step-4-title'),
    desc: t('guide.android.step-4-desc'),
  },
  {
    imgUrl: '/images/guide/android/5.png',
    imgAnchor: 'top-center',
    title: t('guide.android.step-5-title'),
    desc: t('guide.android.step-5-desc'),
  },
  {
    imgUrl: '/images/guide/android/6.png',
    imgAnchor: 'bottom-center',
    title: t('guide.android.step-6-title'),
    desc: t('guide.android.step-6-desc'),
  },
])

const content = computed(() => {
  return {
    [Devices.iOS]: {
      headerIconName: ICON_NAMES.apple,
      title: t('guide.ios.title'),
      subtitle: '',
      appLinks: [iosAppLink].filter(el => !!el.value.link),
      steps: iOsSteps,
    },
    [Devices.Android]: {
      headerIconName: ICON_NAMES.androidHead,
      title: t('guide.android.title'),
      subtitle: '', // t('guide.android.subtitle'),
      appLinks: [gPlayAppLink, apkAppLink].filter(el => !!el.value.link),
      steps: androidSteps,
    },
  }[deviceType.value]
})

// const isWebVotingRequired = computed(() => deviceType.value === Devices.iOS)

const scrollTo = (element: HTMLElement | undefined) => {
  if (!element) return

  element.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped lang="scss">
.guide {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: toRem(64) 0;
  padding-bottom: toRem(100);
}
.guide__steps-title {
  font-family: 'Vazir';
}
.guide__header {
  width: 100%;
  position: relative;

  &::v-global(.app__container) {
    overflow: visible;
  }

  @include dark-bg;

  &:before {
    background: var(--primary-main);
  }

  padding: toRem(104) toRem(32) toRem(32);
}

.guide__header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: toRem(840);
  width: 100%;
  margin: 0 auto;
}

.guide__header-icon {
  margin-bottom: toRem(24);

  @include static-size(toRem(48));
}

.guide__header-title {
  color: var(--text-primary-main);
  text-align: center;
  font-size: toRem(48);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -#{toRem(1.92)};
  margin-bottom: toRem(24);
}

.guide__header-subtitle {
  color: var(--text-secondary-main);
  margin-bottom: toRem(24);
}

.guide__header-app-links {
  display: flex;
  gap: toRem(24);
}

.guide__divider {
  width: 100%;
  height: toRem(1);
  background: rgba(0, 0, 0, 0.1);
  margin-top: toRem(40);
}

.guide .guide__external-link {
  white-space: nowrap;
  margin-top: toRem(40);
  background: var(--text-primary-main);

  &:hover {
    background: var(--text-primary-main);
  }
}

.guide__steps {
  display: flex;
  flex-direction: column;
  gap: toRem(48);
  width: 100%;
}

.guide__tip {
  width: 100%;
}

.guide__title {
  white-space: pre-line;
  text-align: center;
  font-size: toRem(32);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -#{toRem(1.25)};
  max-width: toRem(800);

  @include respond-to(small) {
    font-size: toRem(20);
  }
}

.guide__content {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}

.guide__row {
  display: flex;
  gap: toRem(48);

  @include respond-to(small) {
    flex-direction: column;
  }
}

.guide__media {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border: toRem(1) solid rgba(var(--black-rgb), 0.1);
  border-radius: toRem(16);
  padding: toRem(24);

  @include respond-to(small) {
    width: 100%;
    order: 1;
  }
}

.guide__media-img {
  max-width: 100%;
  height: auto;
}

.guide__desc {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;

  @include respond-to(small) {
    justify-content: flex-start;
    width: 100%;
    order: 2;
  }
}

.guide__desc-text {
  max-width: 77%;
  line-height: 1.25;
  white-space: pre-line;

  @include respond-to(small) {
    max-width: none;
  }
}

.guide__post-details {
  display: flex;
  justify-content: center;
  align-items: center;

  @include respond-to(small) {
    text-align: center;
    flex-direction: column;
    gap: toRem(32);
  }
}

.guide__simple-text {
  text-align: left;
  white-space: pre-line;
  font-size: toRem(18);
  line-height: 1.25;
  /* stylelint-disable-next-line */
  color: rgba(var(--black-rgb), 0.6);

  &--center {
    text-align: center;
  }

  &--accent {
    font-weight: 700;
  }
}

.guide__post-app-link {
  margin-left: toRem(100);

  @include respond-to(small) {
    margin-left: 0;
  }
}

.guide__anchor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: toRem(12);
  color: var(--text-primary-main);
  margin-top: toRem(120);
}

.guide__anchor-text {
  font-family: 'Vazir';
  font-size: toRem(16);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.guide__anchor-icon {
  animation: bouncing 3s ease infinite;

  @include static-size(toRem(18));
}

@keyframes bouncing {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-30%);
  }

  60% {
    transform: translateY(-15%);
  }
}
</style>
