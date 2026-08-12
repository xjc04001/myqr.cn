<template>
  <PageShell :eyebrow="t.eyebrow" :title="t.title">
    <div class="tool-grid decoder-grid">
      <el-card class="decoder-card" shadow="never">
        <template #header>
          <strong>{{ t.upload }}</strong>
        </template>
        <el-upload
          class="decoder-upload"
          drag
          accept=".png,.jpg,.jpeg,.bmp,.webp,image/png,image/jpeg,image/bmp,image/webp"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="decode"
        >
          <div class="upload-text">{{ t.uploadHint }}</div>
        </el-upload>
        <img v-if="previewUrl" class="uploaded-preview" :src="previewUrl" :alt="t.previewAlt">
      </el-card>

      <el-card class="decoder-card" shadow="never">
        <template #header>
          <strong>{{ t.result }}</strong>
        </template>
        <el-input v-model="result" type="textarea" :rows="6" readonly :placeholder="t.placeholder" />
        <el-button class="copy-button" type="primary" :disabled="!result" @click="copyResult">{{ t.copy }}</el-button>
      </el-card>
    </div>
  </PageShell>
</template>

<script setup lang="ts">
import { BrowserQRCodeReader } from '@zxing/browser';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import PageShell from '../components/PageShell.vue';
import { useI18n } from '../utils/i18n';

const { text } = useI18n();
const t = computed(() => text.value.decoder);
const reader = new BrowserQRCodeReader();
const result = ref('');
const previewUrl = ref('');

async function decode(file: { raw?: File }) {
  if (!file.raw) {
    return;
  }

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
  previewUrl.value = URL.createObjectURL(file.raw);

  try {
    const decoded = await reader.decodeFromImageUrl(previewUrl.value);
    result.value = decoded.getText();
    ElMessage.success(t.value.success);
  } catch {
    result.value = '';
    ElMessage.error(t.value.failed);
  }
}

async function copyResult() {
  await navigator.clipboard.writeText(result.value);
  ElMessage.success(t.value.copied);
}
</script>
