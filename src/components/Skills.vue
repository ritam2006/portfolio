<script setup lang="ts">
  import SkillCard from './SkillCard.vue';
  import skills from '../data/skills.json';
</script>

<template>
  <div
    v-for="(skills, category, index) in skills"
    :key="category"
    :class="[
      'wrapper',
      index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'
    ]"
    :style="{ animationDelay: `${index * 100}ms` }"
  >
    <div :key="category" class="space-y-2">
      <h2>{{ category }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <SkillCard
          v-for="skill in skills"
          :key="skill.name"
          :name="skill.name"
          :icon_name="skill.icon_name"
          :rating="skill.rating"
        />
      </div>
    </div>
  </div>
</template>