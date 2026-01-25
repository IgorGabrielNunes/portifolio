<script setup lang="ts">
import Navbar from "./components/NavbarView.vue"
import Footer from "./components/FooterView.vue"
</script>

<template>
  <div
     class="min-h-screen bg-white text-zinc-900
         dark:bg-zinc-950 dark:text-zinc-100
         transition-colors duration-300"
  >
    <Navbar />

    <main class="max-w-6xl mx-auto px-6 py-16">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
