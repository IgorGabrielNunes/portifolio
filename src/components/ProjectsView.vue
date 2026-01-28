<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { onMounted, ref } from "vue"
import { getPortfolioProjects } from "../services/github/github"
import { DEVELOPMENT, PRODUCTION } from "../helpers/constants"
import { capitalize } from "../helpers"
import SectionHeader from "./SectionHeader.vue"

interface RepoLink {
  name: string
  repoUrl: string
}

interface Project {
  name: string
  description?: string
  status: string
  repos: RepoLink[]
}

const { t } = useI18n()

const projects = ref<Project[]>([])
const loading = ref(true)

onMounted(async () => {
  projects.value = await getPortfolioProjects()
  loading.value = false
})

function getStatusClasses(status: string) {
  if (status === PRODUCTION) {
    return "bg-emerald-500/10 text-emerald-400 border-emerald-400/30"
  }
  if (status === DEVELOPMENT) {
    return "bg-amber-500/10 text-amber-400 border-amber-400/30"
  }
  return ""
}

function getStatusDotClasses(status: string) {
  if (status === PRODUCTION) return "bg-emerald-400"
  if (status === DEVELOPMENT) return "bg-amber-400"
  return ""
}

function getStatusLabel(status: string) {
  return t(`projects.${status.toLowerCase()}`)
}

function getProjectDescription(project: Project) {
  return project.description || t("projects.whitoutDescription")
}
</script>

<template>
  <section id="projects" class="space-y-16">
    <SectionHeader :title="t('projects.title')" :subtitle="t('projects.subtitle')" />

    <div
      v-if="loading"
      class="flex justify-center items-center py-20 text-zinc-400"
    >
      <span class="animate-pulse">
        {{ t("projects.loadingProjects") }}
      </span>
    </div>

    <div
      v-else
      class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      <article
        v-for="project in projects"
        :key="project.name"
        class="group relative rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur
          p-6 transition-all duration-300
          hover:-translate-y-2 hover:border-green-400
          hover:shadow-[0_0_40px_rgba(74,222,128,0.15)]"
      >
        <!-- glow -->
        <div
          class="pointer-events-none absolute inset-0 rounded-2xl opacity-0
            group-hover:opacity-100 transition
            bg-gradient-to-br from-green-400/10 to-transparent"
        />

        <!-- header -->
        <div class="relative flex items-start justify-between gap-4">
          <h3 class="text-xl font-semibold leading-tight">
            {{ capitalize(project.name) }}
          </h3>

          <span
            class="inline-flex items-center gap-2 text-xs font-semibold
              px-3 py-1 rounded-full border
              transition-colors duration-300 select-none"
            :class="getStatusClasses(project.status)"
          >
            <span
              class="h-2 w-2 rounded-full"
              :class="getStatusDotClasses(project.status)"
            />
            {{ getStatusLabel(project.status) }}
          </span>
        </div>

        <!-- description -->
        <p class="relative mt-4 text-sm text-zinc-400 leading-relaxed line-clamp-3">
          {{ getProjectDescription(project) }}
        </p>

        <!-- repos (links only) -->
        <div class="relative mt-6 space-y-2">
          <a
            v-for="repo in project.repos"
            :key="repo.repoUrl"
            :href="repo.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between rounded-lg
              border border-zinc-800 bg-zinc-900/60 px-4 py-2
              text-sm text-zinc-300 hover:border-green-400
              hover:text-green-400 transition"
          >
            <span class="font-medium">
              {{ capitalize(repo.name) }}
            </span>

            <span class="text-xs opacity-60">
              GitHub →
            </span>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
