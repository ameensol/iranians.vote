<template>
  <div class="repos">
    <h2 class="repos__title">
      {{ $t('repos.title') }}
    </h2>

    <div class="repos__list">
      <repos-item
        class="repos__item"
        v-for="(item, idx) in decentralizedIdentificationProcessLinks"
        :key="idx"
        :title="item.title"
        :repo-link="item.repoLink"
        :audit-link="item.auditLink"
      />
    </div>

    <app-markdown class="repos__desc" :source="$t('repos.desc')" />

    <icon-link class="repos__more-link" :route="{ name: $routes.techDoc }">
      {{ $t('repos.more-link') }}
    </icon-link>
  </div>
</template>

<script setup lang="ts">
import { IconLink } from '@/common'

import ReposItem from './ReposItem.vue'
import AppMarkdown from '@/common/AppMarkdown.vue'

const decentralizedIdentificationProcessLinks = [
  {
    title: 'Passport ZK Circuits ',
    repoLink: 'https://github.com/rarimo/passport-zk-circuits',
    auditLink:
      'https://github.com/rarimo/passport-zk-circuits/blob/main/audits/halborn_2024-03-16.pdf',
  },
  {
    title: 'Voting Contracts',
    repoLink: 'https://github.com/rarimo/voting-contracts',
    auditLink:
      'https://github.com/rarimo/voting-contracts/blob/main/audits/halborn_2024-03-12.pdf',
  },
  {
    title: 'iOS App',
    repoLink: 'https://github.com/rarimo/FreedomTool',
    auditLink:
      'https://github.com/rarimo/FreedomTool/blob/main/audits/halborn_2024-03-26.pdf',
  },
  {
    title: 'Android App',
    repoLink: 'https://github.com/rarimo/FreedomToolAndroid',
    auditLink:
      'https://github.com/rarimo/FreedomTool/blob/main/audits/halborn_2024-03-26.pdf',
  },
  {
    title: 'Identity Provider',
    repoLink: 'https://github.com/rarimo/passport-identity-provider',
    auditLink:
      'https://github.com/rarimo/passport-identity-provider/blob/main/audits/halborn_2024-03-16.pdf',
  },
]
</script>

<style lang="scss">
.repos {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: toRem(64) 0;

  @include dark-bg;
}

.repos__title {
  font-family: 'Vazir';
  font-size: toRem(32);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: toRem(54);

  @include respond-to(tablet) {
    text-align: center;
  }

  @include respond-to(small) {
    font-size: toRem(24);
  }
}

.repos__list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: toRem(8);
  width: 100%;
}

html body .repos .repos__desc {
  text-align: center;
  font-style: italic;
  white-space: pre-line;
  margin: toRem(64) 0;
  max-width: toRem(730);

  a {
    text-decoration: underline;
    color: inherit;
    font-weight: 400;
  }

  p {
    font-size: toRem(16);
    line-height: 1.2;
  }
}
</style>
