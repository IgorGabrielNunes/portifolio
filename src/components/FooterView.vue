<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <footer class="mt-40 border-t border-zinc-800 bg-zinc-950">
    <div
      class="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3"
    >
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-green-400">
          Igor Gabriel
        </h3>

        <p class="text-zinc-400 text-sm leading-relaxed">
          {{ t("footer.description") }}
        </p>
      </div>

      <div class="space-y-4">
        <h4 class="font-semibold">
          {{ t("footer.navigation.title") }}
        </h4>

        <ul class="space-y-2 text-zinc-400 text-sm">
          <li>
            <a href="#home" class="hover:text-green-400">
              {{ t("footer.navigation.home") }}
            </a>
          </li>
          <li>
            <a href="#skills" class="hover:text-green-400">
              {{ t("footer.navigation.skills") }}
            </a>
          </li>
          <li>
            <a href="#projects" class="hover:text-green-400">
              {{ t("footer.navigation.projects") }}
            </a>
          </li>
          <li>
            <a href="#contact" class="hover:text-green-400">
              {{ t("footer.navigation.contact") }}
            </a>
          </li>
        </ul>
      </div>

      <div class="space-y-4">
        <h4 class="font-semibold">
          {{ t("footer.social.title") }}
        </h4>

        <div class="flex gap-6 text-zinc-400">
          <a
            href="https://github.com/"
            target="_blank"
            class="hover:text-green-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            class="hover:text-green-400 transition"
          >
            LinkedIn
          </a>
          <a
            href="mailto:igor@email.com"
            class="hover:text-green-400 transition"
          >
            Email
          </a>
        </div>
      </div>
    </div>

    <div
      class="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500"
    >
      © {{ new Date().getFullYear() }}
      Igor Gabriel.
      {{ t("footer.rights") }}
    </div>
  </footer>
</template>
