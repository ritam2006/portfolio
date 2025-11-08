<script setup lang="ts">
interface Role {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

defineProps<{
  company: string;
  imgFile: string;
  roles: Role[];
}>();
</script>

<template>
  <div class="card-bg p-4 rounded-lg space-y-4 border-2 border-border">
    <div class="flex items-center h-fit gap-4">
      <img
        :src="`/experiences/${imgFile}`"
        :alt="imgFile"
        class="h-16 md:h-20 aspect-square rounded-lg"
      />
      <header class="space-y-1">
        <h2 v-if="roles.length === 1">{{ roles[0].title }}</h2>
        <h2 v-else>{{ company }}</h2>

        <h3 v-if="roles.length === 1">
          {{ company }}
          •
          {{ roles[0].startDate + ' - ' + (roles[0].endDate || '') }}
        </h3>
        <h3 v-else>
          {{ roles[0].startDate + ' - ' + (roles[roles.length - 1].endDate || '') }}
        </h3>
      </header>
    </div>

    <div v-if="roles.length > 1" class="space-y-6">
      <div
        v-for="(role, index) in [...roles].reverse()"
        :key="role.title + index"
      >
        <div class="flex gap-4">
          <div>
            <div class="h-full w-1 bg-border rounded-full mx-auto" />
          </div>
          <div>
            <h3>
              {{ role.title }}
              •
              {{ role.startDate + ' - ' + (role.endDate || '') }}
            </h3>
            <p>{{ role.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <p v-else>{{ roles[0].description }}</p>
  </div>
</template>