<script setup lang="ts">
import { onMounted } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

type Skill = {
  name: string
  level: number
}

type SkillGroup = {
  titleKey: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    titleKey: "skills.frontend",
    skills: [
      { name: "Vue.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Quasar", level: 80 }
    ]
  },
  {
    titleKey: "skills.backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Fastify", level: 80 },
      { name: "Apollo Server / GraphQL", level: 80 },
      { name: "REST APIs", level: 85 }
    ]
  },
  {
    titleKey: "skills.database",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "Redis", level: 70 },
      { name: "Modelagem de Dados", level: 75 }
    ]
  },
  {
    titleKey: "skills.infra",
    skills: [
      { name: "Docker", level: 75 },
      { name: "RabbitMQ", level: 80 },
      { name: "CI/CD", level: 70 },
      { name: "Vercel / VPS", level: 25 }
    ]
  }
]

onMounted(() => {
  const bars = document.querySelectorAll<HTMLElement>("[data-skill]")
  bars.forEach(bar => {
    bar.style.width = bar.dataset.skill + "%"
  })
})
</script>

<template>
  <section id="skills" class="space-y-16">
    <h2 class="text-4xl font-bold">
      {{ t("skills.title") }}
    </h2>

    <div class="grid md:grid-cols-2 gap-12">
      <div
        v-for="group in skillGroups"
        :key="group.titleKey"
        class="space-y-6"
      >
        <h3 class="text-2xl font-semibold text-green-400">
          {{ t(group.titleKey) }}
        </h3>

        <div class="space-y-5">
          <div
            v-for="skill in group.skills"
            :key="skill.name"
            class="space-y-2"
            data-aos="fade-up"
          >
            <div class="flex justify-between text-sm text-zinc-700 dark:text-zinc-300">
              <span>{{ skill.name }}</span>
              <span class="text-zinc-500 dark:text-zinc-400">
                {{ skill.level }}%
              </span>
            </div>

            <div
              class="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden"
            >
              <div
                class="h-full bg-green-400 transition-all duration-1000 ease-out"
                :data-skill="skill.level"
                style="width: 0%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
