<template>
  <PageShell eyebrow="QR Code Generator" title="在线二维码生成">
    <template #aside>
      <span class="muted">即时输入，即时生成</span>
    </template>

    <div class="tool-grid">
      <el-card shadow="never">
        <template #header>
          <strong>输入内容</strong>
        </template>
        <el-input
          v-model="content"
          type="textarea"
          :rows="8"
          maxlength="1200"
          show-word-limit
          placeholder="请输入文本、URL、中文或特殊字符"
        />
        <div class="form-grid">
          <el-form-item label="尺寸">
            <el-select v-model="options.size">
              <el-option :value="128" label="128px" />
              <el-option :value="256" label="256px" />
              <el-option :value="512" label="512px" />
            </el-select>
          </el-form-item>
          <el-form-item label="容错">
            <el-select v-model="options.errorCorrectionLevel">
              <el-option value="L" label="L" />
              <el-option value="M" label="M" />
              <el-option value="Q" label="Q" />
              <el-option value="H" label="H" />
            </el-select>
          </el-form-item>
          <el-form-item label="前景色">
            <el-color-picker v-model="options.colorDark" />
          </el-form-item>
          <el-form-item label="背景色">
            <el-color-picker v-model="options.colorLight" />
          </el-form-item>
          <el-form-item label="边距">
            <el-input-number v-model="options.margin" :min="0" :max="8" />
          </el-form-item>
          <el-form-item label="中心 Logo">
            <el-upload accept="image/*" :auto-upload="false" :show-file-list="false" :on-change="onLogoChange">
              <el-button>上传 Logo</el-button>
            </el-upload>
          </el-form-item>
        </div>
      </el-card>

      <el-card shadow="never">
        <template #header>
          <strong>生成结果</strong>
        </template>
        <div class="preview-box">
          <img v-if="qrDataUrl" :src="qrDataUrl" alt="二维码预览" />
          <el-empty v-else description="输入内容后自动生成" />
        </div>
        <el-button type="primary" :disabled="!qrDataUrl" @click="download">下载 PNG</el-button>
      </el-card>
    </div>
  </PageShell>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { saveAs } from 'file-saver';
import PageShell from '../components/PageShell.vue';
import { debounce } from '../utils/debounce';
import { createQrDataUrl, dataUrlToBlob, type QrOptions } from '../utils/qr';

const content = ref('https://myqr.cn');
const qrDataUrl = ref('');
const options = reactive<QrOptions>({
  size: 256,
  errorCorrectionLevel: 'H',
  colorDark: '#111827',
  colorLight: '#ffffff',
  margin: 2,
});

const generate = debounce(async () => {
  const value = content.value.trim();
  qrDataUrl.value = value ? await createQrDataUrl(value, options) : '';
}, 400);

watch([content, options], generate, { immediate: true, deep: true });

function onLogoChange(file: { raw?: File }) {
  if (!file.raw) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    options.logoDataUrl = String(reader.result);
    generate();
  };
  reader.readAsDataURL(file.raw);
}

function download() {
  if (qrDataUrl.value) {
    saveAs(dataUrlToBlob(qrDataUrl.value), 'myqr.png');
  }
}
</script>
