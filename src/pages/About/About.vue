<template>
  <div class="about">
    <guide-header class="about__header" :title="$t('about.title')" />

    <tip
      class="about__tip"
      :icon="$icons.globeVpn"
      :title="$t('about.tip-title')"
      :text="$t('about.tip-msg')"
    />

    <div class="about__content">
      <div class="about__row">
        <div class="about__media about__media--bottom">
          <img src="/images/about/1.png" alt="" class="about__media-img" />
        </div>
        <div class="about__desc">
          <h4 class="about__desc-title">
            {{ $t('about.step-1-desc-title') }}
          </h4>
          <p class="about__desc-text">
            {{ $t('about.step-1-desc') }}
            <b class="about__desc-text--accent">
              {{ $t('about.step-1-desc-accent') }}
            </b>
          </p>
        </div>
      </div>

      <div class="about__row">
        <div class="about__desc">
          <h3 class="about__desc-title">
            {{ $t('about.step-2-desc-title') }}
          </h3>
          <p class="about__desc-text">
            {{ $t('about.step-2-desc') }}
          </p>
        </div>
        <div class="about__media about__media--top">
          <img src="/images/about/2.png" alt="" class="about__media-img" />
        </div>
      </div>
    </div>

    <icon class="about__icon-divider" :name="$icons.curlyArrowDown" />

    <h3 class="about__title">
      {{ $t('about.step-3-title') }}
    </h3>

    <div class="about__content about__content--row">
      <div class="about__column">
        <div class="about__media about__media--bottom">
          <img src="/images/about/3_1.png" alt="" class="about__media-img" />
        </div>
        <div class="about__desc">
          <p class="about__desc-text">
            {{ $t('about.step-3-desc-1') }}
          </p>
        </div>
      </div>

      <div class="about__column">
        <div class="about__media about__media--bottom">
          <img src="/images/about/3_2.png" alt="" class="about__media-img" />
        </div>
        <div class="about__desc">
          <p class="about__desc-text">
            {{ $t('about.step-3-desc-2') }}
          </p>
        </div>
      </div>
    </div>

    <announce-block
      :desc="$t('about.announce-msg')"
      :icon-left="$icons.announce"
      :is-centered="true"
    />

    <h3 class="about__title">
      {{ $t('about.step-4-title') }}
    </h3>

    <div class="about__content">
      <div class="about__row">
        <div class="about__media about__media--top">
          <img src="/images/about/4.png" alt="" class="about__media-img" />
        </div>
        <div class="about__desc">
          <p class="about__desc-text">
            {{ $t('about.step-4-desc-1') }}
          </p>
          <div class="about__desc-tip about__desc-tip--success">
            <span class="about__desc-tip-text">
              {{ $t('about.step-4-desc-2') }}
            </span>
          </div>
        </div>
      </div>

      <div class="about__row">
        <div class="about__desc">
          <p class="about__desc-text">
            {{ $t('about.step-5-desc') }}
          </p>
        </div>
        <div class="about__media about__media--top">
          <img src="/images/about/5.png" alt="" class="about__media-img" />
        </div>
      </div>
    </div>

    <divider />

    <div class="about__content">
      <div class="about__row">
        <div class="about__media about__media--bottom">
          <img src="/images/about/6.png" alt="" class="about__media-img" />
        </div>
        <div class="about__desc">
          <p class="about__desc-text">
            {{ $t('about.step-6-desc-1') }}
          </p>

          <div class="about__desc-tip">
            <icon
              class="about__desc-tip-icon"
              :name="$icons.informationCircle"
            />
            <span class="about__desc-tip-text">
              {{ $t('about.step-6-desc-2') }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <divider />

    <div class="about__more">
      <h4 class="about__more-title">
        {{ $t('about.more-title') }}
      </h4>

      <icon-link class="about__more-link" :route="{ name: $routes.techDoc }">
        {{ $t('about.more-link') }}
      </icon-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AnnounceBlock,
  Divider,
  GuideHeader,
  Icon,
  IconLink,
  Tip,
} from '@/common'
</script>

<style scoped lang="scss">
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: toRem(64);
  padding-bottom: toRem(100);
}

.about__header {
  width: 100%;
}
h2 {
  font-family: 'Vazir' !important;
}
.about__tip {
  width: 100%;
}

.about__title {
  text-align: center;
  font-size: toRem(32);
  line-height: 1.05;
  font-weight: 700;
  max-width: toRem(800);

  @include respond-to(small) {
    font-size: toRem(20);
  }
}

.about__content {
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: toRem(32);

  &--row {
    flex-direction: row;
    gap: toRem(24);

    @include respond-to(small) {
      flex-direction: column;
    }
  }
}

.about__row {
  display: flex;
  gap: toRem(48);

  @include respond-to(small) {
    flex-direction: column;
  }
}

.about__column {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
  width: 50%;

  @include respond-to(small) {
    width: 100%;
  }
}

.about__media {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-radius: toRem(16);
  background: var(--black);
  padding: toRem(45);

  &--bottom {
    padding-bottom: 0;
    align-items: flex-end;
  }

  &--top {
    padding-top: 0;
    align-items: flex-start;
  }

  .about__column & {
    width: 100%;
  }

  @include respond-to(small) {
    width: 100%;
    order: 1;
  }
}

.about__media-img {
  max-width: 100%;
  height: auto;
}

.about__desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  gap: toRem(24);

  .about__column & {
    width: 100%;
  }

  @include respond-to(small) {
    justify-content: flex-start;
    width: 100%;
    order: 2;
  }
}

.about__desc-title {
  font-family: 'Vazir';
  font-size: toRem(24);
  line-height: 1.25;
  font-weight: 700;
}

.about__desc-text {
  line-height: 1.25;
  white-space: pre-line;

  &--accent {
    font-weight: 700;
  }
}

.about__desc-tip {
  display: flex;
  align-items: center;
  background: rgba(var(--black-rgb), 0.05);
  padding: toRem(16);
  gap: toRem(16);
  border-radius: toRem(8);
  /* stylelint-disable-next-line */
  color: rgba(var(--black-rgb), 0.6);

  &--success {
    background: var(--success-light);
    color: var(--success-dark);
  }
}

.about__desc-tip-icon {
  color: inherit;

  @include static-size(toRem(16));
}

.about__desc-tip-text {
  color: inherit;
  font-size: toRem(14);
  line-height: 1.25;
  font-weight: 500;
}

.about__more {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: toRem(64);
}
.about__title {
  font-family: 'Vazir';
}
.about__icon-divider {
  align-self: center;
  margin: -#{toRem(64)} 0;

  @include static-size(toRem(250));

  @include respond-to(small) {
    margin: -#{toRem(32)} 0;
    @include static-size(toRem(120));
  }
}
</style>
