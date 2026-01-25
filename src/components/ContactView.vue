<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import emailjs from "@emailjs/browser";
import { getEnvironmentVariable } from "../helpers";

const { t } = useI18n();

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const loading = ref(false);
const success = ref(false);
const error = ref(false);

const sendEmail = async () => {
  loading.value = true;
  success.value = false;
  error.value = false;

  try {
    await emailjs.send(
      getEnvironmentVariable('VITE_EMAILJS_SERVICE_ID'),
      getEnvironmentVariable('VITE_EMAILJS_TEMPLATE_ID'),
      {
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      },
      getEnvironmentVariable('VITE_EMAILJS_PUBLIC_KEY'),
    );

    success.value = true;
    form.value = { name: "", email: "", subject: "", message: "" };
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section
    id="contact"
    class="space-y-12 max-w-3xl mx-auto px-6 py-24"
  >
    <div class="space-y-4">
      <h2 class="text-4xl font-bold">
        {{ t("contact.title") }}
      </h2>

      <p class="text-zinc-600 dark:text-zinc-400">
        {{ t("contact.subtitle") }}
      </p>
    </div>

    <form
      class="grid gap-6
      bg-zinc-50 dark:bg-zinc-900
      border border-zinc-200 dark:border-zinc-800
      p-8 rounded-2xl form"
      @submit.prevent="sendEmail"
    >
      <div class="grid md:grid-cols-2 gap-6">
        <input
          v-model="form.name"
          type="text"
          :placeholder="t('contact.name')"
          required
          class="input"
        />

        <input
          v-model="form.email"
          type="email"
          :placeholder="t('contact.email')"
          required
          class="input"
        />
      </div>

      <input
        v-model="form.subject"
        type="text"
        :placeholder="t('contact.subject')"
        required
        class="input"
      />

      <textarea
        v-model="form.message"
        rows="5"
        :placeholder="t('contact.message')"
        required
        class="input resize-none"
      />

      <button
        type="submit"
        :disabled="loading"
        class="bg-green-500 text-black font-semibold py-3 rounded-lg
        hover:bg-green-400 transition disabled:opacity-50"
      >
        {{ loading ? t("contact.sending") : t("contact.send") }}
      </button>

      <p v-if="success" class="text-green-500 text-sm">
        {{ t("contact.success") }}
      </p>

      <p v-if="error" class="text-red-500 text-sm">
        {{ t("contact.error") }}
      </p>
    </form>
  </section>
</template>

<style scoped>
.input {
  @apply w-full rounded-lg px-4 py-3 text-sm transition
  bg-white dark:bg-zinc-800
  border border-zinc-300 dark:border-zinc-700
  text-zinc-900 dark:text-zinc-100
  placeholder-zinc-400 dark:placeholder-zinc-500
  focus:outline-none focus:border-green-400;
}
</style>
