<script setup lang="ts">
  defineProps({
    title: String,
    description: String,
    link: String,
    tools: Array<String>,
    imgFile: String
  });
</script>

<template>
  <div class="group card-bg p-4 space-y-2 rounded-lg border-2 border-border">
    <div class="flex items-center gap-4 h-fit">
      <img 
        :src="`/projects/${imgFile}`"
        :alt="imgFile"
        class="h-16 md:h-20 aspect-square rounded-lg"
      />
      <header>
        <h2 v-html="title" />
      </header>
    </div>
    <p v-html="description" class="text-fg" />
    <div class="flex flex-wrap gap-2">
      <div v-for="(tool, index) in tools" :key="index"
        class="px-3 py-0.5 rounded-3xl text-sm text-fg bg-accent-bg"
      >
        {{ tool }}
      </div>
    </div>
    <div>
      <a :href="link" class="group hoverable">
        <i class="pi pi-github"/>
        View Repository
      </a>
    </div>
  </div>
</template>