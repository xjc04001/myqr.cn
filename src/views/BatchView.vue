<template>
  <PageShell :eyebrow="t.eyebrow" :title="t.title">
    <div class="tool-grid">
      <el-card shadow="never">
        <template #header>
          <strong>{{ t.file }}</strong>
        </template>
        <el-upload accept=".txt,text/plain" :auto-upload="false" :show-file-list="false" :on-change="handleFile">
          <el-button type="primary">{{ t.choose }}</el-button>
        </el-upload>
        <p class="muted">{{ t.hint }}</p>
        <el-progress v-if="total" :percentage="progress" />
      </el-card>

      <el-card shadow="never">
        <template #header>
          <strong>{{ t.state }}</strong>
        </template>
        <el-statistic :title="t.validRows" :value="total" />
        <el-statistic :title="t.generated" :value="done" />
        <p class="muted">{{ status }}</p>
      </el-card>
    </div>
  </PageShell>
</template>

<script setup lang="ts">
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ElMessage } from 'element-plus';
import { computed, ref, watch } from 'vue';
import PageShell from '../components/PageShell.vue';
import { createQrDataUrl, dataUrlToBlob } from '../utils/qr';
import { useI18n } from '../utils/i18n';

const { text } = useI18n();
const t = computed(() => text.value.batch);
const maxFileSize = 1024 * 1024;
const maxRows = 10000;
const total = ref(0);
const done = ref(0);
const status = ref(t.value.waiting);
const progress = computed(() => (total.value ? Math.round((done.value / total.value) * 100) : 0));

watch(t, (value) => {
  if (!total.value) {
    status.value = value.waiting;
  }
});

async function handleFile(file: { raw?: File }) {
  if (!file.raw) {
    return;
  }

  if (file.raw.size > maxFileSize) {
    ElMessage.error(t.value.fileTooLarge);
    return;
  }

  const textContent = await file.raw.text();
  const lines = textContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line.length <= 200)
    .slice(0, maxRows);

  if (!lines.length) {
    ElMessage.warning(t.value.noValidContent);
    return;
  }

  await generateZip(lines);
}

async function generateZip(lines: string[]) {
  const zip = new JSZip();
  total.value = lines.length;
  done.value = 0;
  status.value = t.value.generating;

  for (let index = 0; index < lines.length; index += 1) {
    const dataUrl = await createQrDataUrl(lines[index], {
      size: 512,
      errorCorrectionLevel: 'M',
      colorDark: '#111827',
      colorLight: '#ffffff',
      margin: 2,
    });
    zip.file(`${String(index + 1).padStart(3, '0')}.png`, dataUrlToBlob(dataUrl));
    done.value = index + 1;

    if (index % 25 === 0) {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    }
  }

  status.value = t.value.packing;
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'qrcode.zip');
  status.value = t.value.done;
  ElMessage.success(t.value.success);
}
</script>
