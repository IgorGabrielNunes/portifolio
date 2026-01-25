<template>
  <section
      id="home"
      class="min-h-[70vh] flex flex-col justify-center gap-6"
    >
      <h1 class="text-5xl md:text-6xl font-bold leading-tight">
        Igor Gabriel<br />
        <span class="text-green-400">
          {{ t("hero.role") }}
        </span>
      </h1>

      <p class="text-zinc-600 dark:text-zinc-400 max-w-xl">
        {{ t("hero.description") }}
      </p>

      <div class="flex gap-4 pt-4">
        <a
          href="#projects"
          class="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition"
        >
          {{ t("hero.projects") }}
        </a>

        <a
          href="#contact"
          class="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-green-400 transition"
        >
          {{ t("hero.contact") }}
        </a>
      </div>
    </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>