<script setup lang="ts">
  import { ref, computed } from 'vue';

  const props = defineProps({
    name: String,
    icon_name: String,
    rating: Number
  });

  const flipped = ref<boolean>(false);

  const toggleFlip = () => {
    flipped.value = !flipped.value;
  }

  const starIcons = computed(() => {
    const fullStars = Math.floor(props.rating ?? 0);
    const hasHalfStar = (props.rating ?? 0) % 1 === 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return [
      ...Array(fullStars).fill('full'),
      ...(hasHalfStar ? ['half'] : []),
      ...Array(emptyStars).fill('empty')
    ];
  });
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
      <div class="absolute w-full h-full backface-hidden flex flex-col items-center 
        justify-center p-3 rounded-lg bg-muted transform rotate-y-180 hoverable
        border-2 border-accent hover:border-accent-hover"
      >
          <p>Experience:</p>
          <div class="flex gap-1">
            <template v-for="(star, index) in starIcons" :key="index">
              <template v-if="star === 'full'">
                <i class="pi pi-star-fill" />
              </template>
              <template v-else-if="star === 'half'">
                <i class="pi pi-star relative">
                  <i class="pi pi-star-half-fill absolute left-0" />
                </i>
              </template>
              <template v-else>
                <i class="pi pi-star" />
              </template>
            </template>
        </div>
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