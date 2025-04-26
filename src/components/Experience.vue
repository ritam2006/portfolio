<script setup lang="ts">
  import experiences from '../data/experiences.json';
  import ExperienceCard from './ExperienceCard.vue';
</script>

<template>
  <section class="flex flex-col gap-4 mt-6 relative">
    <ExperienceCard 
      v-for="(experience) in experiences"
      :title="experience.title"
      :company="experience.company"
      :start-date="experience.startDate"
      :end-date="experience.endDate"
      :description="experience.description"
      :imgFile="experience.imgFile"
    />
  </section>
</template>