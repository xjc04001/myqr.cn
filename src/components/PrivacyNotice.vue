<template>
  <el-alert class="privacy-notice" type="success" :closable="false" show-icon :title="text.privacy" />
</template>

<script setup lang="ts">
import { useI18n } from '../utils/i18n';

const { text } = useI18n();
</script>
