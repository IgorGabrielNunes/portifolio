<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import SectionHeader from "./SectionHeader.vue"
import gsap from "gsap"
import Draggable from 'gsap/Draggable'

const { t } = useI18n()

gsap.registerPlugin(Draggable)

const track = ref<HTMLElement | null>(null)

const skills = [
  { name: 'Vue.js', icon: 'https://img.icons8.com/?size=100&id=rY6agKizO9eb&format=png&color=000000' },
  { name: 'TypeScript', icon: 'https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000' },
  { name: 'JavaScript', icon: 'https://img.icons8.com/?size=100&id=108784&format=png&color=000000' },
  { name: 'Node.js', icon: 'https://img.icons8.com/?size=100&id=54087&format=png&color=000000' },
  { name: 'Docker', icon: 'https://img.icons8.com/?size=100&id=22813&format=png&color=000000' },
  { name: 'PostgreSQL', icon: 'https://img.icons8.com/?size=100&id=38561&format=png&color=000000' },
  { name: 'RabbitMQ', icon: '/src/public/imgs/rabbitmq.png' },
  { name: 'Grapqhl', icon: '/src/public/imgs/grapqhl.png' },
  { name: 'Apollo Server', icon: 'https://img.icons8.com/?size=100&id=ktSS1TBte4xa&format=png&color=000000' },
  { name: 'Redis', icon: 'https://img.icons8.com/?size=100&id=pHS3eRpynIRQ&format=png&color=000000' },
  { name: 'Git', icon: 'https://img.icons8.com/?size=100&id=20906&format=png&color=000000' },
  { name: 'Go', icon: 'https://img.icons8.com/?size=100&id=IrYuykLoqOH6&format=png&color=000000' },
]

const loopSkills = [...skills, ...skills]
let tween: gsap.core.Tween

onMounted(() => {
  if (!track.value) return

  const totalWidth = track.value.scrollWidth / 3

  tween = gsap.to(track.value, {
    x: `-=${totalWidth}`,
    duration: 30,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: (x) => {
        const px = parseFloat(x)
        return `${px % totalWidth}px`
      },
    },
  })

  Draggable.create(track.value, {
    type: 'x',
    inertia: true,

    onDrag() {
      gsap.set(track.value, { x: this.x })
    },

    onThrowUpdate() {
      gsap.set(track.value, { x: this.x })
    },

    onDragEnd() {
      tween.invalidate().restart()
    },
  })
})

</script>

<template>
  <section id="skills" class="space-y-16">
    <SectionHeader :title="t('skills.title')" />
    <div class="grid md:grid-cols-2 gap-12">
      <div
        ref="track"
        class="flex gap-14 cursor-grab active:cursor-grabbing select-none"
      >
        <div
          v-for="(skill, index) in loopSkills"
          :key="index"
          class="flex flex-col items-center gap-3 min-w-[120px]"
        >
          <img
            :src="skill.icon"
            :alt="skill.name"
            class="w-14 h-14 grayscale hover:grayscale-0 transition"
          />
          <span class="text-sm text-zinc-400">
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

@media (max-width: 768px) {
  .animate-marquee {
    animation-duration: 40s;
  }
}

</style>
