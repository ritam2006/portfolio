<script setup lang="ts">
  import projects from '../data/projects.json';
  import ProjectCard from './ProjectCard.vue';
</script>

<template>
  <section class="space-y-4">
    <div
      v-for="(project) in projects"
      :key="project.title"
      v-motion-slide-right
    >
      <ProjectCard
        :key="project.title"
        :title="project.title"
        :description="project.description"
        :link="project.link"
        :tools="project.tools"
        :imgFile="project.imgLink"
      />
    </div>
  </section>
</template>