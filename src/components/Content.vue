<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import navItems from './navItems';

  defineProps({
    isInitialLoad: Boolean,
  });

  const emits = defineEmits(['update:isInitialLoad']);
  const clickedItemIndex = ref<number | null>(null);

  const updateIsInitialLoad = (link: string, index: number) => {
    clickedItemIndex.value = index;
    emits('update:isInitialLoad', false);

    nextTick(() => {
      const target = document.getElementById(link);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };
</script>

<template>
  <section class="flex-1 px-8 mb-8 mt-6 overflow-x-hidden">
    <ul v-if="isInitialLoad" class="text-4xl space-y-10 slide-list">
      <li
        v-for="(item, index) in navItems"
        :key="item.link"
        class="hoverable slide-item w-fit"
        :class="{ 'slide-out': clickedItemIndex == index }"
        :style="{ animationDelay: `${index * 150}ms` }"
        @click="updateIsInitialLoad(item.link, index)"
      >
        <span class="group hoverable flex items-center gap-2">
          <div class="w-2 h-2 rounded bg-accent group-hover:w-8 group-hover:bg-accent-hover duration-200 ease-in-out" />
          {{ item.label }}
        </span>
      </li>
    </ul>
    <section v-else class="space-y-16">
      <section 
        v-for="(item, index) in navItems" 
        :class="{ 'space-y-6 relative': index !== 0 }"
        v-motion
        :initial="{ opacity: 0, x: (index % 2 == 0 ? 100 : -100) }"
        :visible="{ opacity: 1, x: 0 }"
        :delay="100"
        :duration="400"
      >
        <div :id="item.link" class="anchor" />
        <h1>{{ item.label }}</h1>
        <component :is="item.component" />
      </section>
    </section>
  </section>
</template>

<style scoped>
  @keyframes slideIn {
    from {
      transform: translateX(10rem);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(4rem);
    }
  }

  .slide-list .slide-item {
    opacity: 0;
    transform: translateX(10rem);
    animation: slideIn 0.5s ease-out forwards;
  }

  .slide-out {
    animation: slideOut 0.3s ease-in forwards;
  }

  .anchor {
    @apply absolute -top-20 lg:-top-6
  }
</style>
