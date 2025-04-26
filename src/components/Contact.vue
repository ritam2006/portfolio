<script setup lang="ts">
  import { ref } from "vue";
  const WEB3FORMS_ACCESS_KEY = "576f047a-856a-4233-b2bc-c8a9bdf747c8";
  const name = ref("")
  const email = ref("")
  const message = ref("")

  const submitForm = async () => {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
    }
  }
</script>
<template>
  <div class="flex flex-col gap-4">
    <a href= "mailto:ritam.chakraborty@gmail.com" class="hoverable flex items-center">
      <i class="pi pi-envelope"></i>&nbsp;
      <p>ritam.chakraborty@gmail.com</p>
    </a>
    <div class="h-1 w-full bg-border rounded-lg"></div>
    <form @submit.prevent="submitForm" class="space-y-2.5">
      <input 
        class="form-element bg-muted" 
        type="text" 
        name="name" 
        v-model="name" 
        placeholder="Your Name" 
        required
      />
      <input 
        class="form-element bg-muted" 
        type="email" 
        name="email" 
        v-model="email" 
        placeholder="Your Email"
        required
      /> 
      <textarea 
        class="form-element bg-muted resize-none" 
        name="message" 
        v-model="message"
        placeholder="Your Message"  
        required 
      />
      <button type="submit" class="form-element bg-accent-bg hoverable-div border-none">Send Message</button>
    </form>
  </div>
</template>

<style scoped>
  .form-element {
    @apply rounded-lg w-full p-2 border-2 border-border
  }
</style>