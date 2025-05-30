<script setup lang="ts">
  import navItems from './navItems';
  import aboutMe from '../data/aboutMe.txt?raw';

  defineProps({
    isInitialLoad: Boolean,
  });

  interface SocialMedia {
    link: string
    icon: string
  }

  const socialMediaItems: SocialMedia[] = [
    {
      link: 'https://github.com/ritam2006',
      icon: 'pi-github'
    },
    {
      link: 'https://www.linkedin.com/in/ritam2006',
      icon: 'pi-linkedin'
    },
    {
      link: 'https://www.instagram.com/ritamz.ico/',
      icon: 'pi-instagram'
    }
  ];

  const openResume = () => {
    window.open('/Ritam_Chakraborty_Resume.pdf', '_blank');
  }
</script>

<template>
  <section class="h-fit relative lg:w-1/2 lg:sticky lg:top-4 lg:mt-4 px-8 space-y-6">
    <div id="about" class="absolute -top-20" />
    <header class="space-y-1">
      <h1>Ritam Chakraborty</h1>
      <h2>Data Science @ UC Berkeley</h2>
    </header>
    <div class="flex text-2xl gap-4">
      <a
        v-for="(item, index) in socialMediaItems"
        :key="index"
        :href="item.link"
        target="_blank"
        :class="['pi hoverable', item.icon]"
      />
    </div>
    <p v-text="aboutMe" class="text-base md:text-lg lg:text-xl" />
    <button class="flex items-center gap-1 px-3 py-2 rounded text-base md:text-lg lg:text-xl hoverable-div" @click="openResume">
      <p>Resume</p>
      <span class="pi pi-file-pdf" />
    </button>
    <transition name="fade" appear>
      <ul v-if="!isInitialLoad" class="hidden lg:block text-2xl space-y-4 slide-list">
        <li
          v-for="(item) in navItems"
          :key="item.link"
          class="w-fit"
        >
          <a :href="'#' + item.link" class="group hoverable flex items-center gap-2">
            <div class="w-2 h-2 rounded bg-accent group-hover:w-8 group-hover:bg-accent-hover duration-200 ease-in-out" />
            {{ item.label }}
          </a>
        </li>
      </ul>
    </transition>
    <footer>
      <p>© 2025 Ritam Chakraborty. All rights reserved.</p>
      <p>Made with Vue.js</p>
    </footer>
  </section>
</template>

<style scoped>
  .fade-enter-active,
  .fade-appear-active {
    @apply transition-opacity duration-[800ms] ease-out;
  }

  .fade-enter-from,
  .fade-appear-from {
    @apply opacity-0;
  }

  .fade-enter-to,
  .fade-enter-to {
    @apply opacity-100;
  }
</style>