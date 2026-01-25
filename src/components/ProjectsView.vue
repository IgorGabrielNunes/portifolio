<script setup lang="ts">
import { useI18n } from "vue-i18n"

type Project = {
  id: number,
  title: string
  techs: string[]
  description: string
}

const { t } = useI18n()

const projects: Project[] = [
  {
    id: 1,
    title: "projects.systemQueuing.title",
    techs: ["TypeScript", "Node", "RabbitMQ"],
    description: 'Sistema de filas com RabbitMQ'
  },
  {
    id: 2,
    title: "projects.systemLogin.title",
    techs: ["Vue", "GraphQL", "TypeScript", "PostgreSQL"],
    description: 'Sistema de login com Vue, GraphQL e PostgreSQL'
  }
]

</script>

<template>
<section id="projects" class="space-y-10">
    <div data-aos="fade-left">
      <h1 class="text-4xl font-bold">
        {{ t("projects.title") }}
      </h1>
    </div>

      <div
v-for="project in projects" :key="project.id" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 flex"
      data-aos="fade-up"
      data-aos-duration="3000"
      >
        <div
          class="bg-zinc-100 dark:bg-zinc-900 p-6  rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-green-400 transition"
        >
          <h3 class="text-xl font-semibold mb-2">
            {{ t(project.title) }}
          </h3>
          <p class="text-zinc-600 dark:text-zinc-400 mb-4">
            {{ t(project.description) }}
          </p>
          <span v-for="tech in project.techs" :key="tech" class="text-sm text-green-400 mr-3">
            {{ tech }}
          </span>
        </div>
      </div>
    </section>
</template>