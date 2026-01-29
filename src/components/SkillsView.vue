<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
import EmblaCarousel from 'embla-carousel'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from './SectionHeader.vue'
  import rabbitmqImg from '../public/imgs/rabbitmq.png'

const { t } = useI18n()

const emblaRef = ref<HTMLElement | null>(null)





const skills = [
  { name: 'Vue.js', icon: 'https://img.icons8.com/?id=rY6agKizO9eb&size=100' },
  { name: 'TypeScript', icon: 'https://img.icons8.com/?id=uJM6fQYqDaZK&size=100' },
  { name: 'JavaScript', icon: 'https://img.icons8.com/?id=108784&size=100' },
  { name: 'Node.js', icon: 'https://img.icons8.com/?id=54087&size=100' },
  { name: 'Docker', icon: 'https://img.icons8.com/?id=22813&size=100' },
  { name: 'PostgreSQL', icon: 'https://img.icons8.com/?id=38561&size=100' },
  { name: 'RabbitMQ', icon: rabbitmqImg },
  { name: 'GraphQL', icon: 'https://img.icons8.com/?size=100&id=KRA1PoZgRrca&format=png&color=000000' },
  { name: 'Redis', icon: 'https://img.icons8.com/?id=pHS3eRpynIRQ&size=100' },
  { name: 'Git', icon: 'https://img.icons8.com/?id=20906&size=100' },
]

onMounted(() => {
  if (!emblaRef.value) return

  EmblaCarousel(
    emblaRef.value,
    {
      loop: true,
      dragFree: true,
      align: 'start',
    },
    [
      Autoplay({
        delay: 1200,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  )
})
</script>

<template>
  <section id="skills" class="space-y-14 overflow-hidden">
    <SectionHeader :title="t('skills.title')" />

    <div class="embla">
      <div class="embla__viewport" ref="emblaRef">
        <div class="embla__container">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="embla__slide"
          >
            <div class="skill-card">
              <img :src="skill.icon" :alt="skill.name" />
              <span>{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.embla {
  width: 100%;
}

.embla__viewport {
  overflow: hidden;
}

.embla__container {
  display: flex;
  gap: 3rem;
}

.embla__slide {
  flex: 0 0 auto;
}

.skill-card {
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.skill-card img {
  width: 56px;
  height: 56px;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.skill-card:hover img {
  cursor: pointer;
  filter: grayscale(0%);
}

.skill-card span {
  font-size: 0.875rem;
  color: rgb(161 161 170); /* zinc-400 */
}
</style>