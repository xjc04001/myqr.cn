<template>
  <header class="site-header">
    <div class="header-top">
      <router-link class="brand" to="/generate">
        <img src="/images/logo.png" alt="MYQR">
        <span>MYQR.CN</span>
      </router-link>
      <div class="header-actions">
        <el-segmented v-model="languageModel" :options="languageOptions" size="small" />
      </div>
    </div>
    <nav class="main-tabs">
      <router-link v-for="item in tabs" :key="item.to" :to="item.to">
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DocumentChecked, Files, MagicStick, Tickets } from '@element-plus/icons-vue';
import { setLocale, useI18n, type Locale } from '../utils/i18n';

const { locale, text } = useI18n();
const languageOptions = [
  { label: '中', value: 'zh' },
  { label: 'EN', value: 'en' },
];
const languageModel = computed({
  get: () => locale.value,
  set: (value: Locale) => setLocale(value),
});
const tabs = computed(() => [
  { to: '/generate', label: text.value.nav.generate, icon: MagicStick },
  { to: '/decode', label: text.value.nav.decode, icon: DocumentChecked },
  { to: '/batch', label: text.value.nav.batch, icon: Files },
  { to: '/barcode', label: text.value.nav.barcode, icon: Tickets },
]);
</script>
