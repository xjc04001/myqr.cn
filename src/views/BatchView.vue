<template>
  <PageShell eyebrow="Batch QR Code" title="批量生成二维码">
    <div class="tool-grid">
      <el-card shadow="never">
        <template #header>
          <strong>TXT 文件</strong>
        </template>
        <el-upload accept=".txt,text/plain" :auto-upload="false" :show-file-list="false" :on-change="handleFile">
          <el-button type="primary">选择 TXT 文件</el-button>
        </el-upload>
        <p class="muted">最多 10000 行，文件不超过 1MB，空行和超过 200 字符的行会自动跳过。</p>
        <el-progress v-if="total" :percentage="progress" />
      </el-card>

      <el-card shadow="never">
        <template #header>
          <strong>处理状态</strong>
        </template>
        <el-statistic title="有效行数" :value="total" />
        <el-statistic title="已生成" :value="done" />
        <p class="muted">{{ status }}</p>
      </el-card>
    </div>
  </PageShell>
</template>

<script setup lang="ts">
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import PageShell from '../components/PageShell.vue';
import { createQrDataUrl, dataUrlToBlob } from '../utils/qr';

const maxFileSize = 1024 * 1024;
const maxRows = 10000;
const total = ref(0);
const done = ref(0);
const status = ref('等待上传 TXT 文件');
const progress = computed(() => (total.value ? Math.round((done.value / total.value) * 100) : 0));

async function handleFile(file: { raw?: File }) {
  if (!file.raw) {
    return;
  }

  if (file.raw.size > maxFileSize) {
    ElMessage.error('文件大小不能超过 1MB');
    return;
  }

  const text = await file.raw.text();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line.length <= 200)
    .slice(0, maxRows);

  if (!lines.length) {
    ElMessage.warning('没有可生成的有效内容');
    return;
  }

  await generateZip(lines);
}

async function generateZip(lines: string[]) {
  const zip = new JSZip();
  total.value = lines.length;
  done.value = 0;
  status.value = '正在生成二维码';

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

  status.value = '正在打包 ZIP';
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'qrcode.zip');
  status.value = '已完成并触发下载';
  ElMessage.success('批量二维码生成完成');
}
</script>
