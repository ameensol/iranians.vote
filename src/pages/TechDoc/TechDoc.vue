<template>
  <div class="tech-doc" dir="ltr">
    <div class="tech-doc__back-link-wrp">
      <app-button
        class="tech-doc__back-link"
        :icon-left="$icons.arrowLeft"
        scheme="none"
        color="none"
        size="none"
        @click="back"
      >
        {{ $t('tech-doc.back-link') }}
      </app-button>
    </div>

    <app-markdown class="tech-doc__content" :source="source" />
  </div>
</template>

<script setup lang="ts">
import { AppButton } from '@/common'
import AppMarkdown from '@/common/AppMarkdown.vue'

import { html as htmlEn } from '@/localization/resources/AnonDoc-en.md'
import { html as htmlRus } from '@/localization/resources/AnonDoc-rus.md'
import { html as htmlFa } from '@/localization/resources/AnonDoc-fa.md'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { locale } = useI18n({ useScope: 'global' })

const source = computed(() => {
  return {
    en: htmlEn,
    rus: htmlRus,
    fa: htmlFa,
  }[locale.value as 'en' | 'rus' | 'fa']
})

const back = () => {
  router.go(-1)
}
</script>

<style lang="scss">
#app .tech-doc {
  padding-bottom: toRem(120);
}

.tech-doc__navbar {
  width: 100%;
  margin-bottom: toRem(48);

  @include respond-to(small) {
    margin-bottom: toRem(36);
  }
}

.tech-doc__divider {
  margin-top: toRem(100);
}

.tech-doc__back-link-wrp {
  max-width: toRem(680);
  width: 100%;
  margin: 0 auto;
}

html body .tech-doc .tech-doc__back-link {
  text-decoration: underline;
  color: var(--text-primary-main);
  gap: toRem(8);

  --button-icon-size: #{toRem(14)};

  margin-bottom: toRem(24);
}

/* stylelint-disable */
html body .tech-doc .tech-doc__content {
  max-width: toRem(680);
  margin: 0 auto;
  line-height: 1.85;
  font-family: sans-serif !important;

  @media screen and (min-width: 32rem) and (max-width: 48rem) {
    .tech-doc__content {
      font-size: 15px;
    }
  }

  @media screen and (min-width: 48rem) {
    .tech-doc__content {
      font-size: 16px;
    }
  }

  strong,
  b {
    font-weight: bold;
  }

  pre,
  code {
    font-family: Menlo, Monaco, 'Courier New', monospace;
  }

  pre {
    padding: 0.5rem;
    line-height: 1.25;
    overflow-x: scroll;
    font-family: sans-serif;
  }

  @media print {
    *,
    *:before,
    *:after {
      background: transparent !important;
      color: #000 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]:after {
      content: ' (' attr(href) ')';
    }

    abbr[title]:after {
      content: ' (' attr(title) ')';
    }

    a[href^='#']:after,
    a[href^='javascript:']:after {
      content: '';
    }

    pre,
    blockquote {
      border: 1px solid #999;
      page-break-inside: avoid;
    }

    thead {
      display: table-header-group;
    }

    tr,
    img {
      page-break-inside: avoid;
    }

    img {
      max-width: 100% !important;
    }

    p,
    h2,
    h3 {
      font-family: sans-serif;
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      font-family: sans-serif;
      page-break-after: avoid;
    }
  }

  a,
  a:visited {
    color: #0000ff;
  }

  a:hover,
  a:focus,
  a:active {
    color: #0000ff;
  }

  .retro-no-decoration {
    text-decoration: none;
  }

  p,
  .retro-p {
    font-family: sans-serif;
    line-height: 1.6;
    font-size: toRem(20);
    margin-top: toRem(42);
    letter-spacing: 0.005em;
  }

  h1,
  .retro-h1,
  h2,
  .retro-h2,
  h3,
  .retro-h3,
  h4,
  .retro-h4 {
    margin: 1.414rem 0 0.5rem;
    font-weight: inherit;
    line-height: 1.42;
  }

  h1,
  .retro-h1 {
    margin-top: 0;
    font-size: toRem(56);

    @include respond-to(small) {
      font-size: toRem(36);
    }
  }

  h2,
  .retro-h2 {
    font-family: sans-serif;
    font-size: toRem(48);

    @include respond-to(small) {
      font-size: toRem(24);
    }
  }

  h3,
  .retro-h3 {
    font-family: sans-serif;
    font-size: toRem(36);

    @include respond-to(small) {
      font-size: toRem(18);
    }
  }

  h4,
  .retro-h4 {
    font-family: sans-serif;
    font-size: toRem(28);

    @include respond-to(small) {
      font-size: toRem(12);
    }
  }

  h5,
  .retro-h5 {
    font-family: sans-serif;
    font-size: toRem(24);

    @include respond-to(small) {
      font-size: toRem(10);
    }
  }

  h6,
  .retro-h6 {
    font-family: sans-serif;
    font-size: toRem(20);
  }

  small,
  .retro-small {
    font-family: sans-serif;
    font-size: 0.707em;
  }

  /* https://github.com/mrmrs/fluidity */

  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }

  a {
    font-family: sans-serif;
    line-height: 1.6;
    font-size: toRem(18);
    margin-top: toRem(42);
    letter-spacing: 0.005em;
  }

  pre {
    background-color: #333;
  }

  blockquote {
    border-left: 3px solid #0000ff;
    padding-left: 1rem;
    margin: toRem(36) auto toRem(36) toRem(4);
  }

  ol,
  ol li {
    font-family: sans-serif;
    line-height: 1.6;
    font-size: toRem(20);
    letter-spacing: 0.005em;
    padding-left: toRem(30);
    list-style-type: decimal;
  }

  ul,
  ul li {
    font-family: sans-serif;
    line-height: 1.6;
    font-size: toRem(20);
    letter-spacing: 0.005em;
    padding-left: toRem(30);
    list-style-type: disc;
  }
}
/* stylelint-enable */
</style>
