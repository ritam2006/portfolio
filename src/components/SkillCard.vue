<script setup lang="ts">
  import { ref } from 'vue';

  defineProps({
    name: String,
    icon_name: String,
    description: String
  });

  const flipped = ref<boolean>(false);

  const toggleFlip = () => {
    flipped.value = !flipped.value;
  }
</script>

<template>
  <button class="aspect-square perspective" @click="toggleFlip">
    <div 
      class="relative w-full h-full text-accent transition-transform 
        duration-300 transform-style preserve-3d hoverable"
      :class="{ 'rotate-y-180': flipped }"
    >
      <div class="absolute w-full h-full backface-hidden flex flex-col items-center 
        justify-center gap-2 p-3 rounded-lg bg-muted hoverable border-2 border-accent
        hover:border-accent-hover"
      >
        <i class="text-5xl" :class="`devicon-${icon_name}`" />
        <p class="text-lg">{{ name }}</p>
      </div>
      <div class="absolute w-full h-full backface-hidden flex items-center 
        justify-center p-3 rounded-lg bg-muted transform rotate-y-180 hoverable
        border-2 border-accent hover:border-accent-hover"
      >
        <p class="text-center text-sm">{{ description }}</p>
      </div>
    </div>
  </button>
</template>

<style scoped>
  .perspective {
    perspective: 1000px;
  }

  .backface-hidden {
    backface-visibility: hidden;
  }

  .preserve-3d {
    transform-style: preserve-3d;
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }
</style>