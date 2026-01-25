<script setup lang="ts">

import Skills from "../components/SkillsView.vue"
import Experience from "../components/ExperienceView.vue"
import Contact from "../components/ContactView.vue"
import Hero from "../components/HeroView.vue"
import Projects from "../components/ProjectsView.vue"
import About from "../components/AboutView.vue"

</script>

<template>
  <section class="space-y-40">

    <!-- HERO -->
    <Hero />

    <!-- ABOUT -->
    <About />

    <!-- SKILLS -->
    <Skills />

    <!-- EXPERIENCE -->
    <Experience />

    <!-- PROJECTS -->
    <Projects />

    <!-- CONTACT -->
    <section id="contact" class="space-y-8 max-w-xl">
      <Contact />
    </section>

  </section>
</template>
