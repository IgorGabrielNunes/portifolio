<template>
  <section
    id="about"
  >
    <div data-aos="fade-up" class="grid md:grid-cols-2 gap-16 items-center">
      
      <div class="space-y-4">
        <SectionHeader :title="$t('about.title')" />

        <p class="text-zinc-600 dark:text-zinc-400">
          {{ $t('about.paragraph1') }}
        </p>

        <p class="text-zinc-600 dark:text-zinc-400">
          {{ $t('about.paragraph2') }}
        </p>

        <ul class="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li>📍 {{ $t('about.location') }}</li>
          <li>💼 {{ $t('about.role') }}</li>
          <li>🚀 {{ $t('about.focus') }}</li>
        </ul>
      </div>

      <div
        class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-8 space-y-4"
      >
        <div class="flex justify-between text-sm">
          <span class="text-zinc-500">
            {{ $t('about.experienceLabel') }}
          </span>
          <span class="font-medium">
            {{ $t('about.experienceValue') }}
          </span>
        </div>

        <div class="flex justify-between text-sm">
          <span class="text-zinc-500">
            {{ $t('about.stackLabel') }}
          </span>
          <span class="font-medium">
            {{ $t('about.stackValue') }}
          </span>
        </div>

        <div class="flex justify-between text-sm">
          <span class="text-zinc-500">
            {{ $t('about.availabilityLabel') }}
          </span>
          <span class="text-green-500 font-medium">
            {{ $t('about.availabilityValue') }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from './SectionHeader.vue';
</script>
