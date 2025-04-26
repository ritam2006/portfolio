<script setup lang="ts">
  import navItems from './navItems';

  defineProps({
    isInitialLoad: Boolean,
    isDark: Boolean
  });

  defineEmits(['toggle-theme']);
</script>

<template>
  <nav class="sticky lg:hidden top-0 z-40 h-16 w-full flex justify-center pointer-events-none border-b-2 border-accent">
    <ul class="flex items-center gap-4 text-base md:text-lg w-full bg-bg justify-center pointer-events-auto"
      :class="{'hidden': isInitialLoad}">
      <li class="hoverable">
        <a href="#about"> About </a>
      </li>
      <li v-for="(item, index) in navItems" :key="index" class="hoverable">
        <a :href="'#' + item.link">{{ item.label }}</a>
      </li>
      <!-- <li class="hoverable">
        <button :class="['pi', isDark ? 'pi-sun' : 'pi-moon']" @click="$emit('toggle-theme')" />
      </li> -->
    </ul>
  </nav>
</template>