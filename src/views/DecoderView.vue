<template>
  <PageShell eyebrow="QR Code Decoder" title="在线二维码识别">
    <div class="tool-grid">
      <el-card shadow="never">
        <template #header>
          <strong>上传图片</strong>
        </template>
        <el-upload
          drag
          accept=".png,.jpg,.jpeg,.bmp,.webp,image/png,image/jpeg,image/bmp,image/webp"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="decode"
        >
          <div class="upload-text">拖放或点击上传 PNG / JPG / JPEG / BMP / WebP</div>
        </el-upload>
        <img v-if="previewUrl" class="uploaded-preview" :src="previewUrl" alt="上传预览" />
      </el-card>

      <el-card shadow="never">
        <template #header>
          <strong>识别结果</strong>
        </template>
        <el-input v-model="result" type="textarea" :rows="8" readonly placeholder="识别成功后显示二维码内容" />
        <el-button type="primary" :disabled="!result" @click="copyResult">一键复制</el-button>
      </el-card>
    </div>
  </PageShell>
</template>

<script setup lang="ts">
import { BrowserQRCodeReader } from '@zxing/browser';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import PageShell from '../components/PageShell.vue';

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
    ElMessage.success('识别成功');
  } catch {
    result.value = '';
    ElMessage.error('图片无法识别，请上传清晰完整二维码图片。');
  }
}

async function copyResult() {
  await navigator.clipboard.writeText(result.value);
  ElMessage.success('已复制');
}
</script>
