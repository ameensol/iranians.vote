<template>
  <div class="guide-step-overview">
    <div class="guide-step-overview__media">
      <img
        class="guide-step-overview__media-img"
        :class="steps[selectedStep].imgAnchor"
        :src="steps[selectedStep].imgUrl"
        :alt="steps[selectedStep].title"
      />
    </div>
    <div class="guide-step-overview__content">
      <template v-for="(item, idx) in steps" :key="idx">
        <div class="guide-step-overview__item">
          <accordion :key="idx" class="guide-step-overview__accordion">
            <template #head="{ accordion }">
              <div
                class="guide-step-overview__accordion-head"
                @click="
                  () => {
                    accordion.toggle()
                    setStep(idx)
                  }
                "
              >
                <div class="guide-step-overview__accordion-head-text">
                  <span
                    class="guide-step-overview__accordion-head-text--accent"
                  >
                    {{ $t('guide.step-prefix', { idx: idx + 1 }) }}
                  </span>
                  {{ item.title }}
                </div>
                <div class="guide-step-overview__accordion-head-indicator">
                  <icon
                    class="guide-step-overview__accordion-head-indicator-icon"
                    :class="{
                      // eslint-disable-next-line max-len
                      'guide-step-overview__accordion-head-indicator-icon--active':
                        accordion.isOpen,
                    }"
                    :name="$icons.chevronDown"
                  />
                </div>
              </div>
            </template>
            <template #default>
              <div class="guide-step-overview__accordion-body">
                <vue-markdown
                  class="guide-step-overview__accordion-body-text"
                  :source="item.desc"
                  :plugins="plugins"
                  :options="{
                    html: true,
                    breaks: true,
                    typographer: true,
                    linkify: true,
                  }"
                />
              </div>
            </template>
          </accordion>
          <div class="guide-step-overview__divider" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Accordion, Icon } from '@/common'
import VueMarkdown from 'vue-markdown-render'
import MarkdownItAnchor from 'markdown-it-anchor'
import { ref } from 'vue'

defineProps<{
  steps: {
    imgUrl: string
    // 'top-center' | 'bottom-right' | 'bottom-center'
    imgAnchor: 'top-center' | 'bottom-right' | 'bottom-center'
    title: string
    desc: string
  }[]
}>()

const plugins = [MarkdownItAnchor]

const selectedStep = ref(0)

const setStep = (step: number) => {
  selectedStep.value = step
}
</script>

<style lang="scss">
.guide-step-overview {
  display: flex;
  gap: toRem(24);
  width: 100%;

  @include respond-to(small) {
    flex-direction: column;
  }
}

.guide-step-overview__media {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  background: var(--black);

  @include respond-to(small) {
    width: 100%;
  }
}

.guide-step-overview__media-img {
  max-width: 100%;
  height: auto;

  &.top-center {
    align-self: flex-start;
    padding-bottom: toRem(24);
    margin-bottom: auto;
  }

  &.bottom-right {
    align-self: flex-end;
    margin-left: auto;
  }

  &.bottom-center {
    align-self: center;
    margin-top: auto;
    padding-top: toRem(24);
  }
}

.guide-step-overview__content {
  width: 50%;

  @include respond-to(small) {
    width: 100%;
  }
}

.guide-step-overview__item {
  display: flex;
  flex-direction: column;
}

.guide-step-overview__accordion {
  width: 100%;
}

.guide-step-overview__accordion-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: toRem(20) 0;
  font-size: toRem(16);
  line-height: 1.25;
  font-weight: 700;
}

.guide-step-overview__accordion-head-text {
  &--accent {
    color: var(--text-secondary-main);
  }
}

.guide-step-overview__accordion-head-indicator-icon {
  transition: transform 0.3s;

  @include static-size(toRem(16));

  &--active {
    transform: rotate(180deg);
  }
}

.guide-step-overview__accordion-body {
  padding-bottom: toRem(20);
}

.guide-step-overview__accordion-body-text {
  font-size: toRem(14);
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-primary-main);

  a {
    font: inherit;
    color: inherit;
    text-decoration: underline;
    font-weight: 600;
  }

  p {
    font: inherit;
    color: inherit;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }
}
</style>
