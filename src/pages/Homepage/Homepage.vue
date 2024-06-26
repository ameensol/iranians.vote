<template>
  <div class="homepage">
    <hero-banner />
    <how-to />
    <faq />
    <repos />
    <div class="homepage__wrp">
      <span class="homepage__contact">
        {{ `Contact: ${$config.SUPPORT_LINK}` }}
      </span>

      <div class="homepage__sign">
        {{ `Powered by: ` }}
        <a
          class="homepage__sign-link"
          href="https://freedomtool.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          {{ `Freedom Tool` }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Repos, HeroBanner, HowTo } from './components'
import { Faq } from '@/pages/Homepage/components'
</script>

<style scoped lang="scss">
.homepage {
  & > * {
    max-width: 100%;
    width: 100%;
  }
}

.homepage__wrp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: toRem(18) 0;
  gap: toRem(32);

  @include respond-to(small) {
    flex-direction: column;
  }
}

.homepage__sign {
  text-align: right;
  white-space: nowrap;
  align-self: flex-end;
  font-weight: 500;
  font-size: toRem(16);
  color: var(--text-primary-main);

  @include respond-to(small) {
    align-self: center;
    text-align: center;
    padding: toRem(12);
  }
}

.homepage__sign-link {
  font: inherit;
  color: inherit;
  text-decoration: underline;
}

.homepage__contact {
  white-space: nowrap;
  font-weight: 500;
  font-size: toRem(16);
  color: var(--text-primary-main);

  @include respond-to(small) {
    padding: toRem(12);
    font-size: toRem(16);
  }

  @include respond-to(xsmall) {
    font-size: toRem(14);
  }
}
</style>
