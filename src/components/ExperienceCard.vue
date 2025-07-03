<script setup lang="ts">
  defineProps({
    title: String,
    company: String,
    startDate: String,
    endDate: String,
    description: String,
    imgFile: String
  });
</script>

<template>
  <div class="bg-muted p-4 rounded-lg space-y-4 border-2 border-border">
    <div class="flex items-center h-fit gap-4">
    <img
      :src="`/experiences/${imgFile}`"
      :alt="imgFile"
      class="h-16 md:h-20 aspect-square rounded-lg"
    />
    <header class="space-y-1">
      <h2>{{ title }}</h2>
      <h3>
        {{ company }}
        •
        {{ startDate + ' - ' + endDate }}
      </h3>
    </header>
  </div>
    <p>{{ description }}</p>
  </div>
</template>