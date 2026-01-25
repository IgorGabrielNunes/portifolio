<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

type Experience = {
  role: string;
  company: string;
  period: string;
  description: string[];
};

const experiences = computed<Experience[]>(() => [
  {
    role: t("experience.jobs.fullstack.role"),
    company: t("experience.jobs.fullstack.company"),
    period: t("experience.jobs.fullstack.period"),
    description: [
      t("experience.jobs.fullstack.desc1"),
      t("experience.jobs.fullstack.desc2"),
      t("experience.jobs.fullstack.desc3"),
    ],
  },
  {
    role: t("experience.jobs.web.role"),
    company: t("experience.jobs.web.company"),
    period: t("experience.jobs.web.period"),
    description: [
      t("experience.jobs.web.desc1"),
      t("experience.jobs.web.desc2"),
      t("experience.jobs.web.desc3"),
      t("experience.jobs.web.desc4"),
    ],
  },
]);
</script>

<template>
  <section
    id="experience"
    class="max-w-5xl mx-auto px-6 py-24 space-y-16"
  >
    <h2 class="text-4xl font-bold">
      {{ t("experience.title") }}
    </h2>

    <div class="space-y-12">
      <div
        v-for="exp in experiences"
        :key="exp.role + exp.company"
        class="relative pl-8 border-l
        border-zinc-300 dark:border-zinc-800"
        data-aos="fade-right"
      >
        <span
          class="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-green-400"
        />

        <div class="space-y-2">
          <h3 class="text-xl font-semibold">
            {{ exp.role }}
            <span class="text-green-500">
              @ {{ exp.company }}
            </span>
          </h3>

          <span class="text-sm text-zinc-600 dark:text-zinc-400">
            {{ exp.period }}
          </span>

          <ul
            class="list-disc list-inside space-y-1 pt-2 text-zinc-600 dark:text-zinc-400"
          >
            <li v-for="item in exp.description" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
