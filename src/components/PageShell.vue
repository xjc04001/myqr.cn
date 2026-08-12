<template>
  <section class="page-shell">
    <div class="section-title">
      <div>
        <p>{{ eyebrow }}</p>
        <h1>{{ title }}</h1>
      </div>
      <slot name="aside" />
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
}>();
</script>
