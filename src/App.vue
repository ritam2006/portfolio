<script setup lang="ts">
  import { ref } from 'vue';

  import Navbar from './components/Navbar.vue';
  import Background from './components/Background.vue';
  import ProfileCard from './components/ProfileCard.vue';
  import Content from './components/Content.vue';

  const isInitialLoad = ref<boolean>(true);
  const isDark = ref<boolean>(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    isDark.value = !isDark.value;
  }

  toggleTheme();
</script>

<template>
  <Background />
  <main class="text-fg">
    <Navbar :isInitialLoad="isInitialLoad" :isDark="isDark" @toggle-theme="toggleTheme" />
    <section class="lg:flex mx-0 lg:mx-10 ">
      <ProfileCard :isInitialLoad="isInitialLoad" />
      <Content v-model:isInitialLoad="isInitialLoad" />
    </section>
  </main>
</template>