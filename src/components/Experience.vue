<script setup lang="ts">
  import experiences from '../data/experiences.json';
  import ExperienceCard from './ExperienceCard.vue';
</script>

<template>
  <section class="flex flex-col gap-4 mt-6 relative">
    <ExperienceCard 
      v-for="(experience, index) in experiences"
      :key="experience.company + index"
      :company="experience.company"
      :imgFile="experience.imgFile"
      :roles="experience.roles"
    />
  </section>
</template>