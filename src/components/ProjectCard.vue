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
  <div class="group bg-muted p-4 rounded-lg border-2 border-accent hoverable
    hover:border-accent-hover duration-200 ease-in-out"
  >
    <a class="space-y-2" :href="link" target="_blank">
      <div class="flex items-center gap-4 h-fit">
        <img 
          :src="`/projects/${imgFile}`"
          :alt="imgFile"
          class="h-16 md:h-20 aspect-square rounded-lg"
        />
        <header>
          <h2>
            <span v-html="title" />&nbsp;
            <span class="pi pi-external-link text-lg md:text-2xl"></span>
          </h2>
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
    </a>
  </div>
</template>