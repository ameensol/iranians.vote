<template>
  <div class="how-to">
    <div class="how-to__header">
      <h2 class="how-to__title">
        {{ $t('how-to.title') }}
      </h2>

      <router-link :to="{ name: $routes.about }" class="how-to__link">
        <span class="how-to__link-text">
          {{ $t('how-to.more-link') }}
        </span>
        <icon class="how-to__link-icon" :name="$icons.externalLink" />
      </router-link>
    </div>

    <div class="how-to__content">
      <div class="how-to__steps">
        <div v-for="(item, idx) in steps" :key="idx" class="how-to__step">
          <div class="how-to__step-icon-wrp">
            <icon class="how-to__step-icon" :name="item.iconName" />
          </div>

          <div class="how-to__step-content">
            <span class="how-to__step-title">{{ item.title }}</span>
            <div class="how-to__step-desc">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>

      <div class="how-to__video-wrp">
        <video
          class="how-to__video"
          controls
          :autoplay="false"
          poster="/images/video-poster.png"
          width="100%"
          height="100%"
        >
          <source src="/images/how-it-works.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/common'
import { ICON_NAMES } from '@/enums'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const steps = [
  {
    iconName: ICON_NAMES.passport,
    title: t('how-to.step-1-title'),
    description: t('how-to.step-1-desc'),
  },
  {
    iconName: ICON_NAMES.anonymus,
    title: t('how-to.step-2-title'),
    description: t('how-to.step-2-desc'),
  },
  {
    iconName: ICON_NAMES.poll,
    title: t('how-to.step-3-title'),
    description: t('how-to.step-3-desc'),
  },
  {
    iconName: ICON_NAMES.barchart,
    title: t('how-to.step-4-title'),
    description: t('how-to.step-4-desc'),
  },
]
</script>

<style scoped lang="scss">
$z-index-video: 1;

.how-to {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: toRem(80);
  padding-bottom: toRem(64);

  @include respond-to(small) {
    padding-top: toRem(40);
  }

  @include dark-bg;
}

.how-to__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: toRem(16);
}

.how-to__link {
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: toRem(8);
  color: var(--text-primary-main);
}

.how-to__link-text {
  font-size: toRem(14);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
}

.how-to__link-icon {
  width: toRem(20);
  height: toRem(20);
  color: inherit;
}

.how-to__content {
  display: flex;
  gap: toRem(120);
  margin-top: toRem(84);

  @include respond-to(tablet) {
    flex-direction: column;
    gap: toRem(24);
  }

  @include respond-to(small) {
    margin-top: toRem(40);
  }
}

.how-to__video-wrp {
  align-self: flex-start;
  overflow: hidden;
  max-width: toRem(400);
  width: 100%;
  padding: toRem(40);
  background-color: var(--white);
  border-radius: toRem(8);
  box-shadow: 0 toRem(5) toRem(16) rgba(0, 0, 0, 0.04);
  z-index: $z-index-video;

  @include respond-to(tablet) {
    max-width: none;
    align-self: center;
  }
}

.how-to__video {
  width: 100%;
  border: toRem(1) solid var(--border-primary-main);
  border-radius: toRem(16);
  height: auto;

  @include respond-to(tablet) {
    max-width: none;
    max-height: none;
  }
}

.how-to__steps {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
  margin-bottom: toRem(40);
}

.how-to__step {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: toRem(24);
  width: 100%;
}

.how-to__step-icon {
  @include static-size(toRem(64));

  @include respond-to(small) {
    @include static-size(toRem(48));
  }
}

.how-to__step-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: toRem(8);
}

.how-to__step-title {
  font-size: toRem(16);
  line-height: 1.2;
  font-weight: 500;

  @include respond-to(small) {
    font-size: toRem(14);
  }
}

.how-to__step-desc {
  color: var(--text-secondary-main);
  font-size: toRem(14);
  line-height: 1.2;
  font-style: normal;
  font-weight: 400;

  @include respond-to(small) {
    font-size: toRem(12);
  }
}

.how-to__step-arrow {
  position: absolute;
  top: 0;
  left: calc(100% + #{toRem(12)});
  transform: translateX(-50%);
  width: 35%;

  @include respond-to(medium) {
    width: 40%;
  }
}
</style>
