<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header
    class="section-header"
    data-aos="fade-up"
    data-aos-duration="700"
  >
    <h2 class="section-title">
      {{ title }}
    </h2>

    <p v-if="subtitle" class="section-subtitle">
      {{ subtitle }}
    </p>
  </header>
</template>