<template>
  <vue-markdown
    class="app-markdown"
    :source="source"
    :plugins="plugins"
    :options="{
      html: true,
      breaks: true,
      typographer: true,
      linkify: true,
    }"
  />
</template>

<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render'
import MarkdownItAnchor from 'markdown-it-anchor'

defineProps<{
  source: string
}>()

const plugins = [MarkdownItAnchor]
</script>
